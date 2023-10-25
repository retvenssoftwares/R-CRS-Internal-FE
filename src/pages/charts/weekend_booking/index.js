import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Total Calls by Date',
    },
  },
};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function WeekendBooking({apiData}) {

  const labels = apiData.map((data)=>{
    return data.date
  })
  const data = {
    labels,
    datasets: [
      {
        label: 'Calls',
        data: apiData.map((data)=>{
              return data.totalRecords
            }),
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
      // {
      //   type: "line",
      //   label: `Highest Disposition of Week till ${apiData[0].date}` ,
      //   borderColor: "rgb(255, 99, 132)",
      //   borderWidth: 2,
      //   fill: false,
      //   data: apiData.map((data)=>{
      //     return data.highestDisposition['count']
      //   }),

      //   // data: labels.map(() =>
      //   //   faker.datatype.number({ min: -1000, max: 1000 })
      //   // ),
      // },
    ],
  };

  return <Bar options={options} data={data} />;
}
