import React from "react";
import { clsx } from "clsx";
import styles from "./Form.module.css";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
import { Heading } from "../Heading/Heading";

/** Configuration for a single form field */
export interface FormField {
  /** Unique identifier for the field */
  name: string;
  /** Display label for the field */
  label: string;
  /** HTML input type (e.g., 'text', 'email', 'password') */
  type?: string;
  /** If true, the field must be filled out */
  required?: boolean;
  /** Placeholder text shown when the field is empty */
  placeholder?: string;
  /** Custom validation function that returns an error message if validation fails */
  validation?: (value: string) => string | undefined;
}

/** Represents the possible states of form submission */
enum FormSubmissionState {
  /** Initial state or after form reset */
  PENDING = "PENDING",
  /** Form was successfully submitted */
  SUCCESS = "SUCCESS",
  /** An error occurred during submission */
  ERROR = "ERROR",
}

/** Props for the Form component */
interface FormProps {
  /** Array of field configurations that define the form's structure */
  fields: FormField[];
  /** Callback function called when the form is successfully submitted */
  onSubmit: (values: Record<string, string>) => void;
  /** Text displayed on the submit button */
  submitText?: string;
  /** Message shown when the form is successfully submitted */
  successMessage?: string;
  /** Message shown when form submission fails */
  errorMessage?: string;
  /** Additional CSS class names */
  className?: string;
  /** Optional heading text to display above the form */
  heading?: string;
  /** Optional heading level (1-6) for the form heading */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitText = "Submit",
  successMessage = "Form submitted successfully!",
  errorMessage = "An error occurred. Please try again.",
  className,
  heading,
  headingLevel = 6,
}) => {
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionState, setSubmissionState] =
    React.useState<FormSubmissionState>(FormSubmissionState.PENDING);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setSubmissionState(FormSubmissionState.PENDING);
  };

  const validateField = (
    field: FormField,
    value: string
  ): string | undefined => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    if (field.validation) {
      return field.validation(value);
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, values[field.name] || "");
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearForm = () => {
    setValues({});
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionState(FormSubmissionState.PENDING);
    try {
      await onSubmit(values);
      setSubmissionState(FormSubmissionState.SUCCESS);
      // Clear form after successful submission
      clearForm();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionState(FormSubmissionState.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {heading && (
        <Heading level={headingLevel} className={styles.heading}>
          {heading}
        </Heading>
      )}
      <form onSubmit={handleSubmit} className={clsx(styles.form, className)}>
        {fields.map((field) => (
          <TextInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            required={field.required}
            placeholder={field.placeholder}
            value={values[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={errors[field.name]}
            fullWidth
          />
        ))}
        <div className={styles.formFooter}>
          {submissionState !== FormSubmissionState.PENDING && (
            <span
              className={clsx(
                styles.message,
                submissionState === FormSubmissionState.SUCCESS
                  ? styles.successMessage
                  : styles.errorMessage
              )}
            >
              {submissionState === FormSubmissionState.SUCCESS
                ? successMessage
                : errorMessage}
            </span>
          )}
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : submitText}
          </Button>
        </div>
      </form>
    </div>
  );
};
