"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  if (isLoading) return <Skeleton />;
  if (error) return null;
  const assingIssue = async (userId: string) => {
    if (userId === "unassigned") {
      userId = "";
    }

    await axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch(() => {
        toast.error("An unexpected error occurred.");
      });
    toast.success("Successfully toasted!");
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assingIssue}
      >
        <Select.Trigger placeholder='assign' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={"unassigned"}> Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
};
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => await axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

export default AssigneSelect;
