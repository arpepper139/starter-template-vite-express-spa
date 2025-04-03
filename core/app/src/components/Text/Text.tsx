import React from "react";
import { clsx } from "clsx";
import styles from "./Text.module.css";

export type TextVariant = "body" | "caption" | "small";
export type TextElement = "p" | "span";

/** Props for the Text component */
interface TextProps {
  /** The HTML element to render (p or span) */
  as?: TextElement;
  /** Visual style variant of the text */
  variant?: TextVariant;
  /** If true, the text will be bold */
  bold?: boolean;
  /** If true, the text will be italic */
  italic?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** The content to display */
  children: React.ReactNode;
  /** Optional custom ID for the element. If not provided, a unique ID will be generated */
  id?: string;
  /** Optional role for accessibility */
  role?: string;
  /** Optional aria-label for accessibility */
  "aria-label"?: string;
}

/**
 * A flexible text component that supports both paragraph and span elements.
 * Provides consistent typography and accessibility features.
 *
 * @example
 * ```tsx
 * <Text>Regular body text</Text>
 * <Text as="span" variant="caption">Small caption text</Text>
 * <Text bold italic>Bold and italic text</Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  as: Component = "p",
  variant = "body",
  bold = false,
  italic = false,
  className,
  children,
  id: customId,
  role,
  "aria-label": ariaLabel,
}) => {
  const generatedId = React.useId();
  const id = customId || `text-${variant}-${generatedId}`;

  const textClasses = clsx(
    styles.text,
    styles[variant],
    bold && styles.bold,
    italic && styles.italic,
    className
  );

  return (
    <Component
      className={textClasses}
      id={id}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
};
