import type { ComponentPropsWithoutRef } from "react";

import BaseButtonLayout from "@/components/templates/BaseButtonLayout";
import type { ButtonIconProps } from "@/components/templates/BaseButtonLayout";

type SecondaryButtonProps = ComponentPropsWithoutRef<"button"> & ButtonIconProps;

const SecondaryButton = (props: SecondaryButtonProps) => {
  const {
    className = "",
    children,
    type = "button",
    iconName,
    iconAlt,
    iconWidth,
    iconHeight,
    iconClassName,
    ...buttonProps
  } = props;

  return (
    <BaseButtonLayout
      type={type}
      className={`border border-gray-300 bg-white text-gray-900 outline-none hover:bg-gray-50 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white ${className}`}
      iconName={iconName}
      iconAlt={iconAlt}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      iconClassName={iconClassName}
      {...buttonProps}
    >
      {children}
    </BaseButtonLayout>
  );
};

export default SecondaryButton;
