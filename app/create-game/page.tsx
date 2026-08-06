import type { Metadata } from "next";

import CreateGamePage from "@/components/pages/CreateGame";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.CREATE_GAME.TITLE,
};

export default function CreateGame() {
  return <CreateGamePage />;
}
