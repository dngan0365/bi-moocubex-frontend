'use client';

import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, LineChart, Users, AlertTriangle, Info, Clipboard, Zap, FileText, BookCheck } from 'lucide-react';
import { FaVideo, FaTasks, FaList, FaComments  } from 'react-icons/fa';
import StudentVideoLineChart from '@/components/charts/StudentVideoLineChart';
import StudentExerciseLineChart from '@/components/charts/StudentExerciseLineChart';
import StudentExerciseScoreBarChart from '@/components/charts/StudentExerciseScoreBarchart';
import StudentScoreBarChart from '@/components/charts/StudentScoreBarChart';
import CourseNav from '@/components/coursenav/CourseNav';
const featuresPhase1 = {
  course_id: "C_1123979",
  user_id: "U_30144337",
  school: "河北地质大学",
  field_encoded_1: 22,
  field_encoded_2: 38,
  start_year: 2020.0,
  start_month: 5.0,
  end_year: 2020.0,
  end_month: 8.0,
  user_year: 2020.0,
  user_month: 6.0,
  video_count: 63,
  exercise_count: 8,
  chapter_count: 9,
  user_past_course_count: 2,
  user_time_since_last_course: 0.0,
  num_prerequisites: 0,
  certificate: 1.0,
  assignment: 50.0,
  video: 50.0,
  exam: 0.0,
  type: 1.0,
  duration_days: 89.0,
  remaining_time: 70,
  entropy_time_comment_phase1: 0.0,
  exercise_id_count_1: 1.0,
  exercise_correct_sum_1: 0.0,
  exercise_correct_mean_1: 1.0,
  exercise_num_problem_sum_1: 0.0,
  exercise_num_problem_mean_1: 0.0,
  exercise_attempts_sum_mean_1: 2.0,
  exercise_attempts_mean_mean_1: 2.0,
  exercise_date_from_enroll_min_1: 2.0,
  exercise_date_from_enroll_mean_1: 1.0,
  exercise_date_from_enroll_max_1: 0.0,
  exercise_context_sum_1: 0.0,
  exercise_context_mean_1: 0.0,
  exercise_langugage_binary_mean_1: 0.0,
  exercise_diff_sum_1: 3.5,
  exercise_diff_mean_1: 3.5,
  exercise_diff_min_1: 0.0,
  exercise_diff_max_1: 0.0258333333333333,
  exercise_perc_goal_score_mean_1: 0.0258333333333333,
  exercise_perc_real_completed_mean_1: 0.0258333333333333,
  exercise_perc_real_completed_std_1: 0.0258333333333333,
  exercise_perc_real_correct_mean_1: 0.0,
  exercise_perc_real_correct_std_1: 0.2,
  exercise_perc_real_score_sum_1: 0.0,
  exercise_perc_real_score_mean_1: 0.0,
  exercise_perc_real_score_std_1: 0.0,
  exercise_hour_entropy_1: 0.0,
  video_watch_count_1: 0.0,
  video_watched_percentage_1: -0.0,
  video_percentage_watch_time_1: 0.0,
  video_pause_count_1: 0.0,
  video_pause_avg_1: 0.0,
  video_pause_std_1: 0.0,
  video_rewatch_avg_1: 0.0,
  video_rewatch_std_1: 0.0,
  video_time_between_views_avg_1: 0.0,
  video_time_between_views_std_1: 0.0,
  video_speed_avg_1: 0.0,
  entropy_time_1: 0.0,
  total_words_phase1: 0.0,
  total_positive1: 0.0,
  total_negative1: 0.0,
  total_neutral1: 0.0,
  label: "E",
};

