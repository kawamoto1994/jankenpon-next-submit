import type { ComponentPropsWithoutRef, ReactNode } from "react";

import RadioButton from "@/components/atoms/RadioButton";

interface RadioButtonOption<Value extends string = string> {
  value: Value;
  label: ReactNode;
}

interface RadioButtonGroupProps<Value extends string = string>
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "children" | "className" | "name" | "type" | "value"
  > {
  name: string;
  options: readonly RadioButtonOption<Value>[];
  className?: string;
  optionClassNames?: Partial<Record<Value, string>>;
  errorMessage?: ReactNode;
}

const RadioButtonGroup = <Value extends string,>(
  props: RadioButtonGroupProps<Value>,
) => {
  const {
    name,
    options,
    className = "",
    optionClassNames,
    errorMessage,
    ...inputProps
  } = props;

  const errorId = errorMessage ? `${name}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className={`grid grid-cols-3 gap-3 ${className}`}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            {...inputProps}
            name={name}
            value={option.value}
            label={option.label}
            aria-invalid={errorMessage ? true : inputProps["aria-invalid"]}
            aria-describedby={describedBy || undefined}
            className={optionClassNames?.[option.value]}
          />
        ))}
      </div>
      {errorMessage && (
        <p id={errorId} className="mt-2 text-sm leading-6 text-orange-700">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default RadioButtonGroup;
