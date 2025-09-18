import NoticeBtn from "./NoticeBtn";
import MainNoticePanel from "./MainNoticePanel";
import CustomSpinner from "../../shared/custom/CustomSpinner";
import { useNotices } from "../../hooks/useNotice";

const NoticeBody = () => {
  const { isLoading } = useNotices();
  return (
    <div className="w-full">
      <NoticeBtn />
      {!isLoading ? (
        <MainNoticePanel />
      ) : (
        <div>
          <CustomSpinner />
        </div>
      )}
    </div>
  );
};

export default NoticeBody;
