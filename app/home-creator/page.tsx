'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import CourseCard from './components/CourseCard';
import EarningsChart from './components/EarningsChart';
import ActivityFeed from './components/ActivityFeed';
import EngagementInsights from './components/EngagementInsights';
import UploadCourseModal from './components/UploadCourseModal';
import {
  earningsData,
  statsData,
  coursesData,
  activityData,
  engagementData,
} from './components/data';
console.log(coursesData)

export default function HomeCreator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const handleEditCourse = (courseId: string) => {
    alert(`Edit course: ${courseId}`);
  };

  const handleAnalytics = (courseId: string) => {
    alert(`View analytics for course: ${courseId}`);
  };

  const handleUploadCourse = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: { title: string; imageUrl: string; price: string }) => {
    console.log('New course data:', data);
    alert(`Course "${data.title}" uploaded successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-[#D1FAE5] px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-2xl font-bold text-[#064E3B]">
                Welcome back, Hamza! 
              </h1>
              <p className="text-[#64748B] text-sm mt-1">
                Here's what's happening with your courses today.
              </p>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUploadCourse}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] text-white font-medium hover:bg-[#059669] transition-all duration-200 shadow-lg shadow-[#10B981]/25 hover:shadow-[#10B981]/40"
            >
              <Plus size={20} />
              Upload Course
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8 space-y-8">
          {/* Stats Cards */}
          <section>
            <div className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide">
              {statsData.map((stat) => (
                <StatsCard
                  key={stat.id}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  trendUp={stat.trendUp}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </section>

          {/* Earnings Chart */}
          <section>
            <EarningsChart data={earningsData} isLoading={isLoading} />
          </section>

          {/* Two Column Layout: Activity + Courses */}
          <section className="">
            {/* Recent Activity */}
            {/* <div className="xl:col-span-1">
              <ActivityFeed activities={activityData} isLoading={isLoading} />
            </div> */}

            {/* My Courses */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#064E3B]">My Courses</h3>
                <button className="text-sm text-[#10B981] hover:text-[#059669] transition-colors font-medium">
                  View All Courses
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coursesData.slice(0, 6).map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isLoading={isLoading}
                    onEdit={handleEditCourse}
                    onAnalytics={handleAnalytics}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Engagement Insights */}
          <section>
            <EngagementInsights data={engagementData} isLoading={isLoading} />
          </section>

          {/* Mobile Upload Button */}
          <button
            onClick={handleUploadCourse}
            className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-lg shadow-[#10B981]/40 hover:scale-110 transition-transform duration-200 z-30"
          >
            <Plus size={28} />
          </button>
        </div>
      </main>

      {/* Global Styles for Skeleton Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      {/* Upload Course Modal */}
      <UploadCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}