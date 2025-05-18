'use client';
import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@/context/ThemeContext";

const ExerciseScatterChart = () => {
  const { theme } = useTheme(); // theme: "light" | "dark"

  const students = [
    { courses: 5, exercise: 40, label: "A" },
    { courses: 6, exercise: 35, label: "B" },
    { courses: 4, exercise: 20, label: "E" },
    { courses: 7, exercise: 50, label: "A" },
    { courses: 3, exercise: 15, label: "B" },
    { courses: 5, exercise: 40, label: "E" },
    { courses: 6, exercise: 35, label: "B" },
    { courses: 4, exercise: 20, label: "E" },
    { courses: 7, exercise: 50, label: "A" },
    { courses: 3, exercise: 15, label: "E" },
    { courses: 5, exercise: 40, label: "D" },
    { courses: 6, exercise: 35, label: "D" },
    { courses: 4, exercise: 20, label: "D" },
    { courses: 7, exercise: 50, label: "D" },
    { courses: 3, exercise: 15, label: "E" }
  ];

  const labels = [...new Set(students.map((s) => s.label))];

  const labelColors = {
    A: "#1E90FF",
    B: "#28a745",
    C: "#ffc107",
    D: "#dc3545",
    E: "#6f42c1"
  };

  const series = labels.map((label) => ({
    name: `Học viên ${label}`,
    data: students
      .filter((s) => s.label === label)
      .map((s) => ({ x: s.courses, y: s.exercise })),
    color: labelColors[label as keyof typeof labelColors] || "#888"
  }));

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "scatter",
      height: 400,
      toolbar: { show: true },
      background: 'transparent',
      zoom: {
        enabled: true,
        type: "xy"
      }
    },
    xaxis: {
      title: { text: "Số khóa học", style: { color: theme === "dark" ? "#fff" : "#000" } },
      tickAmount: 5,
      labels: {
        style: {
          colors: theme === "dark" ? "#ccc" : "#333",
          fontSize: "13px"
        }
      },
      axisBorder: {
        color: theme === "dark" ? "#555" : "#ccc"
      },
      axisTicks: {
        color: theme === "dark" ? "#555" : "#ccc"
      }
    },
    yaxis: {
      title: { text: "Số bài tập đã làm", style: { color: theme === "dark" ? "#fff" : "#000" } },
      tickAmount: 5,
      labels: {
        style: {
          colors: theme === "dark" ? "#ccc" : "#333",
          fontSize: "13px"
        }
      }
    },
    grid: {
      borderColor: theme === "dark" ? "#444" : "#e0e0e0",
      strokeDashArray: 4
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
      labels: {
        colors: theme === "dark" ? "#f0f0f0" : "#333"
      },
      markers: {
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

export default ExerciseScatterChart;
