import FormInput from '../../shared/forms/FormInput';
import { AddSvg, DeleteSvg, EditSvg, SearchSvg } from '../../utils/svgs';
import { SecondaryButton } from '../../shared/buttons';
import AddReviewModal from './AddReviewModal';
import EditReviewModal from './EditReviewModal';
import { CustomConfirmationModal, CustomTable } from '@shared/custom';
import { useReviews } from '../../hooks/useReview';
import { SelectedSliceTypeEnum } from '../../utils/enums';
import NotifyContainer from '../../utils/notify';
import { ReviewStatusToggleSelect } from '../../components/statusToggleSelect';

const Review = () => {
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
        handleSetSelectedReview,
        updatePageMeta,
        handleDelete,
        handleOpenEditReviewModal,
        handleOpenAddReviewModal,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
    } = useReviews();

    return (
        <div>
            <div className="card-cmn space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="title-cmn">Review List</h2>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-[269px] relative">
                            <FormInput
                                placeholder="Search Review"
                                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <SearchSvg cls="absolute top-2.5 right-3" />
                        </div>

                        <SecondaryButton
                            text="Add New Review"
                            width="w-full md:w-[167px]"
                            startIcon={<AddSvg />}
                            onClick={() => handleOpenAddReviewModal()}
                        />
                    </div>
                </div>

                <CustomTable
                    isLoading={isLoading}
                    isError={isError}
                    status={status}
                    currentPage={meta?.current_page || 1}
                    pageSize={meta?.per_page || 10}
                    totalPages={meta?.last_page || 1}
                    updatePageMeta={updatePageMeta}
                    columns={["SL", "Name", "Year", "Rank", "Status", "Action"]}
                    dataLength={dataList?.length || 0}
                >
                    {dataList?.map((item, index) => (
                        <tr className="table_row" key={index}>
                            <td className="table_td">{(meta?.current_page - 1) * meta?.per_page + index + 1}</td>
                            <td className="table_td">{item?.name}</td>
                            <td className="table_td">{item?.year}</td>
                            <td className="table_td">{item?.rank}</td>
                            <td className="table_td">
                                <ReviewStatusToggleSelect
                                    reviewId={item.encrypted_id}
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
                                            handleSetSelectedReview({ ...item, type: SelectedSliceTypeEnum.UPDATE });
                                            handleOpenEditReviewModal();
                                        }}
                                    >
                                        <EditSvg />
                                    </button>
                                    {/* <button
                                        onClick={() => {
                                            handleSetSelectedReview({ ...item, type: SelectedSliceTypeEnum.DELETE });
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

            {/* add review modal */}
            <AddReviewModal />

            {/* edit review modal */}
            <EditReviewModal data={selectedData} />

            {/* delete modal */}
            <CustomConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmationModal}
                title={
                    selectedData?.type === SelectedSliceTypeEnum.DELETE && 'Are you sure?'
                }
                description={
                    selectedData?.type === SelectedSliceTypeEnum.DELETE
                        ? 'You want to remove this review?'
                        : selectedData?.type === SelectedSliceTypeEnum.UPDATE
                            ? 'Updated successfully.'
                            : 'Action completed.'
                }
                handler={() => {
                    if (selectedData?.type === SelectedSliceTypeEnum.DELETE)
                        handleDelete({ reviewId: selectedData.encrypted_id });
                    else handleCloseConfirmationModal();
                }}
                deleteModal={selectedData?.type === SelectedSliceTypeEnum.DELETE}
                isLoading={deleteLoading}
            />
            <NotifyContainer />
        </div>
    );
};

export default Review;
