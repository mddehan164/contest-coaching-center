import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
  addNewNoticeToList,
  removeNoticeFromList,
  setAddNoticeModal,
  setEditNoticeModal,
  setSelectedNoticeData,
  setNoticeConfirmationModal,
  setNoticeMetaData,
  updateNoticeInList,
  useAddNoticeMutation,
  useDeleteNoticeMutation,
  useGetAllNoticesQuery,
  useUpdateNoticeMutation,
  useGetNoticeBatchesQuery,
  useGetBranchesQuery,
} from "../redux-rtk/notice";
import {
  CreateNoticeSchema,
  EditNoticeSchema,
  validateZodSchema,
} from "@utils/validations";
import { useDebouncedSearch } from "./useDebounce";

// ** Notice List **
export const useNotices = () => {
  const dispatch = useDispatch();
  const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
    (state) => state.notice
  );
  const { currentPage, pageSize } = meta || {};

  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

  const [deleteNotice, { isLoading: deleteLoading }] =
    useDeleteNoticeMutation();
  const { isLoading, isFetching, isError, error } = useGetAllNoticesQuery(
    { page: currentPage, limit: pageSize, search: debouncedSearch },
    { refetchOnMountOrArgChange: true }
  );

  const updatePageMeta = (value) => dispatch(setNoticeMetaData(value));
  const handleSetSelectedNotice = (data) =>
    dispatch(setSelectedNoticeData(data));

  const handleOpenAddNoticeModal = () => dispatch(setAddNoticeModal(true));
  const handleOpenEditNoticeModal = () => dispatch(setEditNoticeModal(true));

  const handleOpenConfirmationModal = () =>
    dispatch(setNoticeConfirmationModal(true));
  const handleCloseConfirmationModal = () => {
    dispatch(setNoticeConfirmationModal(false));
    dispatch(setSelectedNoticeData(null));
  };

  const handleDelete = ({ noticeId }) => {
    if (!noticeId) return errorNotify("Notice ID is required.");

    deleteNotice({ noticeId })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          handleCloseConfirmationModal();
          dispatch(removeNoticeFromList({ id: noticeId }));
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
    handleSetSelectedNotice,
    isConfirmModalOpen,
    handleOpenConfirmationModal,
    handleCloseConfirmationModal,
    handleOpenAddNoticeModal,
    handleOpenEditNoticeModal,
  };
};

// ** Add Notice Modal **
export const useAddNotice = () => {
  const dispatch = useDispatch();
  const [addNotice, { isLoading: isAdding }] = useAddNoticeMutation();
  const { isAddModalOpen } = useSelector((state) => state.notice);

  // Fetch branches from API
  const { data: branchesData, isLoading: isBranchesLoading } =
    useGetBranchesQuery();

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const getStartDateDisabled = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return { before: today };
  };

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      type: null,
      date: "",
    },
  });

  const formValues = watch();
  const isActionBtnDisabled =
    !formValues.title || !formValues.type || !formValues.date;

  const handleCloseAddNoticeModal = () => {
    reset();
    setImagePreview("");
    dispatch(setAddNoticeModal(false));
  };

  // Prepare branch options from API response
  //   const branchOptions =
  //     branchesData?.data?.branches?.map((branch) => ({
  //       value: branch.id,
  //       label: branch.name,
  //     })) || [];

  // Dummy image upload handler - simulates upload process
  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Create a dummy URL for the uploaded image
      const dummyImageUrl = URL.createObjectURL(file);

      // For demo purposes, we'll use a placeholder URL that includes the filename
      const demoImageUrl = `https://example.com/notices/${file.name
        .replace(/\s+/g, "-")
        .toLowerCase()}`;

      setValue("image", demoImageUrl);
      setImagePreview(dummyImageUrl);
      successNotify("Image uploaded successfully! (Demo)");
    } catch (error) {
      errorNotify("Failed to process image");
      console.error("Image processing error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        errorNotify(
          "Please select a valid image file (JPEG, PNG, JPG, GIF, WEBP)"
        );
        return;
      }

      if (file.size > maxSize) {
        errorNotify("Image size should be less than 5MB");
        return;
      }

      handleImageUpload(file);
    }
  };

  // Manual URL input handler
  const handleManualUrlInput = (url) => {
    if (url) {
      setValue("image", url);
      setImagePreview(url);
      successNotify("Image URL set successfully!");
    }
  };

  const handleAddNotice = (data) => {
    // Convert price and offer_price to numbers
    const processedData = {
      ...data,
      type: Number(data.type) || 1,
    };

    const validatedData = validateZodSchema({
      schema: CreateNoticeSchema,
      data: processedData,
    });
    if (!validatedData) return;

    addNotice({ data: validatedData })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          handleCloseAddNoticeModal();
          dispatch(addNewNoticeToList(response.data));
          successNotify(response?.message);
        }
      })
      .catch((err) => {
        errorNotify(err?.data?.message || "Something went wrong!");
      });
  };

  return {
    isAddModalOpen,
    handleCloseAddNoticeModal,
    isLoading: isAdding || isBranchesLoading || isUploading,
    control,
    handleSubmit,
    isActionBtnDisabled,
    handleAddNotice,
    formValues,
    // branchOptions,
    isBranchesLoading,
    handleFileSelect,
    imagePreview,
    isUploading,
    setValue,
    handleManualUrlInput,
    getStartDateDisabled,
  };
};

