const MainBtn = ({ data, btnStyle, isActive, onClick }) => {
  const bgColor = isActive ? "white" : btnStyle.btnBgColor;
  const textColor = isActive ? "text-black border-2" : "text-white";
  const hoverColor = isActive ? "" : `hover:bg-${btnStyle.btnHoverColor}`;
  const fullWidth = btnStyle.bgFull ? "w-full" : "";

  return (
    <div
      onClick={onClick}
      className={`hover:cursor-pointer text-center max-sm:py-1 max-sm:px-2 max-sm:rounded-md text-sm 2xl:text-lg sm:py-2 sm:px-4 px-6 py-4 lg:px-3 lg:py-2 md:px-2 md:py-1 rounded-lg ${textColor} bg-${bgColor} ${hoverColor} ${fullWidth}`}
    >
      {data}
    </div>
  );
};

export default MainBtn;
