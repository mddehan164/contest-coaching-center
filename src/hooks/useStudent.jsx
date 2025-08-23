import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
    addNewStudentToList,
    removeStudentFromList,
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
// import { CreateStudentSchema, EditStudentSchema, validateZodSchema } from "@utils/validations";
import { useDebouncedSearch } from "./useDebounce";
import { useGetAllCoursesQuery } from "../redux-rtk/course";

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
        { refetchOnMountOrArgChange: true }
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
                    dispatch(removeStudentFromList({ id: studentId }));
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

    const handleCloseAddStudentModal = () => {
        reset();
        dispatch(setAddStudentModal(false));
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

    const handleAddStudent = (data) => {
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

        const validatedData = validateZodSchema({ schema: CreateStudentSchema, data: safeData });
        if (!validatedData) return;

        addStudent({ data: validatedData })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseAddStudentModal();
                    dispatch(addNewStudentToList(response.data));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message || "Something went wrong!");
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
        isCoursesLoading,
        getStartDateDisabled,
        getEndDateDisabled,
        formValues,
    };
};

// ** Edit Student Modal **
export const useEditStudent = ({ data }) => {
    const dispatch = useDispatch();
    const [updateStudent, { isLoading }] = useUpdateStudentMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.student);

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

    const handleCloseEditStudentModal = () => {
        reset();
        dispatch(setEditStudentModal(false));
    };
    const handleOpenConfirmationModal = () => dispatch(setStudentConfirmationModal(true));

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
            return errorNotify("Invalid student type.");

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

        const validatedData = validateZodSchema({ schema: EditStudentSchema, data: safeData });
        if (!validatedData) return;

        updateStudent({ data: validatedData, studentId: selectedData?.id })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditStudentModal();
                    handleOpenConfirmationModal();
                    dispatch(updateStudentInList({ ...response?.data, id: selectedData?.id }));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message);
            });
    };

    return {
        isEditModalOpen,
        handleCloseEditStudentModal,
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