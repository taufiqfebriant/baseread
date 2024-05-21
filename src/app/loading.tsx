import Image from "next/image";
import { PostListLoading } from "./post-list-loading";

export default function Loading() {
	return (
		<main className="mx-auto max-w-[50.625rem] px-4 py-6 lg:px-0">
			<div className="flex justify-center">
				<div className="relative h-[30px] w-[179.17px]">
					<Image
						src="/wordmark.png"
						alt="Baseread's wordmark"
						fill
						sizes="179.17px"
						className="object-contain"
					/>
				</div>
			</div>

			<div className="mt-8 h-11 animate-pulse rounded bg-zinc-300" />

			<PostListLoading />
		</main>
	);
}
