import React from 'react';
import { 
  TableRow, 
  TableCell, 
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Visibility as VisibilityIcon, 
  School as SchoolIcon 
} from '@mui/icons-material';
import Link from 'next/link';

interface Course {
  id: string;
  name: string;
  description: string;
  university: string;
  enrolledUsers: number;
}

interface CourseListItemProps {
  course: Course;
}

const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => {
  return (
    <TableRow hover>
      <TableCell>{course.id}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <SchoolIcon className="mr-2 text-blue-500" />
          {course.name}
        </div>
      </TableCell>
      <TableCell align="right">{course.university}</TableCell>
      <TableCell align="right">{course.enrolledUsers.toLocaleString()}</TableCell>
      <TableCell align="right">
        <Link href={`/courses/${course.id}`} passHref>
          <Tooltip title="View Course Details">
            <IconButton size="small">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default CourseListItem;