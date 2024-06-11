import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("seeding database");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imgSrc: "/es.svg",
      },
      {
        id: 2,
        title: "French",
        imgSrc: "/fr.svg",
      },
      {
        id: 3,
        title: "Croatian",
        imgSrc: "/hr.svg",
      },
      {
        id: 4,
        title: "Italian",
        imgSrc: "/it.svg",
      },
    ]);
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: "Nouns",
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        title: "Verbs",
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        title: "Nouns",
        order: 3,
      },
      {
        id: 4,
        unitId: 1,
        title: "Nouns",
        order: 4,
      },
      {
        id: 5,
        unitId: 1,
        title: "Nouns",
        order: 5,
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        question: "Which one these is the 'man'?",
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        question: "'The Man'",
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        question: "Which one of these is 'the robot'",
        order: 3,
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        text: "el hombre",
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
        correct: true,
      },
      {
        id: 2,
        challengeId: 1,
        text: "la mujer",
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
        correct: false,
      },
      {
        id: 3,
        challengeId: 1,
        text: "el robot",
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
        correct: false,
      },
      {
        id: 4,
        challengeId: 2,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
        correct: true,
      },
      {
        id: 5,
        challengeId: 2,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
        correct: false,
      },
      {
        id: 6,
        challengeId: 2,
        text: "el robot",
        audioSrc: "/es_robot.mp3",
        correct: false,
      },
      {
        id: 7,
        challengeId: 3,
        text: "el hombre",
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
        correct: false,
      },
      {
        id: 8,
        challengeId: 3,
        text: "la mujer",
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
        correct: false,
      },
      {
        id: 9,
        challengeId: 3,
        text: "el robot",
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
        correct: true,
      },
    ]);

    console.log("seeding done");
  } catch (error) {
    console.log(error);
    throw new Error("failed to seed database");
  }
};
main();
