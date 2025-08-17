import MainBtn from "./mainBtn";
import { useNavigate } from "react-router-dom";

const Card = ({ data, btn }) => {
  const navigate = useNavigate();

  const handleClick = (btn) => {
    if (btn === "Details") {
      navigate(`/courses/${data.id}`);
    }
  };
  const bulletStyles = {
    circle: "list-disc",
    arrow: 'list-[">>"]',
    decimal: "list-decimal",
    roman: "list-[upper-roman]",
    alpha: "list-[upper-alpha]",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs max-sm:mx-auto  hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer xl:mt-6">
      {/* Title */}
      {data.noticeBtn && (
        <div className="bg-headerColor text-white font-bold text-center py-2 xl:text-xl">
          {data.title}
        </div>
      )}

      {/* Image */}
      {data.image && (
        <img
          src={data.image}
          alt="Card"
          className="w-full h-auto object-cover"
        />
      )}

      {/* Body List */}
      <div className="p-4 md:p-2 xl:p-4">
        <ul
          className={`${
            bulletStyles[data.bulletType || "circle"]
          } list-inside text-sm text-gray-700 space-y-1`}
        >
          {data.short_des.map((item, index) => (
            <li
              key={index}
              className={`${
                btn?.btnStyle.fontBold ? "sm:font-bold xl:font-extrabold" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        {data.offer ? (
          <p className="text-xs mt-4">
            <span className="line-through text-red-600 mr-1 sm:text-lg">
              {data.price && "৳"}
              {data.price}
            </span>{" "}
            &nbsp;
            <span className="text-headerColorHover font-semibold sm:text-lg">
              {data.price && "৳"}
              {data.offerPrice}{" "}
            </span>
          </p>
        ) : (
          <p className="text-xs mt-2 text-headerColorHover font-semibold sm:text-lg">
            {data.price && "৳"} &nbsp;{data.price}{" "}
          </p>
        )}
      </div>

      {/* Button (if needed below) */}
      <div className="p-4 w-full flex justify-between items-center">
        {btn?.btnStyle.btnStatus &&
          btn.btnName.map((name, idx) => (
            <MainBtn
              key={idx}
              data={name}
              btnStyle={btn.btnStyle}
              onClick={() => handleClick(name)}
            />
          ))}
      </div>
    </div>
  );
};

export default Card;
