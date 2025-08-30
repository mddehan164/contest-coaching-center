import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
    addNewStudentToList,
    viewStudentFromList,
    setAddStudentModal,
    setEditStudentModal,
    setSelectedStudentData,
    setStudentConfirmationModal,
    setStudentMetaData,
    updateStudentInList,
    useAddStudentMutation,
    useDeleteStudentMutation,
    useGetAllStudentsQuery,
    useUpdateStudentMutation,
} from "../redux-rtk/student";
import { CreateStudentSchema, EditStudentSchema, validateZodSchema } from "@utils/validations";
import { useDebouncedSearch } from "./useDebounce";
import { useGetAllCoursesQuery, useGetCourseBatchesQuery } from "../redux-rtk/course";

// ** Student List **
export const useStudents = () => {
    const dispatch = useDispatch();
    const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
        (state) => state.student
    );
    const { currentPage, pageSize } = meta || {};

    const [searchKeyword, setSearchKeyword] = useState("");
    const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

    const [deleteStudent, { isLoading: deleteLoading }] = useDeleteStudentMutation();
    const { isLoading, isFetching, isError, error } = useGetAllStudentsQuery(
        { page: currentPage, limit: pageSize, search: debouncedSearch },
        { 
            refetchOnMountOrArgChange: false, // Don't refetch on every mount
            refetchOnFocus: false,
            refetchOnReconnect: true
        }
    );

    const updatePageMeta = (value) => dispatch(setStudentMetaData(value));
    const handleSetSelectedStudent = (data) => dispatch(setSelectedStudentData(data));

    const handleOpenAddStudentModal = () => dispatch(setAddStudentModal(true));
    const handleOpenEditStudentModal = () => dispatch(setEditStudentModal(true));

    const handleOpenConfirmationModal = () => dispatch(setStudentConfirmationModal(true));
    const handleCloseConfirmationModal = () => {
        dispatch(setStudentConfirmationModal(false));
        dispatch(setSelectedStudentData(null));
    };

    const handleDelete = ({ studentId }) => {
        if (!studentId) return errorNotify("Student ID is required.");

        deleteStudent({ studentId })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseConfirmationModal();
                    dispatch(viewStudentFromList({ id: studentId }));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message);
                console.log(err.data.message);
            });
    };

    return {
        dataList,
        meta,
        isLoading: isLoading || isFetching,
        isError,
        status: error?.status,
        updatePageMeta,
        handleDelete,
        deleteLoading,
        searchKeyword,
        setSearchKeyword,
        selectedData,
        handleSetSelectedStudent,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
        handleOpenAddStudentModal,
        handleOpenEditStudentModal,
    };
};




