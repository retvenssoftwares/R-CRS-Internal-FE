import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export function MultiTypeChart({ apiData, type }) {
  const labels = apiData.map((data)=>{
    return data.highestDisposition['disposition']
  })
  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: `Highest Disposition of Week till ${apiData[0].date}` ,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: apiData.map((data)=>{
          return data.highestDisposition['count']
        }),
      },
    ],
  };
  return <>

  <Chart type="bar" data={data} />

  </>
}
