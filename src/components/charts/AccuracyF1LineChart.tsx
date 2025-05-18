import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@/context/ThemeContext";

type FoldData = {
  fold: string;
  accTrain: number;
  accValid: number;
  f1Train: number;
  f1Valid: number;
};

type AccuracyF1LineChartProps = {
  data: FoldData[];
};

const AccuracyF1LineChart = ({ data }: AccuracyF1LineChartProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No fold data available</div>;
  }

  // Use fold names from data or fallback to default fold labels
  const categories = data.map((fold) => fold.fold);

  const series = [
    {
      name: "Accuracy (Train)",
      data: data.map((f) => f.accTrain ?? 0),
      type: "line",
      dashArray: 4,
    },
    {
      name: "Accuracy (Valid)",
      data: data.map((f) => f.accValid ?? 0),
      type: "line",
    },
    {
      name: "F1 Score (Train)",
      data: data.map((f) => f.f1Train ?? 0),
      type: "line",
      dashArray: 4,
    },
    {
      name: "F1 Score (Valid)",
      data: data.map((f) => f.f1Valid ?? 0),
      type: "line",
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: true },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      width: [2, 2, 2, 2],
      dashArray: [4, 0, 4, 0],
    },
    colors: ["#3B82F6", "#60A5FA", "#F59E0B", "#FBBF24"],
    xaxis: {
      categories,
      labels: {
        style: {
          colors: isDark ? "#F3F4F6" : "#374151",
        },
      },
      axisBorder: {
        color: isDark ? "#6B7280" : "#D1D5DB",
      },
    },
    yaxis: {
      title: { text: "Score (%)" },
      labels: {
        style: {
          colors: isDark ? "#F3F4F6" : "#374151",
        },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
      strokeDashArray: 4,
    },
    legend: {
      position: "top",
      labels: {
        colors: isDark ? "#F3F4F6" : "#374151",
      },
    },
  };

  return (
    <div>
      <h2
        className={`text-lg font-semibold text-center mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Train vs Validation Metrics per Fold
      </h2>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default AccuracyF1LineChart;
