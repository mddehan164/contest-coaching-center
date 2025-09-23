import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noticeBtnData } from "../../data/data";
import NoticePanel from "./NoticePanel";
import BranchFilter from "../BranchFilter";
import {
  setSelectedNoticeData,
  useGetAllPublicNoticesQuery,
} from "../../redux-rtk/notice";

const MainNoticePanel = () => {
  const dispatch = useDispatch();
  const { data: publicNotices = { data: [] }, isLoading } =
    useGetAllPublicNoticesQuery();
  const activeTab = useSelector((state) => state.ui.activeTab);

  const handleSetSelectedNotice = (notice) => {
    dispatch(setSelectedNoticeData(notice));
  };
  // Filter out status 0 first
  const validNotices = publicNotices?.data?.filter((n) => n.status !== 0);
  // ✅ Branch filter state
  const [selectedBranch, setSelectedBranch] = useState(null);

  // 🔹 Branch অনুযায়ী filter
  const filteredByBranch = selectedBranch
    ? validNotices.filter((n) => n.branch?.name === selectedBranch)
    : validNotices;

  // 🔹 Tab অনুযায়ী filter
  const admissionNotice = filteredByBranch?.filter(
    (n) => n.type_name === noticeBtnData.btnName[0]
  );
  const administrationNotice = filteredByBranch?.filter(
    (n) => n.type_name === noticeBtnData.btnName[1]
  );
  const departmentNotice = filteredByBranch?.filter(
    (n) => n.type_name === noticeBtnData.btnName[2]
  );

  return (
    <div className="w-full">
      {/* 🔹 Branch Filter Buttons */}
      <BranchFilter
        notices={publicNotices?.data}
        onFilter={setSelectedBranch}
      />

      {/* 🔹 Notices by Tab */}
      {activeTab === "Admission" && (
        <NoticePanel
          notices={admissionNotice}
          onSelect={handleSetSelectedNotice}
          loading={isLoading}
        />
      )}
      {activeTab === "Administration" && (
        <NoticePanel
          notices={administrationNotice}
          onSelect={handleSetSelectedNotice}
          loading={isLoading}
        />
      )}
      {activeTab === "Department" && (
        <NoticePanel
          notices={departmentNotice}
          onSelect={handleSetSelectedNotice}
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default MainNoticePanel;
