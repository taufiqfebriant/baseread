const post = {
	title: "Go take a walk",
	image: "jordan-mcqueen-956I1peiMi4-unsplash.jpg",
	content: `<p>Taking a walk might seem like a simple, mundane activity, but it's an incredibly powerful tool for your mind and body. A brisk stroll in the morning can set a positive tone for the rest of your day, while an evening walk can help you unwind and reflect. The act of walking not only helps clear your head but also has numerous physical benefits such as improving cardiovascular health, strengthening muscles, and aiding digestion.</p><p></p><p>Beyond the physical advantages, a walk can also provide a mental break and spark creativity. Stepping away from your desk and immersing yourself in nature or a bustling city street can help alleviate stress and boost your mood. As you wander, you may find your thoughts flowing more freely, leading to new ideas and fresh perspectives. So, the next time you find yourself feeling stagnant or overwhelmed, remember: sometimes all you need is to take a walk.</p>`,
};

export default function PostPage() {
	return (
		<article
			className="prose lg:prose-xl"
			dangerouslySetInnerHTML={{ __html: post.content }}
		/>
	);
}
