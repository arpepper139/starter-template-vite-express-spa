import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "default" | "large";
export type ButtonRadius = "default" | "circle";

/** Props for the Button component */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** If true, the button will take up the full width of its container */
  fullWidth?: boolean;
  /** If true, the button will be disabled and not respond to user interaction */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
  /** If true, shows a loading spinner and disables the button */
  isLoading?: boolean;
  /** Icon to display on the left side of the button content */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side of the button content */
  rightIcon?: React.ReactNode;
  /** If true, renders the button as a text-only button without background or border */
  isText?: boolean;
  /** Border radius style for the button */
  borderRadius?: ButtonRadius;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant = "primary",
      size = "default",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      isText = false,
      borderRadius = "default",
      // Native default is 'submit', override to 'button' to prevent form submission
      type = "button",
      className = "",
      ...props
    },
    ref
  ) {
    const buttonClasses = clsx(
      styles.button,
      styles[variant],
      styles[borderRadius],
      size !== "default" && styles[size],
      isLoading && styles.loading,
      isText && styles.text,
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        type={type}
        {...props}
      >
        {isLoading ? null : (
          <>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);
