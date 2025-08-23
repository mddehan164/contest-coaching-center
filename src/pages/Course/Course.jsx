import FormInput from '../../shared/forms/FormInput';
import { AddSvg, DeleteSvg, EditSvg, SearchSvg } from '../../utils/svgs';
import { SecondaryButton } from '../../shared/buttons';
import AddCourseModal from './AddCourseModal';
import EditCourseModal from './EditCourseModal';
import { CustomConfirmationModal, CustomTable } from '@shared/custom';
import { useCourses } from '../../hooks/useCourse';
import { SelectedSliceTypeEnum } from '../../utils/enums';
import NotifyContainer from '../../utils/notify';

const Course = () => {
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
        handleSetSelectedCourse,
        updatePageMeta,
        handleDelete,
        handleOpenEditCourseModal,
        handleOpenAddCourseModal,
        isConfirmModalOpen,
        handleOpenConfirmationModal,
        handleCloseConfirmationModal,
    } = useCourses();

    return (
        <div>
            <div className="card-cmn space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="title-cmn">Course List</h2>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-[269px] relative">
                            <FormInput
                                placeholder="Search Course"
                                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <SearchSvg cls="absolute top-2.5 right-3" />
                        </div>

                        <SecondaryButton
                            text="Add New Course"
                            width="w-full md:w-[167px]"
                            startIcon={<AddSvg />}
                            onClick={() => handleOpenAddCourseModal()}
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
                    columns={["SL", "Course Name", "Course Description", "Price", "Offer Price", "Status", "Action"]}
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
                                {item?.status === 1 ? "Active" : "Inactive"}
                            </td>
                            <td className="table_td flex justify-center">
                                <div className="flex items-center gap-x-3">
                                    <button
                                        onClick={() => {
                                            handleSetSelectedCourse({ ...item, type: SelectedSliceTypeEnum.UPDATE });
                                            handleOpenEditCourseModal();
                                        }}
                                    >
                                        <EditSvg />
                                    </button>
                                    {/* <button
                                        onClick={() => {
                                            handleSetSelectedCourse({ ...item, type: SelectedSliceTypeEnum.DELETE });
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

            {/* add course modal */}
            <AddCourseModal />

            {/* edit course modal */}
            <EditCourseModal data={selectedData} />

            {/* delete modal */}
            <CustomConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmationModal}
                title={
                    selectedData?.type === SelectedSliceTypeEnum.DELETE && 'Are you sure?'
                }
                description={
                    selectedData?.type === SelectedSliceTypeEnum.DELETE
                        ? 'You want to remove this course?'
                        : selectedData?.type === SelectedSliceTypeEnum.UPDATE
                            ? 'Updated successfully.'
                            : 'Action completed.'
                }
                handler={() => {
                    if (selectedData?.type === SelectedSliceTypeEnum.DELETE)
                        handleDelete({ courseId: selectedData.id }); // ✅ courseId instead of adminId
                    else handleCloseConfirmationModal();
                }}
                deleteModal={selectedData?.type === SelectedSliceTypeEnum.DELETE}
                isLoading={deleteLoading}
            />
            <NotifyContainer />
        </div>
    );
};

export default Course;
