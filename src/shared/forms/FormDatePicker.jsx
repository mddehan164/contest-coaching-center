import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import FormInput from "./FormInput";

const FormDatePicker = ({
  label,
  id,
  inputCss,
  selectedDate,
  setSelectedDate,
  disabled,
  ...props
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  //   const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);

  //   const handleSave = () => {
  //     setSelectedDate(tempSelectedDate);
  //     setIsPickerOpen(false);
  //   };

  //   const handleCancel = () => {
  //     setTempSelectedDate(null);
  //     setIsPickerOpen(false);
  //   };

  return (
    <div className="relative">
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
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setIsPickerOpen(false);
              }}
              modifiersClassNames={{
                selected: "rdp-selected",
              }}
              showOutsideDays
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDatePicker;
