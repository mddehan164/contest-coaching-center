import { Controller } from "react-hook-form";
import { useAddNotice } from "@hooks/useNotice";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect, FormTextarea } from "@shared/forms";
import ImageUpload from "../../shared/forms/ImageUpload";
import NotifyContainer from "../../utils/notify";
import CustomDatePicker from "@shared/custom/CustomDatePicker";

const AddNoticeModal = () => {
  const {
    isAddModalOpen,
    handleCloseAddNoticeModal,
    control,
    isActionBtnDisabled,
    isLoading,
    handleSubmit,
    handleAddNotice,
    getStartDateDisabled,
    formValues,
    branchOptions,
    isBranchesLoading,
    handleFileSelect,
    imagePreview,
    isUploading,
  } = useAddNotice();

  // Group options
  const groupOptions = [
    { value: 1, label: "Admission" },
    { value: 2, label: "Administration" },
    { value: 3, label: "Department" },
  ];

  return (
    <CustomContainerModal
      isOpen={isAddModalOpen}
      onClose={handleCloseAddNoticeModal}
      title="Add New Notice"
      description="Create a new notice with detailed information"
      handler={handleSubmit(handleAddNotice)}
      actionBtnText="Create Notice"
      isActionBtnDisabled={isActionBtnDisabled}
      isLoading={isLoading}
    >
      <div className="my-10 space-y-5">
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

        {/* File Upload Field */}
        <div>
          <label className="block text-sm font-medium text-text-600 mb-2">
            Notice File (Optional)
          </label>

          {/* File Upload Area */}
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              {isUploading ? (
                <div className="text-gray-500 text-sm">Uploading...</div>
              ) : imagePreview ? (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-green-500 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-green-600">File Selected</span>
                  </div>
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-500 text-center">
                    Upload File
                  </span>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </label>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Upload a notice file (PDF, DOC, DOCX, TXT, JPG, PNG - max 5MB)
              </p>
              {formValues.file && (
                <p className="text-sm text-green-600 truncate mb-1">
                  File: {imagePreview}
                </p>
              )}
              {isUploading && (
                <p className="text-sm text-blue-600">
                  Uploading file...
                </p>
              )}
            </div>
          </div>
        </div>

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              selectedDate={field.value}
              setSelectedDate={field.onChange}
              id="date"
              isLoading={isLoading}
            />
          )}
        />

        {/* <Controller
          name="long_des"
          control={control}
          render={({ field }) => (
            <FormTextarea
              label="Long Description"
              placeholder="Enter detailed description"
              id="long_des"
              isLoading={isLoading}
              rows={5}
              {...field}
            />
          )}
        /> */}

        {/* <Controller
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
        /> */}

        {/* <Controller
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
        /> */}

        {/* <Controller
          name="branch_id"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Branches"
              options={branchOptions}
              selectedOption={branchOptions.filter((opt) =>
                field.value?.includes(opt.value)
              )}
              handleChange={(selectedOptions) =>
                field.onChange(
                  selectedOptions ? selectedOptions.map((opt) => opt.value) : []
                )
              }
              isLoading={isLoading || isBranchesLoading}
              placeholder="Select branches"
              isCol={true}
              isMulti={true}
              isSearchable={true}
            />
          )}
        /> */}

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Type"
              options={groupOptions}
              selectedOption={groupOptions.find(
                (opt) => opt.value === field.value
              )}
              handleChange={(selectedOption) =>
                field.onChange(selectedOption?.value)
              }
              isLoading={isLoading}
              placeholder="Select Type"
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

export default AddNoticeModal;
