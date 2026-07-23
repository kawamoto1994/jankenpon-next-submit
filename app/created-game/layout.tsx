import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.CREATED_GAME.TITLE,
  robots: {
    index: false,
    follow: false,
  },
};

interface CreatedGameLayoutProps {
  children: ReactNode;
}

const CreatedGameLayout = (props: CreatedGameLayoutProps) => {
  const { children } = props;

  return children;
};

export default CreatedGameLayout;
