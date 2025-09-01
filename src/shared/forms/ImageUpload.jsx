import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import axiosInstance from '../../../api/axiosInstance';
import { API_CONFIG } from '../../constants/api';

const ImageUpload = ({
  name,
  control,
  label,
  module,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  onImageUploaded,
  onImageRemoved,
  className = "",
  required = false,
  currentImage = null
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (!file) return false;
    
    // Check file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return false;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return false;
    }

    setError('');
    return true;
  };

  const uploadImage = async (file, onChange) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('module', module);

      const response = await axiosInstance.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const imagePath = response.data.data.path;
        const fullUrl = `${API_CONFIG.BASE_URL.replace('/api', '')}/${imagePath}`;
        
        // Set preview URL for display
        setPreviewUrl(fullUrl);
        setFileName(response.data.data.original_name);
        
        // Update form value with the image path
        onChange(imagePath);
        
        // Call callback if provided
        if (onImageUploaded) {
          onImageUploaded(response.data.data);
        }
      } else {
        setError('Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      setError(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event, onChange) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file, onChange);
    }
  };

  const handleRemoveImage = (onChange) => {
    setPreviewUrl(null);
    setFileName('');
    setError('');
    onChange('');
    
    if (onImageRemoved) {
      onImageRemoved();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
        <div className={`${className}`}>
          {label && (
            <label className="block text-sm font-medium text-text-600 mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          
          {/* Image Upload Area */}
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
              {isUploading ? (
                <div className="text-gray-500 text-sm">Uploading...</div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-500 text-center">Upload Image</span>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept={accept}
                onChange={(e) => handleFileSelect(e, onChange)}
                disabled={isUploading}
              />
            </label>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Upload an image ({accept === "image/*" ? "JPEG, PNG, JPG, GIF, WEBP" : accept} - max {Math.round(maxSize / (1024 * 1024))}MB)
              </p>
              {previewUrl && fileName && (
                <p className="text-sm text-green-600 truncate mb-1">
                  File: {fileName}
                </p>
              )}
              {value && (
                <p className="text-sm text-green-600 truncate mb-1">
                  Image Path: {value}
                </p>
              )}
              {isUploading && (
                <p className="text-sm text-blue-600">
                  Uploading image...
                </p>
              )}
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(onChange)}
                  className="text-sm text-red-600 hover:text-red-700 mt-2"
                  disabled={isUploading}
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>

          {/* Error Messages */}
          {(error || fieldError) && (
            <p className="text-sm text-red-600 mb-2">
              {error || fieldError.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default ImageUpload;
