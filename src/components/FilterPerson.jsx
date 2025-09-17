import PaymentCard from "./PaymentCard";
import PaymentDetails from "./PaymentDetails";
import PaymentAdd from "./PaymentAdd";
import { ErrorUi } from "../shared/ui";
import { usePayment } from "../hooks/usePayment";
import { useSelector } from "react-redux";
import PaymentEdit from "./PaymentEdit";

const FilterPerson = ({ dataList = [], person = "Student" }) => {
  const {
    selectedStudentData,
    showDetailsModal,
    isOpenAddModal,
    isOpenEditModal,
    selectedPaymentData,
  } = useSelector((state) => state.payment);
  const {
    singlePayment,
    loadingSingle,
    closeDetailsModal,
    closeAddModal,
    closeEditModal,
    addPaymentDetail,
    editPaymentDetail,
    toggleDetailStatus,
    clearSelectedStudent,
    clearPaymentData,
    adding,
    editing,
    toggling,
  } = usePayment();

  const handleCloseDetails = () => {
    closeDetailsModal();
    clearSelectedStudent();
  };

  const handleCloseAdd = () => {
    closeAddModal();
    clearPaymentData();
  };
  const handleCloseEdit = () => {
    closeEditModal();
    clearPaymentData();
  };

  const handleAddPayment = async (paymentData) => {
    const student = selectedStudentData;
    if (!student) {
      console.warn("Missing data - selectedStudent:", student);
      return;
    }
    const payment = singlePayment?.data?.payment;
    if (!payment) {
      console.warn("Missing data - singlePayment:", singlePayment);
      return;
    }

    try {
      // 🔹 আসল API call
      const result = await addPaymentDetail(payment.id, {
        amount: paymentData.payable_amount,
        description: paymentData.payment_description,
        payment_method: paymentData.payment_method,
        payment_date: paymentData.payment_date,
      });
      if (result.success) {
        closeAddModal(); // modal বন্ধ করো
      }
    } catch (error) {
      console.error("❌ Error adding payment:", error);
      alert(`Failed to adding for ${error.message}`);
    }
  };

  const handleEditPayment = async (paymentId, editedPaymentData) => {
    try {
      if (paymentId) {
        const res = await editPaymentDetail(paymentId, editedPaymentData);
        if (res.success) {
          handleCloseEdit();
        }
      }
    } catch (error) {
      console.error("Error editing payment:", error.message);
      alert(`Failed to edit payment for ${error.message}`);
    }
  };

  const handleToggleStatus = async (detailId) => {
    try {
      const res = await toggleDetailStatus(detailId);
      if (res.success) {
        handleCloseEdit();
      }
    } catch (error) {
      console.error("Error toggling status:", error.message);
      alert("Failed to toggle status. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap gap-5">
      {dataList.length > 0 ? (
        dataList.map((data, idx) => (
          <PaymentCard
            key={data.encrypted_id || data.id || idx}
            data={data}
            type={person} // Console এর জন্য callback pass করুন
          />
        ))
      ) : (
        <ErrorUi title={`No ${person} found`} />
      )}

      {/* Payment Details Modal - এই condition টা ঠিক করেছি */}
      {showDetailsModal && selectedStudentData && (
        <PaymentDetails
          paymentData={singlePayment?.data.payment}
          loading={loadingSingle}
          type={person}
          onClose={handleCloseDetails}
          onEditPayment={handleEditPayment}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* Add Payment Modal */}
      {isOpenAddModal && selectedStudentData && (
        <PaymentAdd
          details={singlePayment?.data.payment}
          loading={adding}
          type={person}
          onClose={handleCloseAdd}
          onAddPayment={handleAddPayment}
        />
      )}

      {selectedPaymentData && isOpenEditModal && (
        <PaymentEdit
          details={selectedStudentData.payment_summary}
          initialPayment={selectedPaymentData}
          onClose={handleCloseEdit}
          onEditPayment={handleEditPayment}
          type={person}
          loading={editing}
          toggleLoad={toggling}
          onToggle={handleToggleStatus}
        />
      )}
    </div>
  );
};

export default FilterPerson;
