import Feedwrapper from "@/components/Feedwrapper";
import Stickywrapper from "@/components/Stickywrapper";
import React from "react";
import Header from "./Header";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <Stickywrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </Stickywrapper>
      <Feedwrapper>
        <Header title={userProgress.activeCourse.title} />
      </Feedwrapper>
    </div>
  );
};

export default LearnPage;
