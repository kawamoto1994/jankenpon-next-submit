import type { ComponentPropsWithoutRef, ReactNode } from "react";

import Select from "@/components/atoms/Select";

type SelectFieldOption = {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
};

interface SelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  label: ReactNode;
  containerClassName?: string;
  errorMessage?: ReactNode;
  options?: SelectFieldOption[];
  placeholder?: ReactNode;
}

const SelectField = (props: SelectFieldProps) => {
  const {
    id,
    label,
    children,
    containerClassName = "",
    className = "",
    errorMessage,
    options,
    placeholder = "選択してください",
    ...selectProps
  } = props;

  const errorId = errorMessage && id ? `${id}-error` : undefined;
  const describedBy = [selectProps["aria-describedby"], errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="text-base font-bold text-gray-700">
        {label}
      </label>
      <div className="mt-3">
        <Select
          {...selectProps}
          id={id}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={`${errorMessage ? "border-orange-700 focus:border-orange-700 focus:ring-orange-300" : ""} ${className}`}
        >
          {options ? (
            <>
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </>
          ) : (
            children
          )}
        </Select>
      </div>
      {errorMessage && (
        <p id={errorId} className="mt-2 text-sm leading-6 text-orange-700">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default SelectField;
