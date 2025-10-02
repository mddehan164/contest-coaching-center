import React, { useState } from "react";
import FormInput from "../../shared/forms/FormInput";
import { AddSvg, EditSvg, EyeOpenSvg, SearchSvg } from "../../utils/svgs";
import { SecondaryButton } from "../../shared/buttons";
import AddTeacherModal from "./AddTeacherModal";
import EditTeacherModal from "./EditTeacherModal";
import { CustomConfirmationModal, CustomTable } from "@shared/custom";
import ViewDetails from "../../shared/ViewDetails";
import { useTeachers } from "../../hooks/useTeacher";
import { SelectedSliceTypeEnum } from "../../utils/enums";
import NotifyContainer from "../../utils/notify";

const Teacher = () => {
  const {
    isLoading,
    isError,
    status,
    meta,
    dataList,
    selectedData,
    searchKeyword,
    // deleteLoading,
    setSearchKeyword,
    handleSetSelectedTeacher,
    updatePageMeta,
    handleDelete,
    handleOpenEditTeacherModal,
    handleOpenAddTeacherModal,
    isConfirmModalOpen,
    handleCloseConfirmationModal,
  } = useTeachers();

  // ViewDetails state
  const [isOpen, setIsOpen] = useState(false);

  const handleViewDetails = (teacher) => {
    handleSetSelectedTeacher({ ...teacher, type: SelectedSliceTypeEnum.VIEW });
    setIsOpen(true);
  };
  return (
    <div>
      <div className="card-cmn space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="title-cmn">Teacher List</h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-[269px] relative">
              <FormInput
                placeholder="Search Teacher"
                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <SearchSvg cls="absolute top-2.5 right-3" />
            </div>

            <SecondaryButton
              text="Add New Teacher"
              width="w-full md:w-[167px]"
              startIcon={<AddSvg />}
              onClick={() => handleOpenAddTeacherModal()}
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
            "Teacher Name",
            "Mobile",
            "Branch",
            "Course",
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
              <td className="table_td">{item?.name}</td>
              <td className="table_td">{item?.mobile}</td>
              <td className="table_td truncate">{item?.branch?.name}</td>
              <td className="table_td">{item?.course?.title}</td>
              <td className="table_td">
                {item?.status === 1 ? "Active" : "Inactive"}
              </td>
              <td className="table_td flex justify-center">
                <div className="flex items-center gap-x-3">
                  <button onClick={() => handleViewDetails(item)}>
                    <EyeOpenSvg />
                  </button>
                  <button
                    onClick={() => {
                      handleSetSelectedTeacher({
                        ...item,
                        type: SelectedSliceTypeEnum.UPDATE,
                      });
                      handleOpenEditTeacherModal();
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
        title="Teacher Details"
        fieldsToShow={[
          "name",
          "subject",
          "gender",
          "mobile",
          "address",
          "course.title",
          "branch.name",
          "batch.name",
          "status",
          "created_at",
          "creator.name",
        ]}
      />

      {/* add teacher modal */}
      <AddTeacherModal />

      {/* edit teacher modal */}
      <EditTeacherModal data={selectedData} />

      {/* delete modal */}
      <CustomConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmationModal}
        title={
          selectedData?.type === SelectedSliceTypeEnum.DELETE && "Are you sure?"
        }
        description={
          selectedData?.type === SelectedSliceTypeEnum.UPDATE
            ? "Updated successfully."
            : "Action completed."
        }
        handler={() => {
          if (selectedData?.type === SelectedSliceTypeEnum.DELETE)
            handleDelete({
              teacherId: selectedData.id,
            });
          // ✅ teacherId instead of adminId
          else handleCloseConfirmationModal();
        }}
        // deleteModal={selectedData?.type === SelectedSliceTypeEnum.DELETE}
        // isLoading={deleteLoading}
      />
      <NotifyContainer />
    </div>
  );
};

export default Teacher;
