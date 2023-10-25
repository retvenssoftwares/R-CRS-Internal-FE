import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useTopEmpQuery } from "../../../redux/slices/booking";
import { useGetTopFiveAgentsCallQuery } from "../../../redux/slices/call";
import { RotatingLines } from "react-loader-spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {

//   labels: ['Shashank', 'Aman', 'Saumitra', 'Amit', 'Vishal'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export function App({type}) {
  const { data: topFiveEmp } = useGetTopFiveAgentsCallQuery();
  const [header, setHeader] = useState(null);
  const [empData, setEmpData] = useState(null);
  useEffect(() => {
    if (topFiveEmp) {
      const empAPI_Data = topFiveEmp?.topEmployeesWithDetails.map((items) => {
        return items.first_name;
      });
      const head = topFiveEmp?.topEmployeesWithDetails.map((items) => {
        return items.totalCalls;
      });
      if (empAPI_Data) {
        setEmpData(empAPI_Data);
      }
      if (head) {
        setHeader(head);
      }
    }
  }, [topFiveEmp]);

  const data = {
    labels: empData,
    datasets: [
      {
        label: "# of Votes",
        data: header,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
console.log(topFiveEmp)
  return <>{empData && header ? <Pie data={data} /> : <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>}</>;
}
