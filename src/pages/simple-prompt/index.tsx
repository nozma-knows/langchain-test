import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Page from "@/components/ui/page/Page";

const title = `Simple Prompt`;

type DataType = {
  result: string;
  error: {
    message: string;
  };
};

export default function SimplePrompt() {
  const { register, handleSubmit } = useForm<FieldValues>(); // initalize for react-hook-form

  // Variables
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType>();

  // Submit function
  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/simple-prompt-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      console.log("response: ", response);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting prompt: ", error);
      setLoading(false);
    }
  };

  return (
    <Page>
      <div className="flex flex-col w-full justify-center items-center gap-12">
        <h1 className="text-4xl font-bold">{title}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col gap-4 items-center"
        >
          <input
            {...register("prompt")}
            className="p-4 rounded-xl w-full text-main-light"
            placeholder="Enter a prompt"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input
            className="cursor-pointer border-2 w-fit py-2 px-4 rounded-full hover:scale-110"
            type="submit"
            value={loading ? "Loading..." : "Submit Prompt"}
            disabled={loading}
          />
          {data && (
            <div>
              <div>{data.result || data.error.message}</div>
            </div>
          )}
        </form>
      </div>
    </Page>
  );
}
