import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

const arr = [
  {
    label: "Learn",
    iconSrc: "./learn.svg",
    href: "/learn",
  },
  {
    label: "LeaderBoard",
    iconSrc: "./leaderboard.svg",
    href: "/leaderboard",
  },
  {
    label: "Quests",
    iconSrc: "./quests.svg",
    href: "/quests",
  },
  {
    label: "Shop",
    iconSrc: "./shop.svg",
    href: "/shop",
  },
];
const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        className,
        "flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col"
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"/mascot.svg"} height={40} width={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            LearnLang
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-4 flex-1">
        {arr.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            iconSrc={item.iconSrc}
            href={item.href}
          />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Sidebar;
