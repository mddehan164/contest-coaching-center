import { Controller } from 'react-hook-form';
import { useAddReview } from '@hooks/useReview';
import { CustomContainerModal } from '@shared/custom';
import { FormInput, FormTextarea } from '@shared/forms';
import ImageUpload from '../../shared/forms/ImageUpload';
import NotifyContainer from '../../utils/notify';

const AddReviewModal = () => {
    const {
        isAddModalOpen,
        handleCloseAddReviewModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleSubmit,
        handleAddReview,
        imagePreview,
        imagePreviewUrl,
        isUploading,
        handleFileSelect,
    } = useAddReview();

    return (
        <CustomContainerModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddReviewModal}
            title="Add New Review"
            description="Create a new review for successful students"
            handler={handleSubmit(handleAddReview)}
            actionBtnText="Create Review"
            isActionBtnDisabled={isActionBtnDisabled}
            isLoading={isLoading}
        >
            <div className='my-10 space-y-5'>
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
                    label="Student Image (Optional)"
                    module="review"
                    accept="image/*"
                    maxSize={5 * 1024 * 1024} // 5MB
                    required={false}
                />
            </div>
            <NotifyContainer />
        </CustomContainerModal>
    );
};

export default AddReviewModal;
