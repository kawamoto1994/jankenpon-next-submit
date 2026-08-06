import type { Metadata } from "next";

import WaitingGamePage from "@/components/pages/WaitingGame";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.WAITING_GAME.TITLE,
};

export default function WaitingGame() {
  return <WaitingGamePage />;
}
