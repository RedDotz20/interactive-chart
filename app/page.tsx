import InteractiveChart from './components/InteractiveChart';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-white text-2xl my-4">INTERACTIVE CHART</h1>
			<InteractiveChart />
		</main>
	);
}
