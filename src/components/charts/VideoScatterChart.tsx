import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from '@/context/ThemeContext';

const VideoScatterChart = () => {
  const { theme } = useTheme(); // theme: "light" | "dark"

  const students = [
    { courses: 5, videos: 40, label: "A" },
    { courses: 6, videos: 35, label: "B" },
    { courses: 4, videos: 20, label: "E" },
    { courses: 7, videos: 50, label: "A" },
    { courses: 3, videos: 15, label: "B" },
    { courses: 5, videos: 40, label: "E" },
    { courses: 6, videos: 35, label: "B" },
    { courses: 4, videos: 20, label: "E" },
    { courses: 7, videos: 50, label: "A" },
    { courses: 3, videos: 15, label: "E" },
    { courses: 5, videos: 40, label: "D" },
    { courses: 6, videos: 35, label: "D" },
    { courses: 4, videos: 20, label: "D" },
    { courses: 7, videos: 50, label: "D" },
    { courses: 3, videos: 15, label: "E" }
  ];

  const labelColors = {
    A: "#1E90FF",
    B: "#28a745",
    C: "#ffc107",
    D: "#dc3545",
    E: "#6f42c1"
  };

  type LabelKey = keyof typeof labelColors;
  const labels: LabelKey[] = ["A", "B", "C", "D", "E"];

  const series = labels.map((label) => ({
    name: `Học viên ${label}`,
    data: students
      .filter((s) => s.label === label)
      .map((s) => ({ x: s.courses, y: s.videos })),
    color: labelColors[label]
  }));

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 400,
      type: "scatter",
      toolbar: { show: true },
      background: "transparent",
      zoom: { enabled: true, type: "xy" },
      foreColor: theme === "dark" ? "#f0f0f0" : "#333"
    },
    theme: {
      mode: theme
    },
    xaxis: {
      title: {
        text: "Số khóa học",
        style: {
          color: theme === "dark" ? "#fff" : "#000",
          fontWeight: 500
        }
      },
      tickAmount: 6,
      labels: {
        style: {
          colors: theme === "dark" ? "#ccc" : "#444",
          fontSize: "13px"
        }
      },
      axisBorder: { color: theme === "dark" ? "#666" : "#ddd" },
      axisTicks: { color: theme === "dark" ? "#666" : "#ddd" }
    },
    yaxis: {
      title: {
        text: "Số Video đã coi",
        style: {
          color: theme === "dark" ? "#fff" : "#000",
          fontWeight: 500
        }
      },
      tickAmount: 6,
      labels: {
        style: {
          colors: theme === "dark" ? "#ccc" : "#444",
          fontSize: "13px"
        }
      }
    },
    grid: {
      borderColor: theme === "dark" ? "#444" : "#e0e0e0",
      strokeDashArray: 5,
    },
    markers: {
      size: 7,
      shape: "circle",
      strokeWidth: 1,
      strokeColors: "#fff",
      hover: {
        size: 9
      }
    },
    legend: {
      position: "top",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: theme === "dark" ? "#f0f0f0" : "#333"
      },
      markers: {
        radius: 12
      }
    },
    tooltip: {
      theme: theme,
      style: {
        fontSize: "13px"
      }
    }
  };

  return (
      <Chart options={options} series={series} type="scatter" height={400} />
  );
};

export default VideoScatterChart;
