import React, { useEffect, useRef, useState } from 'react';
import { ChevronBottomSvg, DragSvg, PencilSvg } from '../../utils/svgs';
import { cx } from '../../utils/helper';

const CustomAccordion = ({ title, children, onClick, activeIndex, onEditClick, isEdit = true }) => {
    return (
        <div className='p-4 lg:p-6 border border-neutral-300 rounded-xl cursor-pointer' onClick={onClick}>
            <div className="flex items-center justify-between w-full "  >
                <div className='flex items-center gap-x-4'>
                    <button>
                        <DragSvg />
                    </button>
                    <p className='text-text-700 text-base lg:text-xl font-bold'>
                        {title}
                    </p>
                </div>
                <div className={cx(
                    isEdit && 'flex items-center gap-x-4',
                )}>
                    {isEdit ? (<button onClick={(e) => onEditClick(e)}>
                        <PencilSvg />
                    </button>) : null}

                    <div className={cx(activeIndex ? 'rotate-180' : '', 'trans')}>
                        <ChevronBottomSvg w='24' h='24' />
                    </div>
                </div>
            </div>

            <AccordionContent isOpen={activeIndex}>
                {children}
            </AccordionContent>
        </div>
    );
};

export default CustomAccordion;

// content
const AccordionContent = ({ isOpen, children }) => {

    const contentRef = useRef(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }, [isOpen]);

    return (
        <div
            ref={contentRef}
            style={{ maxHeight: height }}
            className={cx("transition-max-height duration-500 ease-in-out overflow-hidden cursor-default")}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
};