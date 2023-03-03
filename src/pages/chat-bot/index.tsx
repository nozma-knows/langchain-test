import React from "react";
import Page from "@/components/ui/page/Page";

const title = `Chat Bot comming soon!`;

export default function SimplePrompt() {
  return (
    <Page>
      <div className="flex flex-col w-full justify-center items-center gap-12">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </Page>
  );
}
