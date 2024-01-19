import React from "react";
import MessageBox from "./messageBox";

const mockData = [
  {
    role: "agent",
    content: "Hello, how can I help you?",
  },
  {
    role: "customer",
    content: "I have a problem with my account",
  },
  {
    role: "agent",
    content: "What seems to be the problem?",
  },
  {
    role: "customer",
    content: "I can't access my account",
  },
  {
    role: "agent",
    content: "What is your email address?",
  },
  {
    role: "customer",
    content: "asdfg@gmail.com",
  },
  {
    role: "agent",
    content: "I have sent you a password reset link",
  },
  {
    role: "customer",
    content: "Thank you",
  },
  {
    role: "agent",
    content: "You're welcome",
  },
];

export default function Verbatim({ data = mockData }: { data?: any }) {
  return (
    <div className="mb-8">
      <h1 className="text-xl text-secondary-600">Verbatim</h1>
      <div className="my-2 py-3 bg-gray-50 min-h-72 max-h-96 overflow-y-scroll">
        {data.map((item: any, index: number) => (
          <MessageBox key={index} dataObject={item} />
        ))}
      </div>
    </div>
  );
}
