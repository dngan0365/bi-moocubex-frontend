'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@/context/ThemeContext';

interface FoldData {
  fold: string;
  accTrain: number;
  accValid: number;
  f1Train: number;
  f1Valid: number;
}

const data: FoldData[] = [
  { fold: 'Fold 1', accTrain: 73, accValid: 72, f1Train: 44, f1Valid: 41 },
  { fold: 'Fold 2', accTrain: 72, accValid: 72, f1Train: 41, f1Valid: 46 },
  { fold: 'Fold 3', accTrain: 72, accValid: 73, f1Train: 46, f1Valid: 40 },
  { fold: 'Fold 4', accTrain: 88, accValid: 73, f1Train: 40, f1Valid: 40 },
  { fold: 'Fold 5', accTrain: 73, accValid: 73, f1Train: 40, f1Valid: 40 },
];

const AccuracyF1LineChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300">
        No fold data available
      </div>
    );
  }

  const categories = data.map((fold) => fold.fold);

  const series = [
    {
      name: 'Accuracy (Train)',
      data: data.map((f) => f.accTrain),
    },
    {
      name: 'Accuracy (Valid)',
      data: data.map((f) => f.accValid),
    },
    {
      name: 'F1 Score (Train)',
      data: data.map((f) => +(f.f1Train).toFixed(2)),
    },
    {
      name: 'F1 Score (Valid)',
      data: data.map((f) => +(f.f1Valid).toFixed(2)), // Convert to %
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: true },
      background: 'transparent',
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    colors: ['#3B82F6', '#60A5FA', '#F59E0B', '#FBBF24'],
    xaxis: {
      categories,
      title: {
        text: 'Fold',
        style: {
          color: isDark ? '#F3F4F6' : '#374151',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
        },
      },
      axisBorder: {
        color: isDark ? '#6B7280' : '#D1D5DB',
      },
    },
    yaxis: {
      title: {
        text: 'Score (%)',
        style: {
          color: isDark ? '#F3F4F6' : '#374151',
        },
      },
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
        },
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
      },
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: {
        colors: isDark ? '#F3F4F6' : '#374151',
      },
    },
  };

  return (
    <div className="p-4">
      <h2
        className={`text-lg font-semibold text-center mb-4 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}
      >
        Train vs Validation Metrics per Fold
      </h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default AccuracyF1LineChart;
