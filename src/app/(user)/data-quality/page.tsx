'use client';

import { useTheme } from '@/context/ThemeContext';
import {
  ArrowUp,
  ArrowDown,
  Info,
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
} from 'lucide-react';

import phase1Data from './phase1.json';
import FeatureImportanceBarChart from '@/components/charts/FeatureImportanceBarChart';
import AccuracyF1LineChart from '@/components/charts/AccuracyF1LineChart';

type ReliabilityItem = Record<string, any>;

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const data = phase1Data;

  // Extract variance object from reliability data
  const variance = data.reliability.find((item: ReliabilityItem) => 'varianceFold' in item);
  // Extract AUR-ROC data for relevance
  const aurRocObj = data.relevance.find((item: any) => 'AUR-ROC' in item);
  const aurRocValues: number[] = aurRocObj?.['AUR-ROC'] ?? [];
  const classLabels = ['lớp A', 'lớp B', 'lớp C', 'lớp D', 'lớp E', 'trung bình các lớp'];

  // Filter reliability data to exclude certain keys
  const filteredReliability = data.reliability.filter((item: any) => {
    const key = Object.keys(item)[0];
    return !['Fold', 'varianceFold', 'nhanxet1'].includes(key);
  });

  // Allowed keys for display in lists
  const allowedKeys = [
    'dataset',
    'object50',
    'object75',
    'object80',
    'object90',
    'accuracy',
    'f1',
  ];

  // Helper to determine status color based on percentage and theme
  const getStatusColor = (percentage: number) => {
    if (percentage > 10) return isDark ? 'text-green-400' : 'text-green-500';
    if (percentage < 0) return isDark ? 'text-red-400' : 'text-red-500';
    return isDark ? 'text-yellow-300' : 'text-yellow-500';
  };

  const getCardBg = () => (isDark ? 'bg-gray-900' : 'bg-cyan-400/10');
  const getSectionBg = () => (isDark ? 'bg-gray-900' : 'bg-cyan-50');

  type StatCardProps = {
    title: string;
    value: number | string | undefined;
    percentage: number;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  };

  const StatCard = ({ title, value, percentage, icon: Icon }: StatCardProps) => (
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
          <div className="text-2xl font-bold">{value ?? '-'}</div>
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

  type MetricCardProps = {
    title: string;
    children: React.ReactNode;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  };

  const MetricCard = ({ title, children, icon: Icon }: MetricCardProps) => (
    <div className="w-full p-2">
      <div className={`rounded-xl shadow-md ${getCardBg()} p-5 transition-all duration-200 h-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            {Icon && <Icon size={20} className="mr-2 text-cyan-500" />}
            {title}
          </h2>
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Info">
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
        <div
          key={idx}
          className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-cyan-50/50'}`}
        >
          {Object.entries(item)
            .filter(([k]) => allowedKeys.includes(k))
            .map(([k, v]) => (
              <div key={k} className="flex flex-col mb-1">
                <div className="flex justify-between">
                  <span className="font-medium text-sm text-gray-500 dark:text-gray-400">
                    {{
                      dataset: 'Chỉ số cho toàn bộ dataset',
                      object50: 'Phần trăm object > 50% đáp ứng',
                      object75: 'Phần trăm object > 75% đáp ứng',
                      object80: 'Phần trăm object > 80% đáp ứng',
                      object90: 'Phần trăm object > 90% đáp ứng',
                      accuracy: 'Chỉ số Accuracy',
                      f1: 'Chỉ số F1',
                    }[k] ?? k}
                  </span>
                  <span
                    className={`font-medium ${
                      typeof v === 'number' && v > 0.7
                        ? 'text-green-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {typeof v === 'number'
                      ? v.toFixed(2)
                      : Array.isArray(v)
                      ? v.join(', ')
                      : typeof v === 'object'
                      ? JSON.stringify(v)
                      : v?.toString()}
                  </span>
                </div>
                {typeof v === 'number' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-cyan-500 h-1.5 rounded-full"
                      style={{ width: `${Math.min(v * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );

  // Process Fold data for chart
  const foldEntry = data?.reliability?.find((item: any) => 'Fold' in item);
  let foldList: { fold: string; value: any }[] = [];

  if (foldEntry?.Fold && Array.isArray(foldEntry.Fold)) {
    foldList = foldEntry.Fold.map((foldObj: any) => {
      const [key, value] = Object.entries(foldObj)[0];
      return { fold: key, value };
    });
  }

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            <div className={`rounded-xl shadow-md ${getCardBg()} p-5 transition-all duration-200 h-full`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <BarChart2 size={20} className="mr-2 text-cyan-500" />
                  Reliability
                </h2>
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Info">
                  <Info size={18} className="text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">{renderList(filteredReliability)}</div>
              {variance?.varianceFold && (
                <div className="text-md font-semibold p-5">
                  Độ lệch phương sai Accuracy: {variance.varianceFold.accuracy}
                  <br />
                  Độ lệch phương sai F1: {variance.varianceFold.f1}
                  <br />
                  Nhận xét: Chỉ số F1 và Accuracy cao. Hai chỉ số này tương đối bằng nhau
                </div>
              )}
            </div>

            <div className={`rounded-xl shadow-md ${getCardBg()} p-2 col-span-2`}>
              <AccuracyF1LineChart data={foldList} />
            </div>
          </div>

          <div className={`rounded-xl shadow-md ${getCardBg()} w-full p-5 transition-all duration-200 mt-6`}>
            <h2 className="text-xl font-semibold flex items-center mb-4">Relevance</h2>
            <h3 className="font-semibold mb-2">AUR-ROC Scores</h3>
            {aurRocValues.map((value, index) => (
              <div key={index} className="text-md">
                AUR-ROC cho {classLabels[index]}: {value.toFixed(4)}
              </div>
            ))}
            <FeatureImportanceBarChart
              data={data.relevance.find((item: any) => 'featureImportance' in item)?.featureImportance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
