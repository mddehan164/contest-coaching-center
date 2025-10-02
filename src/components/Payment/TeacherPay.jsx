import { teacherPaymentsData } from "../../data/payments";
import { useEffect, useState } from "react";
import FilterPerson from "../FilterPerson";
import { IoSearch } from "react-icons/io5";
import { useTeachers } from "../../hooks/useTeacher";
import CustomSpinner from "../../shared/custom/CustomSpinner";
const TeacherPay = () => {
  const { isLoading, isError, dataList } = useTeachers();
  const [query, setQuery] = useState(""); // search text
  const [searchTerm, setSearchTerm] = useState(""); // delayed value

  // debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(query);
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const validSearch = ["address", "name", "mobile", "gender", "subject"];

  const filteredData = dataList?.filter((item) =>
    Object.entries(item).some(
      ([key, value]) =>
        // check that key is in validSearch
        validSearch.includes(key) &&
        // then check if value contains searchTerm
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={`flex flex-wrap gap-3 justify-center relative pt-20`}>
      <div className="px-2 border lg:w-[20%] w-40 flex items-center gap-2 absolute top-3 right-3">
        <IoSearch className="text-lg font-semibold" />
        <input
          type="text"
          placeholder="Quick Search..."
          className="px-1 py-3 w-full focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div>
          <CustomSpinner />
        </div>
      ) : isError ? (
        <div className="text-red-500">Something went wrong!</div>
      ) : (
        <FilterPerson
          dataList={filteredData}
          paymentData={teacherPaymentsData}
          person="teacher"
        />
      )}
    </div>
  );
};

export default TeacherPay;
