import { useState } from 'react';
import { useToggleCourseStatusMutation } from '../redux-rtk/course';
import { errorNotify, successNotify } from '../utils/notify';
import { useToggleBatchStatusMutation } from '../redux-rtk/batch';

const CourseStatusToggleSelect = ({ courseId, currentStatus, onStatusChange }) => {
  const [toggleStatus, { isLoading }] = useToggleCourseStatusMutation();
  const [localStatus, setLocalStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await toggleStatus({ courseId }).unwrap();
      
      if (response?.success) {
        setLocalStatus(newStatus);
        successNotify(response?.message || 'Status updated successfully');
        
        // Call the callback if provided
        if (onStatusChange) {
          onStatusChange(newStatus);
        }
      }
    } catch (err) {
      errorNotify(err?.data?.message || 'Failed to update status');
      // Revert to previous status on error
      setLocalStatus(currentStatus);
    }
  };

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];

  return (
    <select
      value={localStatus}
      onChange={(e) => handleStatusChange(Number(e.target.value))}
      disabled={isLoading}
      className={`px-2 py-1 rounded-md border text-sm ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        localStatus === 1 
          ? 'bg-green-100 text-green-800 border-green-300' 
          : 'bg-red-100 text-red-800 border-red-300'
      }`}
    >
      {statusOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const BatchStatusToggleSelect = ({ batchId, currentStatus, onStatusChange }) => {
  const [toggleStatus, { isLoading }] = useToggleBatchStatusMutation();
  const [localStatus, setLocalStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await toggleStatus({ batchId }).unwrap();
      
      if (response?.success) {
        setLocalStatus(newStatus);
        successNotify(response?.message || 'Status updated successfully');
        
        // Call the callback if provided
        if (onStatusChange) {
          onStatusChange(newStatus);
        }
      }
    } catch (err) {
      errorNotify(err?.data?.message || 'Failed to update status');
      // Revert to previous status on error
      setLocalStatus(currentStatus);
    }
  };

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];

  return (
    <select
      value={localStatus}
      onChange={(e) => handleStatusChange(Number(e.target.value))}
      disabled={isLoading}
      className={`px-2 py-1 rounded-md border text-sm ${
        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        localStatus === 1 
          ? 'bg-green-100 text-green-800 border-green-300' 
          : 'bg-red-100 text-red-800 border-red-300'
      }`}
    >
      {statusOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { CourseStatusToggleSelect, BatchStatusToggleSelect };