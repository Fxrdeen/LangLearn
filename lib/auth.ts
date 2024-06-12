import { auth } from "@clerk/nextjs/server";

export const getIsAdmin = async () => {
  const { userId } = auth();
  return userId === "user_2hMekxCJqa9A8LGIJ4fR1fGqLzH";
};
