import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const PreviewNotice = () => {
  const { selectedData } = useSelector((state) => state.notice);
  const BASE_IMAGE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (selectedData) {
      console.log("📌 Selected Notice:", selectedData);
    }
  }, [selectedData]);

  return (
    <AnimatePresence mode="wait">
      {selectedData ? (
        <motion.div
          key={selectedData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-4 border rounded shadow bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">{selectedData.title}</h2>
          {/* PDF Preview */}
          <div className="w-full h-44 border">
            <iframe
              src={`${BASE_IMAGE_URL}${selectedData.file_url}`}
              title="PDF Preview"
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            📅 {new Date(selectedData.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            {selectedData.description || "No description available"}
          </p>

          {selectedData.file && selectedData.file_url && (
            <div className="w-full flex justify-around items-center flex-wrap">
              <a
                href={`${BASE_IMAGE_URL}/${selectedData.file_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 text-headerColor underline mt-2 block"
              >
                Preview
              </a>
              <a
                href={selectedData.file_url}
                download
                className="hover:text-blue-600 text-headerColor underline mt-2 block"
              >
                Download
              </a>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="no-notice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 text-gray-500 italic"
        >
          No notice selected yet...
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewNotice;
