import PaymentCard from "../PaymentCard";
import { listDetails } from "../../data/studentData";

const StudentPay = () => {
  return (
    <div
      className={`flex flex-wrap gap-3  ${
        listDetails.length >= 5 ? "md:justify-around" : "justify-center"
      }`}
    >
      {listDetails.map((list, idx) => (
        <PaymentCard data={list} key={idx} type="student" />
      ))}
    </div>
  );
};

export default StudentPay;
