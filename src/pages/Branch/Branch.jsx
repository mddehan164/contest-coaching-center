import React, { useState } from 'react';
import FormInput from '../../shared/forms/FormInput';
import { AddSvg, EditSvg, EyeOpenSvg, SearchSvg } from '../../utils/svgs';
import { SecondaryButton } from '../../shared/buttons';
import AddBranchModal from './AddBranchModal';
import EditBranchModal from './EditBranchModal';
import { CustomTable } from '@shared/custom';
import ViewDetails from '../../shared/ViewDetails';
import { useBranches } from '../../hooks/useBranch';
import { SelectedSliceTypeEnum } from '../../utils/enums';
import NotifyContainer from '../../utils/notify';
import { BranchStatusToggleSelect } from '../../components/statusToggleSelect';

const Branch = () => {
    const {
        isLoading,
        isError,
        status,
        meta,
        dataList,
        selectedData,
        searchKeyword,
        setSearchKeyword,
        handleSetSelectedBranch,
        updatePageMeta,
        handleOpenEditBranchModal,
        handleOpenAddBranchModal,
    } = useBranches();

    // ViewDetails state
    const [isOpen, setIsOpen] = useState(false);

    const handleViewDetails = (branch) => {
        handleSetSelectedBranch({ ...branch, type: SelectedSliceTypeEnum.VIEW });
        setIsOpen(true);
    };

    return (
        <div>
            <div className="card-cmn space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="title-cmn">Branch List</h2>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full md:w-[269px] relative">
                            <FormInput
                                placeholder="Search Branch"
                                inputCss="pr-12 !py-2.5 !rounded-lg !bg-white"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <SearchSvg cls="absolute top-2.5 right-3" />
                        </div>

                        <SecondaryButton
                            text="Add New Branch"
                            width="w-full md:w-[167px]"
                            startIcon={<AddSvg />}
                            onClick={() => handleOpenAddBranchModal()}
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
                    columns={["SL", "Branch Name", "Location", "Description", "Status", "Action"]}
                    dataLength={dataList?.length || 0}
                >
                    {dataList?.map((item, index) => (
                        <tr className="table_row" key={index}>
                            <td className="table_td">{index + 1}</td>
                            <td className="table_td">{item?.name}</td>
                            <td className="table_td">{item?.location}</td>
                            <td className="table_td truncate max-w-xs">{item?.description}</td>
                            <td className="table_td">
                                <BranchStatusToggleSelect
                                    branchData={item}
                                    onUpdate={() => {
                                        // Optionally trigger refetch or update local state
                                    }}
                                />
                            </td>
                            <td className="table_td flex justify-center">
                                <div className="flex items-center gap-x-3">
                                    <button
                                        onClick={() => handleViewDetails(item)}
                                    >
                                        <EyeOpenSvg />
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleSetSelectedBranch({ ...item, type: SelectedSliceTypeEnum.UPDATE });
                                            handleOpenEditBranchModal();
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
                title="Branch Details"
                fieldsToShow={[
                    'name',
                    'location',
                    'description',
                    'image',
                    'status',
                    'created_at'
                ]}
            />

            {/* add branch modal */}
            <AddBranchModal />

            {/* edit branch modal */}
            <EditBranchModal data={selectedData} />

            <NotifyContainer />
        </div>
    );
};

export default Branch;
