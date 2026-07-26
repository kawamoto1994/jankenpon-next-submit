import type { judgeWeaponsAction } from "@/shared/types/utils/judgeWeapons";

export const judgeWeapons = (weapons: judgeWeaponsAction["weapons"]) => {
  const uniqueWeapons = new Set(weapons);

  if (uniqueWeapons.size === 1 || uniqueWeapons.size === 3) {
    return { result: "draw", winningWeapon: null };
  }

  if (uniqueWeapons.has("rock") && uniqueWeapons.has("scissors")) {
    return { result: "win", winningWeapon: "rock" };
  }

  if (uniqueWeapons.has("scissors") && uniqueWeapons.has("paper")) {
    return { result: "win", winningWeapon: "scissors" };
  }

  if (uniqueWeapons.has("paper") && uniqueWeapons.has("rock")) {
    return { result: "win", winningWeapon: "paper" };
  }

  return { result: "draw", winningWeapon: null };
};
