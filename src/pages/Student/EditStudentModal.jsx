import { Controller } from 'react-hook-form';
import { useEditStudent } from '@hooks/useStudent';
import { CustomContainerModal } from '@shared/custom';
import { FormInput, FormSelect } from '@shared/forms';
import CustomDatePicker from '@shared/custom/CustomDatePicker';
import { useGetAllCoursesQuery } from '../../redux-rtk/course';
import NotifyContainer from '../../utils/notify';

const EditStudentModal = ({ data }) => {
    const {
        isEditModalOpen,
        handleCloseEditStudentModal,
        control,
        isActionBtnDisabled,
        isLoading,
        handleUpdate,
        handleSubmit,
        getStartDateDisabled,
        getEndDateDisabled,
        formValues, // Added formValues for dependency tracking
    } = useEditStudent({ data });

    // Fetch courses for dropdown
    const { data: coursesData, isLoading: isCoursesLoading } = useGetAllCoursesQuery({ page: 1, limit: 100 });
    const courseOptions = coursesData?.data?.courses?.map(course => ({
        value: course.id,
        label: course.title,
    })) || [];

    return (
        <CustomContainerModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditStudentModal}
            title="Edit Student"
            description="Update student details easily"
            handler={handleSubmit(handleUpdate)}
            actionBtnText="Update Student"
            isActionBtnDisabled={isActionBtnDisabled}
            isLoading={isLoading}
        >
            <div className='my-10 space-y-5'>
                {/* Student Name */}
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

                {/* Select Course */}
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

                {/* Start Date */}
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

                {/* End Date */}
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

export default EditStudentModal;