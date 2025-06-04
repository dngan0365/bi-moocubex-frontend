'use client';

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@/context/ThemeContext';
import { useParams } from 'next/navigation';
import { BarChart, LineChart, Users, AlertTriangle, Info, Clipboard, Zap, FileText, BookCheck } from 'lucide-react';
import { FaVideo, FaTasks, FaList, FaComments  } from 'react-icons/fa';
import StudentScoreBarChart from '@/components/charts/StudentScoreBarChart';
import CourseNav from '@/components/coursenav/CourseNav';
import StudentBehaviourLineChart from '@/components/charts/StudentBehaviourLineChart';


type StatItem = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

type ApiResponse = {
  user_info: any[];
  user_exercises: any[];
  user_video: any[];
  user_comments: any[];
};

export default function UserInfo() {
  const { theme } = useTheme()
  const params = useParams();
  const courseId = Array.isArray(params.courseid) ? params.courseid[0] : params.courseid;
  const userId = Array.isArray(params.userid) ? params.userid[0] : params.userid;
  
  const [stats, setStats] = useState<StatItem[]>([]);
  const [userDetails, setUserDetails] = useState<{ label: string; value: string }[]>([]);
  const [featuresPhase1, setFeaturesPhase1] = useState<Record<string, any>>({});
  const [featuresPhase2, setFeaturesPhase2] = useState<Record<string, any>>({});
  const [featuresPhase3, setFeaturesPhase3] = useState<Record<string, any>>({});
  const [featuresPhase4, setFeaturesPhase4] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const cardClass = isDark
    ? 'bg-gray-900 text-white'
    : 'bg-cyan-400/10 text-gray-900';

  const [activeTab, setActiveTab] = useState('phase1');

  const tabs = [
    { id: 'phase1', name: 'Phase 1', icon: <Info className="w-4 h-4" /> },
    { id: 'phase2', name: 'Phase 2', icon: <Clipboard className="w-4 h-4" /> },
    { id: 'phase3', name: 'Phase 3', icon: <Zap className="w-4 h-4" /> },
    { id: 'phase4', name: 'Phase 4', icon: <FileText className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (!courseId || !userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user info
        const res = await fetch(
          `https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/user-course-info?course_id=${courseId}&user_id=${userId}`
        );
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data: ApiResponse = await res.json();
        console.log('User info data:', data); // Debug log

        const info = data.user_info?.[0] || {};
        const exercises = data.user_exercises?.[0]?.exercise_count || '0';
        const videos = data.user_video?.[0]?.video_count || '0';
        const comments = data.user_comments?.[0] || {};

        const enrollmentDate = `${info.user_month?.split('.')[0] || '01'}/${info.user_year?.split('.')[0] || '2025'}`;

        setUserDetails([
          { label: 'User Id:', value: info.user_id || userId },
          { label: 'Trường học:', value: info.school || 'N/A' },
          { label: 'Ngày đăng kí:', value: enrollmentDate },
          { label: 'Số khóa học:', value: '1' }
        ]);

        setStats([
          { title: 'Videos', value: videos, icon: <FaVideo /> },
          { title: 'Exercises', value: exercises, icon: <FaTasks /> },
          { title: 'Exams', value: comments.final_exam_score || '0', icon: <BookCheck /> },
          { title: 'Comment/Reply', value: '0', icon: <FaComments /> }
        ]);

        // Fetch features data
        const resFeatures = await fetch(
          `https://uz71shye78.execute-api.us-east-1.amazonaws.com/dev/api/user-course-predict?course_id=${courseId}&user_id=${userId}`
        );
        
        if (!resFeatures.ok) {
          throw new Error(`Features API error! status: ${resFeatures.status}`);
        }
        
        const featuresData = await resFeatures.json();
        console.log('Features data received:', featuresData); // Debug log

        // Process the array format - find each phase by phase number
        const phase1Data = featuresData.find((item: any) => item.phase === 1)?.data || {};
        const phase2Data = featuresData.find((item: any) => item.phase === 2)?.data || {};
        const phase3Data = featuresData.find((item: any) => item.phase === 3)?.data || {};
        const phase4Data = featuresData.find((item: any) => item.phase === 4)?.data || {};

        // Set features data
        setFeaturesPhase1(phase1Data);
        setFeaturesPhase2(phase2Data);
        setFeaturesPhase3(phase3Data);
        setFeaturesPhase4(phase4Data);

        console.log('Phase 1 features set:', phase1Data); // Debug log
        console.log('Phase 2 features set:', phase2Data); // Debug log
        console.log('Phase 3 features set:', phase3Data); // Debug log
        console.log('Phase 4 features set:', phase4Data); // Debug log

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, userId]);

  // Helper function to render features
  const renderFeatures = (features: Record<string, any>, phaseName: string) => {
    console.log(`Rendering ${phaseName} features:`, features); // Debug log
    
    if (!features || Object.keys(features).length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500 italic">No features available for {phaseName}</p>
          <p className="text-xs text-gray-400 mt-2">API Response: {JSON.stringify(features)}</p>
        </div>
      );
    }

    const featureEntries = Object.entries(features).filter(([key]) => key !== 'predicted_label');
    const predictedLabel = features.predicted_label;

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
          {featureEntries.map(([key, value]) => (
            <div
              key={key}
              className="border rounded-lg bg-gray-50/10 p-3 flex flex-col min-h-[80px]"
            >
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} font-medium text-xs mb-1 line-clamp-2`}>
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold flex-1 flex items-center`}>
                {typeof value === 'number' ? value.toFixed(3) : String(value)}
              </span>
            </div>
          ))}
        </div>

        {predictedLabel && (
          <div className="mt-6 px-4 py-3 bg-cyan-400/20 border border-cyan-400 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-cyan-600 font-semibold">Predicted Label:</span>
              <span className="text-cyan-700 font-bold text-lg">{predictedLabel}</span>
            </div>
          </div>
        )}

        {/* Debug info */}
        <details className="mt-4">
          <summary className="text-xs text-gray-500 cursor-pointer">Debug Info</summary>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-auto">
            {JSON.stringify(features, null, 2)}
          </pre>
        </details>
      </>
    );
  };

  if (loading) {
    return (
      <div className={`mx-auto p-4 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p>Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`mx-auto p-4 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500">Error loading data: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto p-4 space-y-6 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <CourseNav/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* user Info */}
            <div className={`${cardClass} p-4 rounded-xl shadow`}>
              <div className="space-y-4">
                {userDetails.map((item, i) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Percentage Chart */}
          <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
            <StudentScoreBarChart courseId={courseId ?? ''} userId={userId ?? ''}/>
          </div>
        {/* Video Behavior Chart */}
          <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
            <StudentBehaviourLineChart courseId={courseId ?? ''} userId={userId ?? ''}/>
          </div>
      </div>

      {/* Features Tabs */}
      <div className={`${cardClass} rounded-xl shadow`}>
        <div className="border-b border-gray-200 dark:border-gray-600">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
            
        <div className="p-6">
          {activeTab === 'phase1' && (
            <>
              <h2 className="text-lg font-semibold mb-4">Phase 1 Features</h2>
              {renderFeatures(featuresPhase1, 'Phase 1')}
            </>
          )}
          {activeTab === 'phase2' && (
            <>
              <h2 className="text-lg font-semibold mb-4">Phase 2 Features</h2>
              {renderFeatures(featuresPhase2, 'Phase 2')}
            </>
          )}
          {activeTab === 'phase3' && (
            <>
              <h2 className="text-lg font-semibold mb-4">Phase 3 Features</h2>
              {renderFeatures(featuresPhase3, 'Phase 3')}
            </>
          )}
          {activeTab === 'phase4' && (
            <>
              <h2 className="text-lg font-semibold mb-4">Phase 4 Features</h2>
              {renderFeatures(featuresPhase4, 'Phase 4')}
            </>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className={`${cardClass} p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className="text-sm">
          <strong>Nhận xét chung:</strong><br/>
          {featuresPhase1.predicted_label === "E" && (
            <span className="text-red-500">Học viên có nguy cơ không hoàn thành khóa học.</span>
          )}
          {featuresPhase1.predicted_label === "D" && (
            <span className="text-orange-500">Học viên có nguy cơ hoàn thành khóa học với điểm số không cao.</span>
          )}
          {featuresPhase1.predicted_label && featuresPhase1.predicted_label !== "E" && featuresPhase1.predicted_label !== "D" && (
            <span className="text-green-500">Học viên có thể đậu khóa học.</span>
          )}
          {!featuresPhase1.predicted_label && (
            <span className="text-gray-500">Chưa có dự đoán cho học viên này.</span>
          )}
        </p>
      </div>
    </div>
  );
}