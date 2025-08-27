import Select from 'react-select';
import { cx } from '@utils/helper';

const FormSelect = ({
    options, selectedOption, handleChange, label, labelCss, placeholder, isMulti = false, isCol = false, isLoading = false, skeletonClassName, isDisabled = false,
}) => {
    return (
        <div className={cx(
            isCol ? "flex flex-col gap-y-1" : "flex flex-row items-center gap-x-2 lg:gap-x-4",
        )}>
            <label className={cx(
                "text-text-900 text-sm text-medium",
                isCol ? "" : "min-w-[124px]",
                labelCss
            )}>
                {label}
            </label>

            {isLoading ? (
                <div className={cx("h-[45px] w-full bg-gray-300 animate-pulse rounded-lg text-gray-300 select-none", skeletonClassName)}>
                    asd
                </div>
            ) : (
                <div className='flex-1'>
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                        styles={customStyles}
                        placeholder={placeholder}
                        classNamePrefix="react-select"
                        isMulti={isMulti}
                        isDisabled={isDisabled}
                    />
                </div>
            )}
        </div>
    );
};

export default FormSelect;


const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '8px',
        padding: '0px',
        marginTop: '4px',
        width: '100%',
        height: '45px',
        borderColor: '#D4D4D4', // Equivalent to border-neutral-300
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        '&:hover': {
            borderColor: '#D4D4D4', // Keep the border color the same on hover
        },
        cursor: 'pointer',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '8px',
        overflow: 'hidden',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
        '::-webkit-scrollbar': {
            width: '3px',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
        backgroundColor: state.isSelected ? '#4FAAFD' : '#FFF',
        color: state.isSelected ? '#FFF' : '#4F4F4F',
        '&:hover': {
            backgroundColor: state.isSelected ? '' : '#F0F0F0',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#4F4F4F',
    }),
    indicatorSeparator: () => ({
        display: 'none', // Remove the vertical bar
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#4F4F4F', // Change the chevron color
        '&:hover': {
            color: '#4F4F4F', // Keep the chevron color the same on hover
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#E2E2E2', // Change the background color of selected items
        borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#888888', // Change the text color of selected items
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#353535', // Change the color of the remove icon
        '&:hover': {
            backgroundColor: 'transparent', // Change the background color on hover
            color: '#353535', // Change the icon color on hover
        },
    }),
};