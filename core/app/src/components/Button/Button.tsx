import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "small" | "default" | "large";
export type ButtonRadius = "default" | "circle";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isText?: boolean;
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
