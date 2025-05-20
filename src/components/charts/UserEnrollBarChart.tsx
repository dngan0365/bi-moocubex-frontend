'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const UserEnrollBarChart = () => {
  const { theme } = useTheme();

  const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  const enrollments = [100, 1100, 600, 130, 440, 200, 110];

  const isDark = theme === 'dark';

  const series = [
    {
      name: 'Enrollments',
      data: enrollments,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: {
        show: true,
      },
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
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
      style: {
      },
    },
    xaxis: {
    categories: years,
    title: {
      text: 'Năm',
      offsetY: 2, // 👈 thêm khoảng cách giữa trục và tiêu đề
      style: {
        color: isDark ? '#fff' : '#4B5563',
        fontSize: '14px', // 👈 giảm kích thước font
      },
    },
    labels: {
      style: {
        fontSize: '14px',
        colors: isDark ? '#fff' : '#4B5563',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Lượt đăng kí',
      offsetX: -5, // 👈 thêm khoảng cách giữa trục và tiêu đề
      style: {
        fontSize: '14px',
        color: isDark ? '#fff' : '#374151',
      },
    },
    labels: {
      style: {
        fontSize: '12px',
        colors: isDark ? '#fff' : '#4B5563',
      },
    },
  },

    legend: {
      position: 'top',
      labels: {
        colors: isDark ? '#fff' : '#4B5563',
      },
    },
    fill: {
      opacity: 0.9,
    },
    colors: ['#3B82F6'],
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      style: {
      },
    },
  };


  return (
      <ApexCharts options={options} series={series} type="bar" height={400} />
  );
};

export default UserEnrollBarChart;
