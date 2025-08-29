import { Controller } from 'react-hook-form';
import { useAddReview } from '@hooks/useReview';
import { CustomContainerModal } from '@shared/custom';
import { FormInput, FormTextarea } from '@shared/forms';
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

                <Controller
                    name="img"
                    control={control}
                    render={({ field: { onChange, name, ref } }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Student Image (Optional)
                            </label>

                            {/* File Upload Area */}
                            <div className="flex items-center space-x-4 mb-4">
                                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                    {isUploading ? (
                                        <div className="text-gray-500 text-sm">Uploading...</div>
                                    ) : imagePreviewUrl ? (
                                        <div className="w-full h-full flex items-center justify-center p-2">
                                            <img
                                                src={imagePreviewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-4">
                                            <svg
                                                className="w-8 h-8 text-gray-400 mb-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span className="text-sm text-gray-500 text-center">
                                                Upload Image
                                            </span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="img"
                                        name={name}
                                        ref={ref}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleFileSelect(e.target.files)}
                                        disabled={isLoading || isUploading}
                                    />
                                </label>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Upload student's image (JPG, PNG - optional)
                                    </p>
                                    {imagePreview && (
                                        <p className="text-sm text-green-600 truncate mb-1">
                                            File: {imagePreview}
                                        </p>
                                    )}
                                    {isUploading && (
                                        <p className="text-sm text-blue-600">
                                            Processing image...
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
            <NotifyContainer />
        </CustomContainerModal>
    );
};

export default AddReviewModal;
