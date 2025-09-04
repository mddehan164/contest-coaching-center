// Field configurations for ViewDetails component
// Define important fields to display for each table/entity

export const tableFieldConfigs = {
  // Student fields configuration
  students: [
    'name',
    'mobile',
    'gender',
    'course.title',
    'branch.name',
    'batch.name',
    'father_name',
    'mother_name',
    'address',
    'ssc_result',
    'hsc_result',
    'total_amount',
    'status',
    'created_at',
    'creator.name'
  ],

  // Teacher fields configuration  
  teachers: [
    'name',
    'subject',
    'gender',
    'mobile',
    'address',
    'course.title',
    'branch.name', 
    'batch.name',
    'status',
    'created_at',
    'creator.name'
  ],

  // Course fields configuration
  courses: [
    'title',
    'short_des',
    'long_des',
    'price',
    'offer_price',
    'group',
    'status',
    'created_at',
    'creator.name',
    'updater.name'
  ],

  // Batch fields configuration
  batches: [
    'name',
    'course.title',
    'start_date',
    'end_date',
    'status',
    'created_at',
    'creator.name',
    'updater.name'
  ],

  // Notice fields configuration
  notices: [
    'title',
    'type_name',
    'date',
    'branch.name',
    'file_url',
    'status',
    'created_at',
    'creator.name'
  ],

  // Review fields configuration
  reviews: [
    'name',
    'year',
    'rank',
    'description',
    'img_url',
    'status',
    'created_at',
    'creator.name'
  ],

  // Branch fields configuration
  branches: [
    'name',
    'location',
    'description',
    'image',
    'status',
    'created_at'
  ],

  // Gallery/Photo fields configuration
  gallery: [
    'category',
    'image',
    'status',
    'created_at',
    'creator'
  ]
};

// Get field configuration for a specific table
export const getTableFields = (tableName) => {
  return tableFieldConfigs[tableName] || [];
};

// Common status configurations
export const statusConfig = {
  1: { label: 'Active', class: 'bg-green-100 text-green-800' },
  0: { label: 'Inactive', class: 'bg-red-100 text-red-800' }
};

// Common field labels (for better display names)
export const fieldLabels = {
  'course.title': 'Course',
  'branch.name': 'Branch',
  'batch.name': 'Batch',
  'creator.name': 'Created By',
  'updater.name': 'Updated By',
  'father_name': 'Father Name',
  'mother_name': 'Mother Name',
  'ssc_result': 'SSC Result',
  'hsc_result': 'HSC Result',
  'total_amount': 'Total Amount',
  'short_des': 'Short Description',
  'long_des': 'Long Description',
  'offer_price': 'Offer Price',
  'type_name': 'Notice Type',
  'file_url': 'Attachment',
  'img_url': 'Image',
  'start_date': 'Start Date',
  'end_date': 'End Date',
  'created_at': 'Created Date'
};