const featuresPhase2 = {
  course_id: "C_1123979",
  user_id: "U_30144337",
  school: "河北地质大学",
  field_encoded_1: 22,
  field_encoded_2: 38,
  start_year: 2020.0,
  start_month: 5.0,
  end_year: 2020.0,
  end_month: 8.0,
  user_year: 2020.0,
  user_month: 6.0,
  video_count: 63,
  exercise_count: 8,
  chapter_count: 9,
  user_past_course_count: 2,
  user_time_since_last_course: 0.0,
  num_prerequisites: 0,
  certificate: 1.0,
  assignment: 50.0,
  video: 50.0,
  exam: 0.0,
  type: 1.0,
  duration_days: 89.0,
  remaining_time: 70,
  entropy_time_comment_phase1: 0.0,
  exercise_id_count_1: 1.0,
  exercise_correct_sum_1: 0.0,
  exercise_correct_mean_1: 1.0,
  exercise_num_problem_sum_1: 0.0,
  exercise_num_problem_mean_1: 0.0,
  exercise_attempts_sum_mean_1: 2.0,
  exercise_attempts_mean_mean_1: 2.0,
  exercise_date_from_enroll_min_1: 2.0,
  exercise_date_from_enroll_mean_1: 1.0,
  exercise_date_from_enroll_max_1: 0.0,
  exercise_context_sum_1: 0.0,
  exercise_context_mean_1: 0.0,
  exercise_langugage_binary_mean_1: 0.0,
  exercise_diff_sum_1: 3.5,
  exercise_diff_mean_1: 3.5,
  exercise_diff_min_1: 0.0,
  exercise_diff_max_1: 0.0258333333333333,
  exercise_perc_goal_score_mean_1: 0.0258333333333333,
  exercise_perc_real_completed_mean_1: 0.0258333333333333,
  exercise_perc_real_completed_std_1: 0.0258333333333333,
  exercise_perc_real_correct_mean_1: 0.0,
  exercise_perc_real_correct_std_1: 0.2,
  exercise_perc_real_score_sum_1: 0.0,
  exercise_perc_real_score_mean_1: 0.0,
  exercise_perc_real_score_std_1: 0.0,
  exercise_hour_entropy_1: 0.0,
  video_watch_count_1: 0.0,
  video_watched_percentage_1: -0.0,
  video_percentage_watch_time_1: 0.0,
  video_pause_count_1: 0.0,
  video_pause_avg_1: 0.0,
  video_pause_std_1: 0.0,
  video_rewatch_avg_1: 0.0,
  video_rewatch_std_1: 0.0,
  video_time_between_views_avg_1: 0.0,
  video_time_between_views_std_1: 0.0,
  video_speed_avg_1: 0.0,
  entropy_time_1: 0.0,
  total_words_phase1: 0.0,
  total_positive1: 0.0,
  total_negative1: 0.0,
  total_neutral1: 0.0,
  entropy_time_comment_phase2: 0.0,
  exercise_id_count_2: 1.0,
  exercise_correct_sum_2: 0.0,
  exercise_correct_mean_2: 1.0,
  exercise_num_problem_sum_2: 0.0,
  exercise_num_problem_mean_2: 0.0,
  exercise_attempts_sum_mean_2: 2.0,
  exercise_attempts_mean_mean_2: 2.0,
  exercise_date_from_enroll_min_2: 2.0,
  exercise_date_from_enroll_mean_2: 1.0,
  exercise_date_from_enroll_max_2: 0.0,
  exercise_context_sum_2: 0.0,
  exercise_context_mean_2: 0.0,
  exercise_langugage_binary_mean_2: 0.0,
  exercise_diff_sum_2: 3.5,
  exercise_diff_mean_2: 3.5,
  exercise_diff_min_2: 0.0,
  exercise_diff_max_2: 0.0258333333333333,
  exercise_perc_goal_score_mean_2: 0.0258333333333333,
  exercise_perc_real_completed_mean_2: 0.0258333333333333,
  exercise_perc_real_completed_std_2: 0.0258333333333333,
  exercise_perc_real_correct_mean_2: 0.0,
  exercise_perc_real_correct_std_2: 0.2,
  exercise_perc_real_score_sum_2: 0.0,
  exercise_perc_real_score_mean_2: 0.0,
  exercise_perc_real_score_std_2: 0.0,
  exercise_hour_entropy_2: 0.0,
  video_watch_count_2: 0.0,
  video_watched_percentage_2: -0.0,
  video_percentage_watch_time_2: 0.0,
  video_pause_count_2: 0.0,
  video_pause_avg_2: 0.0,
  video_pause_std_2: 0.0,
  video_rewatch_avg_2: 0.0,
  video_rewatch_std_2: 0.0,
  video_time_between_views_avg_2: 0.0,
  video_time_between_views_std_2: 0.0,
  video_speed_avg_2: 0.0,
  entropy_time_2: 0.0,
  total_words_phase2: 0.0,
  total_positive2: 0.0,
  total_negative2: 0.0,
  total_neutral2: 0.0,
  label: "E",
};
const featuresPhase3 = {};
const featuresPhase4 = {};

const stats = [
  { title: 'Videos', value: '20', icon: <FaVideo /> },
  { title: 'Exercises', value: '30', icon: <FaTasks /> },
  { title: 'Exams', value: '1', icon: <BookCheck /> },
  { title: 'Comment/Reply', value: '5', icon: <FaComments />},
];

const user_info = {
  ID: 'DM101',
  school: 'UIT',
  dateEnroll: '01/02/2025',
  courses: '5'
};

const userDetails = [
  { label: 'User Id:', value: user_info.ID },
  { label: 'School:', value: user_info.school },
  { label: 'Date Enroll:', value: user_info.dateEnroll },
  { label: 'Number Course:', value: user_info.courses },

];

