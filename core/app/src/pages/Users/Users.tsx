import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { apiFetch } from "../../utilities/apiFetch";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import type { UserShape } from "api-types";
import { Heading } from "../../components/Heading/Heading";
import styles from "./Users.module.css";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router";

const UsersSuspenseFallback = () => <div>Loading</div>;

const UsersErrorFallback = () => <div>Error</div>;

interface UserCardProps {
  user: UserShape;
  onDelete: (userId: string) => void;
}

const UserCard = ({ user, onDelete }: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <Heading level={3}>{user.name}</Heading>
        <p className={styles.email}>{user.email}</p>
      </div>
      <div className={styles.buttonGroup}>
        <Button
          variant="secondary"
          size="small"
          onClick={() => navigate(`/users/${user.id}`)}
          aria-label={`Edit user ${user.name}`}
        >
          View User
        </Button>
        <Button
          variant="secondary"
          size="small"
          onClick={() => onDelete(user.id)}
          aria-label={`Delete user ${user.name}`}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export const Users = () => {
  const { data: users, refetch } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () => apiFetch<UserShape[]>("/api/users"),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (userId: string) =>
      apiFetch(`/api/users/${userId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
    }
  };

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
        <div className={styles.container}>
          <Heading level={2} className={styles.title}>
            All Users
          </Heading>
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
