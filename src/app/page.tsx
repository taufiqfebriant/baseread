import { db } from "@/db";
import { topics } from "@/db/schema/topics";
import { asc } from "drizzle-orm";
import { type Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Filter } from "./filter";
import { PostList } from "./post-list";
import { PostListLoading } from "./post-list-loading";

export const metadata: Metadata = {
	title: "Baseread",
};

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
			<div className="relative h-[1.875rem] w-auto">
				<Image
					src="/wordmark.png"
					alt="Baseread's wordmark"
					fill
					sizes="430px"
					className="object-contain"
				/>
			</div>

			<Filter topics={topicsResult} />

			<Suspense
				key={query + selectedTopics.toString()}
				fallback={<PostListLoading />}
			>
				<PostList query={query} topics={selectedTopics} />
			</Suspense>
		</main>
	);
}
