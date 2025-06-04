"use client";

import { useTheme } from "@/context/ThemeContext";
import {
  ArrowUp,
  ArrowDown,
  Info,
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
} from "lucide-react";

import FeatureImportanceBarChart from "@/components/charts/FeatureImportanceBarChart";
import AccuracyF1LineChart from "@/components/charts/AccuracyF1LineChart";

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Helper to determine status color based on percentage and theme
  const getStatusColor = (percentage: number) => {
    if (percentage > 10) return isDark ? "text-green-400" : "text-green-500";
    if (percentage < 0) return isDark ? "text-red-400" : "text-red-500";
    return isDark ? "text-yellow-300" : "text-yellow-500";
  };

  const getCardBg = () => (isDark ? "bg-gray-900" : "bg-cyan-400/10");

  type StatCardProps = {
    title: string;
    value: number | string | undefined;
    percentage: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  };

  const StatCard = ({
    title,
    value,
    percentage,
    icon: Icon,
  }: StatCardProps) => (
    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
      <div
        className={`rounded-xl shadow-md ${getCardBg()} p-4 transition-all duration-200 h-full hover:shadow-lg transform hover:-translate-y-1`}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {title}
          </div>
          <div
            className={`p-2 rounded-lg ${
              isDark ? "bg-cyan-900" : "bg-cyan-100"
            }`}
          >
            <Icon size={18} className="text-cyan-500" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value ?? "-"}</div>
          <div className={`flex items-center ${getStatusColor(percentage)}`}>
            {percentage > 0 ? (
              <ArrowUp size={16} />
            ) : percentage < 0 ? (
              <ArrowDown size={16} />
            ) : null}
            <span className="ml-1 font-medium">
              {Math.abs(percentage).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  type MetricCardProps = {
    title: string;
    children: React.ReactNode;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  };

  const MetricCard = ({ title, children, icon: Icon }: MetricCardProps) => (
    <div className="w-full p-1">
      <div
        className={`rounded-xl shadow-md ${getCardBg()} p-2 transition-all duration-200 h-full`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            {Icon && <Icon size={10} className="mr-2 text-cyan-500" />}
            {title}
          </h2>
          <button
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Info"
          >
            <Info size={10} className="text-gray-400" />
          </button>
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-gray-700 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            Hard Dimension
          </h1>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap -mx-2 mb-6">
          <StatCard
            title="Average Completeness"
            value={"99.16%"}
            percentage={12.5}
            icon={BarChart2}
          />
          <StatCard
            title="Average Consistency"
            value="68.36%"
            percentage={7.8}
            icon={PieChart}
          />
          <StatCard
            title="Average Timeliness"
            value="100%"
            percentage={-2.3}
            icon={LineChart}
          />
          <StatCard
            title="Overall Hard Quality"
            value={"89.17%"}
            percentage={5.6}
            icon={TrendingUp}
          />
        </div>

        {/* Summary Section */}
        
        <div
          className={`col-span-3 rounded-lg shadow p-4 transition-colors duration-200 my-8 ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-cyan-50 text-gray-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Info size={20} className=" mr-2" />
              <h3 className="text-lg font-semibold ">Nhận xét chung:</h3>
            </div>
          </div>
          <p className="mt-2 ">
            Độ Completeness, Timeliness cao nhưng Consistency thấp, cần cải thiện. <br/>
            Trung bình Hard Dimension là 89.17% có thể đưa vào huấn luyện nhưng phải qua xử lý.
          </p>
        </div>

        {/* Soft Dimensions */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            Soft Dimension
          </h1>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full p-2 grid grid-cols-3 gap-2">
            <div
              className={`rounded-xl shadow-md ${getCardBg()} p-5 transition-all duration-200 h-full`}
            >
              <div className="flex flex-col justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <BarChart2 size={20} className="mr-2 text-cyan-500" />
                  Reliability 
                </h2> <br/>
                <div  className="flex justify-between gap-2">
                    {/* Accuracy */}
                  <MetricCard title="Accuracy" icon={BarChart2}>
                    84
                  </MetricCard>
                    {/* F1 macro */}
                  <MetricCard title="F1 macro" icon={BarChart2}>
                    40
                  </MetricCard>
                </div>
              </div>
                <div className="text-md font-semibold p-5">
                  Độ lệch phương sai Accuracy: 0.38 (train), 0.24 (test) 
                  <br />
                  Độ lệch phương sai F1: 5.76 (train), 5.44 (test)
                  <br />
                  Nhận xét: Chỉ số Accuracy cao nhưng F1 macro thấp và F1 qua các fold bị lệch nhiều hơn Accuracy <br />
                  <span className="text-red-500">Dữ liệu mất cân bằng cần cải thiện</span>
                </div>
            </div>

            <div
              className={`rounded-xl shadow-md ${getCardBg()} p-2 col-span-2`}
            >
              <AccuracyF1LineChart />
            </div>
          </div>

          <div
            className={`rounded-xl shadow-md ${getCardBg()} w-full p-5 transition-all duration-200 mt-6`}
          >
            <h2 className="text-xl font-semibold flex items-center mb-4">
              Relevance
            </h2>
            <h3 className="font-semibold mb-2">AUR-ROC Scores</h3>
              <div className="text-md">
                AUR-ROC Macro: 89 <br/>
              </div>
            <FeatureImportanceBarChart />
              <div className="text-md">
                Các giá đặc trưng được trích xuất từ đồ thị có độ quan trong hơn các đặc trưng khác.
              </div>
          </div>

        
        </div>
          {/* Summary Section */}
        <div className={`col-span-3 rounded-lg shadow p-4 transition-colors duration-200 my-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Info size={20} className=" mr-2" />
              <h3 className="text-lg font-semibold ">Nhận xét chung:</h3>
            </div>
          </div>
          <p className="mt-2 ">
            Chỉ số Relevance cao với AUR-ROC Macro là 89. <br />
            Độ lệch phương sai Accuracy và F1 thấp, tuy nhiên cần cải thiện độ cân bằng của dữ liệu. <br />
            Model: Accuracy cao nhưng F1 thấp, cần cải thiện độ cân bằng của dữ liệu. <br />
            Accuracy cho chất lượng dữ liệu ở mực trung bình cần phải xử lý hơn do dộ Reliability thấp.
          </p>
        </div>
      </div>
    </div>
  );
}
