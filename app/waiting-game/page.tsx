import type { Metadata } from "next";

import WaitingGameClient from "@/components/pages/WaitingGameClient";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.WAITING_GAME.TITLE,
};

export default function WaitingGame() {
  return <WaitingGameClient />;
}
