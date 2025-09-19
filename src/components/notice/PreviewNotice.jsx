import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const PreviewNotice = () => {
  const { selectedData } = useSelector((state) => state.notice);
  const BASE_IMAGE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <AnimatePresence mode="wait">
      {selectedData ? (
        <motion.div
          key={selectedData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-4 rounded shadow bg-white"
        >
          {/* PDF Preview */}
          <div className="w-full h-52 ">
            <iframe
              src={`${BASE_IMAGE_URL}${selectedData?.file_url}`}
              title="PDF Preview"
              className="w-full h-full object-contain "
              loading="lazy"
            ></iframe>
          </div>
          <h2 className="text-lg font-semibold mb-2">{selectedData.title}</h2>

          <p className="text-sm text-gray-600 mb-1">
            Published: {new Date(selectedData.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            Created From : {selectedData.branch.name || "Not available"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="no-notice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 text-gray-500 italic m-auto"
        >
          Select a notice for preview...
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewNotice;
