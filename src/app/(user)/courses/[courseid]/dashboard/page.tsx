'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaVideo, FaTasks, FaList } from 'react-icons/fa';
import { BookCheck, CircleEllipsis, X } from 'lucide-react';
import CourseProportionPieChart from '@/components/charts/CourseProportionPieChart';
import CourseStudentGroupBarChart from '@/components/charts/CourseStudentGroupBarChart';
import CourseStudentGroupPieChart from '@/components/charts/CourseStudentGroupPieChart';
import CourseCommentLineGraph from '@/components/charts/CourseCommentLineGraph';
import CourseBehaviourLineGraph from '@/components/charts/CourseBehaviourLineGraph';
import CourseStudentGroupCharts from '@/components/charts/CourseStudentGroupCharts';
import { useTheme } from "@/context/ThemeContext";
import CourseNav from '@/components/coursenav/CourseNav';


const course_info = {
  name: 'Introduction to Data Mining',
  ID: 'DM101',
  start_date: '01/02/2025', 
  end_date: '31/08/2025'
};

const stats = [
  { title: 'Video', value: '20', icon: <FaVideo /> },
  { title: 'Bài tập', value: '30', icon: <FaTasks /> },
  { title: 'Exam', value: '1', icon: <BookCheck /> },
  { title: 'Chapter', value: '5', icon: <FaList /> },
];

const courseDetails = [
  { label: 'Tên khóa học:', value: course_info.name },
  { label: 'Course ID:', value: course_info.ID },
  { label: 'Ngày bắt đầu:', value: course_info.start_date },
  { label: 'Ngày kết thúc:', value: course_info.end_date }
];



export default function CourseInfo() {


  const [detail, setDetail] = useState(false);

  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const cardClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-cyan-400/10 text-gray-900';

  return (
    <div className={`mx-auto p-4 space-y-6 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <CourseNav/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Details */}
        <div className={`${cardClass} p-4 rounded-xl shadow`}>
          <div className="space-y-4">
            {courseDetails.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`${cardClass} p-4 rounded-xl shadow flex items-center gap-4`}>
              <div className="bg-cyan-400/10 text-cyan-500 p-3 rounded-full text-xl">{stat.icon}</div>
              <div>
                <div className="text-sm text-gray-400">{stat.title}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>

          <h2 className="text-center text-lg font-semibold mb-4">Course Proportion</h2>

          <CourseProportionPieChart />
        </div>
        <div className={`${cardClass} p-4 rounded-xl shadow col-span-2`}>
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Student Groups</h2>
              <button
                className="text-sm text-cyan-500 hover:text-cyan-400"
                onClick={() => setDetail(!detail)}>
                  <CircleEllipsis />
                </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseStudentGroupBarChart/>
            <CourseStudentGroupPieChart/>
          </div>
        </div>
      </div>

      {/* Behavior */}
      <div className={`${cardClass} p-4 rounded-xl shadow`}>
        <h2 className="text-center text-lg font-semibold mb-4">Hành vi học viên</h2>
        <CourseBehaviourLineGraph/>
      </div>

      {/* Comments */}
      <div className={`${cardClass} p-4 rounded-xl shadow`}>
        <h2 className="text-center text-lg font-semibold mb-4">Comment/Reply</h2>
        <CourseCommentLineGraph/>
      </div>

      {/* Footer */}
      <div className={`${cardClass} p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4`}>

        <p className="text-sm">
          <strong>Nhận xét chung:</strong> Chỉ số ổn định, nhưng cũng có một vài điểm bất thường, nhấn để xem chi tiết
        </p>
      </div>
      
      {/* Modal for details */}
      <CourseStudentGroupCharts isOpen={detail} onClose={() => setDetail(false)} />
    </div>
  );
}