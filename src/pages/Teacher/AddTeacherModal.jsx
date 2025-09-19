import { Controller } from "react-hook-form";
import { useAddTeacher } from "@hooks/useTeacher";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";
import { useState } from "react";

const AddTeacherModal = () => {
  const {
    isAddModalOpen,
    handleCloseAddTeacherModal,
    control,
    isActionBtnDisabled,
    isLoading,
    handleSubmit,
    handleAddTeacher,
    courseOptions,
    batchesOptions,
    formValues,
    isUploading,
    imagePreview,
    handleFileSelect,
    handleManualUrlInput,
  } = useAddTeacher();

  const [manualUrl, setManualUrl] = useState("");

  const handleManualUrlSubmit = () => {
    if (manualUrl.trim()) {
      handleManualUrlInput(manualUrl.trim());
      setManualUrl("");
    }
  };

  return (
    <CustomContainerModal
      isOpen={isAddModalOpen}
      onClose={handleCloseAddTeacherModal}
      title="Add New Teacher"
      description="Enter teacher details"
      handler={handleSubmit(handleAddTeacher)}
      actionBtnText="Create Teacher"
      isActionBtnDisabled={isActionBtnDisabled}
      isLoading={isLoading}
    >
      <div className="my-10 space-y-5">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Teacher Name"
              placeholder="Enter name"
              {...field}
            />
          )}
        />

        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Subject"
              placeholder="Enter subject"
              {...field}
            />
          )}
        />

        <Controller
          name="course_id"
          control={control}
          render={({ field }) => (
            <FormSelect
              isCol={true}
              label="Select Course"
              options={courseOptions}
              selectedOption={courseOptions.find(
                (opt) => opt.value === field.value
              )}
              handleChange={(opt) => field.onChange(opt?.value)}
              placeholder="Choose a course"
              isSearchable={true}
            />
          )}
        />

        <Controller
          name="batch_id"
          control={control}
          render={({ field }) => (
            <FormSelect
              isCol={true}
              label="Select Batch"
              options={batchesOptions}
              selectedOption={batchesOptions.find(
                (opt) => opt.value === field.value
              )}
              handleChange={(opt) => field.onChange(opt?.value)}
              placeholder="Choose a batch"
              isSearchable={true}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormSelect
              isCol={true}
              label="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              selectedOption={{ value: field.value, label: field.value }}
              handleChange={(opt) => field.onChange(opt.value)}
            />
          )}
        />

        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Mobile"
              placeholder="01712345678"
              {...field}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Address"
              placeholder="Enter address"
              {...field}
            />
          )}
        />

        <Controller
          name="status"
          isCol={true}
          control={control}
          render={({ field }) => (
            <FormSelect
              isCol={true}
              label="Status"
              options={[
                { value: 1, label: "Active" },
                { value: 0, label: "Inactive" },
              ]}
              selectedOption={{
                value: field.value,
                label: field.value === 1 ? "Active" : "Inactive",
              }}
              handleChange={(opt) => field.onChange(opt.value)}
            />
          )}
        />

        {/* Image Upload Field */}
        <div>
          {/* Image Upload */}
          <ImageUpload
            name="image"
            control={control}
            label="Teacher Image"
            module="teacher"
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            required={false}
          />
        </div>
      </div>
      <NotifyContainer />
    </CustomContainerModal>
  );
};

export default AddTeacherModal;
