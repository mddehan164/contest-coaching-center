import { useState } from "react";
import PaymentCard from "./PaymentCard";
import PaymentDetails from "./PaymentDetails";
import PaymentAdd from "./PaymentAdd";
import { ErrorUi } from "../shared/ui";

const FilterPerson = ({ dataList = [], person, paymentData }) => {
  const [selectedPayments, setSelectedPayments] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [getData, setGetData] = useState({});

  const handleShowDetails = (details) => {
    setSelectedPayments(details);
  };

  const handleAddDetails = (info) => {
    setGetData(info);
  };
  return (
    <div className={`flex flex-wrap gap-5`}>
      {dataList.length > 0 ? (
        dataList.map((data, idx) => (
          <PaymentCard
            key={idx}
            data={data}
            type={person}
            payments={paymentData} // studentPaymentsData নয়, local payments state
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
          newData={getData}
          type={person}
          onClose={() => setSelectedPayments(null)}
          onOpenAdd={() => setShowAddModal(true)}
        />
      )}

      {/* Add Payment modal */}
      {showAddModal && (
        <PaymentAdd
          details={selectedPayments[0]}
          type={person}
          onClose={() => setShowAddModal(false)}
          handleAddData={handleAddDetails}
        />
      )}
    </div>
  );
};

export default FilterPerson;
