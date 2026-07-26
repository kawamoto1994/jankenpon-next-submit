"use client";

import BaseText from "@/components/atoms/BaseText";
import Heading2 from "@/components/atoms/Heading2";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import DataList from "@/components/molecules/DataList";
import GameLayout from "@/components/templates/GameLayout";
import { PAGE, PAGE_NAMES } from "@/shared";

// ============================================================================
// Declaration
// ============================================================================

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

const GameExpiredClient = () => {
  // ============================================================================
  // View
  // ============================================================================
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

        <PrimaryButton
          href={PAGE_NAMES.CREATE_GAME.path}
          className="mt-8"
          iconName="arrow"
        >
          {PAGE.GAME_EXPIRED.CREATE_NEW_GAME}
        </PrimaryButton>
      </section>
    </GameLayout>
  );
};

export default GameExpiredClient;
