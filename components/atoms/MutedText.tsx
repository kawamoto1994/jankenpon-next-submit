import type { ComponentPropsWithoutRef } from "react";

type MutedTextProps = ComponentPropsWithoutRef<"p">;

const MutedText = (props: MutedTextProps) => {
  const { className = "", children, ...paragraphProps } = props;

  return (
    <p className={`text-sm text-gray-400 ${className}`} {...paragraphProps}>
      {children}
    </p>
  );
};

export default MutedText;
