import { Controller } from "react-hook-form";
import { useEditStudent } from "@hooks/useStudent";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect, FormTextarea } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";

const EditStudentModal = ({ data }) => {
  const {
    isEditModalOpen,
    handleCloseEditStudentModal,
    control,
    isActionBtnDisabled,
    isLoading,
    handleSubmit,
    handleEditStudent,
    courseOptions,
    batchesOptions,
    isBatchesLoading,
  } = useEditStudent({ data });

  return (
    <CustomContainerModal
      isOpen={isEditModalOpen}
      onClose={handleCloseEditStudentModal}
      title="Edit Student"
      description="Update student details"
      handler={handleSubmit(handleEditStudent)}
      actionBtnText="Update Student"
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
        {/* Father's Name */}
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

        {/* Mother's Name */}
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

        {/* Course */}
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

        {/* Batch */}
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
              isLoading={isBatchesLoading}
            />
          )}
        />

        {/* Gender */}
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
              selectedOption={
                field.value
                  ? {
                      value: field.value,
                      label:
                        field.value.charAt(0).toUpperCase() +
                        field.value.slice(1),
                    }
                  : null
              }
              handleChange={(opt) => field.onChange(opt.value)}
            />
          )}
        />

        {/* Mobile */}
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

        {/* Address - Full Width */}
        {/* <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <FormTextarea
              className="sm:col-span-2"
              label="Address"
              placeholder="Enter address"
              rows={2}
              {...field}
            />
          )}
        /> */}
        {/* SSC */}
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

        {/* SSC */}
        <Controller
          name="ssc_result"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              type="number"
              step="0.01"
              label="SSC Result"
              placeholder="Enter SSC result"
              {...field}
            />
          )}
        />

        {/* HSC */}
        <Controller
          name="hsc_result"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              type="number"
              step="0.01"
              label="HSC Result"
              placeholder="Enter HSC result"
              {...field}
            />
          )}
        />

        {/* Total Amount */}
        <Controller
          name="total_amount"
          control={control}
          render={({ field }) => (
            <FormInput
              isCol={true}
              type="number"
              label="Total Amount"
              placeholder="Enter total amount"
              {...field}
            />
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormSelect
              isCol={true}
              label="Status"
              options={[
                { value: 1, label: "Active" },
                { value: 0, label: "Inactive" },
              ]}
              selectedOption={
                field.value !== undefined
                  ? {
                      value: field.value,
                      label: field.value === 1 ? "Active" : "Inactive",
                    }
                  : null
              }
              handleChange={(opt) => field.onChange(opt.value)}
            />
          )}
        />

        {/* Image Upload - Full Width */}
        <div className="sm:col-span-2">
          <ImageUpload
            name="image"
            control={control}
            label="Student Image"
            module="student"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            required={false}
            currentImage={data?.image}
          />
        </div>
      </div>

      <NotifyContainer />
    </CustomContainerModal>
  );
};

export default EditStudentModal;
