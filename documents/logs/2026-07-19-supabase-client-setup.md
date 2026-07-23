# Supabaseクライアントのセットアップと疎通確認

前回の[2026-07-19-supabase-setup.md](./2026-07-19-supabase-setup.md)に続く作業。DB側の準備が整ったので、Next.js側からSupabaseへ接続するための土台を作成した。

## 実施内容

### 1. ライブラリのインストール

```
npm install @supabase/supabase-js
```

### 2. 型定義の作成(`lib/supabase/types.ts`)

本来はSupabase CLI(`supabase gen types typescript`)でテーブル定義から自動生成する想定だったが、CLIのログインがブラウザでの認証を要求するため、この環境(エージェント経由の作業)では完結できなかった。そのため、既知のスキーマ(`games` / `game_results`)から手動で`Database`型を作成した。

- 今後、開発者自身のマシンでSupabase CLIにログインできる環境が用意できれば、自動生成に置き換え可能。
- `weapon`カラムは`"rock" | "scissors" | "paper"`のUnion型(`Weapon`)として定義。
- `games` / `game_results`とも更新(Update)は行わない仕様のため、`Update: never`としている。

### 3. Supabaseクライアントのセットアップ

- `lib/supabase/server.ts`: Server Action(しあい作成・手の送信)から使うサーバー用クライアント。
- `lib/supabase/client.ts`: Client Component(待機画面のRealtime購読)から使うブラウザ用クライアント。
- どちらも`.env.local`の`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`を参照する。
- 中身は「URLと鍵を渡してクライアントを作る」定型的な実装であり、日常的に変更する箇所ではない。将来、認証機能を追加する場合はCookieを扱う`@supabase/ssr`パッケージへの切り替えが必要になる見込み。

### 4. 疎通確認

一時的なNode.jsスクリプトを作成し、`games`テーブルへの接続とレコード件数の取得を確認した(確認後スクリプトは削除済み)。

```
接続成功。games件数: 0
```

件数が0件なのは、テーブル制約追加の際に検証用データを全削除したため。

## 現在の状態

- Supabase側のテーブル・制約・RLS・Realtime設定が完了。
- Next.js側の接続用ファイル(`lib/supabase/server.ts`, `client.ts`, `types.ts`)が用意済み。
- 各画面のServer Action / Client Component実装は未着手。フロントエンド側の調整完了後に着手予定。
