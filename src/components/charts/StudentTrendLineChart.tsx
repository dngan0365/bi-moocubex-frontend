'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const StudentTrendLineChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const series = [
    {
      name: `${currentYear}`,
      data: [120, 140, 180, 200, 220, 240, 260, 300, 280, 310, 330, 360],
    },
    {
      name: `${lastYear}`,
      data: [100, 120, 160, 190, 210, 220, 250, 270, 260, 280, 300, 320],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
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
    stroke: {
      curve: 'smooth',
      width: [3, 2],
      dashArray: [0, 6],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: isDark ? 'dark' : 'light',
        shadeIntensity: 0.6,
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#1F2937',
        },
      },
      axisBorder: {
        color: isDark ? '#4B5563' : '#D1D5DB',
      },
      axisTicks: {
        color: isDark ? '#4B5563' : '#D1D5DB',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#1F2937',
        },
      },
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: {
        colors: isDark ? '#E5E7EB' : '#1F2937',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      strokeColors: isDark ? '#111827' : '#fff',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    colors: ['#3B82F6', '#F97316'],
  };

  return (
  <ApexCharts options={options} series={series} type="area" height={300} width="100%" />
  );
};

export default StudentTrendLineChart;
