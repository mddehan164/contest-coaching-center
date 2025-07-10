// Dashboard.jsx
import React from "react";
import {
  statsData,
  recentEnrollments,
  notices,
  upcomingExams,
  notifications
} from "../data/dashboardData";
import { User, Layers, Calendar, DollarSign } from "lucide-react";

const iconMap = {
  user: <User className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  calendar: <Calendar className="w-6 h-6" />,
  "dollar-sign": <DollarSign className="w-6 h-6" />,
};

const StatCard = ({ title, value, icon, color1, color2, color3 }) => (
  <div className={`w-full rounded-xl p-4 text-black shadow-md bg-white flex items-center justify-end relative overflow-hidden`}>
    <div className={`${color1} rounded-full w-[55%] lg:w-[70%] xl:w-[90%] 2xl:w-[80%] aspect-square absolute top-[50%] left-10 lg:left-0 xl:left-0 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center`}><div className={`w-[90%] h-[90%] ${color2} rounded-full flex  items-center justify-center`}><div className={`w-[90%] h-[90%] ${color3} rounded-full flex  items-center justify-center lg:justify-end lg:px-4 xl:px-10`}><div className="text-black">{iconMap[icon]}</div></div></div></div>
    <div className="lg:w-[68%] xl:w-[50%] 2xl:w-[55%]">
      <h4 className="text-sm xl:text-lg font-semibold text-gray-500">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const DHome = () => {
  return (
    <div className="w-full p-4 space-y-4 xl:space-y-6 xl:px-30 2xl:px-44">

      <h1 className="text-center text-lg lg:text-2xl xl:text-3xl text-headerColorHover font-extrabold">Wellcome Admin <span className="text-contestRed">!</span></h1>
      <h3 className="text-center text-sm text-gray-300">Check your recent activity</h3>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Recent Notifications */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <ul className="space-y-3">
          {notifications.map((noti) => (
            <div key={noti.id}><li
              className="flex justify-between items-center border-b pb-2 w-full hover:bg-gray-100 px-3"
            >
              <div className="flex justify-between items-center w-[90%]">
                <span className="overflow-x-hidden overflow-y-auto w-full">{noti.title}</span>
                <span className="text-sm text-gray-500">{noti.date}</span>
              </div>
              <button className="text-sm text-white px-2 py-1 bg-orange-500 hover:bg-orange-600 hover:rounded-md hover:text-black transition-all duration-100 relative">Check <div className={`absolute top-0 left-0 w-1/5 aspect-square rounded-full ${noti.new ? "bg-contestRed animate-ping" : "bg-transparent"}`}></div></button>
            </li></div>
          ))}
        </ul>
      </div>

      {/* Enrollments & Notices Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Enrollments</h3>
          <ul className="space-y-3">
            {recentEnrollments.map((enroll) => (
              <li
                key={enroll.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{enroll.name}</p>
                  <p className="text-sm text-gray-500">{enroll.batch}</p>
                </div>
                <div className="text-sm text-right">
                  <p>{enroll.date}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      enroll.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {enroll.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Notices <small className="text-gray-400">(from your schedule)</small></h3>
          <ul className="space-y-3">
            {notices.map((notice) => (
              <li
                key={notice.id}
                className="flex justify-between border-b pb-2"
              >
                <span>{notice.title}</span>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Exams</h3>
        <ul className="space-y-3">
          {upcomingExams.map((exam) => (
            <li
              key={exam.id}
              className="flex justify-between border-b pb-2"
            >
              <span>{exam.title}</span>
              <span className="text-sm text-gray-500">{exam.date}</span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default DHome;
