import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};
export const metadata: Metadata = {
  title: "LearnLang",
  description: "Learn Different languages",
  icons: {
    icon: "/mascot.svg",
  },
};
const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
};

export default layout;
