import { forwardRef, useCallback } from "react";
import { cx } from "../../utils/helper";

export const commonInputCss = "w-full border border-neutral-400 rounded-lg py-2.5 px-3 outline-none text-text-700 placeholder:text-neutral-400 bg-white disabled:bg-text-disabled disabled:cursor-not-allowed disabled:opacity-50 disabled:placeholder:text-main-black";

const FormInput = forwardRef(({
    label, labelCss, type = "text", id, inputCss, isCol = false, isPricingField = false, isLoading = false, skeletonClassName, ...props
}, ref) => {

    // Prevent invalid characters such as 'e', '.', '+', '-', and ',' from being entered
    const handleKeyDown = useCallback((e) => {
        const invalidChars = isPricingField ? ['e', 'E', '+', '-', ','] : ['e', 'E', '+', '.', '-', ','];
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    }, [isPricingField]);

    return (
        <div className={cx(
            'relative', isCol ? "flex flex-col gap-y-1" : "flex flex-row items-center gap-x-2 lg:gap-x-4",
        )}>
            {label && (
                <label htmlFor={id} className={cx(
                    "text-text-900 text-sm text-medium",
                    isCol ? "" : "min-w-[124px]",
                    labelCss
                )}>
                    {label}
                </label>
            )}

            {isLoading ? (
                <div className={cx("h-[45px] w-full bg-gray-300 animate-pulse rounded-lg text-gray-300 select-none", skeletonClassName)}>
                    asd
                </div>
            ) : (
                <input
                    type={type}
                    name={id}
                    id={id}
                    ref={ref}
                    {...props}
                    className={cx(
                        commonInputCss,
                        inputCss,
                    )}
                    onKeyDown={type === 'number' ? handleKeyDown : undefined}
                />
            )}

        </div>
    );
});

export default FormInput;