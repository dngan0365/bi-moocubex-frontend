'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const StudentTrendLineChart = () => {
  const {theme} = useTheme();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const series = [
    {
      name: `${currentYear}`,
      data: [120, 140, 180, 200, 220, 240, 260, 300, 280, 310, 330, 360],
    },
    {
      name: `${lastYear}`,
      data: [100, 120, 160, 190, 210, 220, 250, 270, 260, 280, 300, 320],
    },
  ];

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
        customIcons: [],
      },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
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
      dashArray: [0, 6], // solid for this year, dotted for last year
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    xaxis: {
    categories: months,
    labels: {
        style: {
        colors: theme === 'dark' ? '#fff' : '#000',
        }
    }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === 'dark' ? '#fff' : '#000',
        }
      }
    },
    colors: ['#3b82f6', '#f97316'], // blue and orange
    dataLabels: {
      enabled: false,
    },
    legend: {
    position: 'top',
    labels: {
        colors: theme === 'dark' ? '#fff' : '#000',
    },
    },
    markers: {
      size: 4,
    },
    tooltip: {
      theme: 'light',
    },
  };

  return (
      <ApexCharts options={options} series={series} type="area"  height="300" width="100%"/>
  );
};

export default StudentTrendLineChart;
