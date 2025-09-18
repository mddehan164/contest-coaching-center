import { useSelector, useDispatch } from "react-redux";
import { noticeBtnData } from "../../data/data";
import { setActiveTab } from "../../redux-rtk/uiSlice";
import MainBtn from "../MainBtn";

const NoticeBtn = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ui.activeTab);

  const handleSetActiveTab = (tab) => {
    dispatch(setActiveTab(tab));
  };
  return (
    <div className="flex flex-wrap gap-1 pt-2 w-full">
      {noticeBtnData.btnName.map((btn, idx) => {
        const isActive = activeTab === btn;
        return (
          <MainBtn
            key={idx}
            btnName={btn}
            data={btn}
            btnStyle={noticeBtnData.btnStyle}
            isActive={isActive}
            onClick={() => handleSetActiveTab(btn)}
          />
        );
      })}
      <hr className="w-full" />
    </div>
  );
};

export default NoticeBtn;
