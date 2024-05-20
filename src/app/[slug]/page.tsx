import { db } from "@/db";
import { postTopic } from "@/db/schema/post-topic";
import { posts } from "@/db/schema/posts";
import { topics } from "@/db/schema/topics";
import { users } from "@/db/schema/users";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { Dot } from "lucide-react";
import Image from "next/image";
import { getImageString } from "../actions";

type Props = {
	params: {
		slug: string;
	};
};

export default async function PostPage(props: Props) {
	const postsResult = await db
		.select({
			id: posts.id,
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
		.where(eq(posts.slug, props.params.slug));

	const post = postsResult[0];

	const imagesResult = await Promise.allSettled(
		[post.image, post.user.image].map((image) =>
			getImageString({ key: image }),
		),
	);

	const images = imagesResult.filter((image) => image.status === "fulfilled");

	const image = images.find((image) => {
		return image.value.data.key === post.image;
	})?.value.data.value;

	const userImage = images.find((image) => {
		return image.value.data.key === post.user.image;
	})?.value.data.value;

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
		.where(eq(postTopic.postId, post.id));

	return (
		<main className="mx-auto max-w-[50.625rem] py-16">
			<h1 className="text-center text-5xl font-bold leading-none">
				{post.title}
			</h1>

			<div className="mt-4 flex items-center justify-center gap-x-1">
				<div className="flex items-center gap-x-3">
					<div className="relative h-9 w-9 overflow-hidden rounded-full">
						<Image
							src={userImage}
							alt={post.user.name}
							fill
							className="object-cover"
							sizes="100%"
						/>
					</div>

					<p className="leading-none text-zinc-700">{post.user.name}</p>
				</div>

				<Dot className="text-zinc-500" size={24} />

				<p className="leading-none text-zinc-700">
					{dayjs(post.createdAt).format("MMMM D, YYYY")}
				</p>
			</div>

			<div className="relative mt-10 h-[28.476875rem] w-full flex-shrink-0 overflow-hidden rounded-lg">
				<Image
					src={image}
					alt={post.title}
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
				{postTopicsResult.map((postTopic) => (
					<div
						key={postTopic.topic.id}
						className="flex h-9 items-center rounded-full bg-zinc-100 px-4 text-sm leading-none text-zinc-700"
					>
						{postTopic.topic.name}
					</div>
				))}
			</div>
		</main>
	);
}
