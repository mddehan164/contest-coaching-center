import { Controller } from 'react-hook-form';
import { useEditNotice } from '@hooks/useNotice';
import { CustomContainerModal } from '@shared/custom';
import { FormInput, FormSelect, FormTextarea } from '@shared/forms';
import NotifyContainer from '../../utils/notify';
import { useState } from 'react';

const EditNoticeModal = ({ data }) => {
    const {
        isEditModalOpen,
        handleCloseEditNoticeModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleUpdate,
        handleSubmit,
        formValues,
        branchOptions,
        handleFileSelect,
        imagePreview,
        isUploading,
        handleManualUrlInput,
    } = useEditNotice({ data });

    const [manualUrl, setManualUrl] = useState("");

    // Group options
    const groupOptions = [
        { value: "science", label: "Science" },
        { value: "arts", label: "Arts" },
        { value: "commerce", label: "Commerce" },
        { value: "technology", label: "Technology" },
        { value: "business", label: "Business" },
    ];

    const handleManualUrlSubmit = () => {
        if (manualUrl.trim()) {
            handleManualUrlInput(manualUrl.trim());
            setManualUrl("");
        }
    };

    return (
        <CustomContainerModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditNoticeModal}
            title="Edit Notice"
            description="Update notice details easily"
            handler={handleSubmit(handleUpdate)}
            actionBtnText="Update Notice"
            isActionBtnDisabled={isActionBtnDisabled}
            isLoading={isLoading}
        >
            <div className='my-10 space-y-5'>
                {/* Notice Title */}
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <FormInput
                            label="Notice Title"
                            placeholder="Enter notice title"
                            id="title"
                            isLoading={isLoading}
                            isCol={true}
                            {...field}
                        />
                    )}
                />

                {/* Image Upload Field */}
                <div>
                    <label className="block text-sm font-medium text-text-600 mb-2">
                        Notice Image *
                    </label>

                    {/* Image Upload Area */}
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            {isUploading ? (
                                <div className="text-gray-500 text-sm">Uploading...</div>
                            ) : imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-4">
                                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm text-gray-500 text-center">Upload Image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileSelect}
                                disabled={isUploading}
                            />
                        </label>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-2">
                                Upload a notice image (JPEG, PNG, JPG, GIF, WEBP - max 5MB)
                            </p>
                            {formValues.image && (
                                <p className="text-sm text-green-600 truncate mb-1">
                                    Image URL: {formValues.image}
                                </p>
                            )}
                            {isUploading && (
                                <p className="text-sm text-blue-600">Simulating upload... (Demo)</p>
                            )}
                        </div>
                    </div>

                    {/* Manual URL Input */}
                    <div className="flex space-x-2">
                        <FormInput
                            label="Or enter image URL manually"
                            placeholder="https://example.com/image.jpg"
                            value={manualUrl}
                            onChange={(e) => setManualUrl(e.target.value)}
                            isLoading={isLoading}
                            isCol={false}
                            className="flex-1"
                        />
                        <button
                            type="button"
                            onClick={handleManualUrlSubmit}
                            disabled={!manualUrl.trim() || isUploading}
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Set URL
                        </button>
                    </div>
                </div>

                {/* Short Description */}
                <Controller
                    name="short_des"
                    control={control}
                    render={({ field }) => (
                        <FormTextarea
                            label="Short Description"
                            placeholder="Enter short description"
                            id="short_des"
                            rows={3}
                            {...field}
                        />
                    )}
                />

                {/* Long Description */}
                <Controller
                    name="long_des"
                    control={control}
                    render={({ field }) => (
                        <FormTextarea
                            label="Long Description"
                            placeholder="Enter detailed description"
                            id="long_des"
                            rows={5}
                            {...field}
                        />
                    )}
                />

                {/* Price */}
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

                {/* Offer Price */}
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

                {/* Branches */}
                <Controller
                    name="branch_id"
                    control={control}
                    render={({ field }) => (
                        <FormSelect
                            label="Branches"
                            options={branchOptions}
                            selectedOption={branchOptions.filter(opt => field.value?.includes(opt.value))}
                            handleChange={(selectedOptions) =>
                                field.onChange(selectedOptions ? selectedOptions.map(opt => opt.value) : [])
                            }
                            isLoading={isLoading}
                            placeholder="Select branches"
                            isCol={true}
                            isMulti={true}
                            isSearchable={true}
                        />
                    )}
                />

                {/* Group */}
                <Controller
                    name="group"
                    control={control}
                    render={({ field }) => (
                        <FormSelect
                            label="Group"
                            options={groupOptions}
                            selectedOption={groupOptions.find(opt => opt.value === field.value)}
                            handleChange={(selectedOption) => field.onChange(selectedOption?.value)}
                            isLoading={isLoading}
                            placeholder="Select group"
                            isCol={true}
                            isSearchable={true}
                        />
                    )}
                />
            </div>
            <NotifyContainer />
        </CustomContainerModal>
    );
};

export default EditNoticeModal;