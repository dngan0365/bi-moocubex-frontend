'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StudentScoreBarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Percent',
      data: [80, 20, 100, 60],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 700,
        animateGradually: {
          enabled: true,
          delay: 120,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '13px',
        colors: [isDark ? '#E5E7EB' : '#111827'],
      },
    },
    colors: ['#A78BFA', '#6EE7B7', '#93C5FD', '#FCD34D'], // purple, green, blue, yellow
    xaxis: {
      categories: ['Video', 'Exercise', 'Exam', 'Tổng'],
      labels: {
        style: {
          colors: isDark ? '#E5E7EB' : '#374151',
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
      title: {
        text: 'Hoạt động',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
          fontSize: '13px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
        },
      },
    },
    yaxis: {
      max: 100,
      labels: {
        formatter: (val) => `${val}%`,
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      title: {
        text: 'Điểm (%)',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
          fontSize: '13px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
        },
      },
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
      theme: isDark ? 'dark' : 'light',
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          xaxis: {
            labels: { rotate: -45 },
          },
        },
      },
    ],
  };

  return (
    <div className={`w-full mx-auto`}>
      <h2 className={`text-lg font-semibold text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Phân phối điểm số
      </h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default StudentScoreBarChart;
