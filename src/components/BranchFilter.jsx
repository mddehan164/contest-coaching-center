const BranchFilter = ({ notices, onFilter }) => {
  const branches = [
    ...new Set(notices.map((notice) => notice.branch?.name || "Unknown")),
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {branches.map((branch, idx) => (
        <button
          key={idx}
          onClick={() => onFilter(branch)}
          className="px-4 py-1 border rounded hover:bg-gray-200 font-semibold"
        >
          {branch}
        </button>
      ))}
    </div>
  );
};

export default BranchFilter;
