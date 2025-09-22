import { Controller } from "react-hook-form";
import { useAddStudent } from "@hooks/useStudent";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";
// import { useState } from "react";

const AddStudentModal = () => {
  const {
    isAddModalOpen,
    handleCloseAddStudentModal,
    control,
    isActionBtnDisabled,
    isLoading,
    handleSubmit,
    handleAddStudent,
    courseOptions,
    batchesOptions,
    // formValues,
    // isUploading,
    // imagePreview,
    // handleFileSelect,
    // handleManualUrlInput,
  } = useAddStudent();

  // const [manualUrl, setManualUrl] = useState("");
  // const handleManualUrlSubmit = () => {
  //   if (manualUrl.trim()) {
  //     handleManualUrlInput(manualUrl.trim());
  //     setManualUrl("");
  //   }
  // };

  return (
    <CustomContainerModal
      isOpen={isAddModalOpen}
      onClose={handleCloseAddStudentModal}
      title="Add New Student"
      description="Enter student details"
      handler={handleSubmit(handleAddStudent)}
      actionBtnText="Create Student"
      isActionBtnDisabled={isActionBtnDisabled}
      isLoading={isLoading}
    >
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Student Name"
              placeholder="Enter name"
              {...field}
            />
          )}
        />

        <Controller
          name="father_name"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Father's Name"
              placeholder="Enter father's name"
              {...field}
            />
          )}
        />

        <Controller
          name="mother_name"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              label="Mother's Name"
              placeholder="Enter mother's name"
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
          name="ssc_result"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              type="number"
              step="0.01"
              label="SSC Result"
              {...field}
            />
          )}
        />

        <Controller
          name="hsc_result"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              type="number"
              step="0.01"
              label="HSC Result"
              {...field}
            />
          )}
        />

        <Controller
          name="total_amount"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              type="number"
              label="Total Amount"
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
            label="Student Image"
            module="student"
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

export default AddStudentModal;
