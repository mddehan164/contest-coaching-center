import { listDetails } from "../../data/teacherData";
import PaymentCard from "../PaymentCard";

const TeacherPay = () => {
  return (
    <div
      className={`flex flex-wrap gap-3  ${
        listDetails.length >= 5 ? "md:justify-around" : "justify-center"
      }`}
    >
      {listDetails.map((list, idx) => (
        <PaymentCard data={list} key={idx} type="teacher" />
      ))}
    </div>
  );
};

export default TeacherPay;
