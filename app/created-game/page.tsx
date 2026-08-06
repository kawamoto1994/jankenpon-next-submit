import type { Metadata } from "next";

import CreatedGamePage from "@/components/pages/CreatedGame";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.CREATED_GAME.TITLE,
};

export default function CreatedGame() {
  return <CreatedGamePage />;
}
