import Feedwrapper from "@/components/Feedwrapper";
import Stickywrapper from "@/components/Stickywrapper";
import React from "react";
import Header from "./Header";
import UserProgress from "@/components/UserProgress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { units } from "@/db/schema";
import Unit from "./Unit";

const LearnPage = async () => {
  const userProgress = await getUserProgress();
  const unitsData = await getUnits();
  const courseProgressData = await getCourseProgress();
  const lessonPercentageData = await getLessonPercentage();
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  if (!courseProgressData) {
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
        {unitsData.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgressData?.activeLesson}
              activeLessonPercentage={lessonPercentageData}
            />
          </div>
        ))}
      </Feedwrapper>
    </div>
  );
};

export default LearnPage;
