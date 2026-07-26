import type { Metadata } from "next";

import GameExpiredClient from "@/components/pages/GameExpiredClient";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.GAME_EXPIRED.TITLE,
};

export default function GameExpired() {
  return <GameExpiredClient />;
}
