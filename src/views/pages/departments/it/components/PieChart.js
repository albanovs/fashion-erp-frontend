import { CCard, CCardHeader } from '@coreui/react';
import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend,
  Tooltip,
  Filler,
  Legend);

function PieChart({ labels, title, subLabel, datas }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: subLabel,
        data: datas,
        backgroundColor: [
          'rgba(255, 99, 255, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 255, 0.8)',
          'rgba(75, 192, 255, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          // 'rgba(255, 159, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 255, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 255, 1)',
          'rgba(75, 192, 255, 1)',
          'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 255, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <CCard className='lg:w-[50%]'>
      <CCardHeader>{title}</CCardHeader>
      <Pie options={options} data={data} />
    </CCard>
  )
}


export default PieChart