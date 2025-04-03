import { Heading } from "../../components/Heading";
import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <Heading level={1}>404 - Page Not Found</Heading>
    </div>
  );
};
