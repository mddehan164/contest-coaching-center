import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  useGetAllBranchesQuery,
  useAddBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} from "../redux-rtk/branch/branchApi";
import {
  setBranchMetaData,
  setSelectedBranchData,
  setBranchConfirmationModal,
  setAddBranchModal,
  setEditBranchModal,
} from "../redux-rtk/branch/branchSlice";
import { useDebouncedSearch } from "./useDebounce";
import { successNotify, errorNotify } from "../utils/notify";

// ** Branch List **
export const useBranches = () => {
  const dispatch = useDispatch();
  const { isConfirmModalOpen, dataList, meta, selectedData } = useSelector(
    (state) => state.branch
  );

  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearch = useDebouncedSearch(searchKeyword, 1000);

  const [deleteBranch, { isLoading: deleteLoading }] =
    useDeleteBranchMutation();
  const { isLoading, isFetching, isError, error } = useGetAllBranchesQuery(
    debouncedSearch ? { search: debouncedSearch } : {},
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: true,
    }
  );

  const updatePageMeta = (value) => dispatch(setBranchMetaData(value));
  const handleSetSelectedBranch = (data) =>
    dispatch(setSelectedBranchData(data));

  const handleOpenAddBranchModal = () => dispatch(setAddBranchModal(true));
  const handleOpenEditBranchModal = () => dispatch(setEditBranchModal(true));

  const handleOpenConfirmationModal = () =>
    dispatch(setBranchConfirmationModal(true));
  const handleCloseConfirmationModal = () => {
    dispatch(setBranchConfirmationModal(false));
    dispatch(setSelectedBranchData(null));
  };

  const handleDelete = ({ branchId }) => {
    if (!branchId) {
      errorNotify("Branch ID is required");
      return;
    }

    deleteBranch({ branchId })
      .unwrap()
      .then((response) => {
        successNotify(response?.message || "Branch deleted successfully");
        handleCloseConfirmationModal();
      })
      .catch((err) => {
        console.error("Delete branch error:", err);
        errorNotify(err?.data?.message || "Failed to delete branch");
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
    handleSetSelectedBranch,
    isConfirmModalOpen,
    handleOpenConfirmationModal,
    handleCloseConfirmationModal,
    handleOpenAddBranchModal,
    handleOpenEditBranchModal,
  };
};

// ** Add Branch Modal **
export const useAddBranch = () => {
  const dispatch = useDispatch();
  const [addBranch, { isLoading: isAdding }] = useAddBranchMutation();
  const { isAddModalOpen } = useSelector((state) => state.branch);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      image: "",
      status: "active",
    },
  });

  const formValues = watch();

  // Dummy image upload handler - simulates upload process
  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Create URL for preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      // In real implementation, upload to server and get URL
      // For now, we'll use the file name as placeholder
      return `storage/branch/${Date.now()}_${file.name}`;
    } catch (error) {
      console.error("Image upload error:", error);
      errorNotify("Failed to upload image");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file)
        .then((imageUrl) => {
          // Set the image URL in form
          // This would be handled by the ImageUpload component
        })
        .catch(() => {
          // Error already handled in handleImageUpload
        });
    }
  };

  // Manual URL input handler
  const handleManualUrlInput = (url) => {
    if (url) {
      setImagePreview(url);
      // Set the URL in form - this would be handled by the ImageUpload component
    }
  };

  const isActionBtnDisabled = !formValues.name || !formValues.location;

  const handleCloseAddBranchModal = () => {
    reset();
    setImagePreview("");
    dispatch(setAddBranchModal(false));
  };

  const handleAddBranch = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    addBranch({ data: formData })
      .unwrap()
      .then((response) => {
        successNotify(response?.message || "Branch created successfully");
        handleCloseAddBranchModal();
      })
      .catch((err) => {
        console.error("Add branch error:", err);
        errorNotify(err?.data?.message || "Failed to create branch");
      });
  };

  return {
    isAddModalOpen,
    handleCloseAddBranchModal,
    isLoading: isAdding,
    control,
    handleSubmit,
    isActionBtnDisabled,
    handleAddBranch,
    handleImageUpload,
    formValues,
    isUploading,
    imagePreview,
    handleFileSelect,
    handleManualUrlInput,
  };
};

// ** Edit Branch Modal **
export const useEditBranch = ({ data }) => {
  const dispatch = useDispatch();
  const [updateBranch, { isLoading }] = useUpdateBranchMutation();
  const { isEditModalOpen } = useSelector((state) => state.branch);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      image: "",
      status: "active",
    },
  });

  const formValues = watch();

  // Initialize form with existing data when selectedData changes
  useEffect(() => {
    if (data && isEditModalOpen) {
      setValue("name", data.name || "");
      setValue("location", data.location || "");
      setValue("description", data.description || "");
      setValue("image", data.image || "");
      setValue("status", data.status || "active");

      // Set image preview if exists
      if (data.image) {
        setImagePreview(data.image);
      }
    }
  }, [setValue, isEditModalOpen]);

  // Dummy image upload handler - simulates upload process
  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Create URL for preview
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      // In real implementation, upload to server and get URL
      return `/storage/branch/${file.name}`;
    } catch (error) {
      console.error("Image upload error:", error);
      errorNotify("Failed to upload image");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file)
        .then((imageUrl) => {
          // Set the image URL in form
          // This would be handled by the ImageUpload component
        })
        .catch(() => {
          // Error already handled in handleImageUpload
        });
    }
  };

  // Manual URL input handler
  const handleManualUrlInput = (url) => {
    if (url) {
      setImagePreview(url);
      // Set the URL in form - this would be handled by the ImageUpload component
    }
  };

  const isActionBtnDisabled = !formValues.name || !formValues.location;

  const handleCloseEditBranchModal = () => {
    reset();
    setImagePreview("");
    dispatch(setEditBranchModal(false));
    dispatch(setSelectedBranchData(null));
  };

  const handleEditBranch = (data) => {
    if (!data?.encrypted_id) {
      errorNotify("Branch ID is required");
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    updateBranch({
      data: formData,
      branchId: data.encrypted_id,
    })
      .unwrap()
      .then((response) => {
        successNotify(response?.message || "Branch updated successfully");
        handleCloseEditBranchModal();
      })
      .catch((err) => {
        console.error("Update branch error:", err);
        errorNotify(err?.data?.message || "Failed to update branch");
      });
  };

  return {
    isEditModalOpen,
    handleCloseEditBranchModal,
    isLoading,
    control,
    handleSubmit,
    isActionBtnDisabled,
    handleEditBranch,
    handleImageUpload,
    formValues,
    isUploading,
    imagePreview,
    handleFileSelect,
    handleManualUrlInput,
  };
};
