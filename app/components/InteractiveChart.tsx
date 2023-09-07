'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function LineChart() {
	const [data, setData] = useState<number[]>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [multiplier, setMultiplier] = useState(1);

	useEffect(() => {
		if (isRunning) {
			const interval = setInterval(() => {
				//? Generating a random number and multiply it by the multiplier
				const randomNumber = Math.random() * multiplier;
				setData((prevData) => [...prevData, randomNumber]);

				//? Limit the number of data points to keep the chart clean
				if (data.length > 20) {
					setData((prevData) => prevData.slice(1));
				}
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isRunning, data, multiplier]);

	const toggleRunning = () => {
		setIsRunning(!isRunning);
	};

	const handleMultiplierChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMultiplier(parseFloat(event.target.value));
	};

	const resetData = () => {
		setData([]);
	};

	const chartData = {
		labels: Array.from({ length: data.length }, (_, i) => i + 1),
		datasets: [
			{
				label: 'Data Points',
				borderColor: 'white', // Set line color to white
				backgroundColor: '#FF9C00',
				fill: true,
				tension: 0.2,
				data: data,
			},
		],
	};

	return (
		<div>
			<Line data={chartData} />
			<div className="flex gap-4 p-2">
				<input
					type="number"
					placeholder="Multiplier"
					value={multiplier}
					onChange={handleMultiplierChange}
				/>
				<button
					className="text-white"
					onClick={toggleRunning}
				>
					{isRunning ? 'STOP' : 'START'}
				</button>
				<button
					className="text-white"
					onClick={resetData}
				>
					RESET
				</button>
			</div>
		</div>
	);
}
