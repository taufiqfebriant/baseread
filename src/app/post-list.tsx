import { db } from "@/db";
import { postTopic } from "@/db/schema/post-topic";
import { posts } from "@/db/schema/posts";
import { topics } from "@/db/schema/topics";
import { users } from "@/db/schema/users";
import dayjs from "dayjs";
import { and, asc, desc, eq, ilike, inArray } from "drizzle-orm";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageString } from "./actions";

type Props = {
	query?: string;
	topics?: string[];
};

export async function PostList(props: Props) {
	const initialPostsResult = await db
		.selectDistinct({
			id: posts.id,
			slug: posts.slug,
			image: posts.image,
			user: {
				name: users.name,
				image: users.image,
			},
			createdAt: posts.createdAt,
			title: posts.title,
			content: posts.content,
		})
		.from(posts)
		.innerJoin(users, eq(posts.userId, users.id))
		.innerJoin(postTopic, eq(posts.id, postTopic.postId))
		.where(
			and(
				props.query ? ilike(posts.title, `%${props.query}%`) : undefined,
				props.topics?.length
					? inArray(postTopic.topicId, props.topics)
					: undefined,
			),
		)
		.orderBy(desc(posts.createdAt), asc(posts.id));

	const postIds = initialPostsResult.map((post) => post.id);

	const postTopicsResult = await db
		.select({
			postId: postTopic.postId,
			topic: {
				id: postTopic.topicId,
				name: topics.name,
			},
		})
		.from(postTopic)
		.innerJoin(topics, eq(postTopic.topicId, topics.id))
		.where(inArray(postTopic.postId, postIds));

	const imageKeys = [];
	for (const post of initialPostsResult) {
		imageKeys.push(post.image, post.user.image);
	}

	const imagesResult = await Promise.allSettled(
		imageKeys.map((image) => getImageString({ key: image })),
	);

	const images = imagesResult.filter((image) => image.status === "fulfilled");

	const postsResult = initialPostsResult.map((post) => {
		const relatedTopics = postTopicsResult
			.filter((postTopic) => postTopic.postId === post.id)
			.map((postTopic) => postTopic.topic)
			.flat();

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

	return (
		<div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8">
			{postsResult.map((post) => (
				<Link href="/somewhere" className="flex flex-col gap-y-3" key={post.id}>
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
		</div>
	);
}
