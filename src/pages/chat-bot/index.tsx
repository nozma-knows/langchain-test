import React, { useState, useEffect, useRef } from "react";
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form";
import Page from "@/components/ui/page/Page";
import TextField from "@/components/ui/form-fields/TextField";
import Button from "@/components/ui/buttons/Button";
import MessageContainer from "@/components/feature-chat-bot/ui/MessageContainer";

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
  prompt: any;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  setValue: UseFormSetValue<FieldValues>;
  setLoading: (loading: boolean) => void;
}

const addUserMessage = ({
  prompt,
  messages,
  setMessages,
  setValue,
}: {
  prompt: any;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  setValue: any;
}) => {
  setMessages([
    ...messages,
    {
      message: prompt,
      sender: "user",
    },
  ]);
  setValue("prompt", "");
};

const grabResponse = async ({
  prompt,
  messages,
  setMessages,
  setLoading,
}: {
  prompt: string;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  setLoading: (loading: boolean) => void;
}) => {
  try {
    console.log("prompt: ", prompt);
    const response = await fetch("api/chat-bot-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    console.log("response: ", response);
    const data = await response.json();
    setMessages([
      ...messages,
      {
        message: data.result,
        sender: "bot",
      },
    ]);
    setLoading(false);
  } catch (error) {
    console.error("Error submitting prompt: ", error);
    setLoading(false);
  }
  setLoading(false);
};

const onSubmit = async ({
  prompt,
  messages,
  setMessages,
  setValue,
  setLoading,
}: OnSubmitProps) => {
  setLoading(true);
  addUserMessage({ prompt, messages, setMessages, setValue });
};

const ChatBotForm = ({
  messages,
  setMessages,
  loading,
  setLoading,
}: {
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  // Variables

  // React Hook Form variables
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      prompt: "",
    },
  });

  return (
    <form
      className="flex w-full gap-4 items-center"
      onSubmit={handleSubmit(({ prompt }) =>
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
        <Button label="Send" disabled={loading} className="flex py-2" />
      </div>
    </form>
  );
};

export default function ChatBot() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === "user") {
      const prompt = messages[messages.length - 1].message;
      grabResponse({ prompt, messages, setMessages, setLoading });
    }
    console.log("HERE");
  }, [messages, setMessages]);

  return (
    <Page>
      <div className="flex w-full justify-center pb-4">
        <div className="flex flex-col items-center w-full max-w-2xl gap-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <MessageContainer messages={messages} />
          <ChatBotForm
            messages={messages}
            setMessages={setMessages}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </Page>
  );
}
