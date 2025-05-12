'use client';
import * as React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
// icons
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
        <Tab icon={<BarChartIcon />} label="Course Info" />
        <Tab icon={<PersonIcon />} label="User Info" />
      </Tabs>
      <Box>
        {children}
      </Box>
    </Box>
  );
}
