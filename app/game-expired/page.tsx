import type { Metadata } from "next";

import BaseText from "@/components/atoms/BaseText";
import Heading2 from "@/components/atoms/Heading2";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import DataList from "@/components/molecules/DataList";
import GameLayout from "@/components/templates/GameLayout";
import { PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.GAME_EXPIRED.TITLE,
  robots: {
    index: false,
    follow: false,
  },
};

const summaryItems = [
  {
    label: PAGE.GAME_EXPIRED.GAME_NAME_LABEL,
    value: PAGE.GAME_EXPIRED.GAME_NAME,
  },
  {
    label: PAGE.GAME_EXPIRED.EXPIRES_AT_LABEL,
    value: PAGE.GAME_EXPIRED.EXPIRES_AT,
  },
];

export default function GameExpired() {
  return (
    <GameLayout
      logoSrOnlySuffix={PAGE.GAME_EXPIRED.TITLE}
      stepActiveIndex={2}
      stepsClassName="mt-10"
    >
      <section className="mt-10 text-left">
        <Heading2>{PAGE.GAME_EXPIRED.TITLE}</Heading2>

        <DataList items={summaryItems} className="mt-8" />

        <BaseText className="mt-8 text-center">
          {PAGE.GAME_EXPIRED.DESCRIPTION}
        </BaseText>

        <PrimaryButton href="/create-game" className="mt-8" iconName="arrow">
          {PAGE.GAME_EXPIRED.CREATE_NEW_GAME}
        </PrimaryButton>
      </section>
    </GameLayout>
  );
}
