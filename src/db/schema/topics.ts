import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { postTopic } from "./post-topic";

export const topics = pgTable("topics", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => sql`now()`)
		.notNull(),
});

export const topicsRelations = relations(topics, ({ many }) => ({
	postTopic: many(postTopic),
}));
