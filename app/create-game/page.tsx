import type { Metadata } from "next";
import MutedText from "@/components/atoms/MutedText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import SelectField from "@/components/molecules/SelectField";
import TextField from "@/components/molecules/TextField";
import GameLayout from "@/components/templates/GameLayout";
import { COMMON, PAGE } from "@/shared";

export const metadata: Metadata = {
  title: PAGE.CREATE_GAME.TITLE,
  robots: {
    index: false,
    follow: false,
  },
};

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

export default function CreateGame() {
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
        />

        <SelectField
          id="player-count"
          label={PAGE.CREATE_GAME.PLAYER_COUNT.LABEL}
          options={playerCountOptions}
          defaultValue=""
          errorMessage={PAGE.CREATE_GAME.PLAYER_COUNT.ERROR}
        />

        <MutedText>{PAGE.CREATE_GAME.NOTICE}</MutedText>

        <PrimaryButton className="mt-2" iconName="arrow">
          {PAGE.CREATE_GAME.SUBMIT}
        </PrimaryButton>
      </form>
    </GameLayout>
  );
}
