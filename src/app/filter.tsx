"use client";

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from "@headlessui/react";
import { useDebounce } from "@uidotdev/usehooks";
import clsx from "clsx";
import { Check, ChevronsDownUp, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Topic = {
	id: string;
	name: string;
};

const topics = [
	{ id: "health", name: "Health" },
	{ id: "lifestyle", name: "Lifestyle" },
] satisfies Topic[];

export function Filter() {
	const searchParams = useSearchParams();

	const pathname = usePathname();
	const router = useRouter();

	const initialQuery = searchParams.get("query");
	const [query, setQuery] = useState(initialQuery ?? "");
	const debouncedQuery = useDebounce(query, 1000);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (debouncedQuery) {
			params.set("query", debouncedQuery);
		} else {
			params.delete("query");
		}

		router.replace(`${pathname}?${params.toString()}`);
	}, [debouncedQuery, pathname, router, searchParams]);

	const topicValues = searchParams.getAll("topic");
	const value = topics.filter((topic) => topicValues.includes(topic.id));

	return (
		<div className="mt-8 flex h-11 text-sm">
			<div className="flex flex-1 items-center gap-x-4 rounded-l border border-r-0 border-zinc-200 px-4">
				<div>
					<Search size={18} className="text-zinc-400" />
				</div>

				<input
					type="text"
					className="w-full bg-inherit focus-visible:outline-none"
					placeholder="Search posts"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>

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
								"flex w-40 border border-l-0 sm:w-[13.75rem]",
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
							className="w-40 rounded-b border border-zinc-200 bg-white p-1.5 text-sm empty:hidden sm:w-[13.75rem]"
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
		</div>
	);
}
