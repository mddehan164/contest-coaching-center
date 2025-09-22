import { SecondaryButton } from "@shared/buttons";
import { cx } from "@utils/helper";
import { X } from "lucide-react";

const CustomContainerModal = ({
  secondaryBtnWidth = "w-[150px]",
  isOpen,
  onClose,
  containerCls,
  title,
  description,
  titleCls,
  children,
  handler,
  actionBtnText = "Save",
  isActionBtnDisabled = false,
  isLoading = false,
  isActionBtnRequired = true,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto message-scrollbar">
      <div
        className="flex justify-center pt-10 pb-10 h-auto"
        onClick={handleBackdropClick} // <-- move here
      >
        <div
          className={cx(
            "bg-white rounded-2xl w-full md:w-[576px] lg:w-[900px] xl:w-[1200px] p-4 md:px-10 md:py-[60px] relative gap-10 mx-4 md:mx-0 h-auto",
            containerCls
          )}
          style={{
            boxShadow: `0px 0px 40px 0px rgba(0, 0, 0, 0.05), 0px 9px 40px 0px rgba(0, 0, 0, 0.15)`,
          }}
        >
          {isActionBtnRequired && (
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-5 right-5 p-2 cursor-pointer rounded hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={24} />
            </button>
          )}

          {title && (
            <center className="space-y-3">
              <h3
                className={cx(
                  "text-text-800 font-bold leading-[110%] text-xl md:text-4xl text-headerColorHover",
                  titleCls
                )}
              >
                {title}
              </h3>
              <p className="text-text-700 leading-[150%]">{description}</p>
            </center>
          )}
          {children}

          {isActionBtnRequired && (
            <div className="flex justify-end gap-x-4 mt-6">
              <SecondaryButton
                text={actionBtnText}
                width={secondaryBtnWidth}
                onClick={handler}
                disabled={isActionBtnDisabled}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomContainerModal;
