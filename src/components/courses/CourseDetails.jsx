import React from 'react';
import { useParams } from 'react-router-dom';
import { courseData } from '../../data/courseData';
import MainBtn from '../mainBtn';

const CourseDetails = () => {
  const { id } = useParams();
    const course = courseData.courses.find(course => course.id === +id);


  if (!course) return <div className="text-center py-10">কোর্স খুঁজে পাওয়া যায়নি</div>;

    const bulletStyles = {
    circle: 'list-disc',
    arrow: 'list-[">>"]',
    decimal: 'list-decimal',
    roman: 'list-[upper-roman]',
    alpha: 'list-[upper-alpha]'
    };


  return (
    <div className="w-full max-w-[80%] space-y-6 px-5 sm:px-5 md:px-10 lg:px-20 xl:px-44">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-headerColor md:text-4xl">Course Details</h1>

      {/* Image and Short Description */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img
            src={course.image}
            alt={course.unit}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-headerColorHover md:text-3xl">{course.unit}</h2>
          <ul className={`${bulletStyles[course.bulletType || 'circle']} list-inside text-sm text-gray-700 space-y-1 md:text-lg`}>
            {course.body.map((item, i) => (
                <li key={i}>
                {item}
                </li>
            ))}
            </ul>

        </div>
      </div>

      {/* Long Description */}
      <div>
        <p className="leading-relaxed text-sm md:text-lg text-gray-500 ">{course.des}</p>
      </div>

      {/* Pricing Section */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-t pt-4">
        <div>
          {course.offer ? (
            <p className="text-sm sm:text-lg">
              <span className="line-through text-red-500 mr-2">৳{course.price}</span>
              <span className="text-green-600 font-bold">Offer: ৳{course.offerPrice}</span>
            </p>
          ) : (
            <p className="text-sm sm:text-lg font-semibold text-headerColorHover">৳{course.price}</p>
          )}
        </div>

        <div className="flex gap-4">
            <MainBtn
              data={course.btnData.btnName[0]}
              btnStyle={course.btnData.btnStyle}
            />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
