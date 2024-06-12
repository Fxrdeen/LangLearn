import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader
        height={60}
        width={60}
        className="animate-spin text-muted-foreground"
      />
    </div>
  );
};

export default Loading;
