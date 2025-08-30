import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
    addNewReviewToList,
    viewReviewFromList,
    setAddReviewModal,
    setEditReviewModal,
    setSelectedReviewData,
    setReviewConfirmationModal,
    setReviewMetaData,
    updateReviewInList,
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetAllReviewsQuery,
    useUpdateReviewMutation,
} from "../redux-rtk/review";
import { useDebouncedSearch } from "./useDebounce";

// ** Review List **
export const useReviews = () => {
    const dispatch = useDispatch();
    const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
        (state) => state.review
    );
    const { current_page, per_page } = meta || {};

    const [searchKeyword, setSearchKeyword] = useState("");
    const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

    const [deleteReview, { isLoading: deleteLoading }] = useDeleteReviewMutation();
    const { isLoading, isFetching, isError, error } = useGetAllReviewsQuery(
        { page: current_page, limit: per_page, search: debouncedSearch },
        { refetchOnMountOrArgChange: false }
    );

    const updatePageMeta = (value) => dispatch(setReviewMetaData(value));
    const handleSetSelectedReview = (data) => dispatch(setSelectedReviewData(data));

    const handleOpenAddReviewModal = () => dispatch(setAddReviewModal(true));
    const handleOpenEditReviewModal = () => dispatch(setEditReviewModal(true));

    const handleOpenConfirmationModal = () => dispatch(setReviewConfirmationModal(true));
    const handleCloseConfirmationModal = () => {
        dispatch(setReviewConfirmationModal(false));
        dispatch(setSelectedReviewData(null));
    };

    const handleDelete = ({ reviewId }) => {
        if (!reviewId) return errorNotify("Review ID is required.");

        deleteReview({ reviewId })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseConfirmationModal();
                    dispatch(viewReviewFromList({ id: reviewId }));
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
        handleSetSelectedReview,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
        handleOpenAddReviewModal,
        handleOpenEditReviewModal,
    };
};

// ** Add Review Modal **
export const useAddReview = () => {
    const dispatch = useDispatch();
    const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
    const { isAddModalOpen } = useSelector((state) => state.review);

    const [imagePreview, setImagePreview] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            name: "",
            year: "",
            rank: "",
            description: "",
            img: "",
        },
        mode: "onChange",
    });

    const watchedFields = watch();

    const handleCloseAddReviewModal = () => {
        dispatch(setAddReviewModal(false));
        setImagePreview("");
        setImagePreviewUrl("");
        // Clean up object URL to prevent memory leaks
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        reset();
    };

    const handleFileSelect = (files) => {
        if (files && files[0]) {
            const file = files[0];
            setIsUploading(true);
            
            try {
                setValue("img", file);
                setImagePreview(file.name);
                
                // Clean up previous preview URL
                if (imagePreviewUrl) {
                    URL.revokeObjectURL(imagePreviewUrl);
                }
                
                // Create new preview URL for image display
                const previewUrl = URL.createObjectURL(file);
                setImagePreviewUrl(previewUrl);
                successNotify("Image selected successfully!");
            } catch (error) {
                errorNotify("Failed to process image");
                console.error("Image processing error:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const isFormValid = () => {
        return (
            watchedFields.name?.trim() &&
            watchedFields.year?.trim() &&
            watchedFields.rank?.trim() &&
            watchedFields.description?.trim()
        );
    };

    const handleAddReview = (data) => {
        if (!isFormValid()) {
            errorNotify("Please fill all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("year", data.year);
        formData.append("rank", data.rank);
        formData.append("description", data.description);
        
        if (data.img && data.img instanceof File) {
            formData.append("img", data.img);
        }

        addReview({ data: formData })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseAddReviewModal();
                    // Manual Redux update since we viewd cache invalidation
                    dispatch(addNewReviewToList(response));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message || "Failed to add review");
                console.error(err);
            });
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: isAdding,
        isAddModalOpen,
        handleCloseAddReviewModal,
        handleAddReview,
        isActionBtnDisabled: !isValid || !isFormValid(),
        imagePreview,
        imagePreviewUrl,
        isUploading,
        handleFileSelect,
    };
};

// ** Edit Review Modal **
export const useEditReview = () => {
    const dispatch = useDispatch();
    const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
    const { isEditModalOpen, selectedData } = useSelector((state) => state.review);

    const [imagePreview, setImagePreview] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            name: "",
            year: "",
            rank: "",
            description: "",
            img: "",
        },
        mode: "onChange",
    });

    const watchedFields = watch();

    useEffect(() => {
        if (selectedData && isEditModalOpen) {
            setValue("name", selectedData.name || "");
            setValue("year", selectedData.year || "");
            setValue("rank", selectedData.rank || "");
            setValue("description", selectedData.description || "");
            setValue("img", ""); // Reset file input
            setImagePreview(""); // Reset preview
            setImagePreviewUrl(""); // Reset preview URL
        }
    }, [selectedData, isEditModalOpen, setValue]);

    const handleCloseEditReviewModal = () => {
        dispatch(setEditReviewModal(false));
        dispatch(setSelectedReviewData(null));
        setImagePreview("");
        setImagePreviewUrl("");
        // Clean up object URL to prevent memory leaks
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        reset();
    };

    const handleFileSelect = (files) => {
        if (files && files[0]) {
            const file = files[0];
            setIsUploading(true);
            
            try {
                setValue("img", file);
                setImagePreview(file.name);
                
                // Clean up previous preview URL
                if (imagePreviewUrl) {
                    URL.revokeObjectURL(imagePreviewUrl);
                }
                
                // Create new preview URL for image display
                const previewUrl = URL.createObjectURL(file);
                setImagePreviewUrl(previewUrl);
                successNotify("Image selected successfully!");
            } catch (error) {
                errorNotify("Failed to process image");
                console.error("Image processing error:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const isFormValid = () => {
        return (
            watchedFields.name?.trim() &&
            watchedFields.year?.trim() &&
            watchedFields.rank?.trim() &&
            watchedFields.description?.trim()
        );
    };

    const handleUpdateReview = (data) => {
        if (!isFormValid()) {
            errorNotify("Please fill all required fields");
            return;
        }

        if (!selectedData?.encrypted_id) {
            errorNotify("Review ID is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("year", data.year);
        formData.append("rank", data.rank);
        formData.append("description", data.description);
        
        if (data.img && data.img instanceof File) {
            formData.append("img", data.img);
        }

        updateReview({ 
            data: formData, 
            reviewId: selectedData.encrypted_id 
        })
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    handleCloseEditReviewModal();
                    // Manual Redux update since we viewd cache invalidation
                    dispatch(updateReviewInList(response));
                    successNotify(response?.message);
                }
            })
            .catch((err) => {
                errorNotify(err?.data?.message || "Failed to update review");
                console.error(err);
            });
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: isUpdating,
        isEditModalOpen,
        selectedData,
        handleCloseEditReviewModal,
        handleUpdateReview,
        isActionBtnDisabled: !isValid || !isFormValid(),
        imagePreview,
        imagePreviewUrl,
        isUploading,
        handleFileSelect,
    };
};
