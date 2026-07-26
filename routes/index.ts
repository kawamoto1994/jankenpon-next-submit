import { PAGE_NAMES } from "@/shared/consts/pageNames";

export const ROUTES = {
  [PAGE_NAMES.CREATE_GAME.path]: (gameId: string) =>
    `${PAGE_NAMES.CREATE_GAME.path}/${gameId}`,
  [PAGE_NAMES.CREATED_GAME.path]: (gameId: string) =>
    `${PAGE_NAMES.CREATED_GAME.path}/${gameId}`,
  [PAGE_NAMES.PLAY_GAME.path]: (gameId: string) =>
    `${PAGE_NAMES.PLAY_GAME.path}/${gameId}`,
  [PAGE_NAMES.RESULT_GAME.path]: (gameId: string) =>
    `${PAGE_NAMES.RESULT_GAME.path}/${gameId}`,
};
