"use client";

import { useState } from "react";

import Heading2 from "@/components/atoms/Heading2";
import Heading3 from "@/components/atoms/Heading3";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import SecondaryButton from "@/components/atoms/SecondaryButton";
import DataList from "@/components/molecules/DataList";
import Modal from "@/components/molecules/Modal";
import GameLayout from "@/components/templates/GameLayout";
import { COMMON, PAGE, PAGE_NAMES } from "@/shared";

// ============================================================================
// Declaration
// ============================================================================

const summaryItems = [
  {
    label: PAGE.CREATED_GAME.GAME_NAME_LABEL,
    value: PAGE.CREATED_GAME.GAME_NAME,
  },
  {
    label: PAGE.CREATED_GAME.PLAYER_COUNT_LABEL,
    value: `${PAGE.CREATED_GAME.PLAYER_COUNT}${COMMON.PERSON_UNIT}`,
  },
  {
    label: PAGE.CREATED_GAME.EXPIRES_AT_LABEL,
    value: PAGE.CREATED_GAME.EXPIRES_AT,
  },
];

const urlItems = [
  {
    label: PAGE.CREATED_GAME.JOIN_URL_LABEL,
    url: PAGE.CREATED_GAME.JOIN_URL,
    copyLabel: PAGE.CREATED_GAME.JOIN_URL_COPY,
  },
  {
    label: PAGE.CREATED_GAME.RESULT_URL_LABEL,
    url: PAGE.CREATED_GAME.RESULT_URL,
    copyLabel: PAGE.CREATED_GAME.RESULT_URL_COPY,
  },
];

const CreatedGameClient = () => {
  const [modalMessage, setModalMessage] = useState<string | undefined>();

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setModalMessage(PAGE.CREATED_GAME.COPY_SUCCESS);
    } catch {
      setModalMessage(PAGE.CREATED_GAME.COPY_ERROR);
    }
  };

  // ============================================================================
  // View
  // ============================================================================
  return (
    <GameLayout
      logoSrOnlySuffix={PAGE.CREATED_GAME.TITLE}
      stepActiveIndex={1}
      stepsClassName="mt-10"
    >
      <section className="mt-10 text-left">
        <Heading2>{PAGE.CREATED_GAME.TITLE}</Heading2>

        <DataList items={summaryItems} className="mt-8" />

        <div className="mt-8 flex flex-col gap-6">
          {urlItems.map((item) => (
            <section key={item.label} aria-labelledby={`${item.label}-title`}>
              <Heading3 id={`${item.label}-title`}>{item.label}</Heading3>
              <p className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-700">
                {item.url}
              </p>
              <SecondaryButton
                type="button"
                className="mt-3"
                onClick={() => copyUrl(item.url)}
              >
                {item.copyLabel}
              </SecondaryButton>
            </section>
          ))}
        </div>

        <PrimaryButton
          href={PAGE_NAMES.CREATE_GAME.path}
          className="mt-8"
          iconName="arrow"
        >
          {PAGE.CREATED_GAME.CREATE_NEW_GAME}
        </PrimaryButton>

        {/* Copy result modal. */}
        <Modal
          open={Boolean(modalMessage)}
          title={modalMessage}
          closeLabel={PAGE.CREATED_GAME.MODAL_CLOSE}
          onClose={() => setModalMessage(undefined)}
        />
      </section>
    </GameLayout>
  );
};

export default CreatedGameClient;
