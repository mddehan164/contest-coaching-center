import React, { useState } from "react";

const List = ({ list, onSelect, type }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced filtering: match partial name, id, subject, roll, branch
  const filteredList = list.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();

    // Extract all searchable fields
    const searchableFields = [
      item.name?.toLowerCase(),
      String(item.id),
      item.subject?.toLowerCase(),
      String(item.roll),
      item.branch?.toLowerCase(),
    ];

    // Return true if any field contains the search term
    return searchableFields.some((field) => field?.includes(lowerSearch));
  });

  return (
    <div className="p-4 border rounded-md shadow-md bg-contestLight">
      <h2 className="text-xl lg:text-3xl font-bold mb-4">
        {type === "teacher" ? "Teacher List" : "Student List"}
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder={`Search ${type === "teacher" ? "by name, subject, id..." : "by name, roll, branch..."}`}
        className="mb-4 w-full p-2 border border-gray-300 rounded-md text-base"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="w-full border-collapse border text-lg">
        <thead>
          <tr className="bg-headerColor">
            <th>ID</th>
            <th>Name</th>
            {type === "teacher" ? (
              <th>Subject</th>
            ) : (
              <>
                <th>Roll</th>
                <th>Branch</th>
              </>
            )}
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item) => (
            <tr key={item.id} className="text-center border-t">
              <td>{item.id}</td>
              <td>{item.name}</td>
              {type === "teacher" ? (
                <td>{item.subject}</td>
              ) : (
                <>
                  <td>{item.roll}</td>
                  <td>{item.branch}</td>
                </>
              )}
              <td>
                <button
                  onClick={() => onSelect(type === "teacher" ? item.id : item.roll)}
                  className="text-blue-600 underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {filteredList.length === 0 && (
            <tr>
              <td colSpan={type === "teacher" ? 4 : 5} className="text-center py-4 text-red-600">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
