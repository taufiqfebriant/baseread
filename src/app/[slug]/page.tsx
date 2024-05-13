import { Dot } from "lucide-react";
import Image from "next/image";

const post = {
	title: "Go take a walk",
	image: "jordan-mcqueen-956I1peiMi4-unsplash.jpg",
	content: `<p>Taking a walk might seem like a simple, mundane activity, but it's an incredibly powerful tool for your mind and body. A brisk stroll in the morning can set a positive tone for the rest of your day, while an evening walk can help you unwind and reflect. The act of walking not only helps clear your head but also has numerous physical benefits such as improving cardiovascular health, strengthening muscles, and aiding digestion.</p><p></p><p>Beyond the physical advantages, a walk can also provide a mental break and spark creativity. Stepping away from your desk and immersing yourself in nature or a bustling city street can help alleviate stress and boost your mood. As you wander, you may find your thoughts flowing more freely, leading to new ideas and fresh perspectives. So, the next time you find yourself feeling stagnant or overwhelmed, remember: sometimes all you need is to take a walk.</p>`,
};

export default function PostPage() {
	return (
		<main className="max-w-[50.625rem] mx-auto py-16">
			<h1 className="font-bold text-5xl text-center leading-none">
				{post.title}
			</h1>

			<div className="flex items-center gap-x-1 justify-center mt-4">
				<div className="flex items-center gap-x-3">
					<div className="w-9 h-9 relative rounded-full overflow-hidden">
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

			<div className="w-full h-[28.476875rem] relative rounded-lg overflow-hidden flex-shrink-0 mt-10">
				<Image
					src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
					alt="Morning walk"
					fill
					className="object-cover"
					sizes="100%"
				/>
			</div>

			<article
				className="prose prose-zinc lg:prose-lg mt-10 max-w-3xl mx-auto"
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>

			<div className="flex items-center gap-x-2 mt-10 max-w-3xl mx-auto">
				<div className="bg-zinc-100 text-zinc-700 flex items-center leading-none rounded-full text-sm h-9 px-4">
					Health
				</div>
				<div className="bg-zinc-100 text-zinc-700 flex items-center leading-none rounded-full text-sm h-9 px-4">
					Lifestyle
				</div>
			</div>
		</main>
	);
}
