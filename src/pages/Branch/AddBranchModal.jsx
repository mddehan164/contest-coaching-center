import { Controller } from "react-hook-form";
import { useAddBranch } from "@hooks/useBranch";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect, FormTextarea } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";

const AddBranchModal = () => {
    const {
        isAddModalOpen,
        handleCloseAddBranchModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleSubmit,
        handleAddBranch,
        formValues,
        isUploading,
        imagePreview,
        handleFileSelect,
        handleManualUrlInput,
    } = useAddBranch();

    return (
        <CustomContainerModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddBranchModal}
            title="Add New Branch"
            description="Enter branch details"
            handler={handleSubmit(handleAddBranch)}
            actionBtnText="Create Branch"
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
                            label="Branch Name" 
                            placeholder="Enter branch name" 
                            {...field} 
                        />
                    )} 
                />

                <Controller 
                    name="location" 
                    control={control} 
                    render={({ field }) => (
                        <FormInput
                            isCol={true} 
                            label="Location" 
                            placeholder="Enter branch location" 
                            {...field} 
                        />
                    )} 
                />

                <Controller 
                    name="description" 
                    control={control} 
                    render={({ field }) => (
                        <FormTextarea
                            isCol={true} 
                            label="Description" 
                            placeholder="Enter branch description" 
                            rows={4}
                            {...field} 
                        />
                    )} 
                />

                <Controller 
                    name="status" 
                    control={control} 
                    render={({ field }) => (
                        <FormSelect
                            isCol={true}
                            label="Status"
                            options={[
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                            selectedOption={{ value: field.value, label: field.value === "active" ? "Active" : "Inactive" }}
                            handleChange={(opt) => field.onChange(opt.value)}
                        />
                    )} 
                />

                {/* Image Upload Field */}
                <div>
                    <label className="block text-sm font-medium text-text-600 mb-2">
                        Branch Image
                    </label>

                    {/* Image Upload */}
                    <ImageUpload
                        name="image"
                        control={control}
                        label="Branch Image"
                        module="branch"
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

export default AddBranchModal;
