import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "blue" | "yellow" | "green" }
> = {
  OPEN: { label: "Open", color: "blue" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  DONE: { label: "Closed", color: "green" },
};
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
