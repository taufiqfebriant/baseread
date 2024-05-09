import Image from "next/image";

export default function Home() {
	return (
		<main className="max-w-[128rem] mx-auto py-[0.8rem]">
			<h2 className="font-bold text-[4rem] text-center">Baseread</h2>

			<div className="h-[40rem] mt-[1.6rem] rounded-[0.8rem] relative overflow-hidden">
				<Image
					src="/random-static.png"
					alt="Random box pattern"
					fill
					className="object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-[rgba(47,54,255,.7)] text-white flex items-center px-[3.2rem]">
					<div>
						<h1 className="text-[6rem] font-bold">Read about anything.</h1>
						<p className="text-[2rem] leading-[2.8rem] font-medium text-white/85 max-w-[49rem]">
							Explore diverse stories and insightful perspectives from every
							corner of the world.
						</p>
					</div>
				</div>
			</div>

			<div className="mt-[3.2rem] grid grid-cols-3 gap-x-[2.4rem]">
				<div className="w-full h-[23.1rem] relative rounded-[0.8rem] overflow-hidden">
					<Image
						src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
						alt="Morning walk"
						fill
						className="object-cover"
					/>
				</div>
				<div className="w-full h-[23.1rem] relative rounded-[0.8rem] overflow-hidden">
					<Image
						src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
						alt="Morning walk"
						fill
						className="object-cover"
					/>
				</div>
				<div className="w-full h-[23.1rem] relative rounded-[0.8rem] overflow-hidden">
					<Image
						src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
						alt="Morning walk"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</main>
	);
}
