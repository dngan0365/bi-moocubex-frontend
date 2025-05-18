'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaVideo, FaTasks, FaList } from 'react-icons/fa';
import { BookCheck} from 'lucide-react';
import CourseProportionPieChart from '@/components/charts/CourseProportionPieChart';
import CourseStudentGroupBarChart from '@/components/charts/CourseStudentGroupBarChart';
import CourseStudentGroupPieChart from '@/components/charts/CourseStudentGroupPieChart';
import CourseCommentLineGraph from '@/components/charts/CourseCommentLineGraph';
import CourseBehaviourLineGraph from '@/components/charts/CourseBehaviourLineGraph';
import { useTheme } from "@/context/ThemeContext";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const commentsData = [
  { week: '01', negative: 10, neutral: 15, positive: 5 },
  { week: '02', negative: 12, neutral: 18, positive: 7 },
  { week: '03', negative: 15, neutral: 20, positive: 10 },
  { week: '04', negative: 18, neutral: 22, positive: 12 },
  { week: '05', negative: 20, neutral: 25, positive: 15 },
  { week: '06', negative: 22, neutral: 28, positive: 18 }
];

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

const areaChartData = {
  series: [
    { name: 'Trung tính', data: commentsData.map(d => d.neutral) },
    { name: 'Tích cực', data: commentsData.map(d => d.positive) },
    { name: 'Tiêu cực', data: commentsData.map(d => d.negative) }
  ],
  options: {
    chart: { type: 'area', stacked: true },
    xaxis: { categories: commentsData.map(d => d.week) }
  }
};

export default function CourseInfo({ params }: { params: { courseId: string } }) {
  const {detail, setDetail} = useState(false);

  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const cardClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-cyan-400/10 text-gray-900';

  return (
    <div className={`mx-auto p-4 space-y-6 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
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
          <h2 className="text-center text-lg font-semibold mb-4">Tỷ lệ khóa học</h2>
          <CourseProportionPieChart />
        </div>
        <div className={`${cardClass} p-4 rounded-xl shadow col-span-2`}>
          <h2 className="text-center text-lg font-semibold mb-4">Tỷ lệ học viên</h2>
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
        <p className="text-sm text-gray-500">
          <strong>Nhận xét chung:</strong> Chỉ số ổn định, nhưng cũng có một vài điểm bất thường, nhấn để xem chi tiết
        </p>
        <button className="px-4 py-2 rounded-md bg-teal-100 text-teal-800 hover:bg-teal-200 text-sm font-medium">
          Xem chi tiết báo cáo
        </button>
      </div>
    </div>
  );
}