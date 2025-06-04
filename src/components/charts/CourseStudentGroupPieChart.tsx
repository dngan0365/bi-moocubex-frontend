'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CourseStudentGroupPieChart = ({ courseId }: { courseId: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/search-labels?course_id=${courseId}`
        );

        const data = res.data; // Already the expected array

        if (!Array.isArray(data)) throw new Error('Invalid response format');

        const cleanLabels: string[] = [];
        const cleanSeries: number[] = [];

        data.forEach((item: { label: string; count: string | number }) => {
          const label = item.label?.toUpperCase();
          const count = typeof item.count === 'string' ? parseInt(item.count, 10) : item.count;

          if (label && !isNaN(count)) {
            cleanLabels.push(`Group ${label}`);
            cleanSeries.push(count);
          }
        });

        setLabels(cleanLabels);
        setSeries(cleanSeries);
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
    },
    labels,
    colors: ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6', '#818CF8'],
    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: {
        colors: isDark ? '#F3F4F6' : '#374151',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: { formatter: (val) => `${val} students` },
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
          chart: { width: 280 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  return (
    <div className="w-full flex items-center justify-center min-h-[300px]">
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 animate-pulse py-12">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto mb-4" />
          Loading chart...
        </div>
      ) : series.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No data to display</div>
      ) : (
        <Chart options={options} series={series} type="donut" height={320} />
      )}
    </div>
  );
};

export default CourseStudentGroupPieChart;
