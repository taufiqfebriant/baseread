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
							"flex border border-l-0 w-[22rem]",
							{
								"rounded-r-[0.4rem]": !open,
							},
							{
								"rounded-b-none": open,
							},
						)}
					>
						<ComboboxInput
							className="data-[focus]:outline-none border-l pl-[1.6rem] min-w-0"
							placeholder="Select topics"
							aria-label="Topics"
						/>
						<ComboboxButton className="text-zinc-400 w-[4.4rem] flex justify-center items-center flex-shrink-0">
							<ChevronsDownUp size={18} />
						</ComboboxButton>
					</div>

					<ComboboxOptions
						anchor="bottom start"
						className="empty:hidden text-[1.4rem] border border-t-0 border-zinc-200 w-[22rem] py-[0.6rem] px-[0.6rem] rounded-b-[0.4rem]"
					>
						{topics.map((topic) => (
							<ComboboxOption
								key={topic.id}
								value={topic}
								className="h-[3.2rem] flex items-center px-[1.6rem] data-[focus]:bg-zinc-100 data-[focus]:rounded-[0.4rem] justify-between"
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
