'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const StudentGroupPieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const groupLabels = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
  const groupCounts = [10, 80, 150, 50, 100];

  const series = groupCounts;

  // Generate options every time theme changes
  const options: ApexCharts.ApexOptions = useMemo(() => ({
    chart: {
      type: 'donut',
      toolbar: {
        show: true,
      },
    },
    labels: groupLabels,
    legend: {
      position: 'bottom',
      labels: {
        colors: isDark ? '#fff' : '#000',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              color: isDark ? '#fff' : '#000',
            },
            value: {
              show: true,
              color: isDark ? '#fff' : '#000',
            },
            total: {
              show: true,
              label: 'Tổng cộng',
              color: isDark ? '#fff' : '#000',
              fontSize: '20px',
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    colors: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'],
  }), [isDark]); // 👈 chỉ re-calculate khi theme thay đổi

  // Force re-render chart when theme changes
  const chartKey = useMemo(() => `theme-${theme}`, [theme]);

  return (
    <ApexCharts
      key={chartKey} // 👈 force remount when theme changes
      options={options}
      series={series}
      type="donut"
      height={360}
    />
  );
};

export default StudentGroupPieChart;
