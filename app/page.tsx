import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";

export default async function Home({}) {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "DONE" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='6'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inprogress} closed={closed} />
        <IssueChart open={open} inProgress={inprogress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
