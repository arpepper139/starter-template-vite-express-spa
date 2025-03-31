import { Suspense } from "react";
import { useParams } from "react-router";
import { apiFetch } from "../../utilities/apiFetch";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { UserShape } from "api-types";

const UserSuspenseFallback = () => <div>Loading</div>;

const UserErrorFallback = () => <div>Error</div>;

export const User = () => {
  const { userId } = useParams();

  // TO DO -- handle invalid userId param more gracefully (maybe by moving error boundary to the Route as suggested below)
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => apiFetch<UserShape>(`/api/users/${userId}`),
  });

  // TO DO -- consider placing error boundary in a place where it will catch errors within the component, not just render -- maybe at the route level?
  return (
    <ErrorBoundary
      fallback={<UserErrorFallback />}
      onError={(error, info) => {
        console.error("Caught an error:", error);
        console.error("Error info:", info);
      }}
    >
      <Suspense fallback={<UserSuspenseFallback />}>
        <div>{JSON.stringify(user)}</div>
      </Suspense>
    </ErrorBoundary>
  );
};
