import PaymentCard from "./PaymentCard";
import PaymentDetails from "./PaymentDetails";
import PaymentAdd from "./PaymentAdd";
import { ErrorUi } from "../shared/ui";
import { usePayment } from "../hooks/usePayment";
import { useState } from "react";
// import { selectedStudentData } from "../redux-rtk/payment/paymentSlice";
import { useSelector } from "react-redux";

const FilterPerson = ({ dataList = [], person = "Student" }) => {
  const { selectedStudentData, showDetailsModal } = useSelector(
    (state) => state.payment
  );
  const {
    showAddModal,
    selectedStudent,
    singlePayment,
    loadingSingle,
    clearSelectedStudent,
    closeDetailsModal,
    openAddModal,
    closeAddModal,
    addPaymentDetail,
    editPaymentDetail,
    toggleDetailStatus,
  } = usePayment();

  const handleCloseDetails = () => {
    console.log("🔍 FilterPerson - Closing details modal");
    closeDetailsModal();
  };

  const handleOpenAdd = () => {
    console.log("🔍 FilterPerson - Opening add modal");
    openAddModal();
  };

  const handleCloseAdd = () => {
    console.log("🔍 FilterPerson - Closing add modal");
    closeAddModal();
  };

  const handleAddPayment = async (paymentData) => {
    try {
      if (selectedStudent && singlePayment?.data?.payment?.encrypted_id) {
        console.log(
          "🔍 FilterPerson - Adding payment for:",
          selectedStudent.name,
          paymentData
        );
        await addPaymentDetail(
          singlePayment.data.payment.encrypted_id,
          paymentData
        );
        closeAddModal();
      } else {
        console.error("Missing required data for adding payment");
        alert("Missing required data. Please try again.");
      }
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment. Please try again.");
    }
  };

  const handleEditPayment = async (detailId, paymentData) => {
    try {
      console.log(
        "🔍 FilterPerson - Editing payment for:",
        selectedStudent?.name
      );
      await editPaymentDetail(detailId, paymentData);
    } catch (error) {
      console.error("Error editing payment:", error);
      alert("Failed to edit payment. Please try again.");
    }
  };

  const handleToggleStatus = async (detailId) => {
    try {
      await toggleDetailStatus(detailId);
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Failed to toggle status. Please try again.");
    }
  };

  // Debug console - শুধু click এর সময় console হবে
  const handleStudentSelect = (student) => {
    console.log("from redux", selectedStudentData);
    console.log(showDetailsModal);
  };

  return (
    <div className="flex flex-wrap gap-5">
      {dataList.length > 0 ? (
        dataList.map((data, idx) => (
          <PaymentCard
            key={data.encrypted_id || data.id || idx}
            data={data}
            type={person}
            onStudentClick={handleStudentSelect} // Console এর জন্য callback pass করুন
          />
        ))
      ) : (
        <ErrorUi title={`No ${person} found`} />
      )}

      {/* Payment Details Modal - এই condition টা ঠিক করেছি */}
      {showDetailsModal && (
        <PaymentDetails
          student={selectedStudentData}
          paymentData={singlePayment?.data}
          loading={loadingSingle}
          type={person}
          onClose={handleCloseDetails}
          onOpenAdd={handleOpenAdd}
          onEditPayment={handleEditPayment}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* Add Payment Modal */}
      {showAddModal && selectedStudent && (
        <PaymentAdd
          student={selectedStudent}
          type={person}
          onClose={handleCloseAdd}
          onAddPayment={handleAddPayment}
        />
      )}
    </div>
  );
};

export default FilterPerson;
