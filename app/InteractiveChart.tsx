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

import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Button,
	Box,
	Text,
	HStack,
} from '@chakra-ui/react';

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

	const handleMultiplierChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMultiplier(parseFloat(e.target.value));
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
					<NumberInput
						minW="80px"
						maxW="80px"
						value={multiplier}
						onChange={(value) => setMultiplier(parseFloat(value))}
						color="white"
						defaultValue={2}
						min={1}
						max={99}
					>
						<NumberInputField placeholder="Multiplier" />
						<NumberInputStepper>
							<NumberIncrementStepper color="white" />
							<NumberDecrementStepper color="white" />
						</NumberInputStepper>
					</NumberInput>
				</HStack>

				<Button
					variant="outline"
					minWidth={100}
					colorScheme={isRunning ? 'red' : 'green'}
					onClick={toggleRunning}
				>
					{isRunning ? 'STOP' : 'START'}
				</Button>
				<Button
					variant="outline"
					minWidth={100}
					colorScheme="orange"
					onClick={resetData}
				>
					RESET
				</Button>
			</Box>
		</>
	);
}