// ** Edit Notice Modal **
export const useEditNotice = ({ data }) => {
  const dispatch = useDispatch();
  const [updateNotice, { isLoading }] = useUpdateNoticeMutation();
  const { isEditModalOpen, selectedData } = useSelector(
    (state) => state.notice
  );

  // Fetch branches from API
  const { data: branchesData, isLoading: isBranchesLoading } =
    useGetBranchesQuery();

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      type: null,
      date: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title || "");
      setValue("type", data.type || "");
      setValue("date", data.date || "");
      //   setValue("long_des", data.long_des || "");
      //   setValue("price", data.price?.toString() || "");
      //   setValue("offer_price", data.offer_price?.toString() || "");
      //   setValue("branch_id", data.branch_id || []);
      //   setValue("group", data.group || "");
      //   setImagePreview(data.image || "");
    }
  }, [data, setValue]);

  const formValues = watch();
  const isActionBtnDisabled =
    !formValues.title || !formValues.type || !formValues.date;

  const handleCloseEditNoticeModal = () => {
    reset();
    setImagePreview("");
    dispatch(setEditNoticeModal(false));
  };

  // Prepare branch options from API response
  //   const branchOptions =
  //     branchesData?.data?.branches?.map((branch) => ({
  //       value: branch.id,
  //       label: branch.name,
  //     })) || [];

  // Dummy image upload handler
  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const dummyImageUrl = URL.createObjectURL(file);
      const demoImageUrl = `https://example.com/notices/${file.name
        .replace(/\s+/g, "-")
        .toLowerCase()}`;

      setValue("image", demoImageUrl);
      setImagePreview(dummyImageUrl);
      successNotify("Image uploaded successfully! (Demo)");
    } catch (error) {
      errorNotify("Failed to process image");
      console.error("Image processing error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        errorNotify(
          "Please select a valid image file (JPEG, PNG, JPG, GIF, WEBP)"
        );
        return;
      }

      if (file.size > maxSize) {
        errorNotify("Image size should be less than 5MB");
        return;
      }

      handleImageUpload(file);
    }
  };

  // Manual URL input handler for edit
  const handleManualUrlInput = (url) => {
    if (url) {
      setValue("image", url);
      setImagePreview(url);
      successNotify("Image URL updated successfully!");
    }
  };

  const handleUpdate = (data) => {
    if (selectedData?.type !== SelectedSliceTypeEnum.UPDATE)
      return errorNotify("Invalid notice type.");

    // Convert price and offer_price to numbers
    const processedData = {
      ...data,
      type: Number(data.type) || 1,
    };

    console.log(processedData);

    const validatedData = validateZodSchema({
      schema: EditNoticeSchema,
      data: processedData,
    });
    if (!validatedData) return;

    updateNotice({ data: validatedData, noticeId: selectedData?.encrypted_id })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          handleCloseEditNoticeModal();
          console.log(response.data);
          dispatch(updateNoticeInList(response?.data.notice));
          successNotify(response?.message);
        }
      })
      .catch((err) => {
        errorNotify(err?.data?.message);
      });
  };

  return {
    isEditModalOpen,
    handleCloseEditNoticeModal,
    control,
    isActionBtnDisabled,
    isLoading: isLoading || isBranchesLoading || isUploading,
    handleUpdate,
    handleSubmit,
    formValues,
    // branchOptions,
    handleFileSelect,
    imagePreview,
    isUploading,
    handleManualUrlInput,
    isBranchesLoading,
  };
};
