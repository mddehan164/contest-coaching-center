import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import FormInput from './FormInput';

const FormDatePicker = ({ label, id, inputCss, selectedDate, setSelectedDate, disabled, ...props }) => {

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);

    const handleSave = () => {
        setSelectedDate(tempSelectedDate);
        setIsPickerOpen(false);
    };

    const handleCancel = () => {
        setTempSelectedDate(null);
        setIsPickerOpen(false);
    };

    return (
        <div className='relative'>

            <FormInput
                label={label}
                id={id}
                value={selectedDate}
                readOnly
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                isChevron
                isPickerOpen={isPickerOpen}
                pickerHandler={() => setIsPickerOpen(!isPickerOpen)}
                {...props}
            />

            {isPickerOpen && (
                <div className="relative">
                    <div className="absolute z-10 bg-white border border-neutral-300 rounded-[8px] p-4 mt-2 right-0">
                        <DayPicker
                            mode="single"
                            selected={tempSelectedDate}
                            onSelect={setTempSelectedDate}
                            modifiersClassNames={{
                                selected: 'rdp-selected',
                            }}
                            showOutsideDays
                            disabled={disabled}
                        />
                        <div className="flex justify-between gap-x-6 mt-8">
                            <button
                                onClick={handleCancel}
                                className="py-3 bg-[#F5F8F7] text-text-600 rounded w-1/2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="py-3 bg-main-500 text-white rounded w-1/2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormDatePicker;