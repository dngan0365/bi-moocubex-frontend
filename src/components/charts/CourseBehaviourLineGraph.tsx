'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from "@/context/ThemeContext";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CourseBehaviourLineGraph = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const dailyLearningData = [
    { week: '01', videoViews: 20, exercisesAttempted: 15 },
    { week: '02', videoViews: 25, exercisesAttempted: 18 },
    { week: '03', videoViews: 22, exercisesAttempted: 20 },
    { week: '04', videoViews: 30, exercisesAttempted: 25 },
    { week: '05', videoViews: 35, exercisesAttempted: 30 },
    { week: '06', videoViews: 40, exercisesAttempted: 35 },
  ];

  const series = [
    {
      name: 'Video Views',
      data: dailyLearningData.map(d => d.videoViews),
    },
    {
      name: 'Exercise Attempts',
      data: dailyLearningData.map(d => d.exercisesAttempted),
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
      strokeWidth: 2,
      hover: {
        sizeOffset: 4,
      },
    },
    xaxis: {
      categories: dailyLearningData.map(d => d.week),
      title: {
        text: 'Week',
        style: {
          color: isDark ? '#F9FAFB' : '#1F2937', // gray-50 / gray-800
        },
      },
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151', // gray-300 / gray-700
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      title: {
        text: 'Count',
        style: {
          color: isDark ? '#F9FAFB' : '#1F2937',
        },
      },
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
      horizontalAlign: 'center',
      labels: {
        colors: isDark ? '#F9FAFB' : '#1F2937',
      },
    },
    colors: ['#3B82F6', '#34D399'], // blue-500, green-400
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB', // gray-700 / gray-200
      strokeDashArray: 4,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  return (
      <Chart options={options} series={series} type="line" height={350} />
  );
};

export default CourseBehaviourLineGraph;
