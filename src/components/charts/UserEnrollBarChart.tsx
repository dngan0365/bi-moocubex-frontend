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
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: years,
      title: {
        text: 'Year',
        style: {
          color: isDark ? '#fff' : '#4B5563',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#fff' : '#4B5563',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Enrollments',
        style: {
          color: isDark ? '#fff' : '#374151',
        },
      },
      labels: {
        style: {
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
    colors: ['#3B82F6'], // Tailwind blue-500
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
  };

  return (
      <ApexCharts options={options} series={series} type="bar" height={400} />
  );
};

export default UserEnrollBarChart;
