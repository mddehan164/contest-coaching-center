import { useState } from "react";
import { useSelector } from "react-redux";
import { noticeBtnData } from "../../data/data";
import NoticePanel from "./NoticePanel";
import { useNotices } from "../../hooks/useNotice";
import BranchFilter from "../BranchFilter";

const MainNoticePanel = () => {
  const { isLoading, dataList, handleSetSelectedNotice } = useNotices();
  const activeTab = useSelector((state) => state.ui.activeTab);
  // Filter out status 0 first
  const validNotices = dataList.filter((n) => n.status !== 0);
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
      <BranchFilter notices={dataList} onFilter={setSelectedBranch} />

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
