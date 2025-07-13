import React, { useState } from 'react';
import { listDetails } from '../data/studentData';
import StudentTeacherEditor from '../components/StudentTeacherEditor';



const Student = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <StudentTeacherEditor data={listDetails} type="student" />
    </div>
  );
};

export default Student;
