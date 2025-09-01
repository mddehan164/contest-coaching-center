import PaymentCard from "../PaymentCard";
import { listDetails } from "../../data/studentData";
import { studentPaymentsData } from "../../data/payments";
import { useState } from "react";
import PaymentDetails from "../PaymentDetails";
import PaymentAdd from "../PaymentAdd";

const StudentPay = () => {
  const [selectedPayments, setSelectedPayments] = useState(null);
  const [payments, setPayments] = useState(studentPaymentsData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowDetails = (details) => {
    setSelectedPayments(details);
  };

  const handleAddPayment = (newPayment) => {
    setPayments((prev) => [...prev, newPayment]);
    setShowAddModal(false); // modal close
  };

  return (
    <div
      className={`flex flex-wrap gap-3  ${
        listDetails.length >= 5 ? "md:justify-around" : "justify-center"
      }`}
    >
      {listDetails.map((list, idx) => (
        <PaymentCard
          data={list}
          key={idx}
          type="student"
          payments={payments} // studentPaymentsData নয়, local payments state
          onShowDetails={handleShowDetails}
        />
      ))}

      {/* details component */}
      {selectedPayments && (
        <PaymentDetails
          details={selectedPayments}
          onClose={() => setSelectedPayments(null)}
          onOpenAdd={() => setShowAddModal(true)} // add button click
        />
      )}

      {/* Add Payment modal */}
      {showAddModal && (
        <PaymentAdd
          payments={payments}
          handleAddPayment={handleAddPayment}
          onClose={() => setShowAddModal(false)}
          student={listDetails}
        />
      )}
    </div>
  );
};

export default StudentPay;
