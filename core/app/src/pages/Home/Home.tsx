import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { apiFetch } from "../../utilities/apiFetch";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type CustomMessage } from "api-types";

export const Home = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["test"],
    queryFn: () => apiFetch<CustomMessage>("/api/test"),
  });

  return (
    <ErrorBoundary
      fallback={<div>Error</div>}
      onError={(error, info) => {
        console.error("Caught an error:", error);
        console.error("Error info:", info);
      }}
    >
      <Suspense fallback={<div>Loading</div>}>
        <div>Hello! {`${data.message}`}</div>
      </Suspense>
    </ErrorBoundary>
  );
};
