import { svgAssets } from "../../utils/getAssets"
import { cx } from "../../utils/helper"

const CustomDataNotFound = ({ title = "No data found!", text = "Oops! It looks like we couldn't find any data. Try adjusting your filters or search criteria.", imgClass = "", headingClass = "", textClass = "", containerClass = "" }) => {
    return (
        <div className={cx(containerClass, 'flex flex-col items-center justify-center col-span-6 my-10 md:mt-20 min-h-full')}>
            <img src={svgAssets.dataNotFound} alt="data not found" className={cx(imgClass, 'w-20 md:w-[128px] h-20 md:h-[128px]')} />
            <h1 className={cx(headingClass, 'text-text-disabled font-bold text-2xl md:text-[40px] leading-[120%] mt-6 text-center')}>{title}</h1>
            <p className={cx(textClass, 'mt-4 text-text-disabled text-sm md:text-base text-center')}>{text}</p>
        </div>
    )
}

export default CustomDataNotFound;
