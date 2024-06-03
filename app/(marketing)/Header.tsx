"use client";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";
import { Loader } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4 ">
      <div className="lg:max-w-7xl mx-auto flex items-center justify-between h-full ">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"/mascot.svg"} height={40} width={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            LearnLang
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              signUpFallbackRedirectUrl={"/learn"}
              signUpForceRedirectUrl={"/learn"}
            >
              <Button variant={"ghost"} size={"lg"}>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
