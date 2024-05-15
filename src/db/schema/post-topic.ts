import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { topics } from "./topics";

export const postTopic = pgTable(
	"post_topic",
	{
		postId: uuid("post_id")
			.notNull()
			.references(() => posts.id, {
				onUpdate: "restrict",
				onDelete: "restrict",
			}),
		topicId: varchar("topic_id", { length: 256 })
			.notNull()
			.references(() => topics.id, {
				onUpdate: "restrict",
				onDelete: "restrict",
			}),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.postId, t.topicId] }),
	}),
);

export const postTopicRelations = relations(postTopic, ({ one }) => ({
	post: one(posts, {
		fields: [postTopic.postId],
		references: [posts.id],
	}),
	topic: one(topics, {
		fields: [postTopic.topicId],
		references: [topics.id],
	}),
}));
