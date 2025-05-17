'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CourseProportionPieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const series = [60, 20, 20];
  const labels = ['Video', 'Exercises', 'Exam'];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      toolbar: {
        show: true,
      },
    },
    labels,
    colors: ['#3B82F6', '#34D399', '#FBBF24'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 500,
      labels: {
        colors: isDark ? '#fff' : '#4B5563',
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
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
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val: number) => `${val}%`,
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
              label: 'Course',
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

export default CourseProportionPieChart;
