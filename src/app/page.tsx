import { Dot, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TopicsCombobox } from "./topics-combobox";

type Props = {
	searchParams: {
		topic?: string | string[];
	};
};

export default function HomePage(props: Props) {
	const topics = [];
	topics.length = 0;
	if (typeof props.searchParams.topic === "string") {
		topics.push(props.searchParams.topic);
	}

	if (Array.isArray(props.searchParams.topic)) {
		topics.push(...props.searchParams.topic);
	}

	return (
		<main className="max-w-[50.625rem] mx-auto py-6">
			<h1 className="font-bold text-[2.5rem] text-center leading-none">
				Baseread
			</h1>

			<div className="flex mt-8 h-11 text-sm">
				<div className="flex border border-r-0 border-zinc-200 px-4 items-center rounded-l flex-1 gap-x-4">
					<div>
						<Search size={18} className="text-zinc-400" />
					</div>
					<input
						type="text"
						className="w-full focus-visible:outline-none bg-inherit"
						placeholder="Search posts"
					/>
				</div>
				<TopicsCombobox />
			</div>

			<Link href="/somewhere" className="flex gap-x-5 mt-5">
				<div className="w-[19rem] h-[10.6875rem] relative rounded-lg overflow-hidden flex-shrink-0">
					<Image
						src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
						alt="Morning walk"
						fill
						className="object-cover"
						sizes="100%"
					/>
				</div>

				<div className="flex flex-col py-1 gap-y-3">
					<div className="flex items-center gap-x-0.5">
						<div className="flex items-center gap-x-2">
							<div className="w-6 h-6 relative rounded-full overflow-hidden">
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
						<h2 className="font-semibold text-xl">Go take a walk</h2>

						<p className="text-sm mt-0.5 leading-[1.5rem] text-zinc-700 line-clamp-2">
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
						<div className="bg-zinc-100 text-zinc-700 flex items-center leading-none rounded-full text-xs h-7 px-3">
							Health
						</div>
						<div className="bg-zinc-100 text-zinc-700 flex items-center leading-none rounded-full text-xs h-7 px-3">
							Lifestyle
						</div>
					</div>
				</div>
			</Link>
		</main>
	);
}
