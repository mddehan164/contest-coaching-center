import { useState } from 'react';
import { useToggleCourseStatusMutation } from '../redux-rtk/course';
import { errorNotify, successNotify } from '../utils/notify';
import { useToggleBatchStatusMutation } from '../redux-rtk/batch';
import { useToggleNoticeStatusMutation } from '../redux-rtk/notice';
import { useToggleReviewStatusMutation } from '../redux-rtk/review';
import { useToggleBranchStatusMutation } from '../redux-rtk/branch/branchApi';
import { toast } from 'react-toastify';

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

const NoticeStatusToggleSelect = ({ noticeId, currentStatus, onStatusChange }) => {
  const [toggleStatus, { isLoading }] = useToggleNoticeStatusMutation();
  const [localStatus, setLocalStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await toggleStatus({ noticeId }).unwrap();
      
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

const ReviewStatusToggleSelect = ({ reviewId, currentStatus, onStatusChange }) => {
  const [toggleStatus, { isLoading }] = useToggleReviewStatusMutation();
  const [localStatus, setLocalStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await toggleStatus({ reviewId }).unwrap();
      
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

const BranchStatusToggleSelect = ({ branchData, onUpdate }) => {
  const [status, setStatus] = useState(branchData?.status || 'active');
  const [toggleBranchStatus] = useToggleBranchStatusMutation();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await toggleBranchStatus({
        branchId: branchData.encrypted_id,
        status: newStatus,
      }).unwrap();
      toast.success(`Branch status updated to ${newStatus}!`);
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error('Failed to update branch status');
      console.error('Error updating branch status:', error);
      setStatus(branchData?.status || 'active');
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      className={`px-2 py-1 rounded text-xs font-medium ${
        status === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};

export { CourseStatusToggleSelect, BatchStatusToggleSelect, NoticeStatusToggleSelect, ReviewStatusToggleSelect, BranchStatusToggleSelect };