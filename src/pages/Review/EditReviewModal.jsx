import { Controller } from 'react-hook-form';
import { useEditReview } from '@hooks/useReview';
import { CustomContainerModal } from '@shared/custom';
import { FormInput, FormTextarea } from '@shared/forms';
import ImageUpload from '../../shared/forms/ImageUpload';
import NotifyContainer from '../../utils/notify';

const EditReviewModal = ({ data }) => {
    const {
        isEditModalOpen,
        handleCloseEditReviewModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleSubmit,
        handleUpdateReview,
        selectedData,
        imagePreview,
        imagePreviewUrl,
        isUploading,
        handleFileSelect,
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

                {/* Show existing image if available */}
                {/* {selectedData?.img_url && (
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Current Image
                        </label>
                        <div className="flex items-center gap-4">
                            <img 
                                src={selectedData.img_url} 
                                alt={selectedData.name}
                                className="w-16 h-16 object-cover rounded-lg border"
                            />
                            <a 
                                href={selectedData.img_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                View Full Image
                            </a>
                        </div>
                    </div>
                )} */}

                {/* Image Upload */}
                <ImageUpload
                    name="review_img"
                    control={control}
                    label="Update Student Image (Optional)"
                    module="review"
                    accept="image/*"
                    maxSize={5 * 1024 * 1024} // 5MB
                    required={false}
                    currentImage={selectedData?.review_img}
                />
            </div>
            <NotifyContainer />
        </CustomContainerModal>
    );
};

export default EditReviewModal;
