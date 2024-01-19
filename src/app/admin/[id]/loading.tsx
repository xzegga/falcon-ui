import { Spinner } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <p className="flex min-h-screen items-center justify-center text-gray-800 p-24">
      <Spinner color="secondary" size="lg" />
    </p>
  );
}
