import { Link } from "react-router-dom";

const CustomCard = ({ data }) => {
  const { icon: Icon, name, link } = data;
  return (
    <>
      <Link
        to={`/dashboard/${link}`}
        className="border hover:border-0 flex flex-col items-center justify-around max-w-[280px] h-40 px-2 py-2 text-headerColorHover rounded-md hover:shadow-md hover:scale-105 transition-all duration-75"
      >
        <Icon className="text-3xl lg:text-5xl xl:text-7xl" />
        <h5 className="hover:text-contestRed hover:underline">{name}</h5>
      </Link>
    </>
  );
};

export default CustomCard;
