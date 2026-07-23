import type { ComponentPropsWithoutRef } from "react";

type BoxProps = ComponentPropsWithoutRef<"section">;

const Box = (props: BoxProps) => {
  const { className = "", children, ...sectionProps } = props;

  return (
    <section
      className={`rounded-lg border border-gray-200 bg-gray-50 px-4 py-5 text-center ${className}`}
      {...sectionProps}
    >
      {children}
    </section>
  );
};

export default Box;
