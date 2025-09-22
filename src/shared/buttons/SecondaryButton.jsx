import { cx } from "../../utils/helper";
import { CircleLoading } from "../../utils/svgs";

const SecondaryButton = ({
  text,
  css,
  startIcon,
  endIcon,
  textCss,
  height,
  width,
  isOutlined = false,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cx(
        "rounded-[8px] text-base font-semibold outline-none trans disabled:cursor-not-allowed",
        isOutlined
          ? "border border-main-500 text-main-500 bg-transparent hover:border-main-500/80 hover:text-main-500/80 disabled:text-text-disabled disabled:border-text-disabled"
          : "bg-headerColorHover text-white border-none hover:bg-headerColor disabled:bg-text-disabled",
        (endIcon || startIcon || isLoading) && "f-center gap-x-2",
        height ? height : "h-[45px]",
        width ? width : "w-full md:w-[150px]",
        css
      )}
    >
      {isLoading ? (
        <CircleLoading />
      ) : (
        <>
          {startIcon && startIcon}
          {text ? <span className={cx(textCss)}>{text}</span> : null}
          {endIcon && endIcon}
        </>
      )}
    </button>
  );
};

export default SecondaryButton;
