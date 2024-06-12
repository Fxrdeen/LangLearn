import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });
  return data;
});

export const getUnits = cache(async () => {
  const { userId } = auth();
  const userprogress = await getUserProgress();
  if (!userId || !userprogress?.activeCourseId) {
    return [];
  }
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userprogress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });
  const normalizeddata = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }
      const challengesWithCompletedStatus = lesson.challenges.every(
        (challenge) => {
          return (
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed)
          );
        }
      );
      return { ...lesson, completed: challengesWithCompletedStatus };
    });
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });
  return normalizeddata;
});

export const getCourses = cache(async () => {
  const courses = await db.query.courses.findMany();
  return courses;
});

export const getCourseById = cache(async (id: number) => {
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });
  return course;
});

export const getCourseProgress = cache(async () => {
  const { userId } = auth();
  const userprogress = await getUserProgress();
  if (!userId || !userprogress?.activeCourseId) {
    return null;
  }
  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userprogress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });
  const firstUnCompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false
          )
        );
      });
    });
  return {
    activeLesson: firstUnCompletedLesson,
    activeLessonId: firstUnCompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = auth();
  const courseprogress = await getCourseProgress();
  const lessonId = id || courseprogress?.activeLessonId;
  if (!userId || !lessonId) {
    return null;
  }
  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });
  if (!data || !data.challenges) {
    return null;
  }
  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge?.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed };
  });
  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseprogress = await getCourseProgress();

  if (!courseprogress?.activeLessonId) {
    return 0;
  }
  const lesson = await getLesson(courseprogress?.activeLessonId);
  if (!lesson) {
    return 0;
  }
  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );
  return percentage;
});

export const getTopTenUsers = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
  return data;
});
