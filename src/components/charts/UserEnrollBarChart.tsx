'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const UserEnrollBarChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // State to hold categories (years) and data (user counts)
  const [years, setYears] = useState<string[]>([]);
  const [enrollments, setEnrollments] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const res = await fetch('https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/yearly-users');
        const data = await res.json();

        // Extract years and num_users, convert types as needed
        const fetchedYears = data.map((item: any) => item.year.split('.')[0]); // remove decimal part if present
        const fetchedEnrollments = data.map((item: any) => parseInt(item.num_users));

        setYears(fetchedYears);
        setEnrollments(fetchedEnrollments);
      } catch (error) {
        console.error('Failed to fetch yearly enrollments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, []);

  // Prepare series for ApexCharts
  const series = [
    {
      name: 'Số lượng đăng kí',
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
    },
    xaxis: {
      categories: years,
      title: {
        text: 'Năm',
        offsetY: 2,
        style: {
          color: isDark ? '#fff' : '#4B5563',
          fontSize: '14px',
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
        offsetX: -5,
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
    },
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500 animate-pulse">Loading chart...</div>;
  }

  return <ApexCharts options={options} series={series} type="bar" height={400} />;
};

export default UserEnrollBarChart;
