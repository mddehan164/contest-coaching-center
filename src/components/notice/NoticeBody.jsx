import NoticeBtn from "./NoticeBtn";
import MainNoticePanel from "./MainNoticePanel";
import CustomSpinner from "../../shared/custom/CustomSpinner";
import { useGetAllPublicNoticesQuery } from "../../redux-rtk/notice";

const NoticeBody = () => {
  const { isLoading } = useGetAllPublicNoticesQuery();
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
