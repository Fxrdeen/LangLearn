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
        id: 1,
        title: "Croatian",
        imgSrc: "/hr.svg",
      },
      {
        id: 1,
        title: "Italian",
        imgSrc: "/it.svg",
      },
    ]);
    console.log("seeding done");
  } catch (error) {
    console.log(error);
    throw new Error("failed to seed database");
  }
};
main();
