'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const commentsData = [
  { week: '01', negative: 10, neutral: 15, positive: 5 },
  { week: '02', negative: 12, neutral: 18, positive: 7 },
  { week: '03', negative: 15, neutral: 20, positive: 10 },
  { week: '04', negative: 18, neutral: 22, positive: 12 },
  { week: '05', negative: 20, neutral: 25, positive: 15 },
  { week: '06', negative: 22, neutral: 28, positive: 18 },
];

const CourseCommentLineGraph = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [
    { name: 'Trung tính', data: commentsData.map(d => d.neutral) },
    { name: 'Tích cực', data: commentsData.map(d => d.positive) },
    { name: 'Tiêu cực', data: commentsData.map(d => d.negative) },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      stacked: true,
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 700,
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
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: commentsData.map(d => d.week),
      title: {
        text: 'Tuần',
        style: {
          color: isDark ? '#F9FAFB' : '#111827', // gray-50 / gray-900
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
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      title: {
        text: 'Bình luận',
        style: {
          color: isDark ? '#F9FAFB' : '#111827',
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
        colors: isDark ? '#E5E7EB' : '#111827',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    colors: ['#A78BFA', '#34D399', '#F87171'], // violet, green, red
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
        },
      },
    ],
  };

  return (
      <Chart options={options} series={series} type="area" height={350} />
  );
};

export default CourseCommentLineGraph;
