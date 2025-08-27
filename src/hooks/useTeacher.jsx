import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
    addNewTeacherToList,
    removeTeacherFromList,
    setAddTeacherModal,
    setEditTeacherModal,
    setSelectedTeacherData,
    setTeacherConfirmationModal,
    setTeacherMetaData,
    updateTeacherInList,
    useAddTeacherMutation,
    useDeleteTeacherMutation,
    useGetAllTeachersQuery,
    useUpdateTeacherMutation,
} from "../redux-rtk/teacher";
import { CreateTeacherSchema, EditTeacherSchema, validateZodSchema } from "@utils/validations";
import { useDebouncedSearch } from "./useDebounce";
import { useGetAllCoursesQuery, useGetCourseBatchesQuery } from "../redux-rtk/course";

// ** Teacher List **
export const useTeachers = () => {
    const dispatch = useDispatch();
    const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
        (state) => state.teacher
    );
    const { currentPage, pageSize } = meta || {};

    const [searchKeyword, setSearchKeyword] = useState("");
    const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

    const [deleteTeacher, { isLoading: deleteLoading }] = useDeleteTeacherMutation();
    const { isLoading, isFetching, isError, error } = useGetAllTeachersQuery(
        { page: currentPage, limit: pageSize, search: debouncedSearch },
        { refetchOnMountOrArgChange: true }
    );

    const updatePageMeta = (value) => dispatch(setTeacherMetaData(value));
    const handleSetSelectedTeacher = (data) => dispatch(setSelectedTeacherData(data));

    const handleOpenAddTeacherModal = () => dispatch(setAddTeacherModal(true));
    const handleOpenEditTeacherModal = () => dispatch(setEditTeacherModal(true));

    const handleOpenConfirmationModal = () => dispatch(setTeacherConfirmationModal(true));
    const handleCloseConfirmationModal = () => {
        dispatch(setTeacherConfirmationModal(false));
        dispatch(setSelectedTeacherData(null));
    };

    const handleDelete = ({ teacherId }) => {
        if (!teacherId) return errorNotify("Teacher ID is required.");

        deleteTeacher({ teacherId })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseConfirmationModal();
                    dispatch(removeTeacherFromList({ id: teacherId }));
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
        handleSetSelectedTeacher,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
        handleOpenAddTeacherModal,
        handleOpenEditTeacherModal,
    };
};




// ** Add Teacher Modal **
export const useAddTeacher = () => {
    const dispatch = useDispatch();
    const [addTeacher, { isLoading: isAdding }] = useAddTeacherMutation();
    const { isAddModalOpen } = useSelector((state) => state.teacher);
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

    // Memoize course options
    const courseOptions = useMemo(() => {
        return coursesData?.data?.courses?.map(course => ({
            value: course.id,
            label: course.title,
            encrypted_id: course.encrypted_id
        })) || [];
    }, [coursesData?.data?.courses]);

    // Fetch batches for selected course
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
            subject: "",
            gender: "male",
            mobile: "",
            address: "",
            image: "",
            course_id: null,
            batch_id: null,
            status: 1,
        },
    });

    const formValues = watch();

    // Handle image upload
    const handleImageUpload = async (file) => {
        if (!file) return;

        setIsUploading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const dummyImageUrl = URL.createObjectURL(file);
            const demoImageUrl = `https://example.com/teachers/${file.name.replace(/\s+/g, '-').toLowerCase()}`;

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
                const optionsChanged = JSON.stringify(prevOptions) !== JSON.stringify(newOptions);
                return optionsChanged ? newOptions : prevOptions;
            });
        } else if (batchesData?.success) {
            setBatchesOptions([]);
        }

        if (batchesError) {
            console.error("Error fetching batches:", batchesError);
            setBatchesOptions([]);
            errorNotify("Failed to load batches for this course");
        }
    }, [selectedCourseEncryptedId, batchesData, batchesError]);

    const isActionBtnDisabled =
        !formValues.name || !formValues.subject || !formValues.course_id ||
        !formValues.batch_id || !formValues.mobile;

    const handleCloseAddTeacherModal = () => {
        reset();
        setSelectedCourseEncryptedId(null);
        setBatchesOptions([]);
        dispatch(setAddTeacherModal(false));
    };

    const handleAddTeacher = (data) => {
        const processedData = {
            ...data,
            course_id: Number(data.course_id),
            batch_id: Number(data.batch_id),
            status: Number(data.status) || 0,
        };

        const validatedData = validateZodSchema({ schema: CreateTeacherSchema, data: processedData });

        if (!validatedData) return;

        addTeacher({ data: validatedData })
            .unwrap()
            .then(response => {
                if (response?.success) {
                    handleCloseAddTeacherModal();
                    dispatch(addNewTeacherToList(response.data.teacher));
                    successNotify(response?.message || "Teacher added successfully");
                }
            })
            .catch(err => {
                const errorMessage = err?.data?.message || "Something went wrong!";
                errorNotify(errorMessage);
            });
    };

    return {
        isAddModalOpen,
        handleCloseAddTeacherModal,
        isLoading: isAdding || isCoursesLoading,
        control,
        handleSubmit,
        isActionBtnDisabled,
        handleAddTeacher,
        courseOptions,
        batchesOptions,
        formValues,
        isBatchesLoading: isBatchesLoading || isBatchesFetching,
        isUploading,
        imagePreview,
        handleFileSelect,
        handleManualUrlInput,
    };
};


