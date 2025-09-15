import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setIsOpenAddModal } from "../redux-rtk/payment/paymentSlice";
import CustomSpinner from "../shared/custom/CustomSpinner";
import PaymentEdit from "./PaymentEdit";

const PaymentDetails = ({ onClose, type, paymentData, loading }) => {
  const isDisabled = paymentData?.remaining_amount === 0;
  const dispatch = useDispatch();

  const handleOpenAddModal = () => {
    dispatch(setIsOpenAddModal(true));
  };

  if (loading || !paymentData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CustomSpinner />
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-red-500">No payment data found</p>
      </div>
    );
  }
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
            Payment Details :
            <span className="font-semibold text-gray-500 inline-block mx-2">
              {paymentData.payer_name}
            </span>
            <span className="text-gray-400">({paymentData.payer_type})</span>
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
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Payment Date</th>
                <th className="px-4 py-2 border">Method</th>
                <th className="px-4 py-2 border">
                  {type === "student" ? "Total Fee" : "Subject"}
                </th>
                <th className="px-4 py-2 border">
                  {type === "student" ? "Paid Amount" : "Class Fee"}
                </th>
                <th className="px-4 py-2 border">Added By</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentData?.payment_details?.length > 0 && !loading ? (
                paymentData.payment_details.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-contestLight text-center"
                    >
                      <td className="px-4 py-2 border">
                        {item?.description || "Not Found"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item?.payment_date?.split(" ")[0] || "Not Found"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item?.payment_method[0].toUpperCase() +
                          item?.payment_method.slice(1) || "Not Found"}
                      </td>
                      <td className="px-4 py-2 border">
                        {type === "student"
                          ? "৳ " + paymentData?.total_amount
                          : item?.subject || "Not Found"}
                      </td>
                      <td className="px-4 py-2 border">
                        {type === "student"
                          ? "৳ " + item?.amount
                          : item?.class_fee || "Not Found"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item?.updated_by || "Not Found"}
                      </td>
                      <td className="px-4 py-2 border">
                        {item?.status === "active" ? (
                          <span className="text-green-600">
                            {item?.status[0].toUpperCase() +
                              item?.status.slice(1)}
                          </span>
                        ) : (
                          <span className="text-red-600">
                            {item?.status[0].toUpperCase() +
                              item?.status.slice(1)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-red-500">
                    No Payment Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {paymentData?.payment_details?.length > 0 && (
            <div className="w-full flex items-center justify-end gap-5 py-5 font-semibold">
              <div>
                <p>
                  Total Paid :
                  <span className="text-green-500">
                    &nbsp; ৳ {paymentData?.total_paid}
                  </span>
                </p>
                <p>
                  {paymentData?.remaining_amount === 0 ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span>
                      Remaining: ৳{" "}
                      <span className="text-red-500">
                        {paymentData?.remaining_amount}
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Add Payment button */}
          <div className="flex justify-end">
            <button
              className={`${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : " bg-headerColor hover:bg-headerColorHover text-white "
              } col-span-1 md:col-span-2 py-2 px-4 rounded-md`}
              onClick={() => {
                if (isDisabled) return;
                handleOpenAddModal();
              }}
            >
              Add Payments
            </button>
          </div>
        </div>

        <PaymentEdit />
      </div>
    </div>
  );
};

export default PaymentDetails;
