import Feedwrapper from "@/components/Feedwrapper";
import Stickywrapper from "@/components/Stickywrapper";
import UserProgress from "@/components/UserProgress";
import { getTopTenUsers, getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "../shop/Items";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Quests from "@/components/Quests";

const LeaderboardPage = async () => {
  const userProgressData = await getUserProgress();
  if (!userProgressData || !userProgressData.activeCourse) {
    redirect("/courses");
  }
  const leaderboardData = await getTopTenUsers();
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <Stickywrapper>
        <UserProgress
          activeCourse={userProgressData?.activeCourse}
          hearts={userProgressData.hearts}
          hasActiveSubscription={false}
          points={userProgressData.points}
        />
        <Quests points={userProgressData.points} />
      </Stickywrapper>
      <Feedwrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/leaderboard.svg"}
            alt="leaderboard"
            width={90}
            height={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            LeaderBoard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboardData?.map((userProgress, id) => (
            <div
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-lime-700 mr-4">{id + 1}</p>
              <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">{userProgress.points} XP</p>
            </div>
          ))}
        </div>
      </Feedwrapper>
    </div>
  );
};

export default LeaderboardPage;
