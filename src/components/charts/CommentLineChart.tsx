'use client'
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import the chart to avoid SSR issues
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Chart() {
  const [chartData] = useState({
    series: [{
      name: 'Sales',
      data: [10, 41, 35, 51, 49, 62, 69]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    }
  });

  return (
    <div>
      <ApexChart 
        options={chartData.options} 
        series={chartData.series} 
        type="line" 
        height={350} 
      />
    </div>
  );
}
