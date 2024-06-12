import Feedwrapper from "@/components/Feedwrapper";
import Stickywrapper from "@/components/Stickywrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./Items";

const ShopPage = async () => {
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
          <Image src={"/shop.svg"} alt="shop" width={90} height={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff!
          </p>
          <Items
            points={userProgressData.points}
            hearts={userProgressData.hearts}
            hasActiveSubscription={false}
          />
        </div>
      </Feedwrapper>
    </div>
  );
};

export default ShopPage;