export default function UserInfo() {
  const { theme } = useTheme()
  
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
            <StudentScoreBarChart/>
          </div>
        {/* Video Behavior Chart */}
          <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
            <StudentVideoLineChart/>
          </div>
          
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
              <StudentExerciseLineChart/>
            </div>
            <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
              <StudentExerciseScoreBarChart/>
            </div>
      </div>


      {/* Placeholder for Future Phases */}
                
      {/* Tabs */}
      <div className={`${cardClass} p-4 rounded-xl shadow col-span-1`}>
        <div className="border-b border-gray-200 px-6">
          <nav className="-mb-px flex space-x-8">
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
            {activeTab === 'phase1' && 
                <div>
                      <h2 className="text-lg font-semibold mb-2">Phase 1 Features</h2>

                      {featuresPhase1 && typeof featuresPhase1 === 'object' && Object.keys(featuresPhase1).length > 0 ? (
                        <>
                          <div className="grid grid-cols-8 sm:grid-cols-6 gap-2 text-sm">
                            {Object.entries(featuresPhase1).map(([key, value]) => (
                              <div
                                key={key}
                                className="border rounded-md bg-gray-50/10 p-2 flex flex-col"
                              >
                                <span className="text-gray-500 font-medium truncate">{key}</span>
                                <span className="text-gray-500 break-words">{String(value)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Highlight label separately */}
                          <div className="mt-4 px-3 py-2 bg-cyan-400/10 border-l-4 border-cyan-400 rounded text-sm">
                            <span className="text-cyan-500 font-semibold">Label: </span>
                            <span className="text-cyan-500 font-bold text-base">{featuresPhase1.label}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">There are no features to display.</p>
                      )}

                </div>}
            {activeTab === 'phase2' && 
                <div>
                    <h2 className="text-lg font-semibold mb-2">Phase 2 Features</h2>
                      {featuresPhase2 && typeof featuresPhase2 === 'object' && Object.keys(featuresPhase2).length > 0 ? (
                        <>
                          <div className="grid grid-cols-8 sm:grid-cols-6 gap-2 text-sm">
                            {Object.entries(featuresPhase2).map(([key, value]) => (
                              <div
                                key={key}
                                className="border rounded-md bg-gray-50/10 p-2 flex flex-col"
                              >
                                <span className="text-gray-500 font-medium truncate">{key}</span>
                                <span className="text-gray-500 break-words">{String(value)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Highlight label separately */}
                          <div className="mt-4 px-3 py-2 bg-cyan-400/10 border-l-4 border-cyan-400 rounded text-sm">
                            <span className="text-cyan-500 font-semibold">Label: </span>
                            <span className="text-cyan-500 font-bold text-base">{featuresPhase2?.label}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">There are no features to display.</p>
                      )}
                </div>}
            {activeTab === 'phase3' && 
                <div>
                      <h2 className="text-lg font-semibold mb-2">Phase 1 Features</h2>

                      {featuresPhase3 && typeof featuresPhase3 === 'object' && Object.keys(featuresPhase3).length > 0 ? (
                        <>
                          <div className="grid grid-cols-8 sm:grid-cols-6 gap-2 text-sm">
                            {Object.entries(featuresPhase3).map(([key, value]) => (
                              <div
                                key={key}
                                className="border rounded-md bg-gray-50/10 p-2 flex flex-col"
                              >
                                <span className="text-gray-500 font-medium truncate">{key}</span>
                                <span className="text-gray-500 break-words">{String(value)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Highlight label separately */}
                          <div className="mt-4 px-3 py-2 bg-cyan-400/10 border-l-4 border-cyan-400 rounded text-sm">
                            <span className="text-cyan-500 font-semibold">Label: </span>
                            <span className="text-cyan-500 font-bold text-base">{featuresPhase3?.label}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">There are no features to display.</p>
                      )}
                </div>}
            {activeTab === 'phase4' && 
                <div>
                      <h2 className="text-lg font-semibold mb-2">Phase 4 Features</h2>
                      {featuresPhase4 && typeof featuresPhase4 === 'object' && Object.keys(featuresPhase4).length > 0 ? (
                        <>
                          <div className="grid grid-cols-8 sm:grid-cols-6 gap-2 text-sm">
                            {Object.entries(featuresPhase4).map(([key, value]) => (
                              <div
                                key={key}
                                className="border rounded-md bg-gray-50/10 p-2 flex flex-col"
                              >
                                <span className="text-gray-500 font-medium truncate">{key}</span>
                                <span className="text-gray-500 break-words">{String(value)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Highlight label separately */}
                          <div className="mt-4 px-3 py-2 bg-cyan-400/10 border-l-4 border-cyan-400 rounded text-sm">
                            <span className="text-cyan-500 font-semibold">Label: </span>
                            <span className="text-cyan-500 font-bold text-base">{featuresPhase4?.label}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">There are no features to display.</p>
                      )}
                </div>}
        </div>

      </div>

      {/* Footer Note */}
      <div  className={`${cardClass} p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className="text-sm">
          <strong>Nhận xét chung:</strong> Chỉ số ổn định, nhưng cũng có một vài
          điểm bất thường, nhấn để xem chi tiết
        </p>
      </div>
    </div>
  );
}
