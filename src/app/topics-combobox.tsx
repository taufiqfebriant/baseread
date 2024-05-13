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
							"flex border border-l-0 w-[13.75rem]",
							{
								"rounded-r": !open,
							},
							{
								"[border-top-right-radius:0.25rem] [border-bottom-right-radius:0px]":
									open,
							},
						)}
					>
						<ComboboxInput
							className="data-[focus]:outline-none border-l pl-4 min-w-0"
							placeholder="Select topics"
							aria-label="Topics"
						/>
						<ComboboxButton className="text-zinc-400 w-11 flex justify-center items-center flex-shrink-0">
							<ChevronsDownUp size={18} />
						</ComboboxButton>
					</div>

					<ComboboxOptions
						anchor="bottom start"
						className="empty:hidden text-sm border border-t-0 border-zinc-200 w-[13.75rem] p-1.5 rounded-b"
					>
						{topics.map((topic) => (
							<ComboboxOption
								key={topic.id}
								value={topic}
								className="h-8 flex items-center px-4 data-[focus]:bg-zinc-100 data-[focus]:rounded justify-between"
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
