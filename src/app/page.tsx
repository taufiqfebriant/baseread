import { db } from "@/db";
import { topics } from "@/db/schema/topics";
import { asc } from "drizzle-orm";
import { Suspense } from "react";
import { Filter } from "./filter";
import { PostList } from "./post-list";

type Props = {
	searchParams?: {
		query?: string;
		topic?: string | string[];
	};
};

export default async function HomePage(props: Props) {
	const selectedTopics = [];
	selectedTopics.length = 0;
	if (typeof props.searchParams?.topic === "string") {
		selectedTopics.push(props.searchParams.topic);
	}

	if (Array.isArray(props.searchParams?.topic)) {
		selectedTopics.push(...props.searchParams.topic);
	}

	const query = props.searchParams?.query ?? "";

	const topicsResult = await db
		.select({
			id: topics.id,
			name: topics.name,
		})
		.from(topics)
		.orderBy(asc(topics.id));

	return (
		<main className="mx-auto max-w-[50.625rem] px-4 py-6 lg:px-0">
			<h1 className="text-center text-[2.5rem] font-bold leading-none">
				Baseread
			</h1>

			<Filter topics={topicsResult} />

			<Suspense
				key={query + selectedTopics.toString()}
				fallback={<p>Loading...</p>}
			>
				<PostList query={query} topics={selectedTopics} />
			</Suspense>
		</main>
	);
}
