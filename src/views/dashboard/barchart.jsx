import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ datas, datasindex, title, color, colorindex, titleindex, subtitle }) {

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const labels = ['Монако', 'Ильяс', 'Туран'];

    const data = {
        labels,
        datasets: [
            {
                label: title,
                data: datas,
                backgroundColor: color,
            },
            {
                label: titleindex,
                data: datasindex,
                backgroundColor: colorindex,
            },
        ],
    };

    return (
        <CCard>
            <CCardHeader>{`${title} и ${titleindex} в процентах ${subtitle}`}</CCardHeader>
            <CCardBody>
                <Bar options={options} data={data} />
            </CCardBody>
        </CCard>

    )
}


export default BarChart