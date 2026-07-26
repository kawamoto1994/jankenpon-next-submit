import type { Metadata } from "next";

import ResultGameClient from "@/components/pages/ResultGameClient";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.RESULT_GAME.TITLE,
};

export default function ResultGame() {
  return <ResultGameClient />;
}
