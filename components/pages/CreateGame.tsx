"use client";

import MutedText from "@/components/atoms/MutedText";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import SelectField from "@/components/molecules/SelectField";
import TextField from "@/components/molecules/TextField";
import GameLayout from "@/components/templates/GameLayout";
import { COMMON, PAGE } from "@/shared";

// ============================================================================
// Declaration
// ============================================================================

const playerCountOptions = Array.from(
  {
    length:
      PAGE.CREATE_GAME.PLAYER_COUNT.MAX - PAGE.CREATE_GAME.PLAYER_COUNT.MIN + 1,
  },
  (_, index) => {
    const count = index + PAGE.CREATE_GAME.PLAYER_COUNT.MIN;

    return {
      value: count,
      label: `${count}${COMMON.PERSON_UNIT}`,
    };
  },
);

const CreateGame = () => {
  // ============================================================================
  // View
  // ============================================================================
  return (
    <GameLayout
      logoSrOnlySuffix={PAGE.CREATE_GAME.TITLE}
      stepActiveIndex={0}
      stepsClassName="mt-10"
    >
      <form className="mt-10 flex flex-col gap-8 text-left">
        <TextField
          id="game-name"
          type="text"
          label={PAGE.CREATE_GAME.GAME_NAME.LABEL}
          labelNote={PAGE.CREATE_GAME.GAME_NAME.NOTE}
          errorMessage={PAGE.CREATE_GAME.GAME_NAME.ERROR}
          name="gameName"
        />

        <SelectField
          id="player-count"
          label={PAGE.CREATE_GAME.PLAYER_COUNT.LABEL}
          options={playerCountOptions}
          defaultValue=""
          errorMessage={PAGE.CREATE_GAME.PLAYER_COUNT.ERROR}
          name="playerCount"
        />

        <MutedText>{PAGE.CREATE_GAME.NOTICE}</MutedText>

        <PrimaryButton className="mt-2" iconName="arrow">
          {PAGE.CREATE_GAME.SUBMIT}
        </PrimaryButton>
      </form>
    </GameLayout>
  );
};

export default CreateGame;
