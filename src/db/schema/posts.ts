import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { postTopic } from "./post-topic";
import { users } from "./users";

export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
	image: varchar("image", { length: 256 }).notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => sql`now()`)
		.notNull(),
	userId: uuid("user_id")
		.references(() => users.id, {
			onUpdate: "restrict",
			onDelete: "restrict",
		})
		.notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
	postTopic: many(postTopic),
}));
