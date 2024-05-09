import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres({
	host: env.DB_HOST,
	user: env.DB_USERNAME,
	pass: env.DB_PASSWORD,
	port: env.DB_PORT,
	db: env.DB_NAME,
});

export const db = drizzle(client, {
	logger: true,
});
