'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaVideo, FaTasks, FaList } from 'react-icons/fa';
import { BookCheck, CircleEllipsis } from 'lucide-react';

import CourseProportionPieChart from '@/components/charts/CourseProportionPieChart';
import CourseStudentGroupBarChart from '@/components/charts/CourseStudentGroupBarChart';
import CourseStudentGroupPieChart from '@/components/charts/CourseStudentGroupPieChart';
import CourseCommentLineGraph from '@/components/charts/CourseCommentLineGraph';
import CourseBehaviourLineGraph from '@/components/charts/CourseBehaviourLineGraph';
import CourseStudentGroupCharts from '@/components/charts/CourseStudentGroupCharts';
import CourseNav from '@/components/coursenav/CourseNav';
import { useTheme } from '@/context/ThemeContext';

export default function CourseInfo() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cardClass = isDark ? 'bg-gray-900 text-white' : 'bg-cyan-400/10 text-gray-900';

  const params = useParams();
  const courseId = params?.courseid;

  const [detail, setDetail] = useState(false);
  const [courseInfo, setCourseInfo] = useState<any>(null);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      if (!courseId) return;
      try {
        const res = await fetch(`https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/course/${courseId}`);
        const data = await res.json();
        setCourseInfo(data[0]);
      } catch (error) {
        console.error('Failed to fetch course data:', error);
      }
    };
    fetchCourseInfo();
  }, [courseId]);

  if (!courseInfo) return <div className="p-4">Đang tải dữ liệu khóa học...</div>;

  const stats = [
    { title: 'Video', value: courseInfo.video_count, icon: <FaVideo /> },
    { title: 'Bài tập', value: courseInfo.exercise_count, icon: <FaTasks /> },
    { title: 'Bài kiểm tra', value: courseInfo.exam, icon: <BookCheck /> },
    { title: 'Chapter', value: courseInfo.chapter_count, icon: <FaList /> },
  ];

  const courseDetails = [
    { label: 'Tên khóa học:', value: courseInfo.name },
    { label: 'Course ID:', value: courseInfo.course_id },
    { label: 'Ngày bắt đầu:', value: courseInfo.start_date },
    { label: 'Ngày kết thúc:', value: courseInfo.end_date },
  ];

  const courseData = {
    assignment: courseInfo.assignment,
    video: courseInfo.video,
    exam: courseInfo.exam,
  };

  return (
    <div className={`mx-auto p-4 space-y-6 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <CourseNav />

      {/* Course Info + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course Details */}
        <div className={`${cardClass} p-4 rounded-xl shadow`}>
          <div className="space-y-4">
            {courseDetails.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className={`${cardClass} p-4 rounded-xl shadow flex items-center gap-4`}>
              <div className="bg-cyan-400/10 text-cyan-500 p-3 rounded-full text-xl">{stat.icon}</div>
              <div>
                <div className="text-sm text-gray-400">{stat.title}</div>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
          <h2 className="text-center text-lg font-semibold mb-4">Phân phối điểm trong khóa học</h2>
          <CourseProportionPieChart
              assignment={courseData.assignment}
              video={courseData.video}
              exam={courseData.exam}
            />
        </div>
        <div className={`${cardClass} p-4 rounded-xl shadow col-span-2`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Nhóm các học viên trong khóa học</h2>
            <button className="text-sm text-cyan-500 hover:text-cyan-400" onClick={() => setDetail(!detail)}>
              <CircleEllipsis />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CourseStudentGroupBarChart courseId = {courseId as string} />
            <CourseStudentGroupPieChart courseId={courseId as string} />
          </div>
        </div>
      </div>

      {/* Behavior */}
      <div className={`${cardClass} p-4 rounded-xl shadow`}>
        <h2 className="text-center text-lg font-semibold mb-4">Hành vi học viên</h2>
        <CourseBehaviourLineGraph  courseId={courseId as string}/>
      </div>

      {/* Comments */}
      <div className={`${cardClass} p-4 rounded-xl shadow`}>
        <h2 className="text-center text-lg font-semibold mb-4">Comment/Reply</h2>
        <CourseCommentLineGraph  courseId={courseId as string}/>
      </div>

      {/* Footer */}
      <div className={`${cardClass} p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className="text-sm">
          <strong>Nhận xét chung:</strong> <br/>
          Nhóm học viên thuộc nhóm E, D chiếm đa số <br/>
          Số lượng xem video ít hơn số lượng làm bài tập <br/>
          Reply comment chủ yếu là tích cực và trung tính
        </p>
      </div>

      {/* Modal for Details */}
      <CourseStudentGroupCharts isOpen={detail} onClose={() => setDetail(false)} />
    </div>
  );
}
