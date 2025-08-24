import FormInput from '../../shared/forms/FormInput';
import { AddSvg, DeleteSvg, EditSvg, SearchSvg } from '../../utils/svgs';
import { SecondaryButton } from '../../shared/buttons';
import AddBatchModal from './AddBatchModal';
import EditBatchModal from './EditBatchModal';
import { CustomConfirmationModal, CustomTable } from '@shared/custom';
import { useBatchs } from '../../hooks/useBatch';
import { SelectedSliceTypeEnum } from '../../utils/enums';
import NotifyContainer from '../../utils/notify';
import { BatchStatusToggleSelect } from '../../components/statusToggleSelect';

const Batch = () => {
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
        handleSetSelectedBatch,
        updatePageMeta,
        handleDelete,
        handleOpenEditBatchModal,
        handleOpenAddBatchModal,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
    } = useBatchs();

    return (
        <div>
            <div className="card-cmn space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="title-cmn">Batch List</h2>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-[269px] relative">
                            <FormInput
                                placeholder="Search Batch"
                                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <SearchSvg cls="absolute top-2.5 right-3" />
                        </div>

                        <SecondaryButton
                            text="Add New Batch"
                            width="w-full md:w-[167px]"
                            startIcon={<AddSvg />}
                            onClick={() => handleOpenAddBatchModal()}
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
                    columns={["SL", "Batch Name", "Course", "Start Date", "End Date", "Status", "Action"]}
                    dataLength={dataList?.length || 0}
                >
                    {dataList?.map((item, index) => (
                        <tr className="table_row" key={index}>
                            <td className="table_td">{index + 1}</td>
                            <td className="table_td">{item?.name}</td>
                            <td className="table_td">{item?.course?.title}</td>
                            <td className="table_td">{new Date(item?.start_date).toLocaleDateString()}</td>
                            <td className="table_td">{new Date(item?.end_date).toLocaleDateString()}</td>
                            <td className="table_td">
                                <BatchStatusToggleSelect
                                    batchId={item.encrypted_id}
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
                                            handleSetSelectedBatch({ ...item, type: SelectedSliceTypeEnum.UPDATE });
                                            handleOpenEditBatchModal();
                                        }}
                                    >
                                        <EditSvg />
                                    </button>
                                    {/* <button
                                        onClick={() => {
                                            handleSetSelectedBatch({ ...item, type: SelectedSliceTypeEnum.DELETE });
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

            {/* add batch modal */}
            <AddBatchModal />

            {/* edit batch modal */}
            <EditBatchModal data={selectedData} />

            {/* delete modal */}
            <CustomConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmationModal}
                title={
                    selectedData?.type === SelectedSliceTypeEnum.DELETE && 'Are you sure?'
                }
                description={
                    selectedData?.type === SelectedSliceTypeEnum.DELETE
                        ? 'You want to remove this batch?'
                        : selectedData?.type === SelectedSliceTypeEnum.UPDATE
                            ? 'Updated successfully.'
                            : 'Action completed.'
                }
                handler={() => {
                    if (selectedData?.type === SelectedSliceTypeEnum.DELETE)
                        handleDelete({ batchId: selectedData.id }); // ✅ batchId instead of adminId
                    else handleCloseConfirmationModal();
                }}
                deleteModal={selectedData?.type === SelectedSliceTypeEnum.DELETE}
                isLoading={deleteLoading}
            />
            <NotifyContainer />
        </div>
    );
};

export default Batch;
