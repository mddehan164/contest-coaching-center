import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';
import { cx } from '../../utils/helper';
import { ArrowBottomSvg } from '../../utils/svgs';
import { svgAssets } from '../../utils/getAssets';

const CustomHeadlessDropdown = ({
    itemsArray = [], menuItemsCss, menuItemCss, title = "Select One", label = "Showing:", handler, inputCss, chevronCss, ...props
}) => {
    return (
        <div className="relative max-w-[173px] min-w-[173px]">


            <Menu>
                {({ open }) => (<>
                    <MenuButton className="flex items-center h-max cursor-pointer">
                        {label && (
                            <label className="text-text-600 cursor-pointer text-sm mr-1">
                                {label}
                            </label>
                        )}
                        <input
                            type="text"
                            className={cx(
                                "cursor-pointer capitalize text-sm font-bold text-text-700 outline-none w-[88px]",
                            )}
                            readOnly
                            {...props}
                        />

                        <div className={cx(
                            'trans',
                            open ? 'transform rotate-180' : 'transform rotate-0',
                            chevronCss,
                        )}>
                            <ArrowBottomSvg />
                        </div>
                    </MenuButton>

                    {open && (
                        <div className=' '>
                            <img src={svgAssets.polygon} alt="polygon-indicator" className={cx(
                                'w-4 h-2 absolute transform shadow-lg z-10 bg-gray-100/10 right-5 -bottom-3',
                            )} />
                        </div>
                    )}

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className={cx(
                            "w-[168px] origin-top-right rounded-lg shadow-lg bg-white mt-3 text-sm transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0",
                            menuItemsCss,
                        )}
                    >
                        {itemsArray.map((item, index) => (
                            <React.Fragment key={index}>
                                <MenuItem>
                                    <button
                                        onClick={() => handler(item)}
                                        className={cx(
                                            "text-text-700 hover:bg-main-500 trans w-full text-left py-2 hover:text-white px-3",
                                            menuItemCss
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                </MenuItem>
                                {index < itemsArray.length - 1 && (
                                    <div className={cx("border-neutral-300 border-t")}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </MenuItems>
                </>)}
            </Menu>
        </div>
    );
};

export default CustomHeadlessDropdown;