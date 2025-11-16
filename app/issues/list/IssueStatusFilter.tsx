"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: string }[] = [
  { label: "All", value: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
    defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        if (status !== "All") {
          const query = params.size ? "?" + params.toString() : "";
          router.push("/issues/list" + query);
        } else {
          router.push("/issues/list");
        }
      }}
    >
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
