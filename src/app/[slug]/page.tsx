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

export async function generateMetadata(params: Props) {
	const postsResult = await db
		.select({
			title: posts.title,
		})
		.from(posts)
		.where(eq(posts.slug, params.params.slug));

	const post = postsResult[0];

	return {
		title: `${post.title} | Baseread`,
	};
}

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

	const isFulfilled = <T,>(
		p: PromiseSettledResult<T>,
	): p is PromiseFulfilledResult<T> => p.status === "fulfilled";

	const images = imagesResult.filter(isFulfilled);

	const image = images.find((image) => {
		return image.value.data?.key === post.image;
	});

	const userImage = images.find((image) => {
		return image.value.data?.key === post.user.image;
	});

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
		<main className="mx-auto max-w-[50.625rem] px-4 py-10 lg:px-0 lg:py-16">
			<h1 className="text-center text-3xl font-bold leading-none lg:text-5xl">
				{post.title}
			</h1>

			<div className="mt-4 flex items-center justify-center gap-x-1 lg:mt-6">
				<div className="flex items-center gap-x-3">
					{userImage?.value.data?.value ? (
						<div className="relative h-7 w-7 overflow-hidden rounded-full lg:h-9 lg:w-9">
							<Image
								src={userImage.value.data.value}
								alt={post.user.name}
								fill
								className="object-cover"
								sizes="(min-width: 481px) 36px, 28px"
							/>
						</div>
					) : null}

					<p className="text-sm leading-none text-zinc-700 lg:text-base">
						{post.user.name}
					</p>
				</div>

				<Dot className="h-5 w-5 text-zinc-500 lg:h-6 lg:w-6" size={24} />

				<p className="text-sm leading-none text-zinc-700 lg:text-base">
					{dayjs(post.createdAt).format("MMMM D, YYYY")}
				</p>
			</div>

			{image?.value.data?.value ? (
				<div className="relative mt-6 aspect-video overflow-hidden rounded-lg lg:mt-10">
					<Image
						src={image.value.data.value}
						alt={post.title}
						fill
						className="object-cover"
						sizes="(min-width: 481px) 810px, 100vw"
					/>
				</div>
			) : null}

			<article
				className="prose prose-zinc mx-auto mt-6 max-w-3xl lg:prose-lg lg:mt-10"
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
