import React from "react";
import Page from "@/components/ui/page/Page";
import LinkButton from "src/components/ui/buttons/LinkButton";

const title = `Test out different Langchain features!`;

export default function Home() {
  return (
    <Page>
      <div className="flex flex-col w-full justify-center items-center gap-12">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="">
          <LinkButton
            className="text-sm sm:text-base bg-main-light p-4 rounded-xl button text-main-light font-bold"
            label="Try out Simple Prompt"
            href="/simple-prompt"
          />
        </div>
      </div>
    </Page>
  );
}
