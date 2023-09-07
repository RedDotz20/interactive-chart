import { Button } from '@chakra-ui/react';

interface CustomButtonProps {
	label: string;
	onClick: () => void;
	colorScheme?: string;
}

export default function ControlButton({
	label,
	onClick,
	colorScheme,
}: CustomButtonProps) {
	return (
		<Button
			variant="outline"
			minWidth={100}
			colorScheme={colorScheme}
			onClick={onClick}
		>
			{label}
		</Button>
	);
}
