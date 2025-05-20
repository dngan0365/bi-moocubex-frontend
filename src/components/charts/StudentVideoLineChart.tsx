'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const VideoData = [
  { week: '01', videoViews: 20, averageVideoViews: 15 },
  { week: '02', videoViews: 25, averageVideoViews: 18 },
  { week: '03', videoViews: 22, averageVideoViews: 20 },
  { week: '04', videoViews: 30, averageVideoViews: 25 },
  { week: '05', videoViews: 35, averageVideoViews: 30 },
  { week: '06', videoViews: 40, averageVideoViews: 35 },
  { week: '07', videoViews: 35, averageVideoViews: 30 },
  { week: '08', videoViews: 40, averageVideoViews: 35 },
];

const StudentVideoLineChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Lượt xem video',
      data: VideoData.map(d => d.videoViews),
    },
    {
      name: 'Lượt xem trung bình',
      data: VideoData.map(d => d.averageVideoViews),
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
    colors: ['#3B82F6', '#FBBF24'], // Tailwind blue & yellow
    xaxis: {
      categories: VideoData.map(d => d.week),
      title: {
        text: 'Tuần',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
          fontSize: '16px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
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
        text: 'Lượt xem',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
          fontSize: '16px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
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
    <div className={`w-full mx-auto `}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Lượt xem theo tuần vs trung bình
      </h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default StudentVideoLineChart;
