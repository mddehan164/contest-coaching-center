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

    const handleCloseAddTeacherModal = () => {
        reset();
        setSelectedCourseEncryptedId(null);
        setBatchesOptions([]);
        dispatch(setAddTeacherModal(false));
    };

    // Handle file upload with better error handling
    const handleImageUpload = async (file) => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const res = await fetch("/api/upload", { 
                method: "POST", 
                body: formData 
            });
            
            if (!res.ok) {
                throw new Error(`Upload failed with status: ${res.status}`);
            }
            
            const data = await res.json();
            if (data?.url) {
                setValue("image", data.url);
                successNotify("Image uploaded successfully");
            } else {
                throw new Error("No URL returned from upload");
            }
        } catch (err) {
            console.error("Image upload failed:", err);
            errorNotify("Image upload failed. Please try again.");
        }
    };

    const handleAddTeacher = (data) => {
        const validatedData = validateZodSchema({ schema: CreateTeacherSchema, data });
        if (!validatedData) return;

        addTeacher({ data: validatedData })
            .unwrap()
            .then(response => {
                if (response?.success) {
                    handleCloseAddTeacherModal();
                    dispatch(addNewTeacherToList(response.data));
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
        handleImageUpload,
        formValues,
        isBatchesLoading: isBatchesLoading || isBatchesFetching,
        selectedCourseEncryptedId,
    };
};


// ** Edit Teacher Modal **
export const useEditTeacher = () => {
    const dispatch = useDispatch();
    const [updateTeacher, { isLoading }] = useUpdateTeacherMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.teacher);

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
        if (selectedData?.data) {
            const data = selectedData.data;
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

            // Set initial encrypted course ID if course exists
            if (data.course?.encrypted_id) {
                setSelectedCourseEncryptedId(data.course.encrypted_id);
            }
        }
    }, [selectedData, setValue]);

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

    const handleCloseEditTeacherModal = () => {
        reset();
        setSelectedCourseEncryptedId(null);
        setBatchesOptions([]);
        dispatch(setEditTeacherModal(false));
    };

    // Handle file upload with better error handling
    const handleImageUpload = async (file) => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const res = await fetch("/api/upload", { 
                method: "POST", 
                body: formData 
            });
            
            if (!res.ok) {
                throw new Error(`Upload failed with status: ${res.status}`);
            }
            
            const data = await res.json();
            if (data?.url) {
                setValue("image", data.url);
                successNotify("Image uploaded successfully");
            } else {
                throw new Error("No URL returned from upload");
            }
        } catch (err) {
            console.error("Image upload failed:", err);
            errorNotify("Image upload failed. Please try again.");
        }
    };

    const handleEditTeacher = (data) => {
        if (selectedData?.type !== SelectedSliceTypeEnum.UPDATE) {
            return errorNotify("Invalid teacher type.");
        }

        const validatedData = validateZodSchema({ schema: EditTeacherSchema, data });
        if (!validatedData) return;

        updateTeacher({ data: validatedData, teacherId: selectedData?.encrypted_id })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditTeacherModal();
                    dispatch(updateTeacherInList(response?.data));
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
        handleImageUpload,
        formValues,
        isBatchesLoading: isBatchesLoading || isBatchesFetching,
        selectedCourseEncryptedId,
    };
};