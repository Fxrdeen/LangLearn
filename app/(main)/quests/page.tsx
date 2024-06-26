import Feedwrapper from "@/components/Feedwrapper";
import Quests from "@/components/Quests";
import Stickywrapper from "@/components/Stickywrapper";
import { Progress } from "@/components/ui/progress";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

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

const QuestsPage = async () => {
  const userProgressData = await getUserProgress();
  if (!userProgressData || !userProgressData.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <Stickywrapper>
        <UserProgress
          activeCourse={userProgressData?.activeCourse}
          hearts={userProgressData.hearts}
          hasActiveSubscription={false}
          points={userProgressData.points}
        />
      </Stickywrapper>
      <Feedwrapper>
        <div className="w-full flex flex-col items-center">
          <Image src={"/quests.svg"} alt="quests" width={90} height={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points.
          </p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgressData.points / quest.value) * 100;
              return (
                <div
                  className="flex items-center w-full p-4 gap-x-4"
                  key={quest.title}
                >
                  <Image
                    src={"/points.svg"}
                    height={60}
                    width={60}
                    alt={"points"}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </Feedwrapper>
    </div>
  );
};

export default QuestsPage;
