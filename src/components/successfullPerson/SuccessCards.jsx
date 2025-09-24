import MainBtn from "../MainBtn";
import { NavLink } from "react-router-dom";
import { useReviews } from "../../hooks/useReview";
import CustomSpinner from "../../shared/custom/CustomSpinner";
import Stats from "../stats/Stats";

const SuccessCards = () => {
  const { isLoading, isError, dataList } = useReviews();
  console.log(dataList);
  const btnData = {
    btnName: ["See More"],
    btnStyle: {
      btnBgColor: "headerColor",
      btnHoverColor: "headerColorHover",
    },
  };

  const someSuccess = dataList?.slice(0, 4);

  return (
    <div className="w-full relative">
      <h1 className="w-full text-xl font-bold text-center my-6 text-headerColorHover sm:text-3xl md:text-2xl md:mt-12 lg:mt-16 xl:text-3xl">
        সফল শিক্ষার্থীদের গল্প
      </h1>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <CustomSpinner />
        </div>
      ) : !isError ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-12">
          {someSuccess.map((stat, index) => (
            <Stats stat={stat} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-xl text-red-500 italic">Something went wrong!</h2>
        </div>
      )}
      <div className="w-full flex justify-end items-center absolute xl:-bottom-20 xl:right-20 max-sm:-bottom-10 max-sm:right-2 sm:-bottom-16 md:right-2">
        <NavLink to="/all-success">
          <MainBtn data={btnData.btnName} btnStyle={btnData.btnStyle} />
        </NavLink>
      </div>
    </div>
  );
};

export default SuccessCards;
