import type { ComponentPropsWithoutRef } from "react";

type Heading2Props = ComponentPropsWithoutRef<"h2">;

const Heading2 = (props: Heading2Props) => {
  const { className = "", children, ...headingProps } = props;

  return (
    <h2
      className={`text-center text-2xl font-bold text-gray-900 ${className}`}
      {...headingProps}
    >
      {children}
    </h2>
  );
};

export default Heading2;
