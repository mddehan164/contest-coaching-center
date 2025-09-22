import { persons } from "../data/payments";
import { QuickStat } from "../components";
import { Link } from "react-router-dom";

const Payments = () => {
  return (
    <div className="w-full mt-20 ">
      <h1 className="text-center text-2xl font-semibold text-headerColorHover my-5 xl:mb-10 xl:text-3xl">
        Select a Option
      </h1>

      <div className="w-full flex justify-center flex-wrap gap-2 sm:gap-4">
        {persons.map((person, index) => (
          <div
            key={index}
            className="aspect-3/2 w-[48%] sm:w-[30%] md:w-[23%] lg:w-[14%] p-1 rounded-md cursor-pointer"
          >
            <Link to={`/dashboard/${person.link}`}>
              <QuickStat data={person} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
