import type { Metadata } from "next";

import PlayGamePage from "@/components/pages/PlayGame";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.PLAY_GAME.TITLE,
};

export default function PlayGame() {
  return <PlayGamePage />;
}
