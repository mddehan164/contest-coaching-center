import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
    addNewBatchToList,
    removeBatchFromList,
    setAddBatchModal,
    setEditBatchModal,
    setSelectedBatchData,
    setBatchConfirmationModal,
    setBatchMetaData,
    updateBatchInList,
    useAddBatchMutation,
    useDeleteBatchMutation,
    useGetAllBatchsQuery,
    useUpdateBatchMutation,
} from "../redux-rtk/batch";
import { CreateBatchSchema, EditBatchSchema, validateZodSchema } from "@utils/validations";
import { useDebouncedSearch } from "./useDebounce";
import { useGetAllCoursesQuery, useGetCourseBatchesQuery } from "../redux-rtk/course";

// ** Batch List **
export const useBatchs = () => {
    const dispatch = useDispatch();
    const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
        (state) => state.batch
    );
    const { currentPage, pageSize } = meta || {};

    const [searchKeyword, setSearchKeyword] = useState("");
    const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

    const [deleteBatch, { isLoading: deleteLoading }] = useDeleteBatchMutation();
    const { isLoading, isFetching, isError, error } = useGetAllBatchsQuery(
        { page: currentPage, limit: pageSize, search: debouncedSearch },
        { refetchOnMountOrArgChange: false }
    );

    const updatePageMeta = (value) => dispatch(setBatchMetaData(value));
    const handleSetSelectedBatch = (data) => dispatch(setSelectedBatchData(data));

    const handleOpenAddBatchModal = () => dispatch(setAddBatchModal(true));
    const handleOpenEditBatchModal = () => dispatch(setEditBatchModal(true));

    const handleOpenConfirmationModal = () => dispatch(setBatchConfirmationModal(true));
    const handleCloseConfirmationModal = () => {
        dispatch(setBatchConfirmationModal(false));
        dispatch(setSelectedBatchData(null));
    };

    const handleDelete = ({ batchId }) => {
        if (!batchId) return errorNotify("Batch ID is required.");

        deleteBatch({ batchId })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseConfirmationModal();
                    dispatch(removeBatchFromList({ id: batchId }));
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
        handleSetSelectedBatch,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
        handleOpenAddBatchModal,
        handleOpenEditBatchModal,
    };
};

// ** Add Batch Modal **
export const useAddBatch = () => {
    const dispatch = useDispatch();
    const [addBatch, { isLoading: isAdding }] = useAddBatchMutation();
    const { isAddModalOpen } = useSelector((state) => state.batch);

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

    const handleCloseAddBatchModal = () => {
        reset();
        dispatch(setAddBatchModal(false));
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

    const handleAddBatch = (data) => {
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

        const validatedData = validateZodSchema({ schema: CreateBatchSchema, data: safeData });
        if (!validatedData) return;

        addBatch({ data: validatedData })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseAddBatchModal();
                    dispatch(addNewBatchToList(response.data));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message || "Something went wrong!");
            });
    };

    return {
        isAddModalOpen,
        handleCloseAddBatchModal,
        isLoading: isAdding || isCoursesLoading,
        control,
        handleSubmit,
        isActionBtnDisabled,
        handleAddBatch,
        courseOptions,
        isCoursesLoading,
        getStartDateDisabled,
        getEndDateDisabled,
        formValues,
    };
};

// ** Edit Batch Modal **
export const useEditBatch = ({ data }) => {
    const dispatch = useDispatch();
    const [updateBatch, { isLoading }] = useUpdateBatchMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.batch);

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

    const handleCloseEditBatchModal = () => {
        reset();
        dispatch(setEditBatchModal(false));
    };
    const handleOpenConfirmationModal = () => dispatch(setBatchConfirmationModal(true));

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
            return errorNotify("Invalid batch type.");

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

        const validatedData = validateZodSchema({ schema: EditBatchSchema, data: safeData });
        if (!validatedData) return;

        // FIX: Use selectedData.encrypted_id instead of selectedData.course.encrypted_id
        updateBatch({ data: validatedData, batchId: selectedData?.encrypted_id })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditBatchModal();
                    // Remove this line as it's likely causing issues
                    // handleOpenConfirmationModal();
                    console.log({...response?.data}, selectedData);
                    dispatch(updateBatchInList(response?.data));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message);
            });
    };

    return {
        isEditModalOpen,
        handleCloseEditBatchModal,
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