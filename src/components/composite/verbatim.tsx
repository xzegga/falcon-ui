import React from "react";

export default function Verbatim({ dataObject }: { dataObject?: any }) {
  const isAgent = dataObject?.roleType === "agent";

  const UserAvatar = (
    <div className="tw-preflight tw-order-1" title="User">
      <div
        className={`tw-preflight tw-h-10 tw-w-10 tw-cursor-default tw-rounded-full tw-text-center tw-text-2xl tw-leading-10 ${isAgent ? "bg-primary-main text-white " : "bg-secondary-main text-primary-main"}`}
      >
        {isAgent ? "A" : "C"}
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <h1 className="text-xl text-secondary-600">Verbatim</h1>
      <div className="my-2 py-3 bg-secondary-400 min-h-96 overflow-y-scroll"></div>
    </div>
  );
}
