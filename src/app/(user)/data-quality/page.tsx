'use client';
import { useTheme } from '@/context/ThemeContext';
import {
  ArrowUp,
  ArrowDown,
  Info,
  Sun,
  Moon,
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
} from 'lucide-react';
import StudentTrendLineChart from '@/components/charts/StudentTrendLineChart';
import UserEnrollBarChart from '@/components/charts/UserEnrollBarChart';
import StudentGroupPieChart from '@/components/charts/StudentGroupPieChart';
import phase1Data from './phase1.json';
import FeatureImportanceBarChart from '@/components/charts/FeatureImportanceBarChart';
import AccuracyF1LineChart from '@/components/charts/AccuracyF1LineChart';

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const data = phase1Data;

   // Find the object in relevance that has AUR-ROC key
  const aurRocObj = data.relevance.find((item) => item["AUR-ROC"]);

  // Safely extract the array
  const aurRocValues = aurRocObj?.["AUR-ROC"] || [];

  const allowedKeys = [
    'dataset',
    'object50',
    'object75',
    'object80',
    'object90',
    'accuracy',
    'f1',
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage > 10) return isDark ? 'text-green-400' : 'text-green-500';
    if (percentage < 0) return isDark ? 'text-red-400' : 'text-red-500';
    return isDark ? 'text-yellow-300' : 'text-yellow-500';
  };

  const getCardBg = () => (isDark ? 'bg-gray-900' : 'bg-cyan-400/10');
  const getSectionBg = () => (isDark ? 'bg-gray-900' : 'bg-cyan-50');

  const StatCard = ({
    title,
    value,
    percentage,
    icon: Icon,
  }: {
    title: string;
    value: number | string;
    percentage: number;
    icon: any;
  }) => (
    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
      <div
        className={`rounded-xl shadow-md ${getCardBg()} p-4 transition-all duration-200 h-full hover:shadow-lg transform hover:-translate-y-1`}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{title}</div>
          <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-900' : 'bg-cyan-100'}`}>
            <Icon size={18} className="text-cyan-500" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center ${getStatusColor(percentage)}`}>
            {percentage > 0 ? (
              <ArrowUp size={16} />
            ) : percentage < 0 ? (
              <ArrowDown size={16} />
            ) : null}
            <span className="ml-1 font-medium">{Math.abs(percentage).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MetricCard = ({
    title,
    children,
    icon: Icon,
  }: {
    title: string;
    children: React.ReactNode;
    icon?: any;
  }) => (
    <div className="w-full p-2">
      <div className={`rounded-xl shadow-md ${getCardBg()} p-5 transition-all duration-200 h-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            {Icon && <Icon size={20} className="mr-2 text-cyan-500" />}
            {title}
          </h2>
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Info size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );

  const renderList = (items: any[]) => (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-cyan-50/50'}`}>
          {Object.entries(item)
            .filter(([k]) => allowedKeys.includes(k))
            .map(([k, v]) => (
              <div key={k} className="flex flex-col mb-1">
                <div className="flex justify-between">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    {k === 'dataset' && 'Chỉ số cho toàn bộ dataset'}
                    {k === 'object50' && 'Phần trăm object > 50% đáp ứng'}
                    {k === 'object75' && 'Phần trăm object > 75% đáp ứng'}
                    {k === 'object80' && 'Phần trăm object > 80% đáp ứng'}
                    {k === 'object90' && 'Phần trăm object > 90% đáp ứng'}
                    {k === 'accuracy' && 'Chỉ số Accuracy'}
                    {k === 'f1' && 'Chỉ số F1'}
                  </span>
                  <span
                    className={`font-medium ${
                      typeof v === 'number' && v > 0.7
                        ? 'text-green-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {Array.isArray(v)
                      ? v.join(', ')
                      : typeof v === 'object'
                      ? JSON.stringify(v)
                      : typeof v === 'number'
                      ? v.toFixed(2)
                      : v.toString()}
                  </span>
                </div>
                {typeof v === 'number' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-cyan-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min(v , 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );

  const foldEntry = data?.reliability?.find((item: any) => 'Fold' in item);

  // Convert Fold array into an array of fold objects with fold name and metrics
  const foldList = foldEntry?.Fold.map((foldObj: any) => {
    const [key, value] = Object.entries(foldObj)[0]; // e.g., ["Fold1", { accTrain: 20, ... }]
    return {
      fold: key,
      ...value,
    };
  }) || [];

  console.log(foldList)
  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">Hard Dimension</h1>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap -mx-2 mb-6">
          <StatCard
            title="Average Completeness"
            value={data.completeness[0]?.dataset?.toFixed(2)}
            percentage={12.5}
            icon={BarChart2}
          />
          <StatCard
            title="Average Consistency"
            value={data.consistency[0]?.dataset?.toFixed(2)}
            percentage={7.8}
            icon={PieChart}
          />
          <StatCard
            title="Average Timeliness"
            value={data.timeliness[0]?.dataset?.toFixed(2)}
            percentage={-2.3}
            icon={LineChart}
          />
          <StatCard
            title="Overall Quality"
            value={data.harddimention?.average?.toFixed(2)}
            percentage={5.6}
            icon={TrendingUp}
          />
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3">
          <MetricCard title="Completeness" icon={BarChart2}>
            {renderList(data.completeness)}
          </MetricCard>
          <MetricCard title="Consistency" icon={PieChart}>
            {renderList(data.consistency)}
          </MetricCard>
          <MetricCard title="Timeliness" icon={LineChart}>
            {renderList(data.timeliness)}
          </MetricCard>
        </div>

        {/* Soft Dimensions */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <h1 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">Soft Dimension</h1>
        </div>

        <div className="flex flex-wrap -mx-3">
          

          <div className="w-full p-2 grid grid-cols-3 gap-2">
              <MetricCard title="Reliability" icon={BarChart2}>
                {renderList(data.reliability)}
              </MetricCard>
            <div className={`rounded-xl shadow-md ${getCardBg()} p-2  col-span-2`}>
              <AccuracyF1LineChart data={foldList} />
            </div>
          </div>

          <div className={`rounded-xl shadow-md ${getCardBg()} w-full  p-5 transition-all duration-200`}>
            <h2 className="text-xl font-semibold flex items-center">Relevance</h2>

            <h3 className="font-semibold mb-2">AUR-ROC Scores</h3>
                {aurRocValues.map((value, index) => (
                  <div key={index} className="text-sm">
                    Fold {index + 1}: {value}
                  </div>
                ))}
            <FeatureImportanceBarChart
              data={data.relevance.find((item: any) => item.featureImportance)?.featureImportance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
