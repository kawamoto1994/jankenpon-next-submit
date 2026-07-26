import type { Metadata } from "next";

import CreateGameClient from "@/components/pages/CreateGameClient";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.CREATE_GAME.TITLE,
};

export default function CreateGame() {
  return <CreateGameClient />;
}
