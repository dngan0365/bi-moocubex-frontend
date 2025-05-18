'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CourseStudentGroupPieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const labels = ['A', 'B', 'C', 'D', 'E'];
  const series = [3, 4, 1, 6, 5];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: true },
    },
    labels,
    colors: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'], // blue, green, yellow, red, purple
    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: {
        colors: isDark ? '#F3F4F6' : '#374151',
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: val => `${val} students`,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              offsetY: -10,
              color: isDark ? '#fff' : '#111827',
            },
            value: {
              show: true,
              fontSize: '14px',
              fontWeight: 500,
              color: isDark ? '#E5E7EB' : '#6B7280',
            },
            total: {
              show: true,
              label: 'Tổng',
              fontSize: '16px',
              fontWeight: 600,
              color: isDark ? '#fff' : '#111827',
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
      <Chart options={options} series={series} type="donut" height={300} />
  );
};

export default CourseStudentGroupPieChart;
