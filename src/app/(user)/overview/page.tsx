'use client';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUp, ArrowDown, Info, Sun, Moon } from 'lucide-react';
import StudentTrendLineChart from '@/components/charts/StudentTrendLineChart'
import UserEnrollBarChart from '@/components/charts/UserEnrollBarChart'
import StudentGroupPieChart from '@/components/charts/StudentGroupPieChart'

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

  const StatCard = ({
    title,
    value,
    percentage,
    isMobile = false,
  }: {
    title: string;
    value: string;
    percentage: number;
    isMobile?: boolean;
  }) => (
    <div className={`${isMobile ? 'w-full' : 'w-full md:w-1/2 lg:w-1/4'} p-2`}>
      <div className={`  rounded-lg shadow p-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-700'}`}>
        <div className="text-sm">{title}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold dark:text-white">{value}</div>
          <div className={`flex items-center ${getStatusColor(percentage)}`}>
            {percentage > 0 ? <ArrowUp size={16} /> : percentage < 0 ? <ArrowDown size={16} /> : null}
            <span className="ml-1">{percentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Stats */}
        <div className="mb-6">
          <div className="flex flex-wrap -mx-2">
            <StatCard title="Học Viên" value="7,265" percentage={11.01} />
            <StatCard title="Các Khóa Học Đang Hoạt Động" value="3,671" percentage={-0.03} />
            <StatCard title="Các Khóa Học Đã Kết Thúc" value="1,566" percentage={15.03} />
            <StatCard title="Học Viên Đang Online" value="2,318" percentage={6.08} />
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className={`lg:col-span-2  rounded-lg shadow p-4 transition-colors duration-200  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold ">Xu hướng học viên</h3>
            </div>
            <div className="h-64 w-full">
              <StudentTrendLineChart/>
            </div>
          </div>

          {/* Leaderboard */}
          <div className={`rounded-lg shadow p-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <h3 className="text-lg font-semibold  mb-4">Bảng xếp hạng</h3>
            <div className="space-y-4">
              <div className="flex items-center text-sm border-b  pb-2">
                <div className="w-8">#</div>
                <div className="flex-1">Họ và Tên</div>
                <div className="w-33">Mức độ hoàn thành</div>
                <div className="w-20 text-right">Số khóa học</div>
              </div>
              {top5Student.map((student, index) => (
                <div key={student.id} className="flex items-center gap-4 py-2">
                  <div className="w-8 font-medium">{index + 1}</div>
                  <div className="flex-1">{student.id}</div>
                  <div className="w-33">
                  <div className="flex items-center gap-2">
                    {/* Progress Bar */}
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${Math.min(student.progress, 100)}%` }}
                      ></div>
                    </div>

                    {/* Percentage Text */}
                    <span className="text-xs text-gray-600 dark:text-gray-300 w-6 text-right">
                      {student.progress}%
                    </span>
                  </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 py-1 px-2 rounded-full text-xs">
                      {student.numCourse}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Enrollments & Learning Outcomes */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6`}>
          <div className={`rounded-lg shadow p-4 transition-colors duration-200  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <h3 className="text-lg font-semibold  mb-4">Số lượng đăng ký khóa học</h3>
              <UserEnrollBarChart/>
          </div>

          <div className={`rounded-lg shadow p-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-cyan-50 text-gray-800'}`}>
            <h3 className="text-lg font-semibold  mb-4">Phân phối kết quả học tậpstu - 2025</h3>
              <StudentGroupPieChart/>
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
