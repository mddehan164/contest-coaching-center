import { Controller } from "react-hook-form";
import { useEditNotice } from "@hooks/useNotice";
import { CustomContainerModal } from "@shared/custom";
import { FormInput, FormSelect, FormTextarea } from "@shared/forms";
import NotifyContainer from "../../utils/notify";
import CustomDatePicker from "@shared/custom/CustomDatePicker";

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
    handleFileSelect,
    imagePreview,
    isUploading,
  } = useEditNotice({ data });

  // Group options
  const groupOptions = [
    { value: 1, label: "Admission" },
    { value: 2, label: "Administration" },
    { value: 3, label: "Department" },
  ];

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
      <div className="my-10 space-y-5">
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
              ) : (imagePreview || formValues.file) ? (
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
              {(formValues.file || imagePreview) && (
                <div className="text-sm text-green-600 mb-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate">File: {imagePreview}</span>
                    {/* {data && data.file_url && !formValues.file && (
                      <a 
                        href={data.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:text-blue-700 text-xs underline"
                      >
                        View
                      </a>
                    )} */}
                  </div>
                  {data && data.file && !formValues.file && (
                    <span className="text-xs text-gray-500">
                      Current file - select a new file to replace
                    </span>
                  )}
                </div>
              )}
              {isUploading && (
                <p className="text-sm text-blue-600">
                  Uploading file...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* date Description */}
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

        {/* type Description */}
        {/* <Controller
          name="type_name"
          control={control}
          render={({ field }) => (
            <FormTextarea
              label="Type"
              placeholder="Enter Notice Type"
              id="type_name"
              rows={5}
              {...field}
            />
          )}
        /> */}

        {/* Price */}
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

        {/* Offer Price */}
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

        {/* Branches */}
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
              isLoading={isLoading}
              placeholder="Select branches"
              isCol={true}
              isMulti={true}
              isSearchable={true}
            />
          )}
        /> */}

        {/* Group */}
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

export default EditNoticeModal;
