"use client";

import { Fragment } from "react";

import BaseText from "@/components/atoms/BaseText";
import MutedText from "@/components/atoms/MutedText";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import GameLayout from "@/components/templates/GameLayout";
import { PAGE, PAGE_NAMES } from "@/shared";

const Home = () => {
  // ============================================================================
  // View
  // ============================================================================
  return (
    <GameLayout
      beforeSteps={
        <>
          <BaseText className="mt-8">
            {PAGE.HOME.DESCRIPTION_LINES.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </BaseText>

          <MutedText className="mt-4">{PAGE.HOME.NOTICE}</MutedText>

          <h2 className="mt-10 text-base font-bold text-gray-500">
            {PAGE.HOME.HOW_TO_TITLE}
          </h2>
        </>
      }
    >
      <PrimaryButton
        href={PAGE_NAMES.CREATE_GAME.path}
        className="mt-10"
        iconName="arrow"
      >
        {PAGE.HOME.CREATE_GAME}
      </PrimaryButton>
    </GameLayout>
  );
};

export default Home;
