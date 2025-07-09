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

const StatCard = ({ title, value, icon, color }) => (
  <div className={`rounded-xl p-4 text-black shadow-md ${color} flex items-center justify-between`}>
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
    <div>{iconMap[icon]}</div>
  </div>
);

const DHome = () => {
  return (
    <div className="w-full p-4 space-y-4 xl:space-y-6 xl:px-44">

      <h1 className="text-center text-lg lg:text-2xl text-headerColorHover font-extrabold">Wellcome Admin <span className="text-contestRed">!</span></h1>
      <h3 className="text-center text-sm text-gray-300">Check your recent activity</h3>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
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
          <h3 className="text-lg font-semibold mb-4">Recent Notices</h3>
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

      {/* Recent Notifications */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 text-contestRed">Recent Notifications</h3>
        <ul className="space-y-3">
          {notifications.map((noti) => (
            <><li
              key={noti.id}
              className="flex justify-between items-center border-b pb-2 w-full hover:bg-gray-100 px-3"
            >
              <div className="flex justify-between items-center w-[90%]">
                <span className="overflow-x-hidden overflow-y-auto w-full">{noti.title}</span>
                <span className="text-sm text-gray-500">{noti.date}</span>
              </div>
              <button className="text-sm p-1 bg-headerColor hover:bg-headerColorHover hover:rounded-md hover:text-white transition-all duration-75 relative z-10">Check <div className={`absolute top-0 left-0 w-1/5 aspect-square rounded-full ${noti.new ? "bg-contestRed" : ""} animate-ping transition-all duration-75"`}></div></button>
            </li></>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DHome;
