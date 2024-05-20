import { PostListLoading } from "./post-list-loading";

export default function Loading() {
	return (
		<main className="mx-auto max-w-[50.625rem] px-4 py-6 lg:px-0">
			<h1 className="text-center text-[2.5rem] font-bold leading-none">
				Baseread
			</h1>

			<div className="mt-8 h-11 animate-pulse rounded bg-zinc-300" />

			<PostListLoading />
		</main>
	);
}
