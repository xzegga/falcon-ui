import React from "react";

export default function MessageBox({ dataObject }: { dataObject?: any }) {
  const isAgent = dataObject?.role === "agent";

  const UserAvatar = (
    <div className={`${isAgent ? "order-0" : "order-1"}`} title="User">
      <div
        className={`h-10 w-10 cursor-default rounded-full text-center text-2xl leading-10 ${
          isAgent
            ? "bg-primary-main text-white"
            : "bg-secondary-100 text-primary-main"
        }`}
      >
        {isAgent ? "A" : "C"}
      </div>
    </div>
  );

  const agentBubble =
    "bg-gray-200 rounded-ss-none";

  const customerBubble =
    "bg-slate-200 rounded-se-none";

  return (
    <div
      className={`flex w-full items-start gap-3 px-4 py-3 ${
        isAgent ? "justify-start" : "justify-end"
      }`}
    >
      {UserAvatar}
      <div
        className={`flex min-w-[90%] max-w-[90%] ${
          isAgent ? "items-start" : "items-end"
        } items-start`}
      >
        <div
          className={`relative w-full rounded-[8px] p-3 px-4
          ${isAgent ? agentBubble : customerBubble}
            after:content-[' ']
            whitespace-normal
            break-words
            shadow-gray-shadow`}
        >
          <div className="mb-1">{dataObject?.content}</div>
        </div>
      </div>
    </div>
  );
}
