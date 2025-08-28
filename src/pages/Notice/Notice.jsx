import FormInput from "../../shared/forms/FormInput";
import { AddSvg, DeleteSvg, EditSvg, SearchSvg } from "../../utils/svgs";
import { SecondaryButton } from "../../shared/buttons";
import AddNoticeModal from "./AddNoticeModal";
import EditNoticeModal from "./EditNoticeModal";
import { CustomConfirmationModal, CustomTable } from "@shared/custom";
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
    handleOpenConfirmationModal,
    handleCloseConfirmationModal,
  } = useNotices();

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
            "Notice Description",
            "Price",
            "Offer Price",
            "Status",
            "Action",
          ]}
          dataLength={dataList?.length || 0}
        >
          {dataList?.map((item, index) => (
            <tr className="table_row" key={index}>
              <td className="table_td">{index + 1}</td>
              <td className="table_td">{item?.title}</td>
              <td className="table_td truncate">{item?.short_des}</td>
              <td className="table_td">{item?.price}</td>
              <td className="table_td">{item?.offer_price}</td>
              <td className="table_td">
                <NoticeStatusToggleSelect
                  noticeId={item.encrypted_id}
                  currentStatus={item.status}
                  onStatusChange={(newStatus) => {
                    const updatedItem = { ...item, status: newStatus };
                  }}
                />
              </td>
              <td className="table_td flex justify-center">
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {
                      handleSetSelectedNotice({
                        ...item,
                        type: SelectedSliceTypeEnum.UPDATE,
                      });
                      handleOpenEditNoticeModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                  {/* <button
                                        onClick={() => {
                                            handleSetSelectedNotice({ ...item, type: SelectedSliceTypeEnum.DELETE });
                                            handleOpenConfirmationModal();
                                        }}
                                    >
                                        <DeleteSvg />
                                    </button> */}
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
      </div>

      {/* add notice modal */}
      <AddNoticeModal />

      {/* edit notice modal */}
      <EditNoticeModal data={selectedData} />

      {/* delete modal */}
      <CustomConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmationModal}
        title={
          selectedData?.type === SelectedSliceTypeEnum.DELETE && "Are you sure?"
        }
        description={
          selectedData?.type === SelectedSliceTypeEnum.DELETE
            ? "You want to remove this notice?"
            : selectedData?.type === SelectedSliceTypeEnum.UPDATE
            ? "Updated successfully."
            : "Action completed."
        }
        handler={() => {
          if (selectedData?.type === SelectedSliceTypeEnum.DELETE)
            handleDelete({
              noticeId: selectedData.id,
            }); // ✅ noticeId instead of adminId
          else handleCloseConfirmationModal();
        }}
        deleteModal={selectedData?.type === SelectedSliceTypeEnum.DELETE}
        isLoading={deleteLoading}
      />
      <NotifyContainer />
    </div>
  );
};

export default Notice;
