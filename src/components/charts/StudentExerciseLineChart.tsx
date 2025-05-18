'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const exerciseAttemptData = [
  { week: '01', exerciseAttempt: 20, averageExerciseAttempt: 15 },
  { week: '02', exerciseAttempt: 25, averageExerciseAttempt: 18 },
  { week: '03', exerciseAttempt: 22, averageExerciseAttempt: 20 },
  { week: '04', exerciseAttempt: 30, averageExerciseAttempt: 25 },
  { week: '05', exerciseAttempt: 35, averageExerciseAttempt: 30 },
  { week: '06', exerciseAttempt: 40, averageExerciseAttempt: 35 },
  { week: '07', exerciseAttempt: 35, averageExerciseAttempt: 30 },
  { week: '08', exerciseAttempt: 40, averageExerciseAttempt: 35 },
];

const StudentExerciseLineChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Exercise Attempts',
      data: exerciseAttemptData.map((d) => d.exerciseAttempt),
    },
    {
      name: 'Average Attempts',
      data: exerciseAttemptData.map((d) => d.averageExerciseAttempt),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        sizeOffset: 3,
      },
    },
    colors: ['#10B981', '#F59E0B'], // Tailwind green & amber
    xaxis: {
      categories: exerciseAttemptData.map((d) => d.week),
      title: {
        text: 'Week',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#4B5563' : '#E5E7EB',
      },
    },
    yaxis: {
      title: {
        text: 'Attempts',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: isDark ? '#F9FAFB' : '#1F2937',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className={`w-full mx-auto`}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Weekly Exercise Attempts vs Average
      </h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default StudentExerciseLineChart;
