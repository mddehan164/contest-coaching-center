import { Controller } from "react-hook-form";
import { useAddCourse } from "@hooks/useCourse";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect, FormTextarea } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";
// import { useState } from "react";

const AddCourseModal = () => {
  const {
    isAddModalOpen,
    handleCloseAddCourseModal,
    control,
    isActionBtnDisabled,
    isLoading,
    handleSubmit,
    handleAddCourse,
    // formValues,
    branchOptions,
    isBranchesLoading,
    // handleFileSelect,
    // imagePreview,
    // isUploading,
    // handleManualUrlInput,
  } = useAddCourse();

  // const [manualUrl, setManualUrl] = useState("");

  // Group options
  const groupOptions = [
    { value: "science", label: "Science" },
    { value: "arts", label: "Arts" },
    { value: "commerce", label: "Commerce" },
  ];

  // const handleManualUrlSubmit = () => {
  //     if (manualUrl.trim()) {
  //         handleManualUrlInput(manualUrl.trim());
  //         setManualUrl("");
  //     }
  // };

  return (
    <CustomContainerModal
      isOpen={isAddModalOpen}
      onClose={handleCloseAddCourseModal}
      title="Add New Course"
      description="Create a new course with detailed information"
      handler={handleSubmit(handleAddCourse)}
      actionBtnText="Create Course"
      isActionBtnDisabled={isActionBtnDisabled}
      isLoading={isLoading}
    >
      <div className="my-10 space-y-5">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Course Title"
              placeholder="Enter course title"
              id="title"
              isLoading={isLoading}
              isCol={true}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            {/* Image Upload */}
            <ImageUpload
              name="image"
              control={control}
              label="Course Image"
              module="course"
              accept="image/*"
              maxSize={5 * 1024 * 1024} // 5MB
              required={true}
            />
          </div>
          <div className="space-y-5">
            <Controller
              name="branch_id"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Branches"
                  options={branchOptions}
                  selectedOption={branchOptions.filter((opt) =>
                    field.value?.includes(opt.value)
                  )}
                  handleChange={(selectedOptions) =>
                    field.onChange(
                      selectedOptions
                        ? selectedOptions.map((opt) => opt.value)
                        : []
                    )
                  }
                  isLoading={isLoading || isBranchesLoading}
                  placeholder="Select branches"
                  isCol={true}
                  isMulti={true}
                  isSearchable={true}
                />
              )}
            />

            <Controller
              name="group"
              control={control}
              render={({ field }) => (
                <FormSelect
                  label="Group"
                  options={groupOptions}
                  selectedOption={groupOptions.find(
                    (opt) => opt.value === field.value
                  )}
                  handleChange={(selectedOption) =>
                    field.onChange(selectedOption?.value)
                  }
                  isLoading={isLoading}
                  placeholder="Select group"
                  isCol={true}
                  isSearchable={true}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="short_des"
            control={control}
            render={({ field }) => (
              <FormTextarea
                label="Short Description"
                placeholder="Enter short description"
                id="short_des"
                rows={5}
                {...field}
              />
            )}
          />

          <Controller
            name="long_des"
            control={control}
            render={({ field }) => (
              <FormTextarea
                label="Long Description"
                placeholder="Enter detailed description"
                id="long_des"
                isLoading={isLoading}
                rows={5}
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Price"
                placeholder="Enter price"
                id="price"
                type="number"
                isLoading={isLoading}
                isCol={true}
                {...field}
              />
            )}
          />

          <Controller
            name="offer_price"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Offer Price"
                placeholder="Enter offer price"
                id="offer_price"
                type="number"
                isLoading={isLoading}
                isCol={true}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <NotifyContainer />
    </CustomContainerModal>
  );
};

export default AddCourseModal;
