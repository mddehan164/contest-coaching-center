import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const FilterBox = ({
  courseBatchData = [],
  selectedCourse,
  setSelectedCourse,
  selectedBatch,
  setSelectedBatch,
  query,
  setQuery,
  onApply,
  onClose,
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

        {/* Course Dropdown */}
        <select
          className="border px-3 py-2 w-full mb-3"
          value={selectedCourse ?? ""} // keep controlled
          onChange={(e) => {
            const val = e.target.value === "" ? null : Number(e.target.value);
            setSelectedCourse(val);
          }}
        >
          <option value="">-- Select Course --</option>
          {courseBatchData.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* Batch Dropdown */}
        <select
          className="border px-3 py-2 w-full mb-3"
          value={selectedBatch ?? ""} // keep controlled
          onChange={(e) => {
            const val = e.target.value === "" ? null : Number(e.target.value);
            setSelectedBatch(val);
          }}
          disabled={!selectedCourse}
        >
          <option value="">-- Select Batch --</option>
          {selectedCourse &&
            courseBatchData
              .find((c) => c.id === selectedCourse)
              ?.batches.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
        </select>

        {/* Optional Search */}
        <div className="px-2 border flex items-center gap-2 mb-4">
          <IoSearch className="text-lg font-semibold" />
          <input
            type="text"
            placeholder="Optional search..."
            className="px-1 py-2 w-full focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={onApply}
          className="bg-headerColor hover:bg-headerColorHover text-white px-4 py-2 rounded w-full"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
