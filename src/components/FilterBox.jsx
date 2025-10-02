import { IoMdClose } from "react-icons/io";

const FilterBox = ({
  courseBatchData = [],
  selectedCourse,
  setSelectedCourse,
  selectedBatch,
  setSelectedBatch,
  onApply,
  onClose,
  loading,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onClose} // backdrop click
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          aria-label="Close"
        >
          <IoMdClose size={22} />
        </button>

        <h2 className="text-lg font-bold mb-4">Select Course & Batch</h2>

        {/* Course Dropdown - এখানে encrypted_id ব্যবহার করুন */}
        <select
          className="border px-3 py-2 w-full mb-3"
          value={selectedCourse || ""} // string হিসেবে রাখুন
          onChange={(e) => {
            const val = e.target.value === "" ? null : e.target.value;
            setSelectedCourse(val);
          }}
        >
          <option value="">
            {loading.courses ? "Loading..." : "-- Select Course --"}
          </option>
          {courseBatchData.map((c) => (
            <option key={c.encrypted_id} value={c.encrypted_id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* Batch Dropdown */}
        <select
          className="border px-3 py-2 w-full mb-3"
          value={selectedBatch || ""} // string হিসেবে রাখুন
          onChange={(e) => {
            const val = e.target.value === "" ? null : e.target.value;
            setSelectedBatch(val);
          }}
          disabled={!selectedCourse}
        >
          <option value="">
            {loading.batches ? "Loading..." : "-- Select Batch --"}
          </option>
          {selectedCourse &&
            courseBatchData
              .find((c) => c.encrypted_id === selectedCourse)
              ?.batches.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
        </select>

        {/* Optional Search */}
        {/* <div className="px-2 border flex items-center gap-2 mb-4">
          <IoSearch className="text-lg font-semibold" />
          <input
            type="text"
            placeholder="Optional search..."
            className="px-1 py-2 w-full focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div> */}

        {/* Apply Button */}
        <button
          onClick={onApply}
          disabled={!selectedCourse || !selectedBatch}
          className={`px-4 py-2 rounded w-full ${
            selectedCourse && selectedBatch
              ? "bg-headerColor hover:bg-headerColorHover text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
