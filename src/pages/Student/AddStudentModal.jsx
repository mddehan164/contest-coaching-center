import { Controller } from "react-hook-form";
import { useAddStudent } from "@hooks/useStudent";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect } from "@shared/forms";
import NotifyContainer from "../../utils/notify";
import { useState } from "react";

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
        formValues,
        isUploading,
        imagePreview,
        handleFileSelect,
        handleManualUrlInput,
    } = useAddStudent();

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
            onClose={handleCloseAddStudentModal}
            title="Add New Student"
            description="Enter student details"
            handler={handleSubmit(handleAddStudent)}
            actionBtnText="Create Student"
            isActionBtnDisabled={isActionBtnDisabled}
            isLoading={isLoading}
        >
            <div className="my-10 space-y-5">
                <Controller name="name" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} label="Student Name" placeholder="Enter name" {...field} />
                )} />



                <Controller name="course_id" control={control} render={({ field }) => (
                    <FormSelect
                        isCol={true}
                        label="Select Course"
                        options={courseOptions}
                        selectedOption={courseOptions.find(opt => opt.value === field.value)}
                        handleChange={(opt) => field.onChange(opt?.value)}
                        placeholder="Choose a course"
                        isSearchable={true}
                    />
                )} />

                <Controller name="batch_id" control={control} render={({ field }) => (
                    <FormSelect
                        isCol={true}
                        label="Select Batch"
                        options={batchesOptions}
                        selectedOption={batchesOptions.find(opt => opt.value === field.value)}
                        handleChange={(opt) => field.onChange(opt?.value)}
                        placeholder="Choose a batch"
                        isSearchable={true}
                    />
                )} />

                <Controller name="father_name" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} label="Father's Name" placeholder="Enter father's name" {...field} />
                )} />

                <Controller name="mother_name" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} label="Mother's Name" placeholder="Enter mother's name" {...field} />
                )} />

                <Controller name="gender" control={control} render={({ field }) => (
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
                )} />

                <Controller name="mobile" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} label="Mobile" placeholder="01712345678" {...field} />
                )} />

                <Controller name="address" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} label="Address" placeholder="Enter address" {...field} />
                )} />

                <Controller name="ssc_result" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} type="number" step="0.01" label="SSC Result" {...field} />
                )} />

                <Controller name="hsc_result" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} type="number" step="0.01" label="HSC Result" {...field} />
                )} />

                <Controller name="total_amount" control={control} render={({ field }) => (
                    <FormInput
                        isCol={true} type="number" label="Total Amount" {...field} />
                )} />

                <Controller name="status" isCol={true} control={control} render={({ field }) => (
                    <FormSelect
                        isCol={true}
                        label="Status"
                        options={[{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }]}
                        selectedOption={{ value: field.value, label: field.value === 1 ? "Active" : "Inactive" }}
                        handleChange={(opt) => field.onChange(opt.value)}
                    />
                )} />
                {/* Image Upload Field */}
                <div>
                    <label className="block text-sm font-medium text-text-600 mb-2">
                        Course Image *
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
                                Upload a course image (JPEG, PNG, JPG, GIF, WEBP - max 5MB)
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
            </div>
            <NotifyContainer />
        </CustomContainerModal>
    );
};

export default AddStudentModal;
