import { useNavigate } from "react-router-dom";
import MainBtn from "./MainBtn";

/**
 * Card component for displaying course information
 * @param {Object} props - Component props
 * @param {Object} props.data - Course data object
 * @param {Object} props.btn - Button configuration
 * @returns {JSX.Element} Rendered card component
 */
const Card = ({ data, btn }) => {
  const navigate = useNavigate();

  /**
   * Handles button click events
   * @param {string} buttonName - Name of the clicked button
   */
  const handleButtonClick = (buttonName) => {
    if (buttonName === "Details") {
      navigate(`/courses/${data.id}`);
    }
  };

  /**
   * CSS classes for different bullet point styles
   */
  const bulletStyles = {
    circle: "list-disc",
    arrow: 'list-[">>"]',
    decimal: "list-decimal",
    roman: "list-[upper-roman]",
    alpha: "list-[upper-alpha]",
  };

  /**
   * Renders price information with proper formatting
   * @returns {JSX.Element|string} Formatted price display
   */
  const renderPrice = () => {
    if (data.offer) {
      return (
        <p className="text-xs mt-4">
          <span className="line-through text-red-600 mr-1 sm:text-lg">
            {data.price && "৳"}
            {data.price}
          </span>
          <span className="text-headerColorHover font-semibold sm:text-lg">
            {data.offerPrice && "৳"}
            {data.offerPrice}
          </span>
        </p>
      );
    }

    return (
      <p className="text-xs mt-2 text-headerColorHover font-semibold sm:text-lg">
        {data.price && "৳"}
        {data.price}
      </p>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs max-sm:mx-auto hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer xl:mt-6">
      {/* Title Header */}
      {data.noticeBtn && (
        <div className="bg-headerColor text-white font-bold text-center py-2 xl:text-xl">
          {data.title}
        </div>
      )}

      {/* Course Image */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title || "Course Image"}
          className="w-full h-auto object-cover"
        />
      )}

      {/* Course Content */}
      <div className="p-4 md:p-2 xl:p-4">
        {/* Course Title (if not in header) */}
        {!data.noticeBtn && data.title && (
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {data.title}
          </h3>
        )}

        {/* Course Description */}
        <ul
          className={`${
            bulletStyles[data.bulletType || "circle"]
          } list-inside text-sm text-gray-700 space-y-1`}
        >
          {(data.short_des || []).map((item, index) => (
            <li
              key={index}
              className={
                btn?.btnStyle?.fontBold ? "sm:font-bold xl:font-extrabold" : ""
              }
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Price Section */}
        {renderPrice()}
      </div>

      {/* Action Buttons */}
      {btn?.btnStyle?.btnStatus && btn.btnName && (
        <div className="p-4 w-full flex justify-between items-center">
          {btn.btnName.map((name, idx) => (
            <MainBtn
              key={idx}
              data={name}
              btnStyle={btn.btnStyle}
              onClick={() => handleButtonClick(name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
