import React from "react";
import ProfileBackground from "./ProfileBackground";
import ProfileAvatar from "./ProfileAvatar";
import ProfileHeader from "./ProfileHeader";
import ProfileActions from "./ProfileActions";
import PersonalInfo from "./PersonalInfo";
import ActivityLog from "./ActivityLog";
import AboutSection from "./AboutSection";
import StatisticsSection from "./StatisticsSection";
import ConnectionsGrid from "./ConnectionsGrid";

export default function Main() {
  return (
    <div className="h-full">
      <div className="bg-white rounded-lg shadow-xl pb-8 relative">
        <ProfileBackground />
        <ProfileAvatar />
        <ProfileHeader />
      </div>

      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-x-4">
        <div className="w-full 2xl:w-1/3 space-y-4 flex-1">
          <PersonalInfo />
          <ActivityLog />
        </div>
        <div className="w-full 2xl:w-2/3 space-y-4 flex-1">
          <AboutSection />
          <StatisticsSection />
        </div>
      </div>

      <ConnectionsGrid />
    </div>
  );
}
