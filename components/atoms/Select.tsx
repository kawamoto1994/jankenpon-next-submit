import type { ComponentPropsWithoutRef } from "react";

type SelectProps = ComponentPropsWithoutRef<"select">;

const Select = (props: SelectProps) => {
  const { children, className = "", ...selectProps } = props;

  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-11 text-base text-gray-900 transition outline-none invalid:text-gray-400 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white ${className}`}
        {...selectProps}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 h-2 w-2 -translate-y-2/3 rotate-45 border-r-2 border-b-2 border-gray-500"
      />
    </div>
  );
};

export default Select;
