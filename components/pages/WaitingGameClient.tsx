"use client";

import BaseText from "@/components/atoms/BaseText";
import Box from "@/components/atoms/Box";
import Heading2 from "@/components/atoms/Heading2";
import Heading3 from "@/components/atoms/Heading3";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import DataList from "@/components/molecules/DataList";
import GameLayout from "@/components/templates/GameLayout";
import { PAGE, PAGE_NAMES } from "@/shared";

// ============================================================================
// Declaration
// ============================================================================
const summaryItems = [
  {
    label: PAGE.WAITING_GAME.GAME_NAME_LABEL,
    value: PAGE.WAITING_GAME.GAME_NAME,
  },
  {
    label: PAGE.WAITING_GAME.PARTICIPATION_LABEL,
    value: PAGE.WAITING_GAME.PARTICIPATION,
  },
  {
    label: PAGE.WAITING_GAME.REQUIRED_PLAYER_COUNT_LABEL,
    value: PAGE.WAITING_GAME.REQUIRED_PLAYER_COUNT,
  },
  {
    label: PAGE.WAITING_GAME.EXPIRES_AT_LABEL,
    value: PAGE.WAITING_GAME.EXPIRES_AT,
  },
];

const WaitingGameClient = () => {
  // ============================================================================
  // View
  // ============================================================================
  return (
    <GameLayout
      logoSrOnlySuffix={PAGE.WAITING_GAME.TITLE}
      stepActiveIndex={2}
      stepsClassName="mt-10"
    >
      <section className="mt-10 text-left">
        <Heading2>{PAGE.WAITING_GAME.TITLE}</Heading2>

        <BaseText className="mt-4 text-center">
          {PAGE.WAITING_GAME.DESCRIPTION}
        </BaseText>

        <Box aria-labelledby="waiting-status-title" className="mt-8">
          <Heading3 id="waiting-status-title">
            {PAGE.WAITING_GAME.PARTICIPATION_SUMMARY}
          </Heading3>
          <BaseText className="mt-2 text-gray-600">
            {PAGE.WAITING_GAME.EXPIRES_AT_SUMMARY}
          </BaseText>
        </Box>

        <DataList items={summaryItems} className="mt-8" />

        <PrimaryButton
          href={PAGE_NAMES.RESULT_GAME.path}
          className="mt-8"
          iconName="arrow"
        >
          {PAGE.WAITING_GAME.RESULT_CHECK}
        </PrimaryButton>
      </section>
    </GameLayout>
  );
};

export default WaitingGameClient;
