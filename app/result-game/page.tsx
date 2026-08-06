import type { Metadata } from "next";

import ResultGamePage from "@/components/pages/ResultGame";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.RESULT_GAME.TITLE,
};

export default function ResultGame() {
  return <ResultGamePage />;
}
