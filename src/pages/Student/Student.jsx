import FormInput from "../../shared/forms/FormInput";
import { AddSvg, DeleteSvg, EditSvg, SearchSvg } from "../../utils/svgs";
import { SecondaryButton } from "../../shared/buttons";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { CustomConfirmationModal, CustomTable } from "@shared/custom";
import { useStudents } from "../../hooks/useStudent";
import { SelectedSliceTypeEnum } from "../../utils/enums";
import NotifyContainer from "../../utils/notify";
import errorImg from "../../assets/images/error.png";

const Student = () => {
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
    handleSetSelectedStudent,
    updatePageMeta,
    handleDelete,
    handleOpenEditStudentModal,
    handleOpenAddStudentModal,
    isConfirmModalOpen,
    handleOpenConfirmationModal,
    handleCloseConfirmationModal,
  } = useStudents();

  return (
    <div>
      <div className="card-cmn space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="title-cmn">Student List</h2>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-[269px] relative">
              <FormInput
                placeholder="Search Student"
                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <SearchSvg cls="absolute top-2.5 right-3" />
            </div>

            <SecondaryButton
              text="Add New Student"
              width="w-full md:w-[167px]"
              startIcon={<AddSvg />}
              onClick={() => handleOpenAddStudentModal()}
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
            "Student",
            "Mobile",
            "Address",
            "Course",
            "Status",
            "Action",
          ]}
          dataLength={dataList?.length || 0}
        >
          {dataList?.map((item, index) => (
            <tr className="table_row hover:bg-contestLight" key={index}>
              <td className="table_td">{index + 1}</td>
              <td className="table_td">
                <div className="flex items-center gap-x-3 w-full h-5">
                  {item.image ? (
                    <img
                      loading="lazy"
                      className="w-1/2 h-auto"
                      src={item?.image}
                      alt={item?.name}
                    />
                  ) : (
                    <img src={errorImg} alt="No Image" loading="lazy" />
                  )}
                  <p className="w-1/2">{item?.name}</p>
                </div>
              </td>
              <td className="table_td">{item?.mobile}</td>
              <td className="table_td truncate">{item?.address}</td>
              <td className="table_td">{item?.course?.title}</td>
              <td className="table_td">
                <p
                  className={`${
                    item.status === 1 ? "text-green-500" : "bg-red-500"
                  }`}
                >
                  {item?.status === 1 ? "Active" : "Inactive"}
                </p>
              </td>
              <td className="table_td flex justify-center">
                <div className="flex items-center gap-x-3">
                  <button
                    onClick={() => {
                      handleSetSelectedStudent({
                        ...item,
                        type: SelectedSliceTypeEnum.UPDATE,
                      });
                      handleOpenEditStudentModal();
                    }}
                  >
                    <EditSvg />
                  </button>
                  <button
                    onClick={() => {
                      handleSetSelectedStudent({
                        ...item,
                        type: SelectedSliceTypeEnum.DELETE,
                      });
                      handleOpenConfirmationModal();
                    }}
                  >
                    <DeleteSvg />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </CustomTable>
      </div>

      {/* add student modal */}
      <AddStudentModal />

      {/* edit student modal */}
      <EditStudentModal data={selectedData} />

      {/* delete modal */}
      <CustomConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmationModal}
        title={
          selectedData?.type === SelectedSliceTypeEnum.DELETE && "Are you sure?"
        }
        description={
          selectedData?.type === SelectedSliceTypeEnum.DELETE
            ? "You want to remove this student?"
            : selectedData?.type === SelectedSliceTypeEnum.UPDATE
            ? "Updated successfully."
            : "Action completed."
        }
        handler={() => {
          if (selectedData?.type === SelectedSliceTypeEnum.DELETE)
            handleDelete({
              studentId: selectedData.id,
            });
          // ✅ studentId instead of adminId
          else handleCloseConfirmationModal();
        }}
        deleteModal={selectedData?.type === SelectedSliceTypeEnum.DELETE}
        isLoading={deleteLoading}
      />
      <NotifyContainer />
    </div>
  );
};

export default Student;
