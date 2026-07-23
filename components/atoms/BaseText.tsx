import type { ComponentPropsWithoutRef } from "react";

type BaseTextProps = ComponentPropsWithoutRef<"p">;

const BaseText = (props: BaseTextProps) => {
  const { className = "", children, ...paragraphProps } = props;

  return (
    <p
      className={`text-base leading-relaxed text-gray-600 ${className}`}
      {...paragraphProps}
    >
      {children}
    </p>
  );
};

export default BaseText;
