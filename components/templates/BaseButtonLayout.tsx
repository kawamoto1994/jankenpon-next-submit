import Image from "next/image";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ImageSize = number | `${number}`;

export interface ButtonIconProps {
  iconName?: string;
  iconAlt?: string;
  iconWidth?: ImageSize;
  iconHeight?: ImageSize;
  iconClassName?: string;
}

interface BaseButtonLayoutProps extends ButtonIconProps {
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  children: ReactNode;
}

const baseClassName =
  "relative flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-bold transition";

const defaultIconClassName = "absolute right-6";

const buildIconSrc = (iconName: string) => {
  if (!iconName) {
    return "";
  }

  return `/images/${iconName}.svg`;
};

const BaseButtonLayout = (props: BaseButtonLayoutProps) => {
  const {
    href,
    type = "button",
    className = "",
    iconName,
    iconAlt = "",
    iconWidth = 16,
    iconHeight = 16,
    iconClassName = "",
    onClick,
    children,
  } = props;
  const iconSrc = buildIconSrc(iconName ?? "");
  const imageIcon = iconSrc ? (
    <Image
      src={iconSrc}
      alt={iconAlt}
      width={iconWidth}
      height={iconHeight}
      className={`${defaultIconClassName} ${iconClassName}`}
    />
  ) : undefined;

  if (href) {
    return (
      <Link href={href} className={`${baseClassName} ${className}`}>
        {children}
        {imageIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClassName} ${className}`}
      onClick={onClick}
    >
      {children}
      {imageIcon}
    </button>
  );
};

export default BaseButtonLayout;
