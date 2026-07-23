import type { ComponentPropsWithoutRef, ReactNode } from "react";

import Input from "@/components/atoms/Input";

interface TextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  label: ReactNode;
  labelNote?: ReactNode;
  containerClassName?: string;
  errorMessage?: ReactNode;
}

const TextField = (props: TextFieldProps) => {
  const {
    id,
    label,
    labelNote,
    containerClassName = "",
    className = "",
    errorMessage,
    ...inputProps
  } = props;

  const errorId = errorMessage && id ? `${id}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="text-base font-bold text-gray-700">
        {label}
        {labelNote && (
          <span className="ml-1 font-normal text-gray-500">{labelNote}</span>
        )}
      </label>
      <Input
        {...inputProps}
        id={id}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={`mt-3 ${errorMessage ? "border-orange-700 focus:border-orange-700 focus:ring-orange-300" : ""} ${className}`}
      />
      {errorMessage && (
        <p id={errorId} className="mt-2 text-sm leading-6 text-orange-700">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextField;
