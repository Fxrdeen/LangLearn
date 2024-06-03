"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[998px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src={"/hero.svg"} fill alt="hero" />
      </div>
      <div className="flex flex-col items-center gap-y-10">
        <h1 className="text-cl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, Practice, and master new languages with LearnLang
        </h1>
        <div>
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                signInFallbackRedirectUrl={"/learn"}
                signInForceRedirectUrl={"/learn"}
              >
                <Button size={"lg"} variant={"secondary"} className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                signUpFallbackRedirectUrl={"/learn"}
                signUpForceRedirectUrl={"/learn"}
              >
                <Button
                  size={"lg"}
                  variant={"primaryOutline"}
                  className="w-full"
                >
                  I Already have an Account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size={"lg"} variant={"secondary"} className="w-full">
                <Link href={"/learn"}>Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
