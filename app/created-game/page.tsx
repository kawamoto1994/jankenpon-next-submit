import type { Metadata } from "next";

import CreatedGameClient from "@/components/pages/CreatedGameClient";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.CREATED_GAME.TITLE,
};

export default function CreatedGame() {
  return <CreatedGameClient />;
}
