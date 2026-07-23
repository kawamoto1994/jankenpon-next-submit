import type { ComponentPropsWithoutRef } from "react";

type Heading3Props = ComponentPropsWithoutRef<"h3">;

const Heading3 = (props: Heading3Props) => {
  const { className = "", children, ...headingProps } = props;

  return (
    <h3
      className={`text-base font-bold text-gray-900 ${className}`}
      {...headingProps}
    >
      {children}
    </h3>
  );
};

export default Heading3;
