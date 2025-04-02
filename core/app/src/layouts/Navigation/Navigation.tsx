import { Link } from "react-router";
import { Button } from "../../components/Button/Button";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>
        <Button variant="primary" size="small">
          Home
        </Button>
      </Link>
      <Link to="/users" className={styles.link}>
        <Button variant="primary" size="small">
          Users
        </Button>
      </Link>
      <ThemeToggle size="small" />
    </nav>
  );
};
