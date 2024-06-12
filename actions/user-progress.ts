"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) {
    return null;
  }
  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  const existingUserProgress = await getUserProgress();
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: course.id,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  const currentUserProgress = await getUserProgress();
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  if (!challenge) {
    throw new Error("Challenge not found");
  }
  const lessonId = challenge.lessonId;
  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });
  const isPractice = !!existingChallengeProgress;
  if (isPractice) {
    return { error: "practice" };
  }
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }
  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }
  await db
    .update(userProgress)
    .set({ hearts: Math.max(currentUserProgress.hearts - 1, 0) })
    .where(eq(userProgress.userId, userId));
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const reFillhearts = async () => {
  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }
  if (currentUserProgress.hearts === 5) {
    throw new Error("hearts are full");
  }
  if (currentUserProgress.points < 10) {
    throw new Error("not enough points");
  }
  await db
    .update(userProgress)
    .set({ hearts: 5, points: currentUserProgress.points - 10 })
    .where(eq(userProgress.userId, currentUserProgress.userId));
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
