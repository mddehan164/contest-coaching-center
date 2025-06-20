import React from 'react'
import { noticeData } from '../../data/data'
import NoticePanel from './NoticePanel';
import { useStateContext } from '../../context/ContextProvider';
import MainBtn from '../mainBtn';

const MainNoticePanel = () => {
    const { notices, noticeBtn, tabLabelMap } = noticeData;
    const { activeTab } = useStateContext();

    return (
        <div>
            {activeTab === 'Admission' && <NoticePanel notices={notices.admissionNotices} />}
            {activeTab === 'Administration' && <NoticePanel notices={notices.administrationNotices} />}
            {activeTab === 'Department' && <NoticePanel notices={notices.departmentNotices} />}
            
            <MainBtn 
                data={tabLabelMap[activeTab]} // ✅ ট্যাব অনুযায়ী নাম
                btnStyle={noticeBtn.btnData.btnStyle}
            />
        </div>
    )
}

export default MainNoticePanel;
