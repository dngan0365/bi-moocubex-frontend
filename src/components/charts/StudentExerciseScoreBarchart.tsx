'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const exerciseScoreData = [
  { week: '01', exerciseScoreAverage: 9, averageExerciseScoreAverage: 8 },
  { week: '02', exerciseScoreAverage: 4, averageExerciseScoreAverage: 5 },
  { week: '03', exerciseScoreAverage: 4, averageExerciseScoreAverage: 5 },
  { week: '04', exerciseScoreAverage: 6, averageExerciseScoreAverage: 7 },
  { week: '05', exerciseScoreAverage: 10, averageExerciseScoreAverage: 5 },
  { week: '06', exerciseScoreAverage: 9, averageExerciseScoreAverage: 6 },
  { week: '07', exerciseScoreAverage: 4, averageExerciseScoreAverage: 3 },
  { week: '08', exerciseScoreAverage: 4, averageExerciseScoreAverage: 3 },
];

const StudentExerciseScoreBarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Your Score',
      data: exerciseScoreData.map((d) => d.exerciseScoreAverage),
    },
    {
      name: 'Average Score',
      data: exerciseScoreData.map((d) => d.averageExerciseScoreAverage),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 6,
      },
    },
    colors: ['#3B82F6', '#FBBF24'], // Tailwind blue & yellow
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: exerciseScoreData.map((d) => d.week),
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
      title: {
        text: 'Week',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 10,
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      title: {
        text: 'Score (out of 10)',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
        },
      },
    },
    legend: {
      position: 'top',
      labels: {
        colors: isDark ? '#F9FAFB' : '#1F2937',
      },
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  return (
    <div className={`w-full mx-auto`}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Weekly Exercise Scores vs Class Average
      </h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default StudentExerciseScoreBarChart;
