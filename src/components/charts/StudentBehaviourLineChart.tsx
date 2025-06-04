'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  courseId: string;
  userId: string;
}

interface MonthlyData {
  month: string; // "MM/YYYY"
  videoViews: number;
  exerciseAttempts: number;
}

const StudentBehaviourLineChart: React.FC<Props> = ({ courseId, userId }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [data, setData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/user-course-behaviour', {
          params: {
            user_id: userId,
            course_id: courseId,
          },
        });

        const userVideo = response.data?.user_video || [];
        const userExercises = response.data?.user_exercises || [];

        const mapKey = (item: any) => `${item.month.padStart(2, '0')}/${item.year}`;

        const videoMap = Object.fromEntries(
          userVideo.map((v: any) => [mapKey(v), parseInt(v.video_view_count || '0', 10)])
        );

        const exerciseMap = Object.fromEntries(
          userExercises.map((e: any) => [mapKey(e), parseInt(e.exercise_count || '0', 10)])
        );

        const allMonths = Array.from(new Set([...Object.keys(videoMap), ...Object.keys(exerciseMap)])).sort();

        const merged: MonthlyData[] = allMonths.map((month) => ({
          month,
          videoViews: videoMap[month] || 0,
          exerciseAttempts: exerciseMap[month] || 0,
        }));

        setData(merged);
      } catch (error) {
        console.error('Failed to fetch student behavior:', error);
      }
    };

    if (userId && courseId) {
      fetchData();
    }
  }, [userId, courseId]);

  const series = [
    {
      name: 'Lượt xem video',
      data: data.map((d) => d.videoViews),
    },
    {
      name: 'Lượt làm bài tập',
      data: data.map((d) => d.exerciseAttempts),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        sizeOffset: 3,
      },
    },
    colors: ['#3B82F6', '#FBBF24'],
    xaxis: {
      categories: data.map((d) => d.month),
      title: {
        text: 'Tháng',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
          fontSize: '16px',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#4B5563' : '#E5E7EB',
      },
    },
    yaxis: {
      title: {
        text: 'Số lượt',
        style: {
          color: isDark ? '#F3F4F6' : '#111827',
          fontSize: '16px',
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
        colors: isDark ? '#F9FAFB' : '#1F2937',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto">
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Lượt xem video và làm bài tập của học viên theo tháng
      </h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default StudentBehaviourLineChart;
