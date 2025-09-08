import { useState } from "react";
import { listDetails } from "../../data/studentData";
import { studentPaymentsData } from "../../data/payments";
import FilterPerson from "../FilterPerson";
import FilterBox from "../FilterBox";

// Numeric IDs
const courseBatchData = [
  {
    id: 1,
    title: "Web Development",
    batches: [
      { id: 1, title: "Batch A" },
      { id: 2, title: "Batch B" },
      { id: 3, title: "Batch C" },
    ],
  },
  {
    id: 2,
    title: "Graphic Design",
    batches: [
      { id: 4, title: "Batch 1" },
      { id: 5, title: "Batch 2" },
    ],
  },
  {
    id: 3,
    title: "Data Science",
    batches: [
      { id: 6, title: "Batch X" },
      { id: 7, title: "Batch Y" },
    ],
  },
];

const StudentPay = () => {
  const [data] = useState([...listDetails]);

  // popup controller
  const [showPopup, setShowPopup] = useState(true);
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  // MAIN state (applied filter)
  const [courseId, setCourseId] = useState(null);
  const [batchId, setBatchId] = useState(null);
  const [search, setSearch] = useState("");

  // DRAFT state (inside popup)
  const [draftCourse, setDraftCourse] = useState(null);
  const [draftBatch, setDraftBatch] = useState(null);
  const [draftQuery, setDraftQuery] = useState("");

  // filter logic uses MAIN state only
  const filteredData = data.filter((item) => {
    const matchCourse = courseId ? item.course_id === courseId : true;
    const matchBatch = batchId ? item.batch_id === batchId : true;
    const matchSearch = search
      ? Object.entries(item).some(([key, value]) => {
          if (key === "id") return false;
          const str = value?.toString?.().toLowerCase?.();
          return str ? str.includes(search.toLowerCase()) : false;
        })
      : true;

    return matchCourse && matchBatch && matchSearch;
  });

  return (
    <div className="relative pt-20">
      {/* Sticky Button */}
      {showStickyBtn && (
        <button
          onClick={() => {
            // prefill drafts from MAIN
            setDraftCourse(courseId);
            setDraftBatch(batchId);
            setDraftQuery(search);
            setShowPopup(true);
            setShowStickyBtn(false);
          }}
          className="fixed top-20 right-5 bg-headerColorHover hover:bg-headerColor text-white px-4 py-2 rounded shadow-lg z-50"
        >
          Select Course & Batch
        </button>
      )}

      {/* Popup Box */}
      {showPopup && (
        <FilterBox
          courseBatchData={courseBatchData}
          selectedCourse={draftCourse}
          setSelectedCourse={setDraftCourse}
          selectedBatch={draftBatch}
          setSelectedBatch={setDraftBatch}
          query={draftQuery}
          setQuery={setDraftQuery}
          onApply={() => {
            // Apply → draft -> MAIN
            setCourseId(draftCourse ?? null);
            setBatchId(draftBatch ?? null);
            setSearch(draftQuery || "");
            setShowPopup(false);
            setShowStickyBtn(true);
          }}
          onClose={() => {
            // Close → RESET BOTH draft & MAIN
            setDraftCourse(null);
            setDraftBatch(null);
            setDraftQuery("");
            setCourseId(null);
            setBatchId(null);
            setSearch("");
            setShowPopup(false);
            setShowStickyBtn(true);
          }}
        />
      )}

      {/* Filtered Student List */}
      <div className="flex flex-wrap gap-3 justify-center">
        <FilterPerson
          dataList={filteredData}
          paymentData={studentPaymentsData}
          person="student"
        />
      </div>
    </div>
  );
};

export default StudentPay;
