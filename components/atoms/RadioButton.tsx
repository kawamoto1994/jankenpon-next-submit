import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface RadioButtonProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "children" | "className" | "type"
  > {
  label: ReactNode;
  className?: string;
}

const baseClassName =
  "flex min-h-14 w-full cursor-pointer items-center justify-center rounded-full border px-3 py-3 text-base font-bold shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-300 peer-checked:-translate-y-0.5 peer-checked:text-white peer-checked:shadow-lg";

const RadioButton = (props: RadioButtonProps) => {
  const { label, className = "", ...inputProps } = props;

  return (
    <label className="cursor-pointer">
      <input {...inputProps} type="radio" className="peer sr-only" />
      <span className={`${baseClassName} ${className}`}>{label}</span>
    </label>
  );
};

export default RadioButton;
