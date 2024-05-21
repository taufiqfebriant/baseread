"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { type ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Providers = (props: Props) => {
	return (
		<>
			{props.children}
			<ProgressBar
				height="4px"
				color="#000000"
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</>
	);
};