// ** Add Student Modal **
export const useAddStudent = () => {
    const dispatch = useDispatch();
    const [addStudent, { isLoading: isAdding }] = useAddStudentMutation();
    const { isAddModalOpen } = useSelector((state) => state.student);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    // State for batches options
    const [batchesOptions, setBatchesOptions] = useState([]);
    const [selectedCourseEncryptedId, setSelectedCourseEncryptedId] = useState(null);

    // Fetch courses
    const { data: coursesData, isLoading: isCoursesLoading } = useGetAllCoursesQuery({
        page: 1,
        limit: 100
    });

    // Memoize course options to prevent infinite re-renders
    const courseOptions = useMemo(() => {
        return coursesData?.data?.courses?.map(course => ({
            value: course.id,
            label: course.title,
            encrypted_id: course.encrypted_id
        })) || [];
    }, [coursesData?.data?.courses]);

    // Use the RTK Query hook for batches
    const {
        data: batchesData,
        isLoading: isBatchesLoading,
        error: batchesError,
        isFetching: isBatchesFetching
    } = useGetCourseBatchesQuery(selectedCourseEncryptedId, {
        skip: !selectedCourseEncryptedId,
        refetchOnMountOrArgChange: false,
    });

    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            image: "",
            course_id: null,
            batch_id: null,
            father_name: "",
            mother_name: "",
            gender: "male",
            mobile: "",
            address: "",
            ssc_result: "",
            hsc_result: "",
            total_amount: "",
            status: 1,
        },
    });


    const formValues = watch();

    // Dummy image upload handler - simulates upload process
    const handleImageUpload = async (file) => {
        if (!file) return;

        setIsUploading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // Create a dummy URL for the uploaded image
            const dummyImageUrl = URL.createObjectURL(file);

            // For demo purposes, we'll use a placeholder URL that includes the filename
            const demoImageUrl = `https://example.com/courses/${file.name.replace(/\s+/g, '-').toLowerCase()}`;

            setValue('image', demoImageUrl);
            setImagePreview(dummyImageUrl);
            successNotify('Image uploaded successfully! (Demo)');
        } catch (error) {
            errorNotify('Failed to process image');
            console.error('Image processing error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                errorNotify('Please select a valid image file (JPEG, PNG, JPG, GIF, WEBP)');
                return;
            }

            if (file.size > maxSize) {
                errorNotify('Image size should be less than 5MB');
                return;
            }

            handleImageUpload(file);
        }
    };

    // Manual URL input handler
    const handleManualUrlInput = (url) => {
        if (url) {
            setValue('image', url);
            setImagePreview(url);
            successNotify('Image URL set successfully!');
        }
    };

    // Update selected course encrypted_id when course changes
    useEffect(() => {
        const currentCourseId = formValues.course_id;

        if (currentCourseId && courseOptions.length > 0) {
            const selectedCourse = courseOptions.find(course => course.value === currentCourseId);
            const newEncryptedId = selectedCourse?.encrypted_id || null;

            if (newEncryptedId && newEncryptedId !== selectedCourseEncryptedId) {
                setSelectedCourseEncryptedId(newEncryptedId);
                // Reset batch selection when course changes
                setValue("batch_id", null, { shouldValidate: false });
            }
        } else if (!currentCourseId && selectedCourseEncryptedId !== null) {
            setSelectedCourseEncryptedId(null);
            setValue("batch_id", null, { shouldValidate: false });
        }
    }, [formValues.course_id, courseOptions, selectedCourseEncryptedId, setValue]);

    // Process batches data when available
    useEffect(() => {
        if (!selectedCourseEncryptedId) {
            setBatchesOptions([]);
            return;
        }

        if (batchesData?.success && batchesData?.data?.batches) {
            const newOptions = batchesData.data.batches.map(batch => ({
                value: batch.id,
                label: batch.title || batch.name || `Batch ${batch.id}`,
            }));

            setBatchesOptions(prevOptions => {
                // Only update if options have actually changed
                const optionsChanged = JSON.stringify(prevOptions) !== JSON.stringify(newOptions);
                return optionsChanged ? newOptions : prevOptions;
            });
        } else if (batchesData?.success) {
            // API returned success but no batches
            setBatchesOptions([]);
        }

        // Handle errors
        if (batchesError) {
            console.error("Error fetching batches:", batchesError);
            setBatchesOptions([]);
            errorNotify("Failed to load batches for this course");
        }
    }, [selectedCourseEncryptedId, batchesData, batchesError]);

    const isActionBtnDisabled =
        !formValues.name || !formValues.course_id || !formValues.batch_id || !formValues.mobile;

    const handleCloseAddStudentModal = () => {
        reset();
        setSelectedCourseEncryptedId(null);
        setBatchesOptions([]);
        dispatch(setAddStudentModal(false));
    };


    const handleAddStudent = (data) => {


        const processedData = {
            ...data,
            course_id: Number(data.course_id),
            batch_id: Number(data.batch_id),
            ssc_result: Number(data.ssc_result) || 0,
            hsc_result: Number(data.hsc_result) || 0,
            total_amount: Number(data.total_amount) || 0,
            status: Number(data.status) || 0,

        };
        console.log(data);
        const validatedData = validateZodSchema({ schema: CreateStudentSchema, data: processedData });
        console.log(processedData);
        if (!validatedData) return;

        addStudent({ data: validatedData })
            .unwrap()
            .then(response => {
                if (response?.success) {
                    handleCloseAddStudentModal();
                    dispatch(addNewStudentToList(response.data.student));
                    successNotify(response?.message || "Student added successfully");
                }
            })
            .catch(err => {
                const errorMessage = err?.data?.message || "Something went wrong!";
                errorNotify(errorMessage);
            });
    };

    return {
        isAddModalOpen,
        handleCloseAddStudentModal,
        isLoading: isAdding || isCoursesLoading,
        control,
        handleSubmit,
        isActionBtnDisabled,
        handleAddStudent,
        courseOptions,
        batchesOptions,
        handleImageUpload,
        formValues,
        isBatchesLoading: isBatchesLoading || isBatchesFetching,
        selectedCourseEncryptedId,
        isUploading,
        imagePreview,
        handleFileSelect,
        handleManualUrlInput,
    };
};


