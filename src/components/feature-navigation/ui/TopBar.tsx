import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMenu, IoClose } from "react-icons/io5";
import TopBarDropdown from "./TopBarDropdown";
import useWindowSize from "@/components/utils/hooks/useWindowSize";

const title = "Langchain Examples";

export default function TopBar() {
  const router = useRouter();
  const size = useWindowSize();
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (showDropDown && size.width > 770) {
      setShowDropDown(false);
    }
  }, [showDropDown, size]);

  const pages = [
    {
      label: "Simple Prompt",
      link: "/simple-prompt",
    },
    {
      label: "Chat Bot",
      link: "/chat-bot",
    },
  ];

  const pathRoute = `/${router.pathname.split("/")[1]}`;
  return (
    <div className="flex justify-between items-center w-full px-2 sm:px-8 text-main-dark bg-main-dark">
      <Link href="/" className="flex items-center gap-2">
        <div className="text-2xl lg:text-3xl font-bold button">{title}</div>
      </Link>
      <div className={`flex items-center gap-4`}>
        {pages.map((page: { label: string; link: string }) => {
          return (
            <Link
              className={`${
                page.link === pathRoute && "text-[#a56baf]"
              } text-lg font-semibold button hidden md:flex`}
              key={page.label}
              href={page.link}
            >
              {page.label}
            </Link>
          );
        })}
        <div>
          {showDropDown ? (
            <>
              <IoClose
                className="flex md:hidden text-3xl button cursor-pointer"
                onClick={() => setShowDropDown(false)}
              />
              <div className="flex md:hidden">
                <TopBarDropdown
                  pages={pages}
                  close={() => setShowDropDown(false)}
                />
              </div>
            </>
          ) : (
            <IoMenu
              className="flex md:hidden text-3xl button cursor-pointer"
              onClick={() => setShowDropDown(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
