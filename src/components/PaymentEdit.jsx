import { X, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSpinner from "../shared/custom/CustomSpinner";
import NotifyContainer from "../utils/notify";

const PaymentEdit = ({
  details = null,
  onClose = null,
  type = null,
  initialPayment = null,
  onEditPayment,
  loading,
}) => {
  const initialFormData =
    type === "student"
      ? {
          payable_amount: initialPayment?.amount || "",
          payment_date: initialPayment?.payment_date || "",
          payment_description: initialPayment?.description || "",
          payment_method: initialPayment?.payment_method || "",
        }
      : {
          class_fee: initialPayment?.amount || "",
          status: initialPayment?.status || 0,
          payment_date: initialPayment?.payment_date || "",
        };

  const [formData, setFormData] = useState(initialFormData);
  const [statusPaid, setStatusPaid] = useState(false);

  useEffect(() => {
    if (type === "student" && details) {
      const amount = Number(formData.payable_amount);
      const due = Number(details?.due_amount);
      const totalPaid = details?.total_paid;
      const totalAmt = details?.total_amount;
      const prevAmount = initialPayment?.amount;
      // যদি ধরা হয় amt invalid number বা details নেই
      if (isNaN(amount) || amount <= 0) {
        setStatusPaid(false);
        return;
      }

      // যদি paid state হয় (i.e. amt === total), পরবর্তীতে amount কম দিলে error
      if (due === 0 && amount > prevAmount) {
        toast.error(`Payment can't be higher from total fee.`, {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData((prev) => ({
          ...prev,
          payable_amount: prevAmount,
        }));
        return;
      }
      if (due === 0 && amount === prevAmount) {
        setStatusPaid(true);
        return;
      } else {
        setStatusPaid(false);
      }
      if (amount + due > totalAmt && due !== 0) {
        toast.error(`Payment can't be higher from total fee.`, {
          position: "top-right",
          autoClose: 2000,
        });
        setFormData((prev) => ({
          ...prev,
          payable_amount: prevAmount,
        }));
        return;
      }
      if (amount === due + totalPaid) {
        setStatusPaid(true);
      } else {
        setStatusPaid(false);
      }
      return;
    }
  }, [
    formData.payable_amount,
    details?.due_amount,
    type,
    details?.total_paid,
    details?.total_amount,
    initialPayment?.amount,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "student") {
      if (formData.payable_amount === "") {
        toast.error("Please enter payable amount", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
    }

    const updatedPayment =
      type === "student"
        ? {
            amount: Number(formData.payable_amount),
            payment_date: formData.payment_date || null,
            description: formData.payment_description,
            payment_method: formData.payment_method.toLowerCase(),
          }
        : {
            amount: Number(formData.class_fee),
            payment_date: formData.payment_date || null,
            status: formData.status,
          };

    try {
      await onEditPayment(initialPayment.id, updatedPayment);
    } catch (err) {
      toast.error("Failed to edit payment. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CustomSpinner />
      </div>
    );
  }

  return (
    <>
      <NotifyContainer />
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-[90%] md:w-[50%] max-h-[80%] overflow-auto rounded-lg shadow-lg relative p-6"
        >
          <h1 className="text-lg font-semibold mb-4 text-center lg:text-2xl text-headerColorHover">
            Edit Payment
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
                <div className="col-span-1 md:col-span-2">
                  <span
                    className={`text-lg font-semibold mb-4 text-center ${
                      statusPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Total Course Fee : {details.total_amount}
                  </span>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <span
                    className={`text-lg font-semibold mb-4 text-center ${
                      statusPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Previous Amount : {initialPayment?.amount}
                  </span>
                </div>
                <div className="col-span-1">
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
                type="datetime-local"
                name="payment_date"
                value={formData.payment_date}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                name="payment_description"
                placeholder="Payment Description"
                value={formData.payment_description}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                name="payment_method"
                placeholder="Payment Method"
                value={formData.payment_method}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center space-x-2">
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
              Update Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentEdit;
