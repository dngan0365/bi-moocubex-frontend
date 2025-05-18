'use client';

import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const dailyLearningData = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 },
];

const commentsData = [
  { week: '01', negative: 10, neutral: 15, positive: 5 },
  { week: '02', negative: 12, neutral: 18, positive: 7 },
  { week: '03', negative: 15, neutral: 20, positive: 10 },
  { week: '04', negative: 18, neutral: 22, positive: 12 },
  { week: '05', negative: 20, neutral: 25, positive: 15 },
  { week: '06', negative: 22, neutral: 28, positive: 18 },
];

const stats = [
  { title: 'Video', value: '20' },
  { title: 'Bài tập', value: '30' },
  { title: 'Exam', value: '1' },
  { title: 'Comment/Reply', value: '5' },
];

const user_info = {
  ID: 'DM101',
  school: 'UIT',
  dateEnroll: '01/02/2025',
};

const courseDetails = [
  { label: 'User Id:', value: user_info.ID },
  { label: 'Trường học:', value: user_info.school },
  { label: 'Ngày đăng kí:', value: user_info.dateEnroll },
];

export default function UserInfo({ params }: { params: { courseId: string, userId: string } }) {
  const weeks = dailyLearningData.map((d) => d.week);
  const videoData = dailyLearningData.map((d) => d.videoViews);
  const exercisesData = dailyLearningData.map((d) => d.exercisesAttempted);

  const behaviorChartOptions = {
    chart: { type: 'line' },
    xaxis: { categories: weeks },
    stroke: { curve: 'smooth' },
  };

  const behaviorChartSeries = [
    { name: 'Lượt xem video', data: videoData },
    { name: 'Lượt hoàn thành bài tập', data: exercisesData },
  ];

  const percentChartOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: ['Video', 'Bài tập', 'Exam', 'Tổng cộng'] },
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: '40%' },
    },
    colors: ['#A78BFA', '#6EE7B7', '#93C5FD', '#6EE7B7'],
  };

  const percentChartSeries = [
    {
      name: 'Phần trăm',
      data: [80, 20, 100, 60],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 text-center"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Course Info */}
      <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md">
        {courseDetails.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm py-1 border-b last:border-b-0"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Percentage Chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-center mb-4">
          Phần trăm các thành phần (%)
        </h2>
        <Chart
          options={percentChartOptions}
          series={percentChartSeries}
          type="bar"
          height={300}
        />
      </div>

      {/* Behavior Chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-center mb-4">
          Hành vi của học viên qua thời gian
        </h2>
        <Chart
          options={behaviorChartOptions}
          series={behaviorChartSeries}
          type="line"
          height={300}
        />
      </div>

      {/* Footer Note */}
      <div className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          <strong>Nhận xét chung:</strong> Chỉ số ổn định, nhưng cũng có một vài
          điểm bất thường, nhấn để xem chi tiết
        </p>
        <button className="bg-cyan-100 text-blue-900 px-4 py-2 rounded-lg hover:bg-cyan-200 transition">
          Xem chi tiết báo cáo
        </button>
      </div>
    </div>
  );
}
