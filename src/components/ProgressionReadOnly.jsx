import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-luxon';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

function ProgressionReadOnly(props) {
    const chartRef = useRef(null);

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('.').map(Number);
        return new Date(year, month - 1, day, 12, 0, 0); // Set time to noon (12:00 PM)
    }

    console.log(parseDate("01.01.2021"));

    useEffect(() => {

        console.log("props.exerciseProgressionData:",props.exerciseProgressionData)

        const saves = props.exerciseProgressionData.map((save, index) => ({
            x: parseDate(save.date),
            y: save.weight,
        }));

        const predefinedObject = {
            x: new Date().setHours(24, 0, 0, 0),
            y: saves[saves.length-1].y,
        }

        saves.push(predefinedObject);

        const customLabels = props.exerciseProgressionData.map((save) => save.date);

        console.log(saves[0].x);
        console.log(new Date().setHours(24, 0, 0, 0));


        const chartConfig = {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: props.exerciseName,
                        pointRadius: 4,
                        pointBackgroundColor: '#00ADB5',
                        showLine: true,
                        data: saves,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'DD',
                            displayFormats: {
                                day: 'D', // Custom display format for day intervals
                            },
                        },
                        title: {
                            display: true,
                            text: 'Time',
                            font: {
                                weight: 'bold',
                            }
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Weight (kg)',
                            font: {
                                weight: 'bold',
                            }
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        enabled: true, // Disable tooltips
                        mode: 'nearest',
                        callbacks: {
                            label: (context) => {
                                if (context.dataIndex === context.dataset.data.length - 1) {
                                    return "Now"

                                } else {
                                    const originalDate = new Date(context.dataset.data[context.dataIndex].x);
                                    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                    const formattedDate = `${originalDate.getDate()}. ${monthsShort[originalDate.getMonth()]} ${originalDate.getFullYear()}`;
                                    // Default tooltip content for other points
                                    return `Date: ${formattedDate}, Weight: ${context.dataset.data[context.dataIndex].y} kg`;
                                }
                            },
                        },
                    },
                },
            },
        };

        // Create a new Chart instance if chartRef is not null
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing instance
            chartRef.current = new Chart('myChart', chartConfig); // Create a new instance
        } else {
            chartRef.current = new Chart('myChart', chartConfig); // Create the initial instance
        }

        // Clean up by destroying the Chart instance when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="journalFormContainer exerciseProgressionGraphContainer">
            <h1 className="createJournalTitle">Exercise Progression</h1>
            <div className="exerciseProgressionGraphContainer2">
                <canvas id="myChart"></canvas>
            </div>
            <button className="primaryButton exerciseProgressionGoBackButton" onClick={props.handleExerciseProgressionBackClick}>back</button>
        </div>
    );
}

export default ProgressionReadOnly;
