'use client';

import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LabelData {
  label: string;
  num_users: string; // string vì API trả về string
}

const StudentGroupPieChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [data, setData] = useState<LabelData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/label-distribution');
        const json: LabelData[] = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch label distribution:', error);
      }
    }
    fetchData();
  }, []);

  // Lấy labels và series từ data
  const groupLabels = useMemo(() => data.map(d => `Group ${d.label}`), [data]);
  const groupCounts = useMemo(() => data.map(d => Number(d.num_users)), [data]);

  const series = groupCounts;

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
              formatter: () => series.reduce((a, b) => a + b, 0).toString(), // tổng số user
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
    colors: ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'], // màu tương ứng label D, C, B, A, E
  }), [isDark, groupLabels, series]);

  // Key để force remount chart khi theme thay đổi
  const chartKey = useMemo(() => `theme-${theme}`, [theme]);

  // Nếu data chưa có thì show loading hoặc null
  if (data.length === 0)
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Đang tải biểu đồ...</p>
    </div>
  );

  return (
    <ApexCharts
      key={chartKey}
      options={options}
      series={series}
      type="donut"
      height={360}
    />
  );
};

export default StudentGroupPieChart;
