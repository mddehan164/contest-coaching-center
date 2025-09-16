import { X, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSpinner from "../shared/custom/CustomSpinner";

const PaymentAdd = ({ details, onClose, onAddPayment, type, loading }) => {
  console.log(loading);
  // initial form data
  const initialFormData =
    type === "student"
      ? {
          payable_amount: "",
          payment_date: "",
          payment_description: "",
          payment_method: "",
        }
      : {
          class_fee: "",
          status: 0,
          payment_date: "",
        };

  const [formData, setFormData] = useState(initialFormData);
  const [statusPaid, setStatusPaid] = useState(false);

  // live check: when user types the amount, check if it's equal to total
  useEffect(() => {
    if (type === "student") {
      const amt = Number(formData.payable_amount);
      const total = Number(details?.due_amount);

      // jodi total defined na thake, ail out
      if (isNaN(amt) || isNaN(total)) {
        setStatusPaid(false);
        return;
      }

      // jodi besi amount try kore
      if (amt > total) {
        toast.error(`Amount cannot exceed total: ${details.total_amount}`, {
          position: "top-right",
          autoClose: 2000,
        });
        // ekhane formData.payable_amount ke reset korle valo hobe ba previous value e rekhe dibe
        setFormData((prev) => ({
          ...prev,
          payable_amount: prev.payable_amount,
        }));
        setStatusPaid(false);
        return;
      }

      // jodi exact match hoi
      if (amt === total) {
        setStatusPaid(true);
      } else {
        setStatusPaid(false);
      }
    }
  }, [
    formData.payable_amount,
    details?.due_amount,
    details?.total_amount,
    type,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You may want to validate
    if (
      type === "student" &&
      (!formData.payable_amount || formData.payable_amount === "")
    ) {
      alert("Please enter payable amount");
      return;
    }
    if (
      type !== "student" &&
      (!formData.class_fee || formData.class_fee === "")
    ) {
      alert("Please enter class fee");
      return;
    }

    const newPayment = {
      ...(type === "student"
        ? {
            payable_amount: Number(formData.payable_amount),
            payment_description: formData.payment_description,
            payment_method: formData.payment_method.toLowerCase(),
          }
        : {
            class_fee: Number(formData.class_fee),
            subject: details.subject,
          }),
      payment_date: formData.payment_date || null,
    };

    onAddPayment(newPayment);

    // reset
    setFormData(initialFormData);
    setStatusPaid(false);
    onClose();
  };

  if (loading)
    <div className="w-full h-screen flex items-center justify-center">
      <CustomSpinner />;
    </div>;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-[90%] md:w-[50%] max-h-[80%] overflow-auto rounded-lg shadow-lg relative p-6"
        >
          <h1
            className={`text-lg font-semibold mb-4 text-center lg:text-2xl text-headerColorHover
            `}
          >
            Add Payment
          </h1>

          <button
            className="text-gray-500 hover:text-red-500 absolute right-5 top-5"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {type === "student" ? (
              <>
                {/* Display total course fee */}
                <div className="col-span-1 md:col-span-2">
                  <span
                    className={`text-lg font-semibold mb-4 text-center ${
                      statusPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Total Course Fee : {details.total_amount}
                  </span>
                </div>
                {details.due_amount ? (
                  <div className="col-span-1 md:col-span-2">
                    <span
                      className={`text-lg font-semibold mb-4 text-center ${
                        statusPaid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      Remaining : {details.due_amount}
                    </span>
                  </div>
                ) : (
                  <span></span>
                )}
                <div
                  className={`${
                    details.due_amount === 0 ? "col-span-2" : "col-span-1"
                  }`}
                >
                  <input
                    type="number"
                    name="payable_amount"
                    placeholder="Payable Amount"
                    value={formData.payable_amount}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="col-span-1">
                <input
                  type="number"
                  name="class_fee"
                  placeholder="Class Fee"
                  value={formData.class_fee}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  required
                />
              </div>
            )}
            <div>
              <input
                type="date"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="text"
                name="payment_description"
                placeholder="Payment Description"
                value={formData.payment_description}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="text"
                name="payment_method"
                value={formData.payment_method}
                placeholder="Payment Method"
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div
              className={`${
                details.due_amount === 0 ? "col-span-1" : "md:col-span-1"
              } flex items-center space-x-2`}
            >
              {statusPaid ? (
                <>
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-green-500 font-medium">Paid</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500" size={20} />
                  <span className="text-red-500 font-medium">Unpaid</span>
                </>
              )}
            </div>

            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-headerColor hover:bg-headerColorHover text-white py-2 px-4 rounded-md"
            >
              Add Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentAdd;
