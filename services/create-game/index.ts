"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import { PAGE_NAMES } from "@/shared/consts/pageNames";

export const createGame = async (formData: FormData) => {
  const gameName = formData.get("gameName");
  const playerCount = formData.get("playerCount");

  console.log("しあい名：", gameName);
  console.log("人数：", playerCount);

  /* ==========================================================================
	型変換
	========================================================================== */

  // しあい名
  const gameNameText = typeof gameName === "string" ? gameName.trim() : "";

  // しあい人数
  const playerCountNumber =
    typeof playerCount === "string" ? Number(playerCount) : NaN;

  /* ==========================================================================
	バリデーション
	========================================================================== */
  // しあい名

  // 文字数チェック
  if (gameNameText.length > 50) {
    return {
      error: "しあい名は50文字で入力してください。",
    };
  }

  // 最大値、最小値チェック
  if (
    !Number.isInteger(playerCountNumber) ||
    playerCountNumber < 2 ||
    playerCountNumber > 10
  ) {
    return {
      error: "参加人数を選択してください。",
    };
  }

  /* ==========================================================================
	supabaseに接続
	========================================================================== */

  const supabase = createServerSupabaseClient();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { data, error } = await supabase
    .from("games")
    .insert({
      name: gameNameText,
      player_count: playerCountNumber,
      expires_at: expiresAt.toISOString(),
    })
    .select("id")
    .single();

  // 接続後のバリデーション
  // エラー時
  if (error || !data) {
    return {
      error: "しあいを作成できませんでした。",
    };
  }

  // 成功時
  redirect(ROUTES[PAGE_NAMES.CREATED_GAME.path](data.id));
};
