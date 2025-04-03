import { Suspense } from "react";
import { useParams } from "react-router";
import { apiFetch } from "../../utilities/apiFetch";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { UserShape } from "api-types";
import { Form, type FormField } from "../../components/Form";

const UserSuspenseFallback = () => <div>Loading</div>;

const UserErrorFallback = () => <div>Error</div>;

const UserBase = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => apiFetch<UserShape>(`/api/users/${userId}`),
  });

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: (updatedUser: Omit<UserShape, "id">) =>
      apiFetch<UserShape>(`/api/users/${userId}`, {
        method: "PUT",
        body: updatedUser,
      }),
    onSuccess: (updatedUser) => {
      // Update the individual user query
      queryClient.setQueryData<UserShape>(["user", userId], updatedUser);

      // Update the users list in the cache
      queryClient.setQueryData<UserShape[]>(
        ["users"],
        (oldUsers: UserShape[] | undefined) => {
          if (!oldUsers) return [updatedUser];
          return oldUsers.map((user) =>
            user.id === userId ? updatedUser : user
          );
        }
      );
    },
  });

  const handleSubmit = async (values: Record<string, string>) => {
    const updatedUser = {
      name: values.name,
      email: values.email,
    };
    return await updateUser(updatedUser);
  };

  const fields: FormField[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      initialValue: user.name,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      initialValue: user.email,
    },
  ];

  // TO DO -- consider placing error boundary in a place where it will catch errors within the component, not just render -- maybe at the route level?
  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      heading="Edit User"
      submitText="Update User"
    />
  );
};

export const User = () => {
  return (
    <ErrorBoundary
      fallback={<UserErrorFallback />}
      onError={(error, info) => {
        console.error("Caught an error:", error);
        console.error("Error info:", info);
      }}
    >
      <Suspense fallback={<UserSuspenseFallback />}>
        <UserBase />
      </Suspense>
    </ErrorBoundary>
  );
};
