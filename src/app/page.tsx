import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="max-w-[81rem] mx-auto py-[2.4rem]">
			<h1 className="font-bold text-[4rem] text-center leading-none">
				Baseread
			</h1>

			<Link href="/somewhere" className="flex gap-x-[2.4rem] mt-[4.8rem]">
				<div className="w-[30.4rem] h-[17.1rem] relative rounded-[0.8rem] overflow-hidden flex-shrink-0">
					<Image
						src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
						alt="Morning walk"
						fill
						className="object-cover"
					/>
				</div>

				<div className="flex flex-col py-[0.4rem]">
					<div className="flex items-center">
						<div className="flex items-center gap-x-[0.8rem]">
							<div className="w-[2.8rem] h-[2.8rem] relative rounded-full overflow-hidden">
								<Image
									src="/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg"
									alt="User"
									fill
									className="object-cover"
								/>
							</div>

							<p className="text-[1.2rem] leading-none text-zinc-600">
								Alex Thompson
							</p>
						</div>

						<Dot className="text-zinc-600" />

						<p className="text-[1.2rem] leading-none text-zinc-600">
							May 11, 2024
						</p>
					</div>

					<h2 className="font-semibold text-[2.4rem] leading-[3.2rem] mt-[0.8rem]">
						Go take a walk
					</h2>

					<div className="flex-1 mt-[0.4rem]">
						<p className="text-[1.4rem] leading-[2.4rem] text-zinc-600 line-clamp-2">
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

					<div className="flex items-center gap-x-[0.8rem]">
						<div className="bg-zinc-200 text-zinc-600 flex items-center leading-none rounded-full text-[1.2rem] h-[2.8rem] px-[1.2rem]">
							Health
						</div>
						<div className="bg-zinc-200 text-zinc-600 flex items-center leading-none rounded-full text-[1.2rem] h-[2.8rem] px-[1.2rem]">
							Lifestyle
						</div>
					</div>
				</div>
			</Link>
		</main>
	);
}