// ** Edit Teacher Modal **
export const useEditTeacher = ({ data }) => {
    const dispatch = useDispatch();
    const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.teacher);
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

    // Memoize course options
    const courseOptions = useMemo(() => {
        return coursesData?.data?.courses?.map(course => ({
            value: course.id,
            label: course.title,
            encrypted_id: course.encrypted_id
        })) || [];
    }, [coursesData?.data?.courses]);

    // Fetch batches for selected course
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
            subject: "",
            gender: "male",
            mobile: "",
            address: "",
            image: "",
            course_id: null,
            batch_id: null,
            status: 1,
        },
    });

    const formValues = watch();

    // Initialize form with existing data when data changes
    useEffect(() => {
        if (data) {
            setValue("name", data.name || "");
            setValue("subject", data.subject || "");
            setValue("image", data.image || "");
            setValue("course_id", data.course?.id || null);
            setValue("batch_id", data.batch?.id || null);
            setValue("gender", data.gender || "male");
            setValue("mobile", data.mobile || "");
            setValue("address", data.address || "");
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
    }, [data, setValue]);

    // Handle image upload
    const handleImageUpload = async (file) => {
        if (!file) return;

        setIsUploading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const dummyImageUrl = URL.createObjectURL(file);
            const demoImageUrl = `https://example.com/teachers/${file.name.replace(/\s+/g, '-').toLowerCase()}`;

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
                const optionsChanged = JSON.stringify(prevOptions) !== JSON.stringify(newOptions);
                return optionsChanged ? newOptions : prevOptions;
            });
        } else if (batchesData?.success) {
            setBatchesOptions([]);
        }

        if (batchesError) {
            console.error("Error fetching batches:", batchesError);
            setBatchesOptions([]);
            errorNotify("Failed to load batches for this course");
        }
    }, [selectedCourseEncryptedId, batchesData, batchesError]);

    const isActionBtnDisabled =
        !formValues.name || !formValues.subject || !formValues.course_id ||
        !formValues.batch_id || !formValues.mobile;

    const handleCloseEditTeacherModal = () => {
        reset();
        setSelectedCourseEncryptedId(null);
        setBatchesOptions([]);
        setImagePreview("");
        setIsUploading(false);
        dispatch(setEditTeacherModal(false));
    };

    const handleEditTeacher = (formData) => {
        if (!data?.encrypted_id) {
            return errorNotify("Invalid teacher ID.");
        }

        const processedData = {
            ...formData,
            course_id: Number(formData.course_id),
            batch_id: Number(formData.batch_id),
            status: Number(formData.status) || 0,
        };

        const validatedData = validateZodSchema({ schema: EditTeacherSchema, data: processedData });

        if (!validatedData) return;

        updateTeacher({
            teacherId: data.encrypted_id,
            data: validatedData
        })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditTeacherModal();
                    dispatch(updateTeacherInList(response?.data.teacher));
                    successNotify(response?.message || "Teacher updated successfully");
                }
            })
            .catch((err) => {
                const errorMessage = err?.data?.message || "Something went wrong!";
                errorNotify(errorMessage);
            });
    };

    return {
        isEditModalOpen,
        handleCloseEditTeacherModal,
        isLoading: isLoading || isCoursesLoading,
        control,
        handleSubmit,
        isActionBtnDisabled,
        handleEditTeacher,
        courseOptions,
        batchesOptions,
        formValues,
        isBatchesLoading: isBatchesLoading || isBatchesFetching,
        isUploading,
        imagePreview,
        handleFileSelect,
        handleManualUrlInput,
    };
};