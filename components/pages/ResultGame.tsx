"use client";

import BaseText from "@/components/atoms/BaseText";
import Box from "@/components/atoms/Box";
import Heading2 from "@/components/atoms/Heading2";
import Heading3 from "@/components/atoms/Heading3";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import DataList from "@/components/molecules/DataList";
import GameLayout from "@/components/templates/GameLayout";
import { PAGE, PAGE_NAMES } from "@/shared";

// ============================================================================
// Declaration
// ============================================================================

const summaryItems = [
  {
    label: PAGE.RESULT_GAME.GAME_NAME_LABEL,
    value: PAGE.RESULT_GAME.GAME_NAME,
  },
  {
    label: PAGE.RESULT_GAME.RESULT_LABEL,
    value: PAGE.RESULT_GAME.RESULT,
  },
  {
    label: PAGE.RESULT_GAME.WINNER_LABEL,
    value: PAGE.RESULT_GAME.WINNER,
  },
  {
    label: PAGE.RESULT_GAME.EXPIRES_AT_LABEL,
    value: PAGE.RESULT_GAME.EXPIRES_AT,
  },
];

const statusClassNames: Record<
  (typeof PAGE.RESULT_GAME.PARTICIPANTS)[number]["status"],
  string
> = {
  [PAGE.RESULT_GAME.STATUS.WIN]: "border-rose-200 bg-rose-50 text-rose-700",
  [PAGE.RESULT_GAME.STATUS.LOSE]: "border-gray-200 bg-gray-50 text-gray-600",
};

const ResultGame = () => {
  // ============================================================================
  // View
  // ============================================================================
  return (
    <GameLayout
      logoSrOnlySuffix={PAGE.RESULT_GAME.TITLE}
      stepActiveIndex={3}
      stepsClassName="mt-10"
    >
      <section className="mt-10 text-left">
        <Heading2>{PAGE.RESULT_GAME.TITLE}</Heading2>

        <Box aria-labelledby="result-title" className="mt-8">
          <Heading3 id="result-title">
            {PAGE.RESULT_GAME.RESULT_LABEL}: {PAGE.RESULT_GAME.RESULT}
          </Heading3>
          <BaseText className="mt-2 text-gray-600">
            {PAGE.RESULT_GAME.EXPIRES_AT_SUMMARY}
          </BaseText>
        </Box>

        <DataList items={summaryItems} className="mt-8" />

        <section className="mt-8" aria-labelledby="participants-title">
          <Heading3 id="participants-title">
            {PAGE.RESULT_GAME.PARTICIPANTS_TITLE}
          </Heading3>

          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <div className="grid grid-cols-[1fr_5rem_5rem] gap-3 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-500 sm:grid-cols-[1fr_7rem_7rem] sm:px-5">
              <span>{PAGE.RESULT_GAME.PARTICIPANT_NAME_LABEL}</span>
              <span>{PAGE.RESULT_GAME.PARTICIPANT_HAND_LABEL}</span>
              <span>{PAGE.RESULT_GAME.PARTICIPANT_STATUS_LABEL}</span>
            </div>

            <ul className="divide-y divide-gray-100">
              {PAGE.RESULT_GAME.PARTICIPANTS.map((participant) => (
                <li
                  key={participant.name}
                  className="grid min-h-16 grid-cols-[1fr_5rem_5rem] items-center gap-3 px-4 py-4 sm:grid-cols-[1fr_7rem_7rem] sm:px-5"
                >
                  <span className="text-base font-bold text-gray-900">
                    {participant.name}
                  </span>
                  <span className="text-base font-medium text-gray-900">
                    {participant.hand}
                  </span>
                  <span
                    className={`inline-flex min-h-8 items-center justify-center rounded-full border px-3 text-sm font-bold ${statusClassNames[participant.status]}`}
                  >
                    {participant.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PrimaryButton
          href={PAGE_NAMES.CREATE_GAME.path}
          className="mt-8"
          iconName="arrow"
        >
          {PAGE.RESULT_GAME.CREATE_NEW_GAME}
        </PrimaryButton>
      </section>
    </GameLayout>
  );
};

export default ResultGame;
