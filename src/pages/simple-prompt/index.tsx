import React, { useState } from "react";
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form";
import Page from "@/components/ui/page/Page";
import TextField from "@/components/ui/form-fields/TextField";

const title = `Simple Prompt`;

type DataType = {
  result: string;
  error: {
    message: string;
  };
};

interface OnSubmitProps {
  prompt: FieldValues;
  setData: (data: DataType) => void;
  setValue: UseFormSetValue<FieldValues>;
  setLoading: (loading: boolean) => void;
}

// Submit function
const onSubmit = async ({
  prompt,
  setData,
  setValue,
  setLoading,
}: OnSubmitProps) => {
  setLoading(true);
  try {
    const response = await fetch("api/simple-prompt-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
    setData(data);
    setLoading(false);
  } catch (error) {
    console.error("Error submitting prompt: ", error);
    setLoading(false);
  }
};

export default function SimplePrompt() {
  // React Hook Form variables
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FieldValues>();

  // Variables
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType>();

  return (
    <Page>
      <div className="flex flex-col w-full justify-center items-center gap-12">
        <h1 className="text-4xl font-bold">{title}</h1>
        <form
          className="w-1/2 flex flex-col gap-4 items-center"
          onSubmit={handleSubmit((prompt) =>
            onSubmit({ prompt, setData, setValue, setLoading })
          )}
        >
          <TextField
            control={control}
            name="prompt"
            type="text"
            placeholder="Enter a prompt"
            required="Prompt is required."
            errors={errors}
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
