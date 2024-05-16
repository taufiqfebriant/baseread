import { db } from "@/db";
import { topics } from "@/db/schema/topics";
import dayjs from "dayjs";
import { inArray } from "drizzle-orm";
import { Dot, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageString } from "./actions";
import { TopicsCombobox } from "./topics-combobox";

type Props = {
	searchParams: {
		topic?: string | string[];
	};
};

export default async function HomePage(props: Props) {
	const initialPostsResult = await db.query.posts.findMany({
		columns: {
			id: true,
			slug: true,
			image: true,
			createdAt: true,
			title: true,
			content: true,
		},
		with: {
			user: {
				columns: {
					image: true,
					name: true,
				},
			},
			postTopic: {
				columns: {
					topicId: true,
				},
			},
		},
	});

	const imageKeys = [];
	for (const post of initialPostsResult) {
		imageKeys.push(post.image, post.user.image);
	}

	const imagesResult = await Promise.allSettled(
		imageKeys.map((image) => getImageString({ key: image })),
	);

	const images = imagesResult.filter((image) => image.status === "fulfilled");

	const allTopics = Array.from(
		new Set(
			initialPostsResult
				.map((post) => post.postTopic)
				.flat()
				.map((post) => post.topicId),
		),
	);

	const topicsResult = await db
		.select({
			id: topics.id,
			name: topics.name,
		})
		.from(topics)
		.where(inArray(topics.id, allTopics));

	const postsResult = initialPostsResult.map(({ postTopic, ...post }) => {
		const relatedTopicIds = postTopic.flatMap((postTopic) => postTopic.topicId);

		const relatedTopics = [];
		for (const topic of topicsResult) {
			if (relatedTopicIds.includes(topic.id)) {
				relatedTopics.push(topic);
			}
		}

		const image = images.find((image) => {
			return image.value.data.key === post.image;
		});

		const userImage = images.find((image) => {
			return image.value.data.key === post.user.image;
		});

		return {
			...post,
			topics: relatedTopics,
			image: image.value.data.value,
			user: {
				...post.user,
				image: userImage.value.data.value,
			},
		};
	});

	// const topics = [];
	// topics.length = 0;
	// if (typeof props.searchParams.topic === "string") {
	// 	topics.push(props.searchParams.topic);
	// }

	// if (Array.isArray(props.searchParams.topic)) {
	// 	topics.push(...props.searchParams.topic);
	// }

	return (
		<main className="mx-auto max-w-[50.625rem] px-4 py-6 lg:px-0">
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

			<div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8">
				{postsResult.map((post) => (
					<Link
						href="/somewhere"
						className="flex flex-col gap-y-3"
						key={post.id}
					>
						<div className="relative aspect-video overflow-hidden rounded-lg">
							<Image
								src={post.image}
								alt={post.title}
								fill
								className="object-cover"
								sizes="(min-width: 481px) 393px, 100vw"
							/>
						</div>

						<div className="flex flex-col gap-y-3 px-1">
							<div className="flex items-center gap-x-0.5">
								<div className="flex items-center gap-x-2">
									<div className="relative h-6 w-6 overflow-hidden rounded-full">
										<Image
											src={post.user.image}
											alt={post.user.name}
											fill
											className="object-cover"
											sizes="100%"
										/>
									</div>

									<p className="text-xs leading-none text-zinc-700">
										{post.user.name}
									</p>
								</div>

								<Dot className="text-zinc-500" size={18} />

								<p className="text-xs leading-none text-zinc-700">
									{dayjs(post.createdAt).format("MMMM D, YYYY")}
								</p>
							</div>

							<div className="flex-1">
								<h2 className="line-clamp-1 text-xl font-semibold">
									{post.title}
								</h2>

								<div
									className="mt-0.5 line-clamp-2 text-sm leading-[1.5rem] text-zinc-700"
									dangerouslySetInnerHTML={{ __html: post.content }}
								/>
							</div>

							<div className="flex items-center gap-x-2">
								{post.topics.map((topic) => (
									<div
										className="flex h-7 items-center rounded-full bg-zinc-100 px-3 text-xs leading-none text-zinc-700"
										key={topic.id}
									>
										{topic.name}
									</div>
								))}
							</div>
						</div>
					</Link>
				))}

				{/* <div className="h-11 w-64 bg-red-500" /> */}

				{/* <Link href="/somewhere-2" className="flex-1">
					<div className="relative aspect-video overflow-hidden rounded-lg">
						<Image
							src="/jordan-mcqueen-956I1peiMi4-unsplash.jpg"
							alt="Morning walk"
							fill
							className="object-cover"
							sizes="304px"
						/>
					</div>

					<h2 className="text-xl font-semibold">Go take a walk</h2>
				</Link> */}
			</div>
		</main>
	);
}
