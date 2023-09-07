'use client';

import React, { useState, useEffect } from 'react';
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

import { Button, Box, Text, HStack } from '@chakra-ui/react';

import MultiplierInput from './MultiplierInput';
import ControlButton from './ControlButton';

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
	const [multiplier, setMultiplier] = useState(2);

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

	const resetData = () => {
		setData([]);
	};

	const chartData = {
		labels: Array.from({ length: data.length }, (_, i) => i + 1),
		datasets: [
			{
				label: 'Data Points',
				borderColor: 'white',
				backgroundColor: '#FF9C00',

				fill: true,
				tension: 0.2,
				data: data,
			},
		],
	};

	return (
		<>
			<Box
				minWidth={700}
				minHeight={400}
			>
				<Line data={chartData} />
			</Box>
			<Box
				display="flex"
				gap="4"
				p="2"
			>
				<HStack
					spacing={4}
					color="white"
				>
					<Text>Multiplier</Text>

					<MultiplierInput
						isRunning={isRunning}
						value={multiplier}
						onChange={setMultiplier}
						min={1}
						max={99}
						placeholder="Multiplier"
					/>
				</HStack>

				<ControlButton
					label={isRunning ? 'STOP' : 'START'}
					onClick={toggleRunning}
					colorScheme={isRunning ? 'red' : 'green'}
				/>

				<ControlButton
					label="RESET"
					onClick={resetData}
					colorScheme="orange"
				/>
			</Box>
		</>
	);
}
