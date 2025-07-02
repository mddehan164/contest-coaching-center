import React, { useState } from 'react';
import { list, listDetails } from '../data/studentData';
import ListDetails from '../components/ListDetails';
import List from '../components/List';

const Student = () => {
  const [selectedRoll, setSelectedRoll] = useState(null);

  const handleSelect = (roll) => {
    setSelectedRoll(roll);
  };

  const handleBack = () => {
    setSelectedRoll(null);
  };

  // এখানে শুধু 101 (Hasan) এর জন্য ডিটেইলস আছে, তাই চেক করা হচ্ছে
  const selectedStudent = listDetails.find(student => student.roll === selectedRoll);
  return (
    <div className="max-w-6xl mx-auto mt-10">
      {!selectedRoll ? (
        <List list={list} onSelect={handleSelect} type="student"/>
      ) : (
        <ListDetails data={selectedStudent} onBack={handleBack} />
      )}
    </div>
  );
};

export default Student;
