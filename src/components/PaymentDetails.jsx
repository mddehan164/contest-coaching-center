import { X } from "lucide-react";
import { useEffect, useState } from "react";

const PaymentDetails = ({ student, onClose, onOpenAdd, newData, type }) => {
  if (!student) return null;
  const [paymentDetails, setPaymentDetails] = useState(student || {});

  useEffect(() => {
    if (newData) {
      setPaymentDetails((prevDetails) => [...prevDetails, newData]);
    }
  }, [newData]);

  if (!paymentDetails) return null;
  return (
    // Backdrop (fade bg)
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="bg-white w-[90%] md:w-[80%] lg:w-[70%] max-h-[80%] overflow-auto rounded-lg shadow-lg relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between students-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-headerColorHover">
            Payment Details
          </h2>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base rounded-lg overflow-hidden">
            <thead className="bg-[#102542] text-white lg:text-lg">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Course Title</th>
                <th className="px-4 py-2 border">Batch</th>
                <th className="px-4 py-2 border">
                  {type === "student" ? "Course Fee" : "Subject"}
                </th>
                <th className="px-4 py-2 border">
                  {type === "student" ? "Paid" : "Class Fee"}
                </th>
                <th className="px-4 py-2 border">Due</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-contestLight text-center">
                <td className="px-4 py-2 border">
                  {student?.name || "Not Found"}
                </td>
                <td className="px-4 py-2 border">
                  {student?.course_info.name || "Not Found"}
                </td>
                <td className="px-4 py-2 border">
                  {student?.batch_info.name || "Not Found"}
                </td>
                <td className="px-4 py-2 border">
                  {type === "student"
                    ? "৳ " + student?.payment_summary.total_amount
                    : student?.subject || "Not Found"}
                </td>
                <td className="px-4 py-2 border">
                  {type === "student"
                    ? "৳ " + student?.payment_summary.total_paid
                    : student?.class_fee || "Not Found"}
                </td>
                <td className="px-4 py-2 border">
                  {type === "student"
                    ? "৳ " + student?.payment_summary.due_amount
                    : student?.class_fee || "Not Found"}
                </td>
                <td className="px-4 py-2 border">
                  {student.status === 1 ? (
                    <span className="text-green-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-red-600 font-medium">Unpaid</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Add Payment button */}
          <div className="flex justify-end">
            <button
              className="bg-headerColorHover px-3 py-2 text-white rounded-md mt-4 hover:bg-headerColor"
              onClick={onOpenAdd}
            >
              Add Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
