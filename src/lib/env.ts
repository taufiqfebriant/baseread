import { loadEnvConfig } from "@next/env";
import { minLength, object, parse, string, transform } from "valibot";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const envSchema = object({
	DB_HOST: string([minLength(1, "DB_HOST is required")]),
	DB_USERNAME: string([minLength(1, "DB_USERNAME is required")]),
	DB_PASSWORD: string([minLength(1, "DB_PASSWORD is required")]),
	DB_NAME: string([minLength(1, "DB_NAME is required")]),
	DB_PORT: transform(string([minLength(1, "DB_PORT is required")]), (input) => {
		return Number(input);
	}),
	AWS_DEFAULT_REGION: string([minLength(1, "AWS_DEFAULT_REGION is required")]),
	AWS_ENDPOINT: string([minLength(1, "AWS_ENDPOINT is required")]),
	AWS_ACCESS_KEY_ID: string([minLength(1, "AWS_ACCESS_KEY_ID is required")]),
	AWS_SECRET_ACCESS_KEY: string([
		minLength(1, "AWS_SECRET_ACCESS_KEY is required"),
	]),
	AWS_BUCKET: string([minLength(1, "AWS_BUCKET is required")]),
});

export const env = parse(envSchema, process.env);
