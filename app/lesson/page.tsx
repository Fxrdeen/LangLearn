import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./Quiz";

const Lessonpage = async () => {
  const lessonData = await getLesson();
  const userProgressData = await getUserProgress();
  if (!userProgressData || !lessonData) {
    redirect("/learn");
  }
  const initialPercentage =
    (lessonData.challenges.filter((challenge) => challenge.completed).length /
      lessonData.challenges.length) *
    100;
  return (
    <Quiz
      initialLessonId={lessonData.id}
      initialPercentage={initialPercentage}
      initialLessonChallenges={lessonData.challenges}
      initialHearts={userProgressData.hearts}
      userSubscription={null}
    />
  );
};

export default Lessonpage;
