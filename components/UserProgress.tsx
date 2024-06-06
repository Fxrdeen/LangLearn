import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
type Props = {
  hasActiveSubscription: boolean;
  activeCourse: { title: string; imgSrc: string };
  points: number;
  hearts: number;
};
const UserProgress = ({
  hasActiveSubscription,
  activeCourse,
  points,
  hearts,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imgSrc}
            alt="cro"
            height={32}
            width={32}
            className="rounded-md border"
          />
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-orange-500">
          <Image
            src={"/points.svg"}
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-rose-500">
          <Image
            src={"/heart.svg"}
            height={28}
            width={28}
            alt="Points"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-3" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
