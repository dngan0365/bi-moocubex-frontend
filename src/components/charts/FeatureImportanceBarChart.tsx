'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@/context/ThemeContext';

// Dữ liệu hardcoded
const featureImportanceData: Record<string, number> = {
  combined_emb_5: 0.050732,
  combined_emb_3: 0.047598,
  combined_emb_12: 0.047072,
  combined_emb_10: 0.046451,
  combined_emb_2: 0.043918,
  combined_emb_1: 0.043912,
  combined_emb_9: 0.043502,
  combined_emb_4: 0.042949,
  combined_emb_0: 0.041809,
  combined_emb_14: 0.041180,
  combined_emb_13: 0.041130,
  combined_emb_11: 0.040720,
  combined_emb_15: 0.040392,
  combined_emb_7: 0.040215,
  combined_emb_6: 0.039034,
  combined_emb_8: 0.038643,
  remaining_time: 0.034080,
  exercise_correct_sum_1: 0.028533,
  video: 0.022376,
  school: 0.021285,
  assignment: 0.018557,
  exercise_perc_real_score_mean_1: 0.017455,
  total_words_phase1: 0.014937,
  exercise_correct_mean_1: 0.014302,
  encoded_field_sum: 0.012273,
  exercise_count: 0.012248,
  user_month: 0.011520,
  duration_days: 0.011228,
  video_count: 0.008637,
  exercise_context_sum_1: 0.008435,
  total_neutral1: 0.007873,
  exercise_num_problem_sum_1: 0.007869,
  exercise_id_count_1: 0.007682,
  user_time_since_last_course: 0.007596,
  entropy_time_comment_phase1: 0.007107,
  chapter_count: 0.006599,
  exercise_diff_mean_1: 0.004675,
  total_positive1: 0.004600,
  user_past_course_count: 0.003850,
  exercise_attempts_sum_mean_1: 0.003827,
  exercise_hour_entropy_1: 0.003361,
  exercise_perc_real_completed_mean_1: 0.003143,
  num_prerequisites: 0.002967,
  exam: 0.001221,
  certificate: 0.001196,
  exercise_langugage_binary_mean_1: 0.000962,
  total_negative1: 0.000258,
  end_year: 0.000054,
  video_percentage_watch_time_1: 0.000015,
  video_time_between_views_std_1: 0.000010,
  video_watched_percentage_1: 0.000007,
  video_speed_avg_1: 0.000004,
  video_pause_count_1: 0.000002,

};

const FeatureImportanceBarChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sort và lọc top 20
  const sortedFeatures = Object.entries(featureImportanceData)
    .filter(([_, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    // .slice(0, 20);

  const labels = sortedFeatures.map(([key]) => key);
  const values = sortedFeatures.map(([_, val]) => val);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 800,
      toolbar: { show: false },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '80%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
        },
      },
      title: {
        text: 'Importance Score',
        style: {
          color: isDark ? '#F3F4F6' : '#374151',
        },
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#F3F4F6' : '#374151',
        },
      },
    },
    grid: {
      borderColor: isDark ? '#374151' : '#E5E7EB',
    },
    legend: {
      labels: {
        colors: isDark ? '#F3F4F6' : '#374151',
      },
    },
    colors: [isDark ? '#60A5FA' : '#3B82F6'],
  };

  const series = [
    {
      name: 'Importance',
      data: values,
    },
  ];

  return (
    <div className="p-4">
      <h2 className={`text-lg font-semibold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Feature Importances
      </h2>
      <Chart options={options} series={series} type="bar" height={600} />
    </div>
  );
};

export default FeatureImportanceBarChart;
