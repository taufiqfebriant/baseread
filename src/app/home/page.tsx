import { Dot, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TopicsCombobox } from "../topics-combobox";

type Props = {
	searchParams: {
		topic?: string | string[];
	};
};

export default function BackupHomePage(props: Props) {
	const topics = [];
	topics.length = 0;
	if (typeof props.searchParams.topic === "string") {
		topics.push(props.searchParams.topic);
	}

	if (Array.isArray(props.searchParams.topic)) {
		topics.push(...props.searchParams.topic);
	}

	return (
		<main className="mx-auto max-w-[50.625rem] py-6">
			<h1 className="text-center text-[2.5rem] font-bold leading-none">
				Baseread
			</h1>

			<div className="mt-8 flex h-11 text-sm">
				<div className="flex flex-1 items-center gap-x-4 rounded-l border border-r-0 border-zinc-200 px-4">
					<div>
						<Search size={18} className="text-zinc-400" />
					</div>
					<input
						type="text"
						className="w-full bg-inherit focus-visible:outline-none"
						placeholder="Search posts"
					/>
				</div>
				<TopicsCombobox />
			</div>

			<Link href="/somewhere" className="mt-5 flex gap-x-5">
				<div className="relative h-[10.6875rem] w-[19rem] flex-shrink-0 overflow-hidden rounded-lg">
					<Image
						src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
						alt="Morning walk"
						fill
						className="object-cover"
						sizes="100%"
					/>
				</div>

				<div className="flex flex-col gap-y-3 py-1">
					<div className="flex items-center gap-x-0.5">
						<div className="flex items-center gap-x-2">
							<div className="relative h-6 w-6 overflow-hidden rounded-full">
								<Image
									src="/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg"
									alt="User"
									fill
									className="object-cover"
									sizes="100%"
								/>
							</div>

							<p className="text-xs leading-none text-zinc-700">
								Alex Thompson
							</p>
						</div>

						<Dot className="text-zinc-500" size={18} />

						<p className="text-xs leading-none text-zinc-700">May 11, 2024</p>
					</div>

					<div className="flex-1">
						<h2 className="text-xl font-semibold">Go take a walk</h2>

						<p className="mt-0.5 line-clamp-2 text-sm leading-[1.5rem] text-zinc-700">
							Taking a walk might seem like a simple, mundane activity, but
							it&apos;s an incredibly powerful tool for your mind and body. A
							brisk stroll in the morning can set a positive tone for the rest
							of your day, while an evening walk can help you unwind and
							reflect. The act of walking not only helps clear your head but
							also has numerous physical benefits such as improving
							cardiovascular health, strengthening muscles, and aiding
							digestion. Beyond the physical advantages, a walk can also provide
							a mental break and spark creativity. Stepping away from your desk
							and immersing yourself in nature or a bustling city street can
							help alleviate stress and boost your mood. As you wander, you may
							find your thoughts flowing more freely, leading to new ideas and
							fresh perspectives. So, the next time you find yourself feeling
							stagnant or overwhelmed, remember: sometimes all you need is to
							take a walk.
						</p>
					</div>

					<div className="flex items-center gap-x-2">
						<div className="flex h-7 items-center rounded-full bg-zinc-100 px-3 text-xs leading-none text-zinc-700">
							Health
						</div>
						<div className="flex h-7 items-center rounded-full bg-zinc-100 px-3 text-xs leading-none text-zinc-700">
							Lifestyle
						</div>
					</div>
				</div>
			</Link>
		</main>
	);
}
