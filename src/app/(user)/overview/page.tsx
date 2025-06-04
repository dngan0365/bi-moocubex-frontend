'use client';
import { useTheme } from '@/context/ThemeContext';
import { ArrowUp, ArrowDown, Info, Sun, Moon } from 'lucide-react';
import StudentTrendLineChart from '@/components/charts/StudentTrendLineChart'
import UserEnrollBarChart from '@/components/charts/UserEnrollBarChart'
import StudentGroupPieChart from '@/components/charts/StudentGroupPieChart'
import { useEffect, useState } from 'react';

type Course = {
  course_id: string;
  name: string;
  user_count: string; 
};

export default function Dashboard() {
  const { theme } = useTheme(); 

  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourse, setLoadingCourse] = useState(true);

  const [stats, setStats] = useState<null | {
    total_users: string;
    total_courses: string;
    courses_since_july_2020: string;
    users_in_2020: string;
  }>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/top-courses");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/summary-stats');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStats(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

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
            {stats ? (
              <>
                <StatCard title="Học viên" value={parseInt(stats.total_users).toLocaleString()} percentage={11.01} />
                <StatCard title="Các khóa Học Đang Hoạt Động" value={parseInt(stats.courses_since_july_2020).toLocaleString()} percentage={-0.03} />
                <StatCard title="Tổng số khóa học" value={parseInt(stats.total_courses).toLocaleString()} percentage={15.03} />
                <StatCard title="Học viên năm 2020" value={parseInt(stats.users_in_2020).toLocaleString()} percentage={6.08} />
              </>
            ) : (
              <div className="w-full text-center py-8">Đang tải dữ liệu...</div>
            )}
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
                <div className="flex-1">Mã khóa học</div>
                <div className="w-28">Tên khóa học</div>
                <div className="w-22 text-right">Lượt đăng kí</div>
              </div>
              {courses.map((course, index) => (
                <div key={course.course_id} className="flex items-center gap-4 py-2">
                  <div className="w-8 font-normal">{index + 1}</div>
                  <div className="flex-1 text-sm truncate">{course.course_id}</div>
                  <div className="w-28">
                    <span className=" font-sm truncate block whitespace-nowrap overflow-hidden">{course.name}</span>
                  </div>
                  <div className="w-22 text-right">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 py-1 px-2 rounded-full text-xs">
                      {course.user_count}
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
            <h3 className="text-lg font-semibold  mb-4">Phân phối kết quả học tập - trước 7/2025</h3>
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
            Phần lớn học viên đăng kí vào năm 2020 <br />
            Nhóm học sinh nhóm thuộc loại E là cao nhất, tiếp theo là nhóm D, C, B và A. <br />
          </p>
        </div>

      </main>
    </div>
  );
}
