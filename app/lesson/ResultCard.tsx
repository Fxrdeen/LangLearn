import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

const ResultCard = ({ value, variant }: Props) => {
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "hearts" && "bg-rose-500 border-rose-500",
        variant === "points" && "bg-orange-500 border-orange-500"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-sm",
          variant === "hearts" && "bg-rose-500",
          variant === "points" && "bg-orange-500"
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
          variant === "hearts" ? "text-rose-500" : "text-orange-500"
        )}
      >
        <Image
          src={imageSrc}
          alt="Icon"
          height={28}
          width={28}
          className="mr-2"
        />
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
