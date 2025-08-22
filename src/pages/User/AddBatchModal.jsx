import { Controller } from 'react-hook-form';
import { useAddBatch } from '@hooks/useBatch';
import { CustomContainerModal } from '@shared/custom';
import { FormInput, FormSelect } from '@shared/forms';
import CustomDatePicker from '@shared/custom/CustomDatePicker';
import NotifyContainer from '../../utils/notify';

const AddBatchModal = () => {
    const {
        isAddModalOpen,
        handleCloseAddBatchModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleSubmit,
        handleAddBatch,
        courseOptions,
        isCoursesLoading,
        getStartDateDisabled,
        getEndDateDisabled,
        formValues, // Added formValues for dependency tracking
    } = useAddBatch();

    return (
        <CustomContainerModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddBatchModal}
            title="Add New Batch"
            description="Create a new batch for your course"
            handler={handleSubmit(handleAddBatch)}
            actionBtnText="Create Batch"
            isActionBtnDisabled={isActionBtnDisabled}
            isLoading={isLoading}
        >
            <div className='my-10 space-y-5'>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <FormInput
                            label="Batch Name"
                            placeholder="Enter batch name"
                            id="name"
                            isLoading={isLoading}
                            isCol={true}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="course_id"
                    control={control}
                    render={({ field }) => (
                        <FormSelect
                            label="Select Course"
                            options={courseOptions}
                            selectedOption={courseOptions.find(opt => opt.value === field.value)}
                            handleChange={(selectedOption) => field.onChange(selectedOption?.value)}
                            isLoading={isLoading || isCoursesLoading}
                            placeholder="Choose a course"
                            isCol={true}
                            isSearchable={true}
                        />
                    )}
                />

                <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label className="block text-sm font-medium text-text-600 mb-1">
                                Start Date
                            </label>
                            <CustomDatePicker
                                selectedDate={field.value}
                                setSelectedDate={field.onChange}
                                id="start_date"
                                isLoading={isLoading}
                                datePickerDisabled={getStartDateDisabled()}
                            />
                        </div>
                    )}
                />

                <Controller
                    name="end_date"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label className="block text-sm font-medium text-text-600 mb-1">
                                End Date
                            </label>
                            <CustomDatePicker
                                selectedDate={field.value}
                                setSelectedDate={field.onChange}
                                id="end_date"
                                isLoading={isLoading}
                                datePickerDisabled={getEndDateDisabled()}
                                key={formValues.start_date ? formValues.start_date.toString() : 'no-start-date'}
                            />
                        </div>
                    )}
                />

                {/* Status */}
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormSelect
                            label="Status"
                            options={[
                                { value: 1, label: "Active" },
                                { value: 0, label: "Inactive" },
                            ]}
                            selectedOption={{ value: field.value, label: field.value === 1 ? "Active" : "Inactive" }}
                            handleChange={(selectedOption) => field.onChange(selectedOption.value)}
                            isLoading={isLoading}
                            isCol={true}
                        />
                    )}
                />
            </div>
            <NotifyContainer />
        </CustomContainerModal>
    );
};

export default AddBatchModal;