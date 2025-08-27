import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { CustomSpinner } from ".";
import { DataNotFound, ErrorUi } from "../ui";
import { TablePreviousSvg } from "../../utils/svgs";
import { cx } from "../../utils/helper";

const CustomTable = ({
  columns = [],
  dataLength,
  isLoading,
  isError,
  status,
  currentPage,
  pageSize,
  totalPages,
  updatePageMeta,
  children,
  isPagination = true,
  isYellow = false,
}) => {
  return (
    <>
      <div className="flex-1 overflow-auto mb-5">
        <table className="w-full table-auto border border-gray-300">
          <thead
            className={cx(
              "bg-[#102542] text-white sticky top-0",
              isYellow ? "bg-yellow-600" : ""
            )}
          >
            <tr>
              {columns.map((item, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-3 py-2 text-left font-semibold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <CustomTableHelper
              isLoading={isLoading}
              isError={isError}
              status={status}
              dataLength={dataLength}
              column={columns?.length}
            >
              {children}
            </CustomTableHelper>
          </tbody>
        </table>
      </div>

      {dataLength > 0 && isPagination && (
        <CustomPaginate
          currentPage={currentPage || 1}
          rowsPerPage={pageSize || 1}
          totalPages={totalPages || 1}
          updatePage={updatePageMeta}
        />
      )}
    </>
  );
};

const CustomTableHelper = ({
  isLoading = false,
  isError = false,
  status = 404,
  column = 3,
  dataLength = 0,
  emptyTitle = "No data Found",
  errorTitle = "Couldn't retrieve the data.",
  children,
}) => {
  if (isLoading) {
    return (
      <tr className="text-center text-neutral-600">
        <td className="px-3 py-2 border border-gray-300" colSpan={column}>
          <CustomSpinner />
        </td>
      </tr>
    );
  }

  if (isError && status !== 404) {
    return (
      <tr className="text-center text-neutral-600">
        <td className="px-3 py-2 border border-gray-300" colSpan={column}>
          <ErrorUi title={errorTitle} />
        </td>
      </tr>
    );
  }

  if (dataLength === 0) {
    return (
      <tr className="text-center text-neutral-600">
        <td className="px-3 py-2 border border-gray-300" colSpan={column}>
          <DataNotFound title={emptyTitle} />
        </td>
      </tr>
    );
  }

  return children;
};

const CustomPaginate = ({
  currentPage,
  rowsPerPage,
  totalPages,
  updatePage = () => { },
}) => {
  return (
    <div className="flex items-center justify-end gap-6 py-3">
      <ResponsivePagination
        current={currentPage}
        total={totalPages === 0 ? 1 : totalPages}
        onPageChange={(value) => updatePage({ currentPage: value })}
        maxWidth={250}
        pageLinkClassName="w-8 h-8 flex items-center justify-center"
        activeItemClassName="bg-[#4CAF50] w-8 h-8 text-white text-sm font-bold rounded-[8px]"
        previousLabel={<TablePreviousSvg isDisabled={currentPage === 1} />}
        nextLabel={
          <TablePreviousSvg
            cls="rotate-180"
            isDisabled={currentPage === totalPages}
          />
        }
      />
      <div className="hidden md:block">
        <select
          className="w-[73px] px-2 h-8 border border-gray-300 text-gray-900 bg-white rounded-[8px] text-sm outline-none"
          value={rowsPerPage}
          onChange={(e) => updatePage({ pageSize: e.target.value })}
        >
          {[10, 20, 30, 40, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomTable;
