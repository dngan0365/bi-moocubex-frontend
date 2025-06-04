'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';
import axios from 'axios';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CourseBehaviourLineGraph = ({ courseId }: { courseId: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [data, setData] = useState<{ month: string; videoViews: number; exercisesAttempted: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, exerciseRes] = await Promise.all([
          axios.get(`https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/course-video-count?course_id=${courseId}`),
          axios.get(`https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/course-exercise-count?course_id=${courseId}`),
        ]);

        const videos = videoRes.data;
        const exercises = exerciseRes.data;

        // Normalize by "year-month"
        const combined: Record<string, { videoViews?: number; exercisesAttempted?: number }> = {};

        videos.forEach((item: any) => {
          const key = `${item.year}-${item.month}`;
          if (!combined[key]) combined[key] = {};
          combined[key].videoViews = parseInt(item.video_count);
        });

        exercises.forEach((item: any) => {
          const key = `${item.year}-${item.month}`;
          if (!combined[key]) combined[key] = {};
          combined[key].exercisesAttempted = parseInt(item.exercise_count);
        });

        const finalData = Object.entries(combined).map(([key, value]) => ({
          month: key,
          videoViews: value.videoViews || 0,
          exercisesAttempted: value.exercisesAttempted || 0,
        }));

        // Sort by year-month
        finalData.sort((a, b) => (a.month > b.month ? 1 : -1));
        setData(finalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId]);

  const series = [
    {
      name: 'Số lượt xem video',
      data: data.map(d => d.videoViews),
    },
    {
      name: 'Số lần làm bài tập',
      data: data.map(d => d.exercisesAttempted),
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
    stroke: { curve: 'smooth', width: 3 },
    markers: { size: 5, strokeWidth: 2, hover: { sizeOffset: 4 } },
    xaxis: {
      categories: data.map(d => d.month),
      title: {
        text: 'Tháng',
        style: {
          color: isDark ? '#F9FAFB' : '#1F2937',
          fontSize: '16px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
        },
      },
      labels: { style: { colors: isDark ? '#D1D5DB' : '#374151' } },
      axisBorder: { color: isDark ? '#6B7280' : '#D1D5DB' },
    },
    yaxis: {
      title: {
        text: 'Số lần',
        style: {
          color: isDark ? '#F9FAFB' : '#1F2937',
          fontSize: '16px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
        },
      },
      labels: { style: { colors: isDark ? '#E5E7EB' : '#374151' } },
    },
    tooltip: { theme: isDark ? 'dark' : 'light' },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      labels: { colors: isDark ? '#F9FAFB' : '#1F2937' },
    },
    colors: ['#3B82F6', '#34D399'],
    grid: { borderColor: isDark ? '#374151' : '#E5E7EB', strokeDashArray: 4 },
    responsive: [{ breakpoint: 480, options: { chart: { height: 300 } } }],
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default CourseBehaviourLineGraph;
