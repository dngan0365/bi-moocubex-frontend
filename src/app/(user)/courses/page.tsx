'use client'
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon, School as SchoolIcon } from '@mui/icons-material';
import CourseListItem from '@/components/course/courseListItem';

// Course interface
interface Course {
  id: string;
  name: string;
  description: string;
  university: string;
  enrolledUsers: number;
}

// Mock course data
const mockCourses: Course[] = [
  {
    id: 'C_123456',
    name: '巴蜀文化',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  },
  {
    id: 'C_15721',
    name: '数据挖掘：理论与算法',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  },
  {
    id: 'C_19284',
    name: '大学计算机',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  },
  {
    id: 'C_13849',
    name: '大学物理1（力学、热学）',
    description: '《资治通鉴》导读',
    university: '清华大学',
    enrolledUsers: 617155
  }
];

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCourses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Typography>
      <Box className="p-4">
        
        <TextField 
          fullWidth
          variant="outlined"
          placeholder="Search for course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">University</TableCell>
                <TableCell align="right">Enrolled Users</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => (
                <CourseListItem key={course.id} course={course} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Typography>
  );
};

export default CoursesPage;