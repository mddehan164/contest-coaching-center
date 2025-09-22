import { customiseData } from "../data/customiseData";
import CustomCard from "./CustomCard";

const Customise = () => {
  return (
    <div className="w-full">
      <h1 className="text-center text-headerColorHover text-xl xl:text-3xl mb-8">
        Customise You Main Ui of Webpage
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 mx-auto px-1 sm:px-5 md:px-10 lg:px-20 xl:px-36">
        {customiseData.map((card, idx) => (
          <CustomCard key={idx} data={card} />
        ))}
      </div>
    </div>
  );
};

export default Customise;
