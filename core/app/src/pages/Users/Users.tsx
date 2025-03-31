import { Suspense, Fragment } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { apiFetch } from "../../utilities/apiFetch";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { UserShape } from "api-types";

const UsersSuspenseFallback = () => <div>Loading</div>;

const UsersErrorFallback = () => <div>Error</div>;

export const Users = () => {
  const { data: users } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () => apiFetch<UserShape[]>("/api/users"),
  });

  // TO DO -- consider placing error boundary in a place where it will catch errors within the component, not just render -- maybe at the route level?
  return (
    <ErrorBoundary
      fallback={<UsersErrorFallback />}
      onError={(error, info) => {
        console.error("Caught an error:", error);
        console.error("Error info:", info);
      }}
    >
      <Suspense fallback={<UsersSuspenseFallback />}>
        <div>
          <p>All Users</p>
          {users.map((user, index) => {
            return <Fragment key={index}>{JSON.stringify(user)}</Fragment>;
          })}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
