"use client";

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { Check, ChevronsDownUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Topic = {
	id: string;
	name: string;
};

const topics = [
	{ id: "health", name: "Health" },
	{ id: "lifestyle", name: "Lifestyle" },
] satisfies Topic[];

export function TopicsCombobox() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const topicValues = searchParams.getAll("topic");
	const value = topics.filter((topic) => topicValues.includes(topic.id));

	return (
		<Combobox
			value={value}
			onChange={(topics) => {
				const params = new URLSearchParams(searchParams);

				params.delete("topic");
				for (const topic of topics) {
					params.append("topic", topic.id);
				}

				router.replace(`${pathname}?${params.toString()}`);
			}}
			multiple
			immediate
		>
			{({ open }) => (
				<>
					<div
						className={clsx(
							"flex w-[13.75rem] border border-l-0",
							{
								"rounded-r": !open,
							},
							{
								"[border-bottom-right-radius:0px] [border-top-right-radius:0.25rem]":
									open,
							},
						)}
					>
						<ComboboxInput
							className="min-w-0 border-l pl-4 data-[focus]:outline-none"
							placeholder="Select topics"
							aria-label="Topics"
						/>
						<ComboboxButton className="flex w-11 flex-shrink-0 items-center justify-center text-zinc-400">
							<ChevronsDownUp size={18} />
						</ComboboxButton>
					</div>

					<ComboboxOptions
						anchor="bottom start"
						className="w-[13.75rem] rounded-b border border-t-0 border-zinc-200 p-1.5 text-sm empty:hidden"
					>
						{topics.map((topic) => (
							<ComboboxOption
								key={topic.id}
								value={topic}
								className="flex h-8 items-center justify-between px-4 data-[focus]:rounded data-[focus]:bg-zinc-100"
							>
								{({ selected }) => (
									<>
										{topic.name}
										{selected ? <Check size={18} /> : null}
									</>
								)}
							</ComboboxOption>
						))}
					</ComboboxOptions>
				</>
			)}
		</Combobox>
	);
}
