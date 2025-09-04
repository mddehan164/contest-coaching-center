import React, { useState } from 'react';
import ViewDetails from '../../shared/ViewDetails';
import { getTableFields } from '../../constants/tableFieldConfigs';
import { successNotify, errorNotify } from '../../utils/notify';

/**
 * Custom hook for managing ViewDetails modal functionality
 * @param {string} entityType - The type of entity (students, teachers, courses, etc.)
 * @param {string} titlePrefix - Prefix for the modal title (e.g., "Student", "Course")
 */
export const useViewDetails = (entityType, titlePrefix = 'Item') => {
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openViewDetails = (item) => {
    setSelectedItem(item);
    setIsViewDetailsOpen(true);
  };

  const closeViewDetails = () => {
    setSelectedItem(null);
    setIsViewDetailsOpen(false);
  };

  const ViewDetailsModal = () => (
    <ViewDetails
      data={selectedItem}
      isOpen={isViewDetailsOpen}
      onClose={closeViewDetails}
      title={`${titlePrefix} Details`}
      fieldsToShow={getTableFields(entityType)}
    />
  );

  return {
    isViewDetailsOpen,
    selectedItem,
    openViewDetails,
    closeViewDetails,
    ViewDetailsModal
  };
};

/**
 * Generic action button component for tables
 */
export const ActionButtons = ({ 
  item, 
  onView, 
  onEdit, 
  onDelete,
  showView = true,
  showEdit = true, 
  showDelete = false 
}) => {
  return (
    <div className="flex space-x-2 justify-center">
      {showView && (
        <button
          onClick={() => onView(item)}
          className="text-blue-600 hover:text-blue-900 p-1 rounded"
          title="View Details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}
      
      {showEdit && (
        <button
          onClick={() => onEdit(item)}
          className="text-green-600 hover:text-green-900 p-1 rounded"
          title="Edit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      )}
      
      {showDelete && (
        <button
          onClick={() => onDelete(item)}
          className="text-red-600 hover:text-red-900 p-1 rounded"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * Status badge component for consistent status display
 */
export const StatusBadge = ({ status, statusConfig }) => {
  const config = statusConfig?.[status] || { 
    label: status ? 'Active' : 'Inactive', 
    class: status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
      {config.label}
    </span>
  );
};

/**
 * Generic API response handler with toastify notifications
 */
export const handleApiResponse = (response, successMessage, errorMessage = 'Operation failed') => {
  if (response?.data?.success) {
    if (successMessage) successNotify(successMessage);
    return true;
  } else {
    errorNotify(response?.data?.message || errorMessage);
    return false;
  }
};

/**
 * Generic API error handler with toastify notifications
 */
export const handleApiError = (error, defaultMessage = 'Something went wrong') => {
  console.error('API Error:', error);
  const message = error?.response?.data?.message || error?.message || defaultMessage;
  errorNotify(message);
};

export default {
  useViewDetails,
  ActionButtons,
  StatusBadge,
  handleApiResponse,
  handleApiError
};
