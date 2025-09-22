import clsx from "clsx";
import { X } from "lucide-react";

export default function ViewDetails({
  data,
  isOpen,
  onClose,
  title = "View Details",
  fieldsToShow = null,
}) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!data || typeof data !== "object") {
    return null;
  }

  // Function to get nested value from object using dot notation
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // Function to format field names
  const formatFieldName = (key) => {
    return key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/\./g, " ")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Function to format values based on type
  const formatValue = (value, key) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">Not provided</span>;
    }

    // Handle images
    if (
      (key.toLowerCase().includes("img") ||
        key.toLowerCase().includes("image") ||
        key.toLowerCase().includes("photo")) &&
      typeof value === "string" &&
      value.startsWith("http")
    ) {
      return (
        <div className="flex flex-col gap-3 col-span-1 md:col-span-2">
          <img
            src={value}
            alt="Preview"
            className="w-full max-w-sm h-48 object-cover rounded-lg border mx-auto"
          />
          <div className="text-center space-y-2">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm block"
            >
              View Full Size
            </a>
          </div>
        </div>
      );
    }

    // Handle URLs
    if (
      typeof value === "string" &&
      (value.startsWith("http://") || value.startsWith("https://"))
    ) {
      return (
        <div className="space-y-1">
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm font-medium block"
          >
            Open Link
          </a>
          <p className="text-xs text-gray-600 break-all font-mono bg-gray-100 p-2 rounded">
            {value}
          </p>
        </div>
      );
    }

    // Handle emails
    if (
      typeof value === "string" &&
      value.includes("@") &&
      value.includes(".")
    ) {
      return (
        <div className="space-y-1">
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Send Email
          </a>
          <p className="text-sm text-gray-700">{value}</p>
        </div>
      );
    }

    // Handle phone numbers
    if (typeof value === "string" && /^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
      return (
        <div className="space-y-1">
          <a
            href={`tel:${value}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Call Now
          </a>
          <p className="text-sm text-gray-700">{value}</p>
        </div>
      );
    }

    // Handle dates
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      try {
        const date = new Date(value);
        return (
          <div className="flex flex-col">
            <span>{date.toLocaleDateString()}</span>
            {value.includes("T") && (
              <span className="text-sm text-gray-500">
                {date.toLocaleTimeString()}
              </span>
            )}
          </div>
        );
      } catch {
        return String(value);
      }
    }

    // Handle booleans
    if (typeof value === "boolean") {
      return (
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-xs font-medium",
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}
        >
          {value ? "Yes" : "No"}
        </span>
      );
    }

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-gray-400 italic">Empty list</span>;
      }
      return (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">
            {value.length} item{value.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-1">
            {value.map((item, index) => (
              <div
                key={index}
                className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-md"
              >
                <span className="text-xs text-gray-400 mr-2">#{index + 1}</span>
                {typeof item === "object"
                  ? JSON.stringify(item, null, 2)
                  : String(item)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle nested objects
    if (typeof value === "object" && value !== null) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="space-y-3">
            {Object.entries(value).map(([nestedKey, nestedValue]) => (
              <div
                key={nestedKey}
                className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {formatFieldName(nestedKey)}
                  </span>
                  <div className="text-sm text-gray-800">
                    {formatValue(nestedValue, nestedKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Handle long text
    if (typeof value === "string" && value.length > 100) {
      return (
        <div className="space-y-2">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {value}
            </p>
          </div>
          <p className="text-xs text-gray-500">{value.length} characters</p>
        </div>
      );
    }

    // Handle numbers with formatting
    if (typeof value === "number") {
      // Check if it's a currency (common field names)
      if (
        key.toLowerCase().includes("price") ||
        key.toLowerCase().includes("cost") ||
        key.toLowerCase().includes("amount") ||
        key.toLowerCase().includes("fee")
      ) {
        return (
          <span className="font-bold text-lg text-green-600">
            ৳{value.toLocaleString()}
          </span>
        );
      }
      return (
        <span className="font-medium text-lg">{value.toLocaleString()}</span>
      );
    }

    // Default string handling
    return (
      <div className="text-sm sm:text-base break-words leading-relaxed">
        {String(value)}
      </div>
    );
  };

  // Function to determine if field should be highlighted
  // const isImportantField = (key) => {
  //   const importantFields = ['id', 'name', 'title', 'email', 'phone', 'status', 'type'];
  //   return importantFields.some(field => key.toLowerCase().includes(field));
  // };

  // // Function to skip internal/technical fields
  // const shouldSkipField = (key) => {
  //   const skipFields = ['encrypted_id', 'created_at', 'updated_at', '__v', '_id'];
  //   return skipFields.includes(key);
  // };

  // Filter data based on fieldsToShow prop - only show specified fields
  let dataEntries = [];
  if (fieldsToShow && Array.isArray(fieldsToShow) && fieldsToShow.length > 0) {
    // Process both regular fields and nested fields
    dataEntries = fieldsToShow
      .map((fieldPath) => {
        if (fieldPath.includes(".")) {
          // Handle nested fields like 'batch.id'
          const value = getNestedValue(data, fieldPath);
          return value !== undefined ? [fieldPath, value] : null;
        } else {
          // Handle regular fields
          return data[fieldPath] !== undefined
            ? [fieldPath, data[fieldPath]]
            : null;
        }
      })
      .filter((entry) => entry !== null); // Remove null entries for undefined fields
  }
  // If no fieldsToShow provided or empty array, show nothing

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden message-scrollbar">
      <div
        className="flex justify-center pt-4 pb-4 min-h-full px-2 sm:px-4"
        onClick={handleBackdropClick}
      >
        <div
          className={clsx(
            "bg-white rounded-2xl w-full max-w-5xl p-3 sm:p-6 lg:p-8 relative mx-auto min-h-[400px] overflow-hidden"
          )}
          style={{
            boxShadow:
              "0px 0px 40px 0px rgba(0, 0, 0, 0.05), 0px 9px 40px 0px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex-1 pr-4">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[75vh] overflow-y-auto overflow-x-hidden message-scrollbar">
            {dataEntries.length > 0 ? (
              <div className="space-y-4">
                {dataEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="border rounded-lg p-3 sm:p-4 bg-gray-50 border-gray-200"
                  >
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base leading-tight text-gray-700">
                        {formatFieldName(key)}
                      </h3>
                      <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                        {formatValue(value, key)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  No fields to display
                </div>
                <div className="text-gray-500 text-sm">
                  Please specify which fields to show using the fieldsToShow
                  prop
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
