import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
  addNewNoticeToList,
  setAddNoticeModal,
  setEditNoticeModal,
  setSelectedNoticeData,
  setNoticeConfirmationModal,
  setNoticeMetaData,
  updateNoticeInList,
  useAddNoticeMutation,
  useGetAllNoticesQuery,
  useUpdateNoticeMutation,
  useGetBranchesQuery,
} from "../redux-rtk/notice";

import { useDebouncedSearch } from "./useDebounce";

// Helper function to format date for API (MySQL datetime format)
const formatDateForAPI = (dateObj) => {
  if (!dateObj) return null;
  const date = new Date(dateObj);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// ** Notice List **
export const useNotices = () => {
  const dispatch = useDispatch();
  const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
    (state) => state.notice
  );
  const { currentPage, pageSize } = meta || {};

  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

  const { isLoading, isFetching, isError, error } = useGetAllNoticesQuery(
    { page: currentPage, limit: pageSize, search: debouncedSearch },
    {
      refetchOnMountOrArgChange: false, // Don't refetch on every mount
      skip: false,
      // Cache data for 5 minutes to avoid unnecessary refetches
      refetchOnFocus: false,
      refetchOnReconnect: true,
    }
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

  return {
    dataList,
    meta,
    isLoading: isLoading || isFetching,
    isError,
    status: error?.status,
    updatePageMeta,
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
      type: 1, // Default to first option instead of null
      date: null,
      file: null,
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

  // File upload handler - simulates upload process
  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Store the actual file object for FormData submission
      setValue("file", file);
      setImagePreview(file.name); // Store filename for display
      successNotify("File selected successfully!");
    } catch (error) {
      errorNotify("Failed to process file");
      console.error("File processing error:", error);
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
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        errorNotify(
          "Please select a valid file (PDF, DOC, DOCX, TXT, JPG, PNG)"
        );
        return;
      }

      if (file.size > maxSize) {
        errorNotify("File size should be less than 5MB");
        return;
      }

      handleFileUpload(file);
    }
  };

  const handleAddNotice = (data) => {
    // Validate required fields manually
    if (!data.title?.trim()) {
      return errorNotify("Notice title is required.");
    }
    if (!data.type) {
      return errorNotify("Notice type is required.");
    }
    if (!data.date) {
      return errorNotify("Notice date is required.");
    }

    console.log("Form data before submission:", data);

    // Use FormData for proper file upload that Laravel can parse
    const formData = new FormData();

    // Ensure data is properly formatted for Laravel - try different approaches
    formData.append("title", String(data.title).trim());
    formData.append("type", parseInt(data.type)); // Send as integer
    formData.append("date", formatDateForAPI(data.date));

    // Add file if it exists (actual File object)
    if (data.file && data.file instanceof File) {
      formData.append("file", data.file, data.file.name);
      console.log(
        "Adding file to FormData:",
        data.file.name,
        data.file.type,
        data.file.size
      );
    }

    // Debug FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value, typeof value);
    }

    // Try adding Laravel specific fields
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (csrfToken) {
      formData.append("_token", csrfToken);
    }

    console.log("Sending FormData to Laravel...");

    addNotice({ data: formData })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          handleCloseAddNoticeModal();
          dispatch(addNewNoticeToList(response.data.notice));
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
      date: null,
      file: null,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title || "");
      setValue("type", Number(data.type) || null);

      // Convert ISO date to Date object for the date picker
      if (data.date) {
        const dateObj = new Date(data.date);
        setValue("date", dateObj);
      }

      // Handle existing file properly
      if (data.file) {
        // Store the file URL for reference but don't set it in the form
        // The form field should remain null for existing files until a new file is selected
        setValue("file", null);

        // Extract filename from URL for preview
        const filename = data.file.split("/").pop() || data.file;
        setImagePreview(filename);

        console.log("Setting existing file preview:", filename);
      } else {
        setValue("file", null);
        setImagePreview("");
      }

      //   setValue("long_des", data.long_des || "");
      //   setValue("price", data.price?.toString() || "");
      //   setValue("offer_price", data.offer_price?.toString() || "");
      //   setValue("branch_id", data.branch_id || []);
      //   setValue("group", data.group || "");
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

  // File upload handler for edit modal
  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Store the actual file object for FormData submission
      setValue("file", file);
      setImagePreview(file.name); // Store filename for display
      successNotify("File selected successfully!");
    } catch (error) {
      errorNotify("Failed to process file");
      console.error("File processing error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        errorNotify(
          "Please select a valid file (PDF, DOC, DOCX, TXT, JPG, PNG)"
        );
        return;
      }

      if (file.size > maxSize) {
        errorNotify("File size should be less than 5MB");
        return;
      }

      handleFileUpload(file);
    }
  };

  const handleUpdate = (data) => {
    if (selectedData?.actionType !== SelectedSliceTypeEnum.UPDATE)
      return errorNotify("Invalid notice type.");

    // Validate required fields manually
    if (!data.title?.trim()) {
      return errorNotify("Notice title is required.");
    }
    if (!data.type) {
      return errorNotify("Notice type is required.");
    }
    if (!data.date) {
      return errorNotify("Notice date is required.");
    }

    console.log("Update form data:", data);

    // Use FormData for proper file upload that Laravel can parse
    const formData = new FormData();

    // Ensure data is properly formatted for Laravel
    formData.append("title", String(data.title).trim());
    formData.append("type", String(data.type));
    formData.append("date", formatDateForAPI(data.date));

    // Add file if it exists (actual File object)
    if (data.file && data.file instanceof File) {
      formData.append("file", data.file, data.file.name);
      console.log(
        "Adding file to FormData for update:",
        data.file.name,
        data.file.type,
        data.file.size
      );
    }

    // Add Laravel method spoofing for PUT request if needed
    formData.append("_method", "PUT");

    updateNotice({ data: formData, noticeId: selectedData?.encrypted_id })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          handleCloseEditNoticeModal();
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
    isBranchesLoading,
  };
};
