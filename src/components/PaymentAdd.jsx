import { X } from "lucide-react";
import { useState } from "react";

const PaymentAdd = ({ details, onClose, handleAddData, type }) => {
  console.log(details);
  const initialFormData =
    type === "student"
      ? {
          course_fee: "",
          payable_amount: "",
          status: 0,
          payment_date: "",
        }
      : {
          class_fee: "",
          status: 0,
          payment_date: "",
        };

  const [selectedPerson, setSelectedPerson] = useState(details);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // setSelectedPerson(details[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPerson) {
      alert("Please select a person.");
      return;
    }

    if (!selectedPerson) {
      alert("Invalid person selected.");
      return;
    }

    const newPayment = {
      id: selectedPerson.id,
      name: selectedPerson.name,
      course_title: selectedPerson.course_title,
      batch_title: selectedPerson.batch_title,
      ...(type === "student"
        ? {
            course_fee: Number(formData.course_fee),
            payable_amount: Number(formData.payable_amount),
          }
        : {
            class_fee: Number(formData.class_fee),
            subject: selectedPerson.subject,
          }),
      status: Number(formData.status),
      payment_date: formData.payment_date || null,
    };
    handleAddData(newPayment);

    // reset form
    setSelectedPerson("");
    setFormData(initialFormData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Payment Form */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] md:w-[80%] lg:w-[70%] max-h-[80%] overflow-auto rounded-lg shadow-lg relative p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          ➕ Add Payment
        </h2>

        <button
          className="text-gray-500 hover:text-red-500 text-center absolute right-5 top-5"
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
              <input
                type="number"
                name="course_fee"
                placeholder="Course Fee"
                value={formData.course_fee}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="number"
                name="payable_amount"
                placeholder="Payable Amount"
                value={formData.payable_amount}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
            </>
          ) : (
            <input
              type="number"
              name="class_fee"
              placeholder="Class Fee"
              value={formData.class_fee}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
          )}
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded-md"
          >
            <option value={1}>Paid</option>
            <option value={0}>Due</option>
          </select>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-headerColor hover:bg-headerColorHover text-white py-2 px-4 rounded-md"
          >
            Add Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentAdd;
