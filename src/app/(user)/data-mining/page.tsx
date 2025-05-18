'use client';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUp, ArrowDown, Info, Sun, Moon } from 'lucide-react';
import FeatureHeatMap from '@/components/charts/FeatureHeatMap'
import VideoScatterChart from '@/components/charts/VideoScatterChart'
import ExerciseScatterChart from '@/components/charts/ExerciseScatterChart'

export default function Dashboard() {
  const { theme } = useTheme(); 

  const top5Student = [
    { id: "U_001", progress: 80, numCourse: 300 },
    { id: "U_002", progress: 60, numCourse: 280 },
    { id: "U_003", progress: 70, numCourse: 250 },
    { id: "U_004", progress: 50, numCourse: 200 },
    { id: "U_005", progress: 40, numCourse: 150 },
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage > 10) return 'text-green-500';
    if (percentage < 0) return 'text-red-500';
    return 'text-yellow-500';
  };


  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
          <div className={`lg:col-span-2  rounded-lg shadow p-4 transition-colors duration-200  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <div className="w-full">
              <FeatureHeatMap/>
            </div>
          </div>
        </div>


        {/* Course Enrollments & Learning Outcomes */}
        <div className={`grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6`}>
          <div className={`rounded-lg shadow p-4 transition-colors duration-200  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <h3 className="text-lg font-semibold  mb-4">Number of Course Enrollments</h3>
              <VideoScatterChart/>
          </div>

          <div className={`rounded-lg shadow p-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <h3 className="text-lg font-semibold  mb-4">Distribution of Learning Outcomes - 2025</h3>
              <ExerciseScatterChart/>
          </div>
        </div>

        {/* Summary Section */}
        <div className={`rounded-lg shadow p-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Info size={20} className=" mr-2" />
              <h3 className="text-lg font-semibold ">Nhận xét chung:</h3>
            </div>
          </div>
          <p className="mt-2 ">
            Chỉ số ổn định, nhưng cũng có một vài điểm bất thường, nhấn để xem chi tiết
          </p>
        </div>

      </main>
    </div>
  );
}
