import { Dot } from "lucide-react";
import Image from "next/image";

const post = {
	title: "Go take a walk",
	image: "jordan-mcqueen-956I1peiMi4-unsplash.jpg",
	content: `<p>Taking a walk might seem like a simple, mundane activity, but it's an incredibly powerful tool for your mind and body. A brisk stroll in the morning can set a positive tone for the rest of your day, while an evening walk can help you unwind and reflect. The act of walking not only helps clear your head but also has numerous physical benefits such as improving cardiovascular health, strengthening muscles, and aiding digestion.</p><p></p><p>Beyond the physical advantages, a walk can also provide a mental break and spark creativity. Stepping away from your desk and immersing yourself in nature or a bustling city street can help alleviate stress and boost your mood. As you wander, you may find your thoughts flowing more freely, leading to new ideas and fresh perspectives. So, the next time you find yourself feeling stagnant or overwhelmed, remember: sometimes all you need is to take a walk.</p>`,
};

export default function PostPage() {
	return (
		<main className="mx-auto max-w-[50.625rem] py-16">
			<h1 className="text-center text-5xl font-bold leading-none">
				{post.title}
			</h1>

			<div className="mt-4 flex items-center justify-center gap-x-1">
				<div className="flex items-center gap-x-3">
					<div className="relative h-9 w-9 overflow-hidden rounded-full">
						<Image
							src="/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg"
							alt="User"
							fill
							className="object-cover"
							sizes="100%"
						/>
					</div>

					<p className="leading-none text-zinc-700">Alex Thompson</p>
				</div>

				<Dot className="text-zinc-500" size={24} />

				<p className="leading-none text-zinc-700">May 11, 2024</p>
			</div>

			<div className="relative mt-10 h-[28.476875rem] w-full flex-shrink-0 overflow-hidden rounded-lg">
				<Image
					src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
					alt="Morning walk"
					fill
					className="object-cover"
					sizes="100%"
				/>
			</div>

			<article
				className="prose prose-zinc mx-auto mt-10 max-w-3xl lg:prose-lg"
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>

			<div className="mx-auto mt-10 flex max-w-3xl items-center gap-x-2">
				<div className="flex h-9 items-center rounded-full bg-zinc-100 px-4 text-sm leading-none text-zinc-700">
					Health
				</div>
				<div className="flex h-9 items-center rounded-full bg-zinc-100 px-4 text-sm leading-none text-zinc-700">
					Lifestyle
				</div>
			</div>
		</main>
	);
}
