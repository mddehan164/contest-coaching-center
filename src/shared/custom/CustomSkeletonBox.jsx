import { cx } from "../../utils/helper";

const SkeletonBox = ({ className }) => (
    <div className={cx("bg-gray-200 animate-pulse rounded", className)} />
);

export default SkeletonBox;