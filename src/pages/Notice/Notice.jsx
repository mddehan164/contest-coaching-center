import { useState } from "react";
import FormInput from "../../shared/forms/FormInput";
import { AddSvg, EditSvg, EyeOpenSvg, SearchSvg } from "../../utils/svgs";
import { SecondaryButton } from "../../shared/buttons";
import AddNoticeModal from "./AddNoticeModal";
import EditNoticeModal from "./EditNoticeModal";
import { CustomConfirmationModal, CustomTable } from "@shared/custom";
import ViewDetails from "../../shared/ViewDetails";
import { useNotices } from "../../hooks/useNotice";
import { SelectedSliceTypeEnum } from "../../utils/enums";
import NotifyContainer from "../../utils/notify";
import { NoticeStatusToggleSelect } from "../../components/statusToggleSelect";

const Notice = () => {
  const {
    isLoading,
    isError,
    status,
    meta,
    dataList,
    selectedData,
    searchKeyword,
    deleteLoading,
    setSearchKeyword,
    handleSetSelectedNotice,
    updatePageMeta,
    handleDelete,
    handleOpenEditNoticeModal,
    handleOpenAddNoticeModal,
    isConfirmModalOpen,
    handleCloseConfirmationModal,
  } = useNotices();

  // ViewDetails state
  const [isOpen, setIsOpen] = useState(false);

  const handleViewDetails = (notice) => {
    handleSetSelectedNotice({
      ...notice,
      actionType: SelectedSliceTypeEnum.VIEW,
    });
    setIsOpen(true);
  };

  return (
    <div>
      <div className="card-cmn space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="title-cmn">Notice List</h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-[269px] relative">
              <FormInput
                placeholder="Search Notice"
                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <SearchSvg cls="absolute top-2.5 right-3" />
            </div>

            <SecondaryButton
              text="Add New Notice"
              width="w-full md:w-[167px]"
              startIcon={<AddSvg />}
              onClick={() => handleOpenAddNoticeModal()}
            />
          </div>
        </div>

        <CustomTable
          isLoading={isLoading}
          isError={isError}
          status={status}
          currentPage={meta?.currentPage || 1}
          pageSize={meta?.pageSize || 10}
          totalPages={meta?.totalPages || 1}
          updatePageMeta={updatePageMeta}
          columns={[
            "SL",
            "Notice Name",
            "Type",
            "Published At",
            "Branch",
            "Status",
            "Action",
          ]}
          dataLength={dataList?.length || 0}
        >
          {dataList?.map((item, index) => (
            <tr className="table_row" key={index}>
              <td className="table_td">
                {(meta?.current_page - 1) * meta?.per_page + index + 1}
              </td>
              <td className="table_td">{item?.title || "N/A"}</td>
              <td className="table_td truncate">{item?.type_name || "N/A"}</td>
              <td className="table_td">
                {item?.created_at?.split("T")[0] || "N/A"}
              </td>
              <td className="table_td">
                {item?.branch?.name || "N/A"},{item?.branch?.location || "N/A"}
              </td>
              <td className="table_td">
                <NoticeStatusToggleSelect
                  noticeId={item?.encrypted_id}
                  currentStatus={item?.status}
                  onStatusChange={(newStatus) => {
                    const updatedItem = { ...item, status: newStatus };
                  }}
                />
              </td>
              <td className="table_td flex justify-center">
                <div className="flex items-center gap-x-3">
                  <button onClick={() => handleViewDetails(item)}>
                    <EyeOpenSvg />
                  </button>
                  <button
                    onClick={() => {
                      handleSetSelectedNotice({
                        ...item,
                        actionType: SelectedSliceTypeEnum.UPDATE,
                      });
                      handleOpenEditNoticeModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
      </div>

      {/* ViewDetails Modal */}
      <ViewDetails
        data={selectedData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Notice Details"
        fieldsToShow={[
          "title",
          "type_name",
          "date",
          "branch.name",
          "file_url",
          "status",
          "created_at",
          "creator.name",
        ]}
      />

      {/* add notice modal */}
      <AddNoticeModal />

      {/* edit notice modal */}
      <EditNoticeModal data={selectedData} />

      {/* delete modal */}
      <CustomConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmationModal}
        title={
          selectedData?.actionType === SelectedSliceTypeEnum.DELETE &&
          "Are you sure?"
        }
        description={
          selectedData?.actionType === SelectedSliceTypeEnum.DELETE
            ? "You want to remove this notice?"
            : selectedData?.actionType === SelectedSliceTypeEnum.UPDATE
            ? "Updated successfully."
            : "Action completed."
        }
        handler={() => {
          if (selectedData?.actionType === SelectedSliceTypeEnum.DELETE)
            handleDelete({
              noticeId: selectedData.id,
            });
          // ✅ noticeId instead of adminId
          else handleCloseConfirmationModal();
        }}
        deleteModal={selectedData?.actionType === SelectedSliceTypeEnum.DELETE}
        isLoading={deleteLoading}
      />
      <NotifyContainer />
    </div>
  );
};

export default Notice;
