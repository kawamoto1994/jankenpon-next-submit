import type { Metadata } from "next";

import PlayGameClient from "@/components/pages/PlayGameClient";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.PLAY_GAME.TITLE,
};

export default function PlayGame() {
  return <PlayGameClient />;
}
