'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LabelData {
  label: string;
  count: string; // comes as string from API
}

const CourseStudentGroupBarChart = ({ courseId }: { courseId: string }) => {
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
        const res = await axios.get<LabelData[]>(
          `https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/search-labels?course_id=${courseId}`
        );

        const labelOrder = ['A', 'B', 'C', 'D', 'E'];
        const labelMap: Record<string, number> = {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
        };

        res.data.forEach(({ label, count }) => {
          const parsed = parseInt(count, 10);
          if (!isNaN(parsed) && labelMap[label] !== undefined) {
            labelMap[label] = parsed;
          }
        });

        setLabels(labelOrder);
        setSeries(labelOrder.map((l) => labelMap[l]));
      } catch (error) {
        console.error('Failed to fetch label data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: { show: false },
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
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
          fontSize: '13px',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
          fontSize: '13px',
        },
      },
    },
    fill: {
      opacity: 0.9,
    },
    colors: ['#60A5FA'],
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center text-gray-500 py-8">Đang tải biểu đồ...</div>
      ) : (
        <Chart
          options={chartOptions}
          series={[{ name: 'Số lượng sinh viên', data: series }]}
          type="bar"
          height={250}
        />
      )}
    </div>
  );
};

export default CourseStudentGroupBarChart;
