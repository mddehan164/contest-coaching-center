import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
    addNewCourseToList,
    removeCourseFromList,
    setAddCourseModal,
    setEditCourseModal,
    setSelectedCourseData,
    setCourseConfirmationModal,
    setCourseMetaData,
    updateCourseInList,
    useAddCourseMutation,
    useDeleteCourseMutation,
    useGetAllCoursesQuery,
    useUpdateCourseMutation,
    useGetCourseBatchesQuery
} from "../redux-rtk/course";
import { CreateCourseSchema, EditCourseSchema, validateZodSchema } from "@utils/validations";
import { useDebouncedSearch } from "./useDebounce";

// ** Course List **
export const useCourses = () => {
    const dispatch = useDispatch();
    const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
        (state) => state.course
    );
    const { currentPage, pageSize } = meta || {};

    const [searchKeyword, setSearchKeyword] = useState("");
    const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

    const [deleteCourse, { isLoading: deleteLoading }] = useDeleteCourseMutation();
    const { isLoading, isFetching, isError, error } = useGetAllCoursesQuery(
        { page: currentPage, limit: pageSize, search: debouncedSearch },
        { refetchOnMountOrArgChange: true }
    );

    const updatePageMeta = (value) => dispatch(setCourseMetaData(value));
    const handleSetSelectedCourse = (data) => dispatch(setSelectedCourseData(data));

    const handleOpenAddCourseModal = () => dispatch(setAddCourseModal(true));
    const handleOpenEditCourseModal = () => dispatch(setEditCourseModal(true));

    const handleOpenConfirmationModal = () => dispatch(setCourseConfirmationModal(true));
    const handleCloseConfirmationModal = () => {
        dispatch(setCourseConfirmationModal(false));
        dispatch(setSelectedCourseData(null));
    };

    const handleDelete = ({ courseId }) => {
        if (!courseId) return errorNotify("Course ID is required.");

        deleteCourse({ courseId })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseConfirmationModal();
                    dispatch(removeCourseFromList({ id: courseId }));
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
        handleSetSelectedCourse,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
        handleOpenAddCourseModal,
        handleOpenEditCourseModal,
    };
};

// ** Add Course Modal **
export const useAddCourse = () => {
    const dispatch = useDispatch();
    const [addCourse, { isLoading: isAdding }] = useAddCourseMutation();
    const { isAddModalOpen } = useSelector((state) => state.course);

    const { data: coursesData, isLoading: isCoursesLoading } = useGetAllCoursesQuery({
        page: 1,
        limit: 100
    });

    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            course_id: null,
            start_date: "",
            end_date: "",
            status: 1,
        },
    });

    const formValues = watch();
    const isActionBtnDisabled =
        !formValues.name || !formValues.course_id || !formValues.start_date || !formValues.end_date;

    const handleCloseAddCourseModal = () => {
        reset();
        dispatch(setAddCourseModal(false));
    };

    const courseOptions = coursesData?.data?.courses?.map(course => ({
        value: course.id,
        label: course.title,
    })) || [];

    const getStartDateDisabled = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return { before: today };
    };

    const getEndDateDisabled = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (formValues.start_date) {
            const startDate = new Date(formValues.start_date);
            startDate.setHours(0, 0, 0, 0);
            return { before: startDate };
        }

        return { before: today };
    };

    const handleAddCourse = (data) => {
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (startDate < today) {
            errorNotify("Start date cannot be before today's date.");
            return;
        }

        if (endDate < startDate) {
            errorNotify("End date cannot be before start date.");
            return;
        }

        const safeData = {
            ...data,
            start_date: data.start_date ? data.start_date.toISOString().split("T")[0] : "",
            end_date: data.end_date ? data.end_date.toISOString().split("T")[0] : "",
        };

        const validatedData = validateZodSchema({ schema: CreateCourseSchema, data: safeData });
        if (!validatedData) return;

        addCourse({ data: validatedData })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseAddCourseModal();
                    dispatch(addNewCourseToList(response.data));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message || "Something went wrong!");
            });
    };

    return {
        isAddModalOpen,
        handleCloseAddCourseModal,
        isLoading: isAdding || isCoursesLoading,
        control,
        handleSubmit,
        isActionBtnDisabled,
        handleAddCourse,
        courseOptions,
        isCoursesLoading,
        getStartDateDisabled,
        getEndDateDisabled,
        formValues,
    };
};

// ** Edit Course Modal **
export const useEditCourse = ({ data }) => {
    const dispatch = useDispatch();
    const [updateCourse, { isLoading }] = useUpdateCourseMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.course);

    const { control, handleSubmit, reset, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            course_id: null,
            start_date: "",
            end_date: "",
            status: 1,
        },
    });

    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("course_id", data.course?.id || null);
            setValue("start_date", data.start_date ? new Date(data.start_date) : null);
            setValue("end_date", data.end_date ? new Date(data.end_date) : null);
            setValue("status", data.status);
        }
    }, [data, setValue]);

    const formValues = watch();
    const isActionBtnDisabled =
        !formValues.name || !formValues.course_id || !formValues.start_date || !formValues.end_date;

    const handleCloseEditCourseModal = () => {
        reset();
        dispatch(setEditCourseModal(false));
    };
    const handleOpenConfirmationModal = () => dispatch(setCourseConfirmationModal(true));

    const getStartDateDisabled = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return { before: today };
    };

    const getEndDateDisabled = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (formValues.start_date) {
            const startDate = new Date(formValues.start_date);
            startDate.setHours(0, 0, 0, 0);
            return { before: startDate };
        }

        return { before: today };
    };

    const handleUpdate = (data) => {
        if (selectedData?.type !== SelectedSliceTypeEnum.UPDATE)
            return errorNotify("Invalid course type.");

        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (startDate < today) {
            errorNotify("Start date cannot be before today's date.");
            return;
        }

        if (endDate < startDate) {
            errorNotify("End date cannot be before start date.");
            return;
        }

        const safeData = {
            ...data,
            start_date: data.start_date ? data.start_date.toISOString().split("T")[0] : "",
            end_date: data.end_date ? data.end_date.toISOString().split("T")[0] : "",
        };

        const validatedData = validateZodSchema({ schema: EditCourseSchema, data: safeData });
        if (!validatedData) return;

        // FIX: Use selectedData.encrypted_id instead of selectedData.course.encrypted_id
        updateCourse({ data: validatedData, courseId: selectedData?.encrypted_id })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditCourseModal();
                    // Remove this line as it's likely causing issues
                    // handleOpenConfirmationModal();
                    console.log({...response?.data}, selectedData);
                    dispatch(updateCourseInList(response?.data));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message);
            });
    };

    return {
        isEditModalOpen,
        handleCloseEditCourseModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleUpdate,
        handleSubmit,
        getStartDateDisabled,
        getEndDateDisabled,
        formValues,
    };
};