import React from "react";
import { clsx } from "clsx";
import styles from "./Heading.module.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  /** The heading level (1-6) which determines the HTML element and styling */
  level: HeadingLevel;
  /** The content to display within the heading */
  children: React.ReactNode;
  /** Optional className for additional styling */
  className?: string;
  /** Optional custom ID for the heading. If not provided, a unique ID will be generated */
  id?: string;
  /** Optional tabIndex for keyboard navigation. 
   * - 0: Makes the heading focusable in the natural tab order
   * - -1: Makes the heading programmatically focusable but not in the tab order
   * - undefined: The heading won't be focusable
   */
  tabIndex?: number;
}

export const Heading: React.FC<HeadingProps> = ({ 
  level, 
  children, 
  className,
  id: customId,
  tabIndex = 0,
}) => {
  const Tag = `h${level}` as const;
  const generatedId = React.useId();
  const id = customId || `heading-${level}-${generatedId}`;

  return (
    <Tag 
      className={clsx(styles.heading, styles[`h${level}`], className)}
      id={id}
      role="heading"
      aria-level={level}
      tabIndex={tabIndex}
    >
      {children}
    </Tag>
  );
}; 