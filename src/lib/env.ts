import { loadEnvConfig } from "@next/env";
import { z } from "zod";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const envSchema = z.object({
	DB_HOST: z.string().min(1, "DB_HOST is required"),
	DB_USERNAME: z.string().min(1, "DB_USERNAME is required"),
	DB_PASSWORD: z.string().min(1, "DB_PASSWORD is required"),
	DB_NAME: z.string().min(1, "DB_NAME is required"),
	DB_PORT: z
		.string()
		.min(1, "DB_PORT is required")
		.transform((port) => Number(port)),
	AWS_DEFAULT_REGION: z.string().min(1, "AWS_DEFAULT_REGION is required"),
	AWS_ENDPOINT: z.string().min(1, "AWS_ENDPOINT is required"),
	AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
	AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
	AWS_BUCKET: z.string().min(1, "AWS_BUCKET is required"),
});

export const env = envSchema.parse(process.env);
