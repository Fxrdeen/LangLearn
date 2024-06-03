import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full ">
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/hr.svg"}
            alt="cro"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          Croatian
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/es.svg"}
            alt="cro"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/fr.svg"}
            alt="cro"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/it.svg"}
            alt="cro"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
        <Button size={"lg"} variant={"ghost"} className="w-full">
          <Image
            src={"/jp.svg"}
            alt="cro"
            height={32}
            width={32}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
      </div>
    </div>
  );
};

export default Footer;
