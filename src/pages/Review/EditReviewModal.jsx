import { Controller } from "react-hook-form";
import { useEditReview } from "@hooks/useReview";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormTextarea } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";

const EditReviewModal = ({ data }) => {
  const {
    isEditModalOpen,
    handleCloseEditReviewModal,
    control,
    isActionBtnDisabled,
    isLoading,
    handleSubmit,
    handleUpdateReview,
    // selectedData,
    // imagePreview,
    // imagePreviewUrl,
    // isUploading,
    // handleFileSelect,
  } = useEditReview();

  return (
    <CustomContainerModal
      isOpen={isEditModalOpen}
      onClose={handleCloseEditReviewModal}
      title="Edit Review"
      description="Update the review information"
      handler={handleSubmit(handleUpdateReview)}
      actionBtnText="Update Review"
      isActionBtnDisabled={isActionBtnDisabled}
      isLoading={isLoading}
    >
      <div className="my-10 space-y-5">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormInput
              label="Student Name"
              placeholder="Enter student name"
              id="name"
              isLoading={isLoading}
              isCol={true}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Year"
                placeholder="Enter year (e.g., 2024)"
                id="year"
                isLoading={isLoading}
                isCol={true}
                {...field}
              />
            )}
          />

          <Controller
            name="rank"
            control={control}
            render={({ field }) => (
              <FormInput
                label="Rank/Position"
                placeholder="Enter rank or position (e.g., 1st Position)"
                id="rank"
                isLoading={isLoading}
                isCol={true}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <FormTextarea
              label="Description"
              placeholder="Enter review description"
              id="description"
              isCol={true}
              rows={4}
              disabled={isLoading}
              {...field}
            />
          )}
        />

        {/* Image Upload */}
        <ImageUpload
          name="review_img"
          control={control}
          label="Update Student Image (Optional)"
          module="review"
          accept="image/*"
          maxSize={5 * 1024 * 1024} // 5MB
          required={false}
          currentImage={data?.img_url}
        />
      </div>
      <NotifyContainer />
    </CustomContainerModal>
  );
};

export default EditReviewModal;
