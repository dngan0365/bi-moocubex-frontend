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
  { title: 'Chapters', value: '5', icon:  <ViewListIcon/> },
];

const valueFormatter = (item: { value: number }) => `${item.value}%`;

const course_info = {
  name: 'Introduction to Data Mining',
  ID: 'DM101',
  start_date: '01/02/2025', 
  end_date: '31/08/2025'
}
const courseDetails = [
  { label: 'Course Name:', value: course_info.name },
  { label: 'Course ID:', value: course_info.ID },
  { label: 'Start Date:', value: course_info.start_date },
  { label: 'End Date:', value: course_info.end_date }
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


export default function CourseInfo(){
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
      {/* More detail of the course */}
      {/* Proportion and percentage */}
      <Grid container sx={{mt:4}} spacing={2} justifyContent="center">
          <Grid size={{ xs: 12, sm: 6, md:4 }} justifyContent="center">
            <Card sx={{height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom align="center">
                        Course Proportion
                    </Typography>
                    <PieChart
                       series={[
                        {
                          data: courseProportion,
                          highlightScope: { fade: 'global', highlight: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          valueFormatter,
                        },
                      ]}
                      height={200}
                      width={200}/>
                </CardContent>
              </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md:8 }} justifyContent="center">
            <Card sx={{height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom align="center">
                        Student Groups
                    </Typography>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={1}
                      sx={{ width: '100%' }}
                    >
                      <BarChart
                        {...barChartsProps}
                        highlightedItem={highlightedItem}
                        onHighlightChange={setHighLightedItem}
                      />
                      <PieChart
                        {...pieChartProps}
                        highlightedItem={highlightedItem}
                        onHighlightChange={setHighLightedItem}
                      />
                    </Stack>
                </CardContent>
              </Card>
          </Grid>
      </Grid>

            
      {/* Behaviour */}
        <Grid container sx={{ mt: 4 }} spacing={2} justifyContent="center">
          <Grid size={{ xs: 12, sm: 12, md:12 }}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  Student Behavior
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <LineChart
                    height={400}
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
              </CardContent>
            </Card>
          </Grid>
      </Grid>
      {/* Comment reply */}
      <Grid container sx={{ mt: 4 }} spacing={2} justifyContent="center">
        <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom align="center">
              Student Comment/Reply
            </Typography>
            <Box sx={{ width: '100%' }}>
              <LineChart
                height={400}
                series={[
                  { data: neutralData, label: 'Neutral', area: true, stack: 'total', showMark: false },
                  { data: positiveData, label: 'Positive', area: true, stack: 'total', showMark: false },
                  { data: negativeData, label: 'Negative', area: true, stack: 'total', showMark: false },
                ]}
                xAxis={[{ scaleType: 'point', data: xCommentLabels }]}
                yAxis={[{ width: 50 }]}
                sx={{
                  [`& .${lineElementClasses.root}`]: {
                    display: 'none',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>


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