import type { Metadata } from "next";

import GameExpiredPage from "@/components/pages/GameExpired";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.GAME_EXPIRED.TITLE,
};

export default function GameExpired() {
  return <GameExpiredPage />;
}
