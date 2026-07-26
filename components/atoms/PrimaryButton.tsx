import type { ButtonHTMLAttributes, ReactNode } from "react";

import BaseButtonLayout from "@/components/templates/BaseButtonLayout";
import type { ButtonIconProps } from "@/components/templates/BaseButtonLayout";

interface PrimaryButtonProps extends ButtonIconProps {
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  children: ReactNode;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const {
    href,
    type,
    className = "",
    onClick,
    iconName,
    iconAlt,
    iconWidth,
    iconHeight,
    iconClassName,
    children,
  } = props;

  return (
    <BaseButtonLayout
      href={href}
      type={type ?? "submit"}
      className={`group border border-black bg-black text-white outline-none hover:bg-white hover:text-black focus:border-cyan-700 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white ${className}`}
      onClick={onClick}
      iconName={iconName}
      iconAlt={iconAlt}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      iconClassName={`group-hover:invert ${iconClassName}`}
    >
      {children}
    </BaseButtonLayout>
  );
};

export default PrimaryButton;
