// src/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Base color (white) to use with different alpha values
const colors = [
    [255, 69, 58],    // Light Coral
    [255, 159, 10],   // Orange
    [255, 214, 0],    // Yellow
    [0, 204, 255],    // Sky Blue
    [52, 199, 89],    // Green
    [88, 86, 214],    // Indigo
    [255, 45, 85],    // Pink
    [0, 122, 255],    // Blue
    [175, 82, 222],   // Purple
    [255, 45, 0]      // Red
];

const baseColor = colors[Math.floor(Math.random() * 10)];

const getAlphaColor = (alpha) => {
    const [r, g, b] = baseColor;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const generateAlphaColors = (data, maxClicks) => {
    const backgroundColors = data.map(item => {
        const alpha = item.clicks / maxClicks; // Normalize clicks to range [0, 1]
        return getAlphaColor(alpha);
    });
    return { backgroundColors };
};

const PieChart = (props) => {
    const udata = props.data

    const maxClicks = Math.max(...udata.map(item => item.clicks));
    const numDataPoints = udata.length;
    const { backgroundColors } = generateAlphaColors(udata, maxClicks);

    const data = {
        labels: udata.map(ele => ele.name),
        datasets: [
            {
                label: 'Clicks',
                data: udata.map(ele => ele.clicks),
                backgroundColor: backgroundColors,
                borderColor: 'rgba(255,255,255,0.6)',
                borderWidth: 1.5
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: "rgba(255,255,255,0)",
                borderWidth: 0,
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className='m-4 flex-col text-center pb-5 w-11/12 h-96' >
            <Pie data={data} options={options} />
            <p className='text-xs mt-1'>* Click/Hover for more info</p>
        </div>
    );
};

export default PieChart;
