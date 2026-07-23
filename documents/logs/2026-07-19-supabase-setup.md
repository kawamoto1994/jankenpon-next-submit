# Supabaseセットアップ

## 概要

PHP版じゃんけんぽんアプリで使用していたSupabaseプロジェクト(稼働していない検証用)を、Next.js版で再利用する形でセットアップした。

## 実施内容

### 1. テーブルスキーマの調整

既存の`games` / `game_results`テーブルに、`documents/spec.md`のデータ定義に合わせて以下を追加した。

```sql
-- games: 有効期限カラムを追加
alter table public.games
  add column expires_at timestamp with time zone not null default (now() + interval '7 days');

-- games: 参加人数の範囲チェック(2〜10人)
alter table public.games
  add constraint games_player_count_check check (player_count between 2 and 10);

-- game_results: games への外部キー制約
alter table public.game_results
  add constraint game_results_game_id_fkey
  foreign key (game_id) references public.games (id) on delete cascade;

-- game_results: 手の値チェック(rock/scissors/paper)
alter table public.game_results
  add constraint game_results_weapon_check check (weapon in ('rock', 'scissors', 'paper'));

-- game_results: 同じしあいに同じ名前で二重送信させない
alter table public.game_results
  add constraint game_results_unique_player unique (game_id, player_name);
```

補足: `games_player_count_check`の追加時に、既存の検証用データが範囲外だったため一度全行を削除してから制約を適用した。

### 2. Data APIの有効化

両テーブルとも「API Disabled」状態だったため、Table EditorからData API経由のアクセスを有効化した。

### 3. RLS(Row Level Security)ポリシーの作成

RLSは有効(true)だがポリシーが1つもなく、全アクセスが拒否される状態だったため、以下を作成した。

```sql
-- games: 誰でも読める
create policy "games_select_public"
  on public.games for select
  using (true);

-- games: 誰でも作成できる
create policy "games_insert_public"
  on public.games for insert
  with check (true);

-- game_results: 誰でも読める
create policy "game_results_select_public"
  on public.game_results for select
  using (true);

-- game_results: 期限内・参加人数上限未達の場合のみ送信可能
create policy "game_results_insert_public"
  on public.game_results for insert
  with check (
    exists (
      select 1 from public.games g
      where g.id = game_id
        and g.expires_at > now()
        and (select count(*) from public.game_results r where r.game_id = g.id) < g.player_count
    )
  );
```

update / deleteのポリシーは作成しておらず、結果は誰も書き換え・削除できない。

### 4. Realtimeの有効化

`game_results`テーブルのRealtime(Replication)をONにした。`05-waiting-game`画面での参加状況のリアルタイム更新に使用する想定。

### 5. Next.js側の接続情報設定

プロジェクトルートに`.env.local`を作成(`.gitignore`済み)。

```
NEXT_PUBLIC_SUPABASE_URL=https://ugtnxgjqjameokufycfi.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_RVExqE21pZaTg0EhmKjuGA_dZ2OLy3c
```

## 設計方針

詳細は[backend-design.md](../backend-design.md)を参照。

## 次のステップ

- `@supabase/supabase-js`のインストール
- サーバー用・ブラウザ用のSupabaseクライアントのセットアップ
- 各画面(しあい作成・手の送信・待機画面のRealtime購読)の実装
