export function PostListLoading() {
	return (
		<div className="mt-6 grid animate-pulse grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8">
			{Array.from({ length: 6 }, (_, k) => k + 1).map((post) => (
				<div className="flex flex-col gap-y-3" key={post}>
					<div className="relative aspect-video overflow-hidden rounded-lg bg-zinc-300" />

					<div className="flex flex-col gap-y-3 px-1">
						<div className="flex items-center gap-x-2">
							<div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-zinc-300" />

							<div className="h-6 w-full bg-zinc-300" />
						</div>

						<div className="flex-1">
							<div className="h-7 w-full bg-zinc-300" />

							<div className="mt-3 h-4 bg-zinc-300" />
							<div className="mt-1.5 h-4 bg-zinc-300" />
						</div>

						<div className="flex items-center gap-x-2">
							{Array.from({ length: 4 }, (_, l) => l + 1).map((topic) => (
								<div
									className="h-7 w-[5.640625rem] rounded-full bg-zinc-300"
									key={topic}
								/>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
