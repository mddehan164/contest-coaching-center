import PaymentCard from "./PaymentCard";
import PaymentDetails from "./PaymentDetails";
import PaymentAdd from "./PaymentAdd";
import { ErrorUi } from "../shared/ui";
import { usePayment } from "../hooks/usePayment";
import { useSelector } from "react-redux";

const FilterPerson = ({ dataList = [], person = "Student" }) => {
  const {
    selectedStudentData,
    showDetailsModal,
    isOpenAddModal,
    isOpenEditModal,
    editingPaymentData,
  } = useSelector((state) => state.payment);
  const {
    selectedStudent,
    singlePayment,
    loadingSingle,
    closeDetailsModal,
    closeAddModal,
    closeEditModal,
    openEditModal,
    addPaymentDetail,
    editPaymentDetail,
    toggleDetailStatus,
    clearSelectedStudent,
    adding,
    editing,
    toggling,
  } = usePayment();

  const handleCloseDetails = () => {
    closeDetailsModal();
    clearSelectedStudent();
  };

  const handleCloseAdd = () => {
    console.log("🔍 FilterPerson - Closing add modal");
    closeAddModal();
  };

  const handleAddPayment = async (paymentData) => {
    const student = selectedStudentData || selectedStudent;
    if (!student) {
      console.warn("Missing data - selectedStudent:", student);
      alert("Please select a student first");
      return;
    }
    const payment = singlePayment?.data?.payment;
    if (!payment) {
      console.warn("Missing data - singlePayment:", singlePayment);
      alert("Payment details not loaded yet");
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

      closeAddModal(); // modal বন্ধ করো
    } catch (error) {
      console.error("❌ Error adding payment:", error);
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
          details={selectedStudentData.payment_summary}
          loading={adding}
          type={person}
          onClose={handleCloseAdd}
          onAddPayment={handleAddPayment}
        />
      )}
    </div>
  );
};

export default FilterPerson;
