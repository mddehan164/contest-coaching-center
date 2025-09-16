import { X, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentEdit = ({
  details = null,
  onClose = null,
  type = null,
  initialPayment = null,
  onEditPayment,
}) => {
  // formData initialising
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
          status: initialPayment?.status || 0, // তুমি যদি status করে রাখতে চাও
          payment_date: initialPayment?.payment_date || "",
        };

  const [formData, setFormData] = useState(initialFormData);
  const [statusPaid, setStatusPaid] = useState(false);

  // check statusPaid logic
  useEffect(() => {
    if (type === "student") {
      const amt = Number(formData.payable_amount);
      const total = Number(details?.due_amount);

      if (isNaN(amt) || isNaN(total)) {
        setStatusPaid(false);
        return;
      }
      if (amt > total) {
        toast.error(
          `Amount cannot exceed remaining amount: ${details.due_amount}`,
          {
            position: "top-right",
            autoClose: 2000,
          }
        );
        // অতিরিক্ত amount দিলে পুরোনো value রেখে দিবে
        setFormData((prev) => ({
          ...prev,
          payable_amount: prev.payable_amount,
        }));
        setStatusPaid(false);
        return;
      }
      if (amt === total) {
        setStatusPaid(true);
      } else {
        setStatusPaid(false);
      }
    }
  }, [formData.payable_amount, details?.due_amount, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
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

    // Prepare body same রকম হওয়া উচিত যেমন তোমার বসিয়েছো postman body
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
            // যদি `status` থাকে
            status: formData.status,
            // অন্যান্য প্রয়োজনীয় field যদি থাকে
          };
    console.log(initialPayment.id);

    onEditPayment(initialPayment.id, updatedPayment);
    // API কল: তোমার `{{base_url}}/payment-details/{{encrypted_payment_detail_id}}`
    // try {
    //   const response = await fetch(
    //     // `${process.env.REACT_APP_BASE_URL}/payment-details/${initialPayment?.id}`, // ধরো initialPayment.id এ encrypted_payment_detail_id আছে
    //     {
    //       method: "PUT", // অথবা PATCH, API যেটা expect করে সেটি
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(updatedPayment),
    //     }
    //   );
    //   if (!response.ok) {
    //     const err = await response.json();
    //     throw new Error(err.message || "Failed to update payment");
    //   }
    //   const data = await response.json();
    //   toast.success("Payment updated successfully", { autoClose: 2000 });
    //   // callback
    //   onUpdatePayment(data);
    //   onClose();
    // } catch (error) {
    //   console.error("Error updating payment:", error);
    //   toast.error("Error updating payment", { autoClose: 2000 });
    // }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
                    Remaining : {details.due_amount}
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
