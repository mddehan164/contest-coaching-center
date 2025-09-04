import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { successNotify, errorNotify } from "../utils/notify";

const GalleryEditor = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [tempEditedImage, setTempEditedImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const BASE_IMAGE_URL = import.meta.env.VITE_BASE_URL;
  const categories = ["success", "campus", "students", "others"];

  // Fetch gallery images from API
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/photo-gallery');
      if (response.data.success) {
        const formattedImages = response.data.data.photos.map(photo => ({
          id: photo.id,
          category: photo.category,
          src: `${BASE_IMAGE_URL}/${photo.image}`,
          status: photo.status,
          created_at: photo.created_at,
          creator: photo.creator,
          image_path: photo.image
        }));
        setImages(formattedImages);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      errorNotify('Failed to load gallery images');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredImages =
    selectedFilter === "All"
      ? images
      : images.filter((img) => img.category.toLowerCase() === selectedFilter.toLowerCase());

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      errorNotify("Some files were skipped. Only images under 5MB (jpg, png, webp, etc.) are allowed.");
    }

    setSelectedFiles(validFiles);
    
    // Create preview URLs
    const previews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreviewImages(previews);
  };

  const removePreviewImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    
    // Cleanup URL
    URL.revokeObjectURL(previewImages[index].url);
    
    setSelectedFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      errorNotify("Please select at least one image.");
      return;
    }

    if (!newCategory) {
      errorNotify("Please select a category first.");
      return;
    }

    setIsUploading(true);
    
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('module', 'photo-gallery');
        
        const uploadResponse = await axiosInstance.post('/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadResponse.data.success) {
          // Now add to gallery with the uploaded image path
          const galleryData = {
            category: newCategory.toLowerCase(),
            image: uploadResponse.data.data.path,
            status: 1
          };

          const galleryResponse = await axiosInstance.post('/photo-gallery', galleryData);
          return galleryResponse.data;
        }
        throw new Error('Upload failed');
      });

      const results = await Promise.all(uploadPromises);
      
      // Refresh the gallery
      await fetchGalleryImages();
      
      // Reset form
      setNewCategory("");
      setSelectedFiles([]);
      setPreviewImages([]);
      
      successNotify(`Successfully uploaded ${results.length} image(s)`);
    } catch (error) {
      console.error('Error uploading images:', error);
      errorNotify('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const toggleImageStatus = async (imageId, currentStatus) => {
    try {
      const response = await axiosInstance.put(`/photo-gallery/${imageId}/status`);
      if (response.data.success) {
        // Refresh the gallery to show updated status
        await fetchGalleryImages();
        successNotify(`Image status changed to ${response.data.data.status_text}`);
      }
    } catch (error) {
      console.error('Error changing image status:', error);
      errorNotify('Failed to change image status. Please try again.');
    }
  };

  const openModal = (imageSrc, e) => {
    if (e && (e.target.type === "checkbox" || e.target.closest('button'))) return;
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleEditImage = (imageId, currentCategory) => {
    setEditingImageId(imageId);
    setNewCategory(currentCategory);
    setTempEditedImage(images.find((img) => img.id === imageId));
  };

  const handleFileChange = (e) => {
    const updatedImage = e.target.files[0];
    if (updatedImage) {
      setTempEditedImage({
        ...tempEditedImage,
        src: URL.createObjectURL(updatedImage),
        category: newCategory,
        newFile: updatedImage
      });
    }
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const saveEditedImage = async () => {
    if (!tempEditedImage || !newCategory) return;

    try {
      let imagePath = tempEditedImage.image_path;

      // If a new file was selected, upload it first
      if (tempEditedImage.newFile) {
        const formData = new FormData();
        formData.append('file', tempEditedImage.newFile);
        formData.append('module', 'photo-gallery');
        
        const uploadResponse = await axiosInstance.post('/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadResponse.data.success) {
          imagePath = uploadResponse.data.data.path;
        }
      }

      // Update the gallery item
      const updateData = {
        category: newCategory.toLowerCase(),
        image: imagePath,
        status: tempEditedImage.status || 1
      };

      await axiosInstance.put(`/photo-gallery/${editingImageId}`, updateData);
      
      // Refresh the gallery
      await fetchGalleryImages();
      
      successNotify('Image updated successfully');
      resetEditModal();
    } catch (error) {
      console.error('Error updating image:', error);
      errorNotify('Failed to update image. Please try again.');
    }
  };

  const resetEditModal = () => {
    setEditingImageId(null);
    setTempEditedImage(null);
    setNewCategory("");
  };

  // Icons as SVG components
  const ViewIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EditIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  const ToggleIcon = ({ status }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {status === 1 ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
      )}
    </svg>
  );

  const UploadIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );

  const RemoveIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-4 xl:px-44">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-lg">Loading gallery...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 xl:px-44">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery Editor</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Success", "Campus", "Students", "Others"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedFilter === cat 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Enhanced Image Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <UploadIcon />
          <span className="ml-2">Upload New Images</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={newCategory}
              onChange={handleCategoryChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              multiple
              disabled={isUploading}
              className="w-full p-3 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">
              Select multiple images (max 5MB each) - JPEG, PNG, WebP supported
            </p>
          </div>
        </div>

        {/* Image Previews */}
        {previewImages.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <button
                    onClick={() => removePreviewImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <RemoveIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleImageUpload}
            disabled={isUploading || selectedFiles.length === 0 || !newCategory}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md transition-colors flex items-center"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon />
                <span className="ml-2">Upload Images ({selectedFiles.length})</span>
              </>
            )}
          </button>
        </div>

        {/* Upload Status */}
        {isUploading && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-blue-700">Uploading images...</span>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredImages
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={(e) => openModal(image.src, e)}
            >
              <img
                src={image.src}
                alt={`Gallery ${image.category}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  {/* View button */}
                  {/* <button
                    className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(image.src, e);
                    }}
                    title="View Image"
                  >
                    <ViewIcon />
                  </button> */}
                  
                  {/* Edit button */}
                  <button
                    className="text-white bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditImage(image.id, image.category);
                    }}
                    title="Edit Image"
                  >
                    <EditIcon />
                  </button>
                  
                  {/* Status toggle button */}
                  <button
                    className={`text-white p-2 rounded-full transition-colors ${
                      image.status === 1 
                        ? "bg-orange-600 hover:bg-orange-700" 
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImageStatus(image.id, image.status);
                    }}
                    title={image.status === 1 ? "Hide Image" : "Show Image"}
                  >
                    <ToggleIcon status={image.status} />
                  </button>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                </span>
              </div>

              {/* Status badge */}
              <div className="absolute top-2 right-2">
                <span className={`text-white text-xs px-2 py-1 rounded ${
                  image.status === 1 ? "bg-green-600" : "bg-red-600"
                }`}>
                  {image.status === 1 ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Empty state */}
      {filteredImages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No images found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedFilter === "All" 
              ? "Upload some images to get started." 
              : `No images in "${selectedFilter}" category.`
            }
          </p>
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={modalImage}
              alt="Gallery preview"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
              onClick={closeModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingImageId && tempEditedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Image</h3>
            
            <div className="space-y-4">
              {/* Image preview */}
              <div className="w-full h-48 border border-gray-300 rounded-md overflow-hidden">
                <img
                  src={tempEditedImage.src}
                  alt="Edit preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newCategory}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* File input for new image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replace Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={resetEditModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!newCategory}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryEditor;
