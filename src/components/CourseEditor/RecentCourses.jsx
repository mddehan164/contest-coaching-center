import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const RecentCourses = ({
  courses,
  bulletStyles,
  onEdit,
  onDelete,
  onPreview,
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Recent Courses</h3>
    <Swiper
      slidesPerView={1.2}
      spaceBetween={10}
      navigation
      modules={[Navigation]}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {courses?.map((course, index) => (
        <SwiperSlide key={index}>
          <div className="relative group border rounded p-2 shadow hover:shadow-lg">
            <img
              src={course.image}
              alt={course.title}
              className="w-full aspect-[3/2] object-cover rounded"
            />
            <p className="text-sm font-semibold mt-1">{course.title}</p>
            <ul
              className={`${
                bulletStyles[course.bulletType || "circle"]
              } list-inside text-xs space-y-1`}
            >
              {course.shortDesc?.split("\n").map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            {course.offer ? (
              <p className="text-xs mt-2">
                <span className="line-through text-red-600 mr-1">
                  ৳{course.price}
                </span>
                <span className="text-headerColorHover font-semibold">
                  ৳{course.offerPrice}
                </span>
              </p>
            ) : (
              <p className="text-xs mt-2 text-headerColorHover font-semibold">
                ৳ &nbsp;{course.price}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              <button className="text-white bg-headerColor px-2 py-1 text-xs rounded">
                Enroll Now
              </button>
              <button className="text-white bg-headerColorHover px-2 py-1 text-xs rounded">
                Details
              </button>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center space-y-2 transition text-sm">
              <button
                onClick={() => onPreview(course)}
                className="bg-white text-black px-3 py-1 rounded flex items-center gap-1"
              >
                <FaEye /> Preview
              </button>
              <button
                onClick={() => onEdit(index)}
                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default RecentCourses;
