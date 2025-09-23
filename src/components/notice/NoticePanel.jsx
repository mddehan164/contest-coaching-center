import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import PreviewNotice from "./PreviewNotice";
import CustomSpinner from "../../shared/custom/CustomSpinner";
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_URL;

const NoticePanel = ({ notices, onSelect, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5; // প্রতি পেজে কয়টা notice দেখাবে

  if (loading || !notices || notices.length === 0) {
    return (
      <p className="text-sm text-gray-500 p-2">কোনো নোটিশ পাওয়া যায়নি।</p>
    );
  }

  // Pagination calculation
  const indexOfLast = currentPage * noticesPerPage;
  const indexOfFirst = indexOfLast - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(notices.length / noticesPerPage);

  // তারিখ format function
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full">
      {/* Notice list */}
      <div className="flex gap-2 flex-wrap md:flex-nowrap md:justify-between">
        <div className="overflow-auto max-sm:h-60 sm:h-72 lg:h-80 xl:h-96 w-full md:w-[50%] lg:w-[62%]">
          {currentNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onSelect(notice)}
              className="text-xs flex justify-start items-center gap-2 p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer md:text-lg lg:text-base xl:text-lg"
            >
              <FaFilePdf className="text-headerColor text-sm flex-shrink-0 md:text-lg" />
              <span>
                <p>
                  {notice.title} -{" "}
                  <span className="text-headerColor">
                    {formatDate(notice.date)}
                  </span>
                </p>

                {/* PDF preview + download */}
                {notice.file_url && (
                  <div className="flex gap-3 mt-1">
                    {/* Preview in new tab */}
                    <a
                      href={`${BASE_IMAGE_URL}${notice?.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs underline"
                    >
                      Preview
                    </a>

                    {/* Force download */}
                    <a
                      href={`${notice?.file_url}`}
                      download
                      className="text-green-600 text-xs underline"
                    >
                      Download
                    </a>
                  </div>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Right side: Selected Notice */}
        <div className="w-full md:w-[48%] lg:w-[35%] p-2 lg:p-5 rounded">
          {loading && <CustomSpinner />}
          {!loading && (
            <div className="w-full m-auto">
              <PreviewNotice />
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-headerColor text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticePanel;
