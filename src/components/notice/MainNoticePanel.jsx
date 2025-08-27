import React from "react";
import { useSelector } from "react-redux";
import { noticeData, noticeBtnData } from "../../data/data";
import NoticePanel from "./NoticePanel";
import MainBtn from "../mainBtn";

const MainNoticePanel = () => {
  const { notices, tabLabelMap } = noticeData;
  const activeTab = useSelector(state => state.ui.activeTab);

  return (
    <div>
      {activeTab === "Admission" && (
        <NoticePanel notices={notices.admissionNotices} />
      )}
      {activeTab === "Administration" && (
        <NoticePanel notices={notices.administrationNotices} />
      )}
      {activeTab === "Department" && (
        <NoticePanel notices={notices.departmentNotices} />
      )}

      <MainBtn
        data={tabLabelMap[activeTab]} // ✅ ট্যাব অনুযায়ী নাম
        btnStyle={noticeBtnData.btnStyle}
      />
    </div>
  );
};

export default MainNoticePanel;
