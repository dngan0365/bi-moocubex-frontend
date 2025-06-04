'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const StudentTrendLineChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/monthly-users');
        const data = await res.json();

        // Group data by year
        const grouped: Record<string, number[]> = {};

        data.forEach((entry: any) => {
          const year = parseInt(entry.year).toString();
          const monthIdx = parseInt(entry.month) - 1;
          const count = parseInt(entry.num_users);

          if (!grouped[year]) {
            grouped[year] = Array(12).fill(0);
          }

          grouped[year][monthIdx] = count;
        });

        // Convert grouped data into ApexCharts series format
        const chartSeries = Object.entries(grouped).map(([year, data]) => ({
          name: year,
          data,
        }));

        setSeries(chartSeries);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    colors: ['#3B82F6', '#F97316', '#10B981', '#8B5CF6'],
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center py-12 text-gray-500 animate-pulse">
          Loading chart...
        </div>
      ) : (
        <ApexCharts options={options} series={series} type="area" height={300} width="100%" />
      )}
    </div>
  );
};

export default StudentTrendLineChart;
