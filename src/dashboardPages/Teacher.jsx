import React, { useState } from 'react';
import { listDetails } from '../data/teacherData'; // data.js ফাইল থেকে teachers এবং teacherDetailsData ইম্পোর্ট করুন
import StudentTeacherEditor from '../components/StudentTeacherEditor';

const Teacher = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:max-w-6xl md:mt-10">
      <StudentTeacherEditor data={listDetails} type="teacher"/>
    </div>
  );
};

export default Teacher;