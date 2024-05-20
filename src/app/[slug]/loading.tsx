export default function Loading() {
	return (
		<main className="mx-auto max-w-[50.625rem] animate-pulse px-4 py-10 lg:px-0 lg:py-16">
			<div className="h-[1.875rem] bg-zinc-300 lg:h-12" />

			<div className="mt-4 flex items-center justify-center gap-x-3 lg:mt-6">
				<div className="h-7 w-7 flex-shrink-0 rounded-full bg-zinc-300 lg:h-9 lg:w-9" />

				<div className="h-7 w-44 bg-zinc-300 lg:h-9" />
			</div>

			<div className="mt-6 aspect-video rounded-lg bg-zinc-300 lg:mt-10" />

			<div className="mt-6 flex flex-col gap-y-7">
				<div className="flex flex-col gap-y-2">
					<div className="h-6 bg-zinc-300 lg:h-8" />
					<div className="h-6 bg-zinc-300 lg:h-8" />
					<div className="h-6 bg-zinc-300 lg:h-8" />
					<div className="h-6 bg-zinc-300 lg:h-8" />
				</div>

				<div className="flex flex-col gap-y-2">
					<div className="h-6 bg-zinc-300 lg:h-8" />
					<div className="h-6 bg-zinc-300 lg:h-8" />
					<div className="h-6 bg-zinc-300 lg:h-8" />
					<div className="h-6 bg-zinc-300 lg:h-8" />
				</div>
			</div>

			<div className="mt-10 flex items-center gap-x-2">
				{Array.from({ length: 4 }, (_, l) => l + 1).map((topic) => (
					<div
						className="h-9 w-[5.640625rem] rounded-full bg-zinc-300"
						key={topic}
					/>
				))}
			</div>
		</main>
	);
}