// ** Edit Student Modal **
export const useEditStudent = ({ data }) => {
    const dispatch = useDispatch();
    const [updateStudent, { isLoading }] = useUpdateStudentMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.student);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    // State for batches options
    const [batchesOptions, setBatchesOptions] = useState([]);
    const [selectedCourseEncryptedId, setSelectedCourseEncryptedId] = useState(null);

    // Fetch courses
    const { data: coursesData, isLoading: isCoursesLoading } = useGetAllCoursesQuery({
        page: 1,
        limit: 100
    });

    // Memoize course options to prevent infinite re-renders
    const courseOptions = useMemo(() => {
        return coursesData?.data?.courses?.map(course => ({
            value: course.id,
            label: course.title,
            encrypted_id: course.encrypted_id
        })) || [];
    }, [coursesData?.data?.courses]);

    // Use the RTK Query hook for batches
    const {
        data: batchesData,
        isLoading: isBatchesLoading,
        error: batchesError,
        isFetching: isBatchesFetching
    } = useGetCourseBatchesQuery(selectedCourseEncryptedId, {
        skip: !selectedCourseEncryptedId,
        refetchOnMountOrArgChange: false,
    });

    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            image: "",
            course_id: null,
            batch_id: null,
            father_name: "",
            mother_name: "",
            gender: "male",
            mobile: "",
            address: "",
            ssc_result: "",
            hsc_result: "",
            total_amount: "",
            status: 1,
        },
    });

    const formValues = watch();

    // Initialize form with existing data when selectedData changes
    useEffect(() => {
        if (data) {

            setValue("name", data.name || "");
            setValue("image", data.image || "");
            setValue("course_id", data.course?.id || null);
            setValue("batch_id", data.batch?.id || null);
            setValue("father_name", data.father_name || "");
            setValue("mother_name", data.mother_name || "");
            setValue("gender", data.gender || "male");
            setValue("mobile", data.mobile || "");
            setValue("address", data.address || "");
            setValue("ssc_result", data.ssc_result || "");
            setValue("hsc_result", data.hsc_result || "");
            setValue("total_amount", data.total_amount || "");
            setValue("status", data.status ?? 1);

            // Set image preview if image exists
            if (data.image) {
                setImagePreview(data.image);
            }

            // Set initial encrypted course ID if course exists
            if (data.course?.encrypted_id) {
                setSelectedCourseEncryptedId(data.course.encrypted_id);
            }
        }
    }, [selectedData, setValue]);

    // Dummy image upload handler - simulates upload process
    const handleImageUpload = async (file) => {
        if (!file) return;

        setIsUploading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // Create a dummy URL for the uploaded image
            const dummyImageUrl = URL.createObjectURL(file);

            // For demo purposes, we'll use a placeholder URL that includes the filename
            const demoImageUrl = `https://example.com/students/${file.name.replace(/\s+/g, '-').toLowerCase()}`;

            setValue('image', demoImageUrl);
            setImagePreview(dummyImageUrl);
            successNotify('Image uploaded successfully! (Demo)');
        } catch (error) {
            errorNotify('Failed to process image');
            console.error('Image processing error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                errorNotify('Please select a valid image file (JPEG, PNG, JPG, GIF, WEBP)');
                return;
            }

            if (file.size > maxSize) {
                errorNotify('Image size should be less than 5MB');
                return;
            }

            handleImageUpload(file);
        }
    };

    // Manual URL input handler
    const handleManualUrlInput = (url) => {
        if (url) {
            setValue('image', url);
            setImagePreview(url);
            successNotify('Image URL set successfully!');
        }
    };

    // Update selected course encrypted_id when course changes
    useEffect(() => {
        const currentCourseId = formValues.course_id;

        if (currentCourseId && courseOptions.length > 0) {
            const selectedCourse = courseOptions.find(course => course.value === currentCourseId);
            const newEncryptedId = selectedCourse?.encrypted_id || null;

            if (newEncryptedId && newEncryptedId !== selectedCourseEncryptedId) {
                setSelectedCourseEncryptedId(newEncryptedId);
                // Reset batch selection when course changes (but not on initial load)
                if (selectedCourseEncryptedId !== null) {
                    setValue("batch_id", null, { shouldValidate: false });
                }
            }
        } else if (!currentCourseId && selectedCourseEncryptedId !== null) {
            setSelectedCourseEncryptedId(null);
            setValue("batch_id", null, { shouldValidate: false });
        }
    }, [formValues.course_id, courseOptions, selectedCourseEncryptedId, setValue]);

    // Process batches data when available
    useEffect(() => {
        if (!selectedCourseEncryptedId) {
            setBatchesOptions([]);
            return;
        }

        if (batchesData?.success && batchesData?.data?.batches) {
            const newOptions = batchesData.data.batches.map(batch => ({
                value: batch.id,
                label: batch.title || batch.name || `Batch ${batch.id}`,
            }));

            setBatchesOptions(prevOptions => {
                // Only update if options have actually changed
                const optionsChanged = JSON.stringify(prevOptions) !== JSON.stringify(newOptions);
                return optionsChanged ? newOptions : prevOptions;
            });
        } else if (batchesData?.success) {
            // API returned success but no batches
            setBatchesOptions([]);
        }

        // Handle errors
        if (batchesError) {
            console.error("Error fetching batches:", batchesError);
            setBatchesOptions([]);
            errorNotify("Failed to load batches for this course");
        }
    }, [selectedCourseEncryptedId, batchesData, batchesError]);

    const isActionBtnDisabled =
        !formValues.name || !formValues.course_id || !formValues.batch_id || !formValues.mobile;

    const handleCloseEditStudentModal = () => {
        reset();
        setSelectedCourseEncryptedId(null);
        setBatchesOptions([]);
        setImagePreview("");
        setIsUploading(false);
        dispatch(setEditStudentModal(false));
    };

    const handleEditStudent = (data) => {
        if (selectedData?.type !== SelectedSliceTypeEnum.UPDATE) {
            return errorNotify("Invalid student type.");
        }

        const validatedData = validateZodSchema({ schema: CreateStudentSchema, data });
        if (!validatedData) return;

        updateStudent({ data: validatedData, studentId: selectedData?.encrypted_id })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditStudentModal();
                    dispatch(updateStudentInList(response?.data.student));
                    successNotify(response?.message || "Student updated successfully");
                }
            })
            .catch((err) => {
                const errorMessage = err?.data?.message || "Something went wrong!";
                errorNotify(errorMessage);
            });
    };

    return {
        isEditModalOpen,
        handleCloseEditStudentModal,
        isLoading: isLoading || isCoursesLoading,
        control,
        handleSubmit,
        isActionBtnDisabled,
        handleEditStudent,
        courseOptions,
        batchesOptions,
        handleImageUpload,
        formValues,
        isBatchesLoading: isBatchesLoading || isBatchesFetching,
        selectedCourseEncryptedId,
        isUploading,
        imagePreview,
        handleFileSelect,
        handleManualUrlInput,
    };
};