"use client";

import Heading2 from "@/components/atoms/Heading2";
import Heading3 from "@/components/atoms/Heading3";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import DataList from "@/components/molecules/DataList";
import RadioButtonGroup from "@/components/molecules/RadioButtonGroup";
import TextField from "@/components/molecules/TextField";
import GameLayout from "@/components/templates/GameLayout";
import { PAGE } from "@/shared";

// ============================================================================
// Declaration
// ============================================================================

const summaryItems = [
  {
    label: PAGE.PLAY_GAME.PARTICIPATION_LABEL,
    value: PAGE.PLAY_GAME.PARTICIPATION,
  },
  {
    label: PAGE.PLAY_GAME.EXPIRES_AT_LABEL,
    value: PAGE.PLAY_GAME.EXPIRES_AT,
  },
];

type HandValue = (typeof PAGE.PLAY_GAME.HAND.OPTIONS)[number]["value"];

const handOptionClassNames: Record<HandValue, string> = {
  rock: "border-rose-200 bg-rose-50 text-rose-950 shadow-rose-100 hover:border-rose-300 hover:bg-rose-100 peer-focus-visible:border-rose-700 peer-focus-visible:outline-rose-300 peer-checked:border-rose-700 peer-checked:bg-rose-600 peer-checked:hover:border-rose-700 peer-checked:hover:bg-rose-600",
  scissors:
    "border-sky-200 bg-sky-50 text-sky-950 shadow-sky-100 hover:border-sky-300 hover:bg-sky-100 peer-focus-visible:border-sky-700 peer-focus-visible:outline-sky-300 peer-checked:border-sky-700 peer-checked:bg-sky-600 peer-checked:hover:border-sky-700 peer-checked:hover:bg-sky-600",
  paper:
    "border-amber-200 bg-amber-50 text-amber-950 shadow-amber-100 hover:border-amber-300 hover:bg-amber-100 peer-focus-visible:border-amber-600 peer-focus-visible:outline-amber-300 peer-checked:border-amber-600 peer-checked:bg-amber-500 peer-checked:hover:border-amber-600 peer-checked:hover:bg-amber-500",
};

const PlayGame = () => {
  // ============================================================================
  // View
  // ============================================================================
  return (
    <GameLayout
      logoSrOnlySuffix={PAGE.PLAY_GAME.TITLE}
      stepActiveIndex={2}
      stepsClassName="mt-10"
    >
      <section className="mt-10 text-left">
        <Heading2>{PAGE.PLAY_GAME.TITLE}</Heading2>

        <DataList items={summaryItems} className="mt-8" />

        <form className="mt-8 flex flex-col gap-8">
          <TextField
            id="player-name"
            type="text"
            label={PAGE.PLAY_GAME.NAME.LABEL}
            defaultValue={PAGE.PLAY_GAME.NAME.DEFAULT_VALUE}
            maxLength={30}
            errorMessage={PAGE.PLAY_GAME.NAME.ERROR_REQUIRED}
          />

          <fieldset aria-labelledby="hand-title">
            <Heading3 id="hand-title">{PAGE.PLAY_GAME.HAND.LABEL}</Heading3>
            <RadioButtonGroup
              name="hand"
              options={PAGE.PLAY_GAME.HAND.OPTIONS}
              optionClassNames={handOptionClassNames}
              errorMessage={PAGE.PLAY_GAME.HAND.ERROR_REQUIRED}
              className="mt-3"
            />
          </fieldset>

          <PrimaryButton className="mt-2" iconName="arrow">
            {PAGE.PLAY_GAME.SUBMIT}
          </PrimaryButton>
        </form>
      </section>
    </GameLayout>
  );
};

export default PlayGame;
