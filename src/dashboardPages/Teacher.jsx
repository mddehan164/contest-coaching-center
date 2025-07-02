import React, { useState } from 'react';
import { list, listDetails } from '../data/teacherData'; // data.js ফাইল থেকে teachers এবং teacherDetailsData ইম্পোর্ট করুন
import ListDetails from '../components/ListDetails';
import List from '../components/List';

const Teacher = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  const handleSelectTeacher = (id) => {
    setSelectedTeacherId(id);
  };

  const handleBack = () => {
    setSelectedTeacherId(null);
  };

  const selectedTeacher = listDetails.find(teacher => teacher.id === selectedTeacherId);

  return (
    <div className="container mx-auto px-4 py-4 md:max-w-6xl md:mt-10">
      {!selectedTeacherId ? (
        <List list={list} onSelect={handleSelectTeacher} type="teacher" />
      ) : (
        <ListDetails data={selectedTeacher} onBack={handleBack} />
      )}
    </div>
  );
};

export default Teacher;