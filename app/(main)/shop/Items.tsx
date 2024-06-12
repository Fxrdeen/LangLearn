"use client";

import { reFillhearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
const POINTS_TO_REFILL = 10;
type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
const Items = ({ hearts, hasActiveSubscription, points }: Props) => {
  const [pending, startTransition] = useTransition();
  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;
    startTransition(() => {
      reFillhearts().catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/heart.svg"} height={60} width={60} alt={"hearts"} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image
                src={"/points.svg"}
                height={20}
                width={20}
                alt={"points"}
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
