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
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import Link from 'next/link';

// User interface
interface User {
  id: string;
  school: string;
  enrollDate: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 'U_123456',
    school: '巴蜀文化',
    enrollDate: '2023-10-02',
  },
  {
    id: 'U_15721',
    school: '数据挖掘',
    enrollDate: '2023-10-02',
  },
  {
    id: 'U_19284',
    school: '大学计算机',
    enrollDate: '2023-10-05',
  },
  {
    id: 'U_13849',
    school: '大学物理',
    enrollDate: '2023-10-07',
  }
];

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user => 
    user.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="p-4">
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>

      <TextField 
        fullWidth
        variant="outlined"
        placeholder="Search by ID or School..."
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
              <TableCell>User ID</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Enroll Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.school}</TableCell>
                <TableCell>{user.enrollDate}</TableCell>
                <TableCell align="right">
                    <Link href={`./user-info/${user.id}`} passHref>
                    <Tooltip title="View Course Details">
                        <IconButton size="small">
                        <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersPage;
