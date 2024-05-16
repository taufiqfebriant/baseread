import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as postTopicSchema from "./schema/post-topic";
import * as postsSchema from "./schema/posts";
import * as topicsSchema from "./schema/topics";
import * as usersSchema from "./schema/users";

const client = postgres({
	host: env.DB_HOST,
	user: env.DB_USERNAME,
	pass: env.DB_PASSWORD,
	port: env.DB_PORT,
	db: env.DB_NAME,
	ssl: "require",
});

export const db = drizzle(client, {
	logger: true,
	schema: {
		...postTopicSchema,
		...postsSchema,
		...topicsSchema,
		...usersSchema,
	},
});
