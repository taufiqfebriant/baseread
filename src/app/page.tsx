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

	// const initialPostsResult = await db
	// 	.selectDistinct({
	// 		id: posts.id,
	// 		slug: posts.slug,
	// 		image: posts.image,
	// 		user: {
	// 			name: users.name,
	// 			image: users.image,
	// 		},
	// 		createdAt: posts.createdAt,
	// 		title: posts.title,
	// 		content: posts.content,
	// 	})
	// 	.from(posts)
	// 	.innerJoin(users, eq(posts.userId, users.id))
	// 	.innerJoin(postTopic, eq(posts.id, postTopic.postId))
	// 	.where(
	// 		and(
	// 			props.searchParams.query
	// 				? ilike(posts.title, `%${props.searchParams.query}%`)
	// 				: undefined,
	// 			selectedTopics.length
	// 				? inArray(postTopic.topicId, selectedTopics)
	// 				: undefined,
	// 		),
	// 	)
	// 	.orderBy(posts.createdAt, posts.id);

	// const postIds = initialPostsResult.map((post) => post.id);

	// const postTopicsResult = await db
	// 	.select({
	// 		postId: postTopic.postId,
	// 		topic: {
	// 			id: postTopic.topicId,
	// 			name: topics.name,
	// 		},
	// 	})
	// 	.from(postTopic)
	// 	.innerJoin(topics, eq(postTopic.topicId, topics.id))
	// 	.where(inArray(postTopic.postId, postIds));

	// const imageKeys = [];
	// for (const post of initialPostsResult) {
	// 	imageKeys.push(post.image, post.user.image);
	// }

	// const imagesResult = await Promise.allSettled(
	// 	imageKeys.map((image) => getImageString({ key: image })),
	// );

	// const images = imagesResult.filter((image) => image.status === "fulfilled");

	// const postsResult = initialPostsResult.map((post) => {
	// 	const relatedTopics = postTopicsResult
	// 		.filter((postTopic) => postTopic.postId === post.id)
	// 		.map((postTopic) => postTopic.topic)
	// 		.flat();

	// 	const image = images.find((image) => {
	// 		return image.value.data.key === post.image;
	// 	});

	// 	const userImage = images.find((image) => {
	// 		return image.value.data.key === post.user.image;
	// 	});

	// 	return {
	// 		...post,
	// 		topics: relatedTopics,
	// 		image: image.value.data.value,
	// 		user: {
	// 			...post.user,
	// 			image: userImage.value.data.value,
	// 		},
	// 	};
	// });

	return (
		<main className="mx-auto max-w-[50.625rem] px-4 py-6 lg:px-0">
			<h1 className="text-center text-[2.5rem] font-bold leading-none">
				Baseread
			</h1>

			<Filter />

			<Suspense
				key={query + selectedTopics.toString()}
				fallback={<p>Loading...</p>}
			>
				<PostList query={query} topics={selectedTopics} />
			</Suspense>
		</main>
	);
}
