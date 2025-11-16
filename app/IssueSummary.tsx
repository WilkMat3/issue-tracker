import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = (IssueSummaryProps: IssueSummaryProps) => {
  const statuses: { label: string; value: number; status?: Status }[] = [
    { label: "Open Issues", value: IssueSummaryProps.open, status: "OPEN" },
    {
      label: "In Progress Issues",
      value: IssueSummaryProps.inProgress,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", value: IssueSummaryProps.closed, status: "DONE" },
  ];
  return (
    <Flex>
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction='column' gap='2'>
            <Link
              className='text-sm font-medium '
              href={`/issues/list?status=${status.status}`}
            >
              {status.label}
            </Link>
            <Text size='5' className='font-bold'>
              {status.value}{" "}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
