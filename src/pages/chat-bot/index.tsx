import React, { useState } from "react";
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import Page from "@/components/ui/page/Page";
import TextField from "@/components/ui/form-fields/TextField";
import Button from "@/components/ui/buttons/Button";

const title = `Chat Bot coming soon!`;

type DataType = {
  result: string;
  error: {
    message: string;
  };
};

type MessageType = {
  message: string;
  sender: string;
};

interface OnSubmitProps {
  prompt: FieldValues;
  messages: string[];
  setMessages: (messages: string[]) => void;
  setValue: UseFormSetValue<FieldValues>;
  setLoading: (loading: boolean) => void;
}

// Submit function
const onSubmit = async ({
  prompt,
  messages,
  setMessages,
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
    setMessages([...messages, data.result]);
    setLoading(false);
  } catch (error) {
    console.error("Error submitting prompt: ", error);
    setLoading(false);
  }
};

const MessageContainer = ({ messages }: { messages: string[] }) => {
  return (
    <div className="flex flex-col w-full h-full border-2 p-4 rounded-xl">
      {messages.map((message, index) => {
        return <div key={index}>{message}</div>;
      })}
    </div>
  );
};

const ChatBotForm = ({
  messages,
  setMessages,
}: {
  messages: string[];
  setMessages: (messages: string[]) => void;
}) => {
  // Variables
  const [loading, setLoading] = useState(false);

  // React Hook Form variables
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FieldValues>();

  return (
    <form
      className="flex w-full gap-4 items-center"
      onSubmit={handleSubmit((prompt: FieldValues) =>
        onSubmit({ prompt, messages, setMessages, setValue, setLoading })
      )}
    >
      <TextField
        control={control}
        name="prompt"
        type="text"
        placeholder="What would you like to say?"
        required="Message is required."
        errors={errors}
      />
      <div className="pb-5">
        <Button label="Send" loading={loading} className="p-2" />
      </div>
    </form>
  );
};

export default function ChatBot() {
  const [messages, setMessages] = useState<string[]>([
    "Test 1",
    "Test 2",
    "Test 3",
  ]);

  return (
    <Page>
      <div className="flex w-full justify-center pb-4">
        <div className="flex flex-col items-center w-full max-w-2xl gap-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <MessageContainer messages={messages} />
          <ChatBotForm messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </Page>
  );
}
