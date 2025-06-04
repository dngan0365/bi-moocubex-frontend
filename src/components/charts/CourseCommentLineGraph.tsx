'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SentimentData {
  sentiment_label: string; // "0", "1", "2"
  year: string;
  month: string;
  comment_count: string;
}

interface ApiResponse {
  comments: SentimentData[];
  replies: any[];
}

// Map sentiment_label to meaningful names (adjust if needed)
const sentimentMap = {
  '0': 'Tiêu cực',
  '1': 'Trung tính',
  '2': 'Tích cực',
};

const CourseCommentLineGraph = ({ courseId }: { courseId: string }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [commentsData, setCommentsData] = useState<
    { label: string; negative: number; neutral: number; positive: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/course-comment-reply-sentiment?course_id=${courseId}`
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data: ApiResponse = await res.json();

        // Transform data: aggregate counts by month-year, split by sentiment_label
        // Step 1: Collect unique month-year keys sorted
        const monthYearSet = new Set<string>();
        data.comments.forEach(({ year, month }) => {
          const key = `${year}-${month.padStart(2, '0')}`;
          monthYearSet.add(key);
        });
        const sortedMonths = Array.from(monthYearSet).sort();

        // Step 2: For each month-year, sum counts for each sentiment_label
        const processed = sortedMonths.map((monthYear) => {
          // Split year-month
          const [year, month] = monthYear.split('-');
          // Filter comment entries for this month-year
          const entries = data.comments.filter(
            (d) => d.year === year && d.month.padStart(2, '0') === month
          );

          // Sum counts by sentiment_label
          const negative = entries
            .filter((d) => d.sentiment_label === '0')
            .reduce((sum, d) => sum + Number(d.comment_count), 0);
          const neutral = entries
            .filter((d) => d.sentiment_label === '1')
            .reduce((sum, d) => sum + Number(d.comment_count), 0);
          const positive = entries
            .filter((d) => d.sentiment_label === '2')
            .reduce((sum, d) => sum + Number(d.comment_count), 0);

          return {
            label: monthYear,
            negative,
            neutral,
            positive,
          };
        });

        setCommentsData(processed);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (commentsData.length === 0) return <p>Không có dữ liệu để hiển thị</p>;

  const series = [
    { name: 'Tiêu cực', data: commentsData.map((d) => d.negative) },
    { name: 'Trung tính', data: commentsData.map((d) => d.neutral) },
    { name: 'Tích cực', data: commentsData.map((d) => d.positive) },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      stacked: true,
      height: 350,
      zoom: { enabled: false },
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 700,
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
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: commentsData.map((d) => d.label),
      title: {
        text: 'Tháng',
        style: {
          color: isDark ? '#F9FAFB' : '#111827',
          fontSize: '16px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#D1D5DB' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      title: {
        text: 'Số lượng bình luận',
        style: {
          color: isDark ? '#F9FAFB' : '#111827',
          fontSize: '16px',
          fontFamily: 'Arial, "Segoe UI", Roboto, "Noto Sans", sans-serif',
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
        colors: isDark ? '#E5E7EB' : '#111827',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    colors: ['#F87171', '#A78BFA', '#34D399'], // red, violet, green
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default CourseCommentLineGraph;
