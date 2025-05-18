import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "@/context/ThemeContext"; // or your theming system

interface FeatureImportanceBarChartProps {
  data: Record<string, number>;
}


const FeatureImportanceBarChart : React.FC<FeatureImportanceBarChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
    // Filter and sort top 20 non-zero features
  const sortedFeatures = Object.entries(data)
    .filter(([_, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    // .slice(0, 20);

  const labels = sortedFeatures.map(([key]) => key);
  const values = sortedFeatures.map(([_, val]) => val);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 600,
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: "70%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: isDark ? "#F3F4F6" : "#374151",
        },
      },
      title: {
        text: "Importance Score",
        style: {
          color: isDark ? "#F3F4F6" : "#374151",
        },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#F3F4F6" : "#374151",
        },
      },
    },
    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
    },
    legend: {
      labels: {
        colors: isDark ? "#F3F4F6" : "#374151",
      },
    },
    colors: [isDark ? "#60A5FA" : "#3B82F6"],
  };

  const series = [
    {
      name: "Importance",
      data: values,
    },
  ];

  return (
    <div className={`p-4 rounded-xl shadow `}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
        Feature Importances
      </h2>
      <Chart options={options} series={series} type="bar" height={600} />
    </div>
  );
};

export default FeatureImportanceBarChart;