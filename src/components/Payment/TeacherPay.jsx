import { teacherPaymentsData } from "../../data/payments";
import { useEffect, useState } from "react";
import FilterPerson from "../FilterPerson";
import { IoSearch } from "react-icons/io5";
import { useTeachers } from "../../hooks/useTeacher";
import CustomSpinner from "../../shared/custom/CustomSpinner";
import { usePayment } from "../../hooks/usePayment";
const TeacherPay = () => {
  const { isLoading, isError, dataList } = useTeachers();
  const { isBranchesLoading, branchOptions } = usePayment();

  const [query, setQuery] = useState(""); // search text
  const [searchTerm, setSearchTerm] = useState(""); // delayed value
  const [selectedBranch, setSelectedBranch] = useState(null);
  // debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(query);
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const validSearch = ["address", "name", "mobile", "gender", "subject"];

  // const validSearch = ["address", "name", "mobile", "gender", "subject"];

  const filteredData = dataList?.filter((item) => {
    if (selectedBranch != null && selectedBranch !== "") {
      const branchId = item.branch_id ?? item.branch?.id;
      if (branchId?.toString() !== selectedBranch.toString()) {
        return false;
      }
    }

    // Filter by search term (if any)
    if (searchTerm && searchTerm.trim() !== "") {
      // Check if any valid field contains the searchTerm
      const matchesSearch = Object.entries(item).some(([key, value]) => {
        if (!validSearch.includes(key)) return false;
        if (value == null) return false;
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      return matchesSearch;
    }

    // If no searchTerm, as long as status & branch pass, include
    return true;
  });

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

      <select
        className="py-2 sm:absolute top-5 right-[50%] px-3 border"
        value={selectedBranch || ""} // string হিসেবে রাখুন
        onChange={(e) => {
          const val = e.target.value === "" ? null : e.target.value;
          setSelectedBranch(val);
        }}
      >
        <option value="">
          {isBranchesLoading ? "Loading..." : "-- Select Branch --"}
        </option>
        {branchOptions.map((b, idx) => (
          <option key={idx} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>

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
