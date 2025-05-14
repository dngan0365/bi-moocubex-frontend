'use client'
import {  
  Box, 
  Typography,
  Card,
  CardContent,
  Avatar,
  Container,
  Button
} from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ViewListIcon from '@mui/icons-material/ViewList';
import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';
import { HighlightItemData } from '@mui/x-charts/context';
import Stack from '@mui/material/Stack';
import { BarChart, BarChartProps } from '@mui/x-charts/BarChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Daily Learning Activity Data
const dailyLearningData = [
  { week: '01', videoViews: 20, exercisesAttempted: 15 },
  { week: '02', videoViews: 25, exercisesAttempted: 18 },
  { week: '03', videoViews: 22, exercisesAttempted: 20 },
  { week: '04', videoViews: 30, exercisesAttempted: 25 },
  { week: '05', videoViews: 35, exercisesAttempted: 30 },
  { week: '06', videoViews: 40, exercisesAttempted: 35 }
];

const xBehaviourLabels = dailyLearningData.map(d => d.week);
const videoData = dailyLearningData.map(d => d.videoViews);
const exercisesData = dailyLearningData.map(d => d.exercisesAttempted);

// Comments & Replies Data
const commentsData = [
  { week: '01', negative: 10, neutral: 15, positive: 5 },
  { week: '02', negative: 12, neutral: 18, positive: 7 },
  { week: '03', negative: 15, neutral: 20, positive: 10 },
  { week: '04', negative: 18, neutral: 22, positive: 12 },
  { week: '05', negative: 20, neutral: 25, positive: 15 },
  { week: '06', negative: 22, neutral: 28, positive: 18 }
];
const xCommentLabels = commentsData.map(d => d.week);
const negativeData = commentsData.map(d => d.negative);
const neutralData = commentsData.map(d => d.neutral);
const positiveData = commentsData.map(d => d.positive);

const stats = [
  { title: 'Videos', value: '20', icon:  <VideoLibraryIcon/>},
  { title: 'Exercises', value: '30', icon: <HomeWorkIcon/> },
  { title: 'Exams', value: '1', icon: <HomeWorkIcon/> },
  { title: 'Comment/Reply', value: '5', icon:  <ModeCommentIcon/> },
];

const valueFormatter = (item: { value: number }) => `${item.value}%`;

const user_info = {
  ID: 'DM101',
  school: 'UIT',
  dateEnroll: '01/02/2025', 
}
const courseDetails = [
  { label: 'User Id:', value: user_info.ID },
  { label: 'School:', value: user_info.school },
  { label: 'Date Enroll:', value: user_info.dateEnroll },
];
const courseProportion = [
  { label: 'Video', value: 60 },
  { label: 'Exercises', value: 20 },
  { label: "Exam", value: 20},
]

const barChartsProps: BarChartProps = {
  series: [
    {
      data: [3, 4, 1, 6, 5],
      id: 'sync',
      highlightScope: { highlight: 'item', fade: 'global' },
    },
  ],
  xAxis: [{ data: ['A', 'B', 'C', 'D', 'E'] }],
  height: 200,
  hideLegend: true,
};

const pieChartProps: PieChartProps = {
  series: [
    {
      id: 'sync',
      data: [
        { value: 3, label: 'A', id: 'A' },
        { value: 4, label: 'B', id: 'B' },
        { value: 1, label: 'C', id: 'C' },
        { value: 6, label: 'D', id: 'D' },
        { value: 5, label: 'E', id: 'E' },
      ],
      highlightScope: { highlight: 'item', fade: 'global' },
    },
  ],
  height: 150,
  hideLegend: true,
};

  const barChartData = {
    labels: ['Video', 'Exercise', 'Exam', 'Total'],
    datasets: [
      {
        data: [80, 20, 100, 60],
        backgroundColor: ['#A78BFA', '#6EE7B7', '#93C5FD','#6EE7B7'],
        borderRadius: 10,
        barThickness: 30,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };



export default function UserInfo(){
  const [highlightedItem, setHighLightedItem] =
    React.useState<HighlightItemData | null>(null);

  return(
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Overview of the course */}
      <Grid container spacing={2} justifyContent="center">
                {/* Stats Cards */}
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md:2 }} justifyContent="center" alignItems="center" key={index}>
              <Card sx={{height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, md:4 }}>
              <Card sx={{height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box display="flex" flexDirection="column">
                    {courseDetails.map((detail, index) => (
                      <Box display="flex" justifyContent="space-between" key={index}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {detail.label}
                        </Typography>
                        <Typography variant="subtitle2">
                            {detail.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
      </Grid>
      {/* % score */}
        <Grid container sx={{ mt: 4 }} spacing={2} justifyContent="center">
          <Grid size={{ xs: 12, sm: 12, md:3 }}>
               <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom align="center">
                            Phần trăm các thành phần (%)
                        </Typography>
                        <Box height={200}>
                          <Bar data={barChartData} options={barChartOptions} />
                        </Box>
                    </CardContent>
                </Card>

          </Grid>
          <Grid size={{ xs: 12, sm: 12, md:9 }}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  Student Behavior
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <LineChart
                      height={200}
                      series={[
                        {
                          data: videoData,
                          label: 'Video Views',
                          shape: 'cross',
                          showMark: ({ index }) => index % 2 === 0,
                        },
                        {
                          data: exercisesData,
                          label: 'Exercise Attempts',
                          shape: 'diamond',
                          showMark: ({ index }) => index % 2 === 0,
                        },
                      ]}
                      xAxis={[{ scaleType: 'point', data: xBehaviourLabels }]}
                      yAxis={[{ width: 50 }]}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <LineChart
                      height={200}
                      series={[
                        {
                          data: videoData,
                          label: 'Video Views',
                          shape: 'cross',
                          showMark: ({ index }) => index % 2 === 0,
                        },
                        {
                          data: exercisesData,
                          label: 'Exercise Attempts',
                          shape: 'diamond',
                          showMark: ({ index }) => index % 2 === 0,
                        },
                      ]}
                      xAxis={[{ scaleType: 'point', data: xBehaviourLabels }]}
                      yAxis={[{ width: 50 }]}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
      </Grid>
      {/* Comment reply */}
      


      {/* Footer Note */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 1
        }}
      >
            <Typography variant="subtitle1">
                <strong>Nhận xét chung:</strong> Chỉ số ổn định, nhưng cũng có một vài điểm bất thường, nhấn để xem chi tiết
            </Typography>
            <Button
                variant="contained"
                sx={{
                  bgcolor: 'rgb(219, 242, 242)',
                  color: 'rgb(0, 51, 85)',
                  '&:hover': { bgcolor: 'rgb(199, 232, 232)' },
                  borderRadius: '8px',
                  textTransform: 'none',
                }}
              >
                Xem chi tiết báo cáo
            </Button>
      </Card>
    </Container>
  )
}