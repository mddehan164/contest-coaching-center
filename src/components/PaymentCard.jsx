import img from "../assets/images/gallery/photo(1).jpg";

const PaymentCard = ({
  status = 1,
  type = "student",
  data,
  payments,
  onShowDetails,
}) => {
  const handleDetails = () => {
    // filter kore oi student er details ber korbo
    const details = payments.filter((p) => p.id === data.id);
    onShowDetails(details); // parent ke details pathai dibo
  };
  // console.log(typeof data);
  return (
    <div className="border flex justify-between gap-2 px-2 py-2 rounded-md hover:shadow-md hover:scale-105 transition-all duration-100 max-w-72 aspect-video text-[0.85rem]">
      <div className="w-[40%] h-full overflow-hidden rounded-sm">
        <img
          className="w-full h-full object-cover object-center"
          src={img}
          alt={data?.name || "image"}
        />
      </div>
      <div className="w-[58%] p-2 flex flex-col justify-center ">
        <h1 className="text-[1.05rem] font-semibold leading-4 text-headerColor">
          {data?.name || "Name Here"}
        </h1>
        <p>{data?.mobile || "mobile"}</p>
        <p>{data?.batch?.name || "Batch"}</p>
        {type === "student" ? <></> : <p>{data?.subject || "subject"}</p>}
        <div className="flex justify-between items-center mt-1">
          <p
            className={`${
              status === 1
                ? "bg-green-300 text-gray-500"
                : "bg-red-300 text-gray-500"
            } px-1 py-0.5 rounded-sm text-xs`}
          >
            {status === 1 ? "Active" : "Inactive"}
          </p>
          <button
            className="px-2 py-1 bg-headerColor hover:bg-headerColorHover text-white rounded-md"
            onClick={handleDetails}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
