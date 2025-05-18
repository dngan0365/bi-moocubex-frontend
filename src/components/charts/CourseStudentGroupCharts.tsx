
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react'; // Optional: For close icon


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const groups = {
  A: [80, 20, 100, 60],
  B: [60, 40, 90, 70],
  C: [70, 50, 85, 75],
  D: [50, 60, 70, 65],
  E: [90, 30, 95, 80],
};

const categories = ['Videos', 'Exercises', 'Exam', 'Total'];

const dailyLearningDataGroupA = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 },
  { week: '07', videoViews: 35, exercisesAttempted: 30 },
  { week: '08', videoViews: 40, exercisesAttempted: 35 },
];
const dailyLearningDataGroupB = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 },
  { week: '07', videoViews: 35, exercisesAttempted: 30 },
  { week: '08', videoViews: 40, exercisesAttempted: 35 },
];

const dailyLearningDataGroupC = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 },
  { week: '07', videoViews: 35, exercisesAttempted: 30 },
  { week: '08', videoViews: 40, exercisesAttempted: 35 },
];

const dailyLearningDataGroupD = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 },
  { week: '07', videoViews: 35, exercisesAttempted: 30 },
  { week: '08', videoViews: 40, exercisesAttempted: 35 },
];

const dailyLearningDataGroupE = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 },
  { week: '07', videoViews: 35, exercisesAttempted: 30 },
  { week: '08', videoViews: 40, exercisesAttempted: 35 },
];

const GroupPerformanceBarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Prepare data: One series per group (each with 4 values for each category)
  const series = [
    { name: 'Group A', data: groups.A },
    { name: 'Group B', data: groups.B },
    { name: 'Group C', data: groups.C },
    { name: 'Group D', data: groups.D },
    { name: 'Group E', data: groups.E },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      stacked: false, // Grouped, not stacked
      toolbar: { show: true },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: '55%', // wider spacing between groups
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
        },
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: {
        colors: isDark ? '#F3F4F6' : '#374151',
      },
    },
    colors: ['#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#F472B6'],
  };

  return (
    <div className={`p-4 rounded-xl shadow w-full max-w-4xl mx-auto ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Performance by Group (Video, Exercise, Exam, Total)
      </h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

// ✅ Reusable Line Chart Component
const CourseBehaviourLineGraph = ({ data, groupName }: { data: any[]; groupName: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Video Views',
      data: data.map((d) => d.videoViews),
    },
    {
      name: 'Exercise Attempts',
      data: data.map((d) => d.exercisesAttempted),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
    },
    xaxis: {
      categories: data.map((d) => d.week),
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#E5E7EB' : '#374151',
        },
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    legend: {
      position: 'top',
      labels: {
        colors: isDark ? '#F9FAFB' : '#1F2937',
      },
    },
    colors: ['#3B82F6', '#34D399'],
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
  };

  return (
    <div className={`p-4 rounded-xl shadow ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <h3 className={`text-md font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Group {groupName} Weekly Learning Trend</h3>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

const CourseStudentGroupBarCharts = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  const {theme} = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className={`relative z-50 max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-4 w-full max-w-7xl ${
          theme==="dark" ? 'bg-gray-800' : 'bg-white'
        }`}>
        {/* Header */}
        <h2 className={`text-2xl font-semibold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Course Student Group Performance </h2>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Charts */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <GroupPerformanceBarChart />
          <CourseBehaviourLineGraph data={dailyLearningDataGroupA} groupName="A" />
          <CourseBehaviourLineGraph data={dailyLearningDataGroupB} groupName="B" />
          <CourseBehaviourLineGraph data={dailyLearningDataGroupC} groupName="C" />
          <CourseBehaviourLineGraph data={dailyLearningDataGroupD} groupName="D" />
          <CourseBehaviourLineGraph data={dailyLearningDataGroupE} groupName="E" />
        </div>
      </div>
    </div>
  );
};

export default CourseStudentGroupBarCharts;