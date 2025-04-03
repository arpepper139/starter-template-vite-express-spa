import { Button, ButtonSize } from "../Button/Button";
import { useTheme } from "../../providers/ThemeProvider/ThemeProvider";
import { Half2Icon } from "@radix-ui/react-icons";

/** Props for the ThemeToggle component */
interface ThemeToggleProps {
  /** Size of the toggle button */
  size?: ButtonSize;
}

/**
 * A button component that toggles between light and dark themes.
 * Uses the ThemeProvider context to manage theme state.
 *
 * @example
 * ```tsx
 * <ThemeToggle size="small" />
 * ```
 */
export const ThemeToggle = ({ size = "default" }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size={size}
      borderRadius="circle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <Half2Icon width={16} height={16} />
    </Button>
  );
};
