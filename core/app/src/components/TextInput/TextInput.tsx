import React from "react";
import { clsx } from "clsx";
import styles from "./TextInput.module.css";

interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /** Label text displayed above the input field */
  label?: string;
  /** Error message displayed below the input field when validation fails */
  error?: string;
  /** If true, the input will take up the full width of its container */
  fullWidth?: boolean;
  /** Controlled input value. When provided, the input is controlled by the parent component */
  value?: string;
  /** Initial value for uncontrolled inputs */
  defaultValue?: string;
  /** Callback function called when the input value changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      className,
      fullWidth = false,
      type = "text",
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || ""
    );

    // Handle both controlled and uncontrolled modes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      if (value === undefined) {
        setInternalValue(event.target.value);
      }
    };

    const currentValue = value !== undefined ? value : internalValue;

    return (
      <div
        className={clsx(
          styles.container,
          fullWidth && styles.fullWidth,
          className
        )}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={currentValue}
          onChange={handleChange}
          className={clsx(styles.input, error && styles.error)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
