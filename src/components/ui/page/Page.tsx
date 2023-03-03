import { useState, useEffect } from "react";
import useWindowSize from "@/components/utils/hooks/useWindowSize";
import TopBar from "src/components/feature-navigation/ui/TopBar";

interface PageProps {
  children: JSX.Element;
}

export default function Page({ children }: PageProps) {
  const size = useWindowSize();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(size.height);
  }, [size.height]);

  return (
    <div
      className="flex flex-col bg-main-dark text-main-dark w-full"
      style={{
        height,
      }}
    >
      <div className="flex h-28">
        <TopBar />
      </div>
      <div className="flex w-full h-full overflow-auto">{children}</div>
    </div>
  );
}
