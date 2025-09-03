import PaymentCard from "../PaymentCard";
import { listDetails } from "../../data/studentData";
import { studentPaymentsData } from "../../data/payments";
import { useEffect, useState } from "react";
import PaymentDetails from "../PaymentDetails";
import PaymentAdd from "../PaymentAdd";
import FilterPerson from "../FilterPerson";
import { IoSearch } from "react-icons/io5";
const StudentPay = () => {
  const [query, setQuery] = useState(""); // search text
  const [data] = useState([...listDetails]); // student list
  const [searchTerm, setSearchTerm] = useState(""); // delayed value

  // debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(query);
    }, 800); // 1.5s delay

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const filteredData = data.filter((item) =>
    Object.entries(item).some(
      ([key, value]) =>
        key !== "id" &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div className={`flex flex-wrap gap-3 justify-center relative pt-20`}>
      <div className="px-2 border lg:w-[20%] w-20 flex items-center gap-2 absolute top-3 right-3">
        <IoSearch className="text-lg font-semibold" />
        <input
          type="text"
          placeholder="Quick Search..."
          className="px-1 py-3 w-full focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <FilterPerson dataList={filteredData} person="student" />
    </div>
  );
};

export default StudentPay;
