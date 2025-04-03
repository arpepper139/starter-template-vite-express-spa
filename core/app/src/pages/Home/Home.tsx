import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { apiFetch } from "../../utilities/apiFetch";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import type { UserShape, CustomMessage } from "api-types";
import { Heading } from "../../components/Heading";
import { Form, type FormField } from "../../components/Form";
import styles from "./Home.module.css";

type NewUser = Omit<UserShape, "id">;

const HomeSuspenseFallback = () => <div>Loading</div>;

const HomeErrorFallback = () => <div>Error</div>;

const HomeBase = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["test"],
    queryFn: () => apiFetch<CustomMessage>("/api/test"),
  });

  const { mutateAsync: createUser } = useMutation({
    mutationFn: (newUser: NewUser) =>
      apiFetch<UserShape>("/api/users", {
        method: "POST",
        body: newUser,
      }),
  });

  const handleSubmit = async (values: Record<string, string>) => {
    const user: NewUser = {
      name: values.name,
      email: values.email,
    };
    return await createUser(user);
  };

  const fields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
  ];

  return (
    <>
      <div className={styles.container}>
        <Heading level={4}>Welcome! {`${data.message}`}</Heading>
      </div>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        heading="Create a New User"
      />
    </>
  );
};

export const Home = () => {
  return (
    <ErrorBoundary
      fallback={<HomeErrorFallback />}
      onError={(error, info) => {
        console.error("Caught an error:", error);
        console.error("Error info:", info);
      }}
    >
      <Suspense fallback={<HomeSuspenseFallback />}>
        <HomeBase />
      </Suspense>
    </ErrorBoundary>
  );
};
