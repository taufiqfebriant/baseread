import { env } from "@/lib/env";
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/db/schema/*.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		host: env.DB_HOST,
		user: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		database: env.DB_NAME,
		port: env.DB_PORT,
	},
} satisfies Config;
