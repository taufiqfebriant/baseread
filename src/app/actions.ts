"use server";

import { env } from "@/lib/env";
import { s3 } from "@/lib/s3";
import { action } from "@/lib/safe-action";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";

const getImageStringSchema = z.object({
	key: z.string().min(1),
});

export const getImageString = action(getImageStringSchema, async (data) => {
	try {
		const response = await s3.send(
			new GetObjectCommand({
				Bucket: env.AWS_BUCKET,
				Key: data.key,
			}),
		);

		const value = await response.Body?.transformToString("base64");

		return {
			key: data.key,
			value: `data:${response.ContentType};base64,${value}`,
		};
	} catch {
		return {
			message: "Something went wrong.",
		};
	}
});
