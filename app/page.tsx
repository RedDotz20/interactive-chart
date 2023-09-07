import InteractiveChart from './components/InteractiveChart';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<header className="flex flex-col items-center gap-0">
				<h1 className="text-white text-4xl">INTERACTIVE CHART</h1>
				<h3 className="text-neutral-500 my-4">
					made by{' '}
					<a
						href="https://github.com/RedDotz20"
						className="hover:text-white transition-all"
					>
						RedDotz
					</a>
				</h3>
			</header>
			<InteractiveChart />
		</main>
	);
}
