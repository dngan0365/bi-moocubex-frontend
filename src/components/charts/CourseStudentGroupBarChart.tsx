'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CourseStudentGroupBarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Group A',
      data: [3, 4, 1, 6, 5],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: { show: false },
      animations: {
        enabled: true,
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
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['A', 'B', 'C', 'D', 'E'],
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151', // gray-100 / gray-700
          fontSize: '13px',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB', // gray-500 / gray-300
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
          fontSize: '13px',
        },
      },
    },
    fill: {
      opacity: 0.9,
    },
    colors: ['#60A5FA'], // Tailwind blue-400
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB', // gray-700 / gray-200
      strokeDashArray: 4,
    },
  };

  return (
      <Chart options={options} series={series} type="bar" height={250} />
  );
};

export default CourseStudentGroupBarChart;
