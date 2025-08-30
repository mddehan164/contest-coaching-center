import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotify, successNotify } from "../utils/notify";
import { useForm } from "react-hook-form";
import { SelectedSliceTypeEnum } from "@utils/enums";
import {
  addNewCourseToList,
  viewCourseFromList,
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
  useGetCourseBatchesQuery,
  useGetBranchesQuery,
} from "../redux-rtk/course";
import {
  CreateCourseSchema,
  EditCourseSchema,
  validateZodSchema,
} from "@utils/validations";
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

  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();
  const { isLoading, isFetching, isError, error } = useGetAllCoursesQuery(
    { page: currentPage, limit: pageSize, search: debouncedSearch },
    {
      refetchOnMountOrArgChange: false, // Don't refetch on every mount
      refetchOnFocus: false,
      refetchOnReconnect: true,
    }
  );

  const updatePageMeta = (value) => dispatch(setCourseMetaData(value));
  const handleSetSelectedCourse = (data) =>
    dispatch(setSelectedCourseData(data));

  const handleOpenAddCourseModal = () => dispatch(setAddCourseModal(true));
  const handleOpenEditCourseModal = () => dispatch(setEditCourseModal(true));

  const handleOpenConfirmationModal = () =>
    dispatch(setCourseConfirmationModal(true));
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
          dispatch(viewCourseFromList({ id: courseId }));
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

  // Fetch branches from API
  const { data: branchesData, isLoading: isBranchesLoading } =
    useGetBranchesQuery();

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      image: "",
      short_des: "",
      long_des: "",
      price: "",
      offer_price: "",
      branch_id: [],
      group: "",
    },
  });

  const formValues = watch();
  const isActionBtnDisabled =
    !formValues.title ||
    !formValues.short_des ||
    !formValues.long_des ||
    !formValues.image;

  const handleCloseAddCourseModal = () => {
    reset();
    setImagePreview("");
    dispatch(setAddCourseModal(false));
  };

  // Prepare branch options from API response
  const branchOptions =
    branchesData?.data?.branches?.map((branch) => ({
      value: branch.id,
      label: branch.name,
    })) || [];

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
      const demoImageUrl = `https://example.com/courses/${file.name
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

  const handleAddCourse = (data) => {
    // Convert price and offer_price to numbers
    const processedData = {
      ...data,
      price: Number(data.price) || 0,
      offer_price: Number(data.offer_price) || 0,
      branch_id: Array.isArray(data.branch_id) ? data.branch_id : [],
    };

    const validatedData = validateZodSchema({
      schema: CreateCourseSchema,
      data: processedData,
    });
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
    isLoading: isAdding || isBranchesLoading || isUploading,
    control,
    handleSubmit,
    isActionBtnDisabled,
    handleAddCourse,
    formValues,
    branchOptions,
    isBranchesLoading,
    handleFileSelect,
    imagePreview,
    isUploading,
    setValue,
    handleManualUrlInput,
  };
};

// ** Edit Course Modal **
export const useEditCourse = ({ data }) => {
  const dispatch = useDispatch();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const { isEditModalOpen, selectedData } = useSelector(
    (state) => state.course
  );

  // Fetch branches from API
  const { data: branchesData, isLoading: isBranchesLoading } =
    useGetBranchesQuery();

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      image: "",
      short_des: "",
      long_des: "",
      price: "",
      offer_price: "",
      branch_id: [],
      group: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title || "");
      setValue("image", data.image || "");
      setValue("short_des", data.short_des || "");
      setValue("long_des", data.long_des || "");
      setValue("price", data.price?.toString() || "");
      setValue("offer_price", data.offer_price?.toString() || "");
      setValue("branch_id", data.branch_id || []);
      setValue("group", data.group || "");
      setImagePreview(data.image || "");
    }
  }, [data, setValue]);

  const formValues = watch();
  const isActionBtnDisabled =
    !formValues.title ||
    !formValues.short_des ||
    !formValues.long_des ||
    !formValues.image;

  const handleCloseEditCourseModal = () => {
    reset();
    setImagePreview("");
    dispatch(setEditCourseModal(false));
  };

  // Prepare branch options from API response
  const branchOptions =
    branchesData?.data?.branches?.map((branch) => ({
      value: branch.id,
      label: branch.name,
    })) || [];

  // Dummy image upload handler
  const handleImageUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const dummyImageUrl = URL.createObjectURL(file);
      const demoImageUrl = `https://example.com/courses/${file.name
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
      return errorNotify("Invalid course type.");

    // Convert price and offer_price to numbers
    const processedData = {
      ...data,
      price: Number(data.price) || 0,
      offer_price: Number(data.offer_price) || 0,
      branch_id: (() => {
        try {
          const parsed = JSON.parse(data.branch_id); // "[2]" -> [2]
          return Array.isArray(parsed) ? parsed.map(Number) : [];
        } catch (e) {
          return [];
        }
      })(),
    };

    console.log(processedData);

    const validatedData = validateZodSchema({
      schema: EditCourseSchema,
      data: processedData,
    });
    if (!validatedData) return;

    updateCourse({ data: validatedData, courseId: selectedData?.encrypted_id })
      .unwrap()
      .then((response) => {
        if (response?.success) {
          handleCloseEditCourseModal();
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
    isLoading: isLoading || isBranchesLoading || isUploading,
    handleUpdate,
    handleSubmit,
    formValues,
    branchOptions,
    handleFileSelect,
    imagePreview,
    isUploading,
    handleManualUrlInput,
    isBranchesLoading,
  };
};
