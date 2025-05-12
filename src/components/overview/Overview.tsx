'use client';
import React from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Button,
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardOverview() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'This year',
        data: [5000, 7000, 10000, 15000, 25000, 18000, 22000],
        borderColor: '#000',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Last year',
        data: [12000, 8000, 20000, 10000, 15000, 22000, 15000],
        borderColor: '#ccc',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true },
      },
    },
  };

  const barChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        data: [17000, 30000, 20000, 35000, 13000, 25000],
        backgroundColor: ['#A78BFA', '#6EE7B7', '#000000', '#93C5FD', '#93C5FD', '#6EE7B7'],
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

  const doughnutChartData = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [
      {
        data: [10.33, 22.8, 25.9, 19.2, 11.2],
        backgroundColor: ['#000000', '#93C5FD', '#CBD5E1', '#F59E0B', '#10B981'],
        borderWidth: 0,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { position: 'right' },
    },
  };

  const topStudents = [
    { id: 1, name: 'Nguyen Van A', progress: 75, courses: 45 },
    { id: 2, name: 'Nguyen Van B', progress: 85, courses: 29 },
    { id: 3, name: 'Le Van C', progress: 60, courses: 18 },
    { id: 4, name: 'Nguyen Thanh D', progress: 70, courses: 25 },
  ];

  const stats = [
    { title: 'Học viên', value: '7,265', change: '+11.01%', increase: true },
    { title: 'Khóa học đang mở', value: '3,671', change: '-0.03%', increase: false },
    { title: 'Khóa học đã kết thúc', value: '1,566', change: '+15.03%', increase: true },
    { title: 'Học viên đang online', value: '2,318', change: '+6.08%', increase: true },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={isLargeScreen ? 4 : 2} justifyContent="center">
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md:3 }} key={index}>
            <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    color={stat.increase ? 'success.main' : 'error.main'}
                    fontSize="0.875rem"
                  >
                    {stat.increase ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                    {stat.change}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={isLargeScreen ? 4 : 2} mt={2}>
        {/* Line Chart */}
        <Grid size={{ xs: 12, sm: 8 }}>
          <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid #E5E7EB', boxShadow: 1 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box>
                  <Typography variant="h6">Tổng số học viên</Typography>
                  <Typography variant="body2" color="text.secondary">Total Projects & Operating Status</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'black' }} />
                    <Typography variant="caption">This year</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ccc' }} />
                    <Typography variant="caption">Last year</Typography>
                  </Box>
                </Box>
              </Box>
              <Box height={isLargeScreen ? 350 : 250}>
                <Line data={lineChartData} options={lineChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Students */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Bảng xếp hạng</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Họ và Tên</TableCell>
                      <TableCell>Mức độ hoàn thành</TableCell>
                      <TableCell align="right">Số khóa học</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell width="30%">
                          <LinearProgress
                            variant="determinate"
                            value={student.progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'rgba(209, 213, 219, 0.5)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor:
                                  student.id === 1 ? '#3B82F6' :
                                  student.id === 2 ? '#10B981' :
                                  student.id === 3 ? '#A78BFA' : '#F59E0B',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 2,
                              py: 0.5,
                              borderRadius: '16px',
                              bgcolor:
                                student.id === 1 ? 'rgba(59,130,246,0.1)' :
                                student.id === 2 ? 'rgba(16,185,129,0.1)' :
                                student.id === 3 ? 'rgba(167,139,250,0.1)' : 'rgba(245,158,11,0.1)',
                              color:
                                student.id === 1 ? '#3B82F6' :
                                student.id === 2 ? '#10B981' :
                                student.id === 3 ? '#A78BFA' : '#F59E0B',
                            }}
                          >
                            {student.courses}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Số lượng đăng kí khóa học</Typography>
              <Box height={isLargeScreen ? 300 : 200}>
                <Bar data={barChartData} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Doughnut Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Phân bố kết quả học tập</Typography>
              <Box height={isLargeScreen ? 300 : 200} display="flex" justifyContent="center">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
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
  );
}
