import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Progress } from "./ui/progress";
import { getUserProgress } from "@/db/queries";
type Props = {
  points: number;
};
const quests = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];

const Quests = async ({ points }: Props) => {
  const userProgressData = await getUserProgress();
  if (!userProgressData) return null;
  return (
    <div className="border-2 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href={"/quests"}>
          <Button variant={"primaryOutline"} size={"sm"}>
            View All
          </Button>
        </Link>
      </div>
      <ul className="w-full">
        {quests.map((quest) => {
          const progress = (userProgressData.points / quest.value) * 100;
          return (
            <div
              className="flex items-center w-full pb-4 gap-x-3"
              key={quest.title}
            >
              <Image
                src={"/points.svg"}
                height={40}
                width={40}
                alt={"points"}
              />
              <div className="flex flex-col gap-y-5 w-full">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Quests;
