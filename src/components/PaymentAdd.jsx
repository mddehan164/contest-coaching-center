import { useState } from "react";

const PaymentAdd = ({ payments, onAdd, students }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    course_fee: "",
    payable_amount: "",
    status: 0,
    payment_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = setSelectedStudent(
      students.filter((s) => s.id === student.id)[0]
    );

    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    if (!student) {
      alert("Invalid student selected.");
      return;
    }

    const newPayment = {
      id: payments.length + 1, // sequential id
      name: student.name,
      course_title: student.course_title,
      batch_title: student.batch_title,
      course_fee: Number(formData.course_fee),
      payable_amount: Number(formData.payable_amount),
      status: Number(formData.status),
      payment_date: formData.payment_date || null,
    };

    onAdd(newPayment);

    // reset form
    setSelectedStudent("");
    setFormData({
      course_fee: "",
      payable_amount: "",
      status: 0,
      payment_date: "",
    });
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">➕ Add Payment</h2>

      {/* Payment Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
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
  );
};

export default PaymentAdd;
