import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cx } from '../../utils/helper';
import { ArrowBottomSvg } from '../../utils/svgs';
import SecondaryButton from '../buttons/SecondaryButton';

const CustomDatePicker = ({
  label = "Select Date",
  id,
  inputCss,
  selectedDate,
  setSelectedDate,
  datePickerDisabled = {},
  ...props
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);

  const handleSave = () => {
    setSelectedDate(tempSelectedDate);
    setIsPickerOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedDate(selectedDate); // reset to previously selected
    setIsPickerOpen(false);
  };

  return (
    <div className="relative w-[350px]">
      {/* Input Field */}
      {/* <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">{label}</label> */}
      <div
        className={cx(
          "flex items-center justify-between bg-white border border-gray-400 rounded-lg px-3 py-2 cursor-pointer",
          inputCss
        )}
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        <span className="text-sm text-gray-700">
          {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Select date"}
        </span>
        <div className={cx("transition-transform", isPickerOpen ? "rotate-180" : "rotate-0")}>
          <ArrowBottomSvg />
        </div>
      </div>

      {/* Date Picker Popup */}
      {isPickerOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-200 p-4">
          <DayPicker
            mode="single"
            selected={tempSelectedDate}
            onSelect={setTempSelectedDate}
            modifiersClassNames={{
              selected: 'bg-blue-500 text-white rounded-full',
              today: 'text-blue-600 font-bold',
            }}
            disabled={datePickerDisabled}
            pagedNavigation
            showOutsideDays
          />

          <div className="flex justify-between gap-2 mt-4">
            <button
              onClick={handleCancel}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <SecondaryButton
              text="Save"
              onClick={handleSave}
              width="flex-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
