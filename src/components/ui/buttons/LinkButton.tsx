import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  label?: string | JSX.Element;
  className?: string;
  textStyle?: string;
  href: string;
  newTab?: boolean;
}

export default function LinkButton({
  label,
  className,
  textStyle,
  href,
  newTab,
}: LinkButtonProps) {
  return (
    <Link
      className={`${textStyle ? `${textStyle}` : "link"}`}
      href={href}
      {...(newTab ? { target: "_blank" } : {})}
    >
      <div className={`${className} button`}>{label || "Link"}</div>
    </Link>
  );
}
