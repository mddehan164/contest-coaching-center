import { useState } from "react";
import PaymentCard from "./PaymentCard";
import PaymentDetails from "./PaymentDetails";
import PaymentAdd from "./PaymentAdd";
import CustomDataNotFound from "../shared/custom/CustomDataNotFound";
import { ErrorUi } from "../shared/ui";

const FilterPerson = ({ dataList = [], person }) => {
  const [selectedPayments, setSelectedPayments] = useState(null);
  const [payments, setPayments] = useState(null);
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
        dataList.length >= 5 ? "md:justify-around" : "justify-center"
      }`}
    >
      {dataList.length > 0 ? (
        dataList.map((data, idx) => (
          <PaymentCard
            key={idx}
            data={data}
            type={person}
            payments={payments} // studentPaymentsData নয়, local payments state
            onShowDetails={handleShowDetails}
          />
        ))
      ) : (
        <ErrorUi title={`No ${person} found`} />
      )}

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
          //   student={listDetail}
        />
      )}
    </div>
  );
};

export default FilterPerson;
