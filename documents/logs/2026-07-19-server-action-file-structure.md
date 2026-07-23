# Server Actionのファイル構成

前回の[2026-07-19-supabase-client-setup.md](./2026-07-19-supabase-client-setup.md)に続く、実装方針の確認。

## 課題

Server Actionを画面の`page.tsx`に直接書くと、1つのファイルにクライアントサイドのコード(UI)とサーバーサイドのコード(バリデーション・DB操作)が混在し、可読性が下がる懸念があった。

## 決定事項

画面ごとに以下のペアで構成する。

```
app/create-game/
  page.tsx     # 表示(UI)のみ
  actions.ts   # Server Action("use server")。バリデーション・DB操作
```

`page.tsx`側は`import { createGame } from "./actions"`として使うのみとし、UIとサーバー処理を物理的にファイル単位で分離する。

## 現在の状態

- 各画面のServer Action実装はフロントエンド側の調整完了後に着手予定(未着手)。
- 実装時は`page.tsx` + `actions.ts`のペア構成で進める。
