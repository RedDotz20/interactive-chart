import React, { ChangeEvent } from 'react';
import {
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from '@chakra-ui/react';

interface CustomNumberInputProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	placeholder?: string;
	isRunning: boolean;
}

export default function CustomNumberInput({
	value,
	onChange,
	min = 1,
	max = 99,
	placeholder,
	isRunning,
}: CustomNumberInputProps) {
	return (
		<NumberInput
			isDisabled={isRunning}
			minW="80px"
			maxW="80px"
			value={value}
			onChange={(valueString) => onChange(parseFloat(valueString))}
			defaultValue={value}
			min={min}
			max={max}
		>
			<NumberInputField placeholder={placeholder} />
			<NumberInputStepper>
				<NumberIncrementStepper color="white" />
				<NumberDecrementStepper color="white" />
			</NumberInputStepper>
		</NumberInput>
	);
}
