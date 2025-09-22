import { headerData } from "../../data/data";

const HeaderIcons = () => {
  return (
    <div className="flex gap-5 max-sm:gap-3">
      {headerData.headerS2.map((item, index) => (
        <div className="flex items-center justify-between" key={index}>
          <item.icon className="cursor-pointer transition duration-300 hover:drop-shadow-[0_0_8px_white] hover:scale-125 max-sm:text-xs" />
        </div>
      ))}
    </div>
  );
};

export default HeaderIcons;
