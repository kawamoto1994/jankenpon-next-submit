import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = (props: InputProps) => {
  const { className = "", ...inputProps } = props;

  return (
    <input
      className={`w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white ${className}`}
      {...inputProps}
    />
  );
};

export default Input;
