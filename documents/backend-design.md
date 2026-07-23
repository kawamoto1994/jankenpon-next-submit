# バックエンド設計方針

Supabaseのセットアップ経緯は[logs/2026-07-19-supabase-setup.md](./logs/2026-07-19-supabase-setup.md)を参照。本ドキュメントは、Next.js側の実装方針を詳細化したもの。

## 全体構成

| 処理 | 実行場所 | 理由 |
|---|---|---|
| しあい作成(02-create-game) | Server Action | フォーム送信のみで、応答したらそれで完結する処理のため |
| 手の送信(04-play-game) | Server Action | 同上 |
| 参加状況のリアルタイム更新(05-waiting-game) | Client Component | ページを開いている間、接続を維持し続ける必要があるため |
| 結果表示(06-result-game) | Server Component(初回取得) | 表示時点のデータを1回取得すればよいため |
| 期限切れ判定(07-game-expired) | Server Component | アクセス時点でのサーバー側チェックのため |

## Server Actionを使う処理

### しあい作成(02-create-game)

- フォーム入力(`しあい名`, `参加人数`)を受け取り、以下を行う。
  1. バリデーション(しあい名50文字以内、参加人数2〜10人)
  2. しあい名が未入力なら自動名(`じゃんけん YYYY/MM/DD`)を生成
  3. `expires_at`を作成日時 + 1週間で計算
  4. `games`テーブルにINSERT
  5. 成功したら`games.id`を使って03-created-gameへリダイレクト
- クライアント側のバリデーションに加えて、DB側の`check`制約(`games_player_count_check`)でも二重に担保する。

### 手の送信(04-play-game)

- フォーム入力(`名前`, `手`)を受け取り、以下を行う。
  1. しあいが存在するか確認
  2. `expires_at`が現在時刻より前でないか確認(切れていれば07へ)
  3. 参加人数が上限に達していないか確認
  4. 名前が30文字以内か確認
  5. 手が`rock` / `scissors` / `paper`のいずれかか確認
  6. `game_results`テーブルにINSERT
  7. 成功したら05-waiting-gameへリダイレクト
- 参加人数の上限チェックは、Server Action内でのSELECTだけでなく、RLSのINSERTポリシーでも同時にチェックしている。これは「ほぼ同時に複数人が最後の1枠に送信した」場合のレースコンディションを防ぐため。アプリ側のチェックだけだと、チェックとINSERTの間に別のリクエストが割り込む可能性があるが、RLSのポリシーはINSERT実行そのものに対する条件なのでこのすり抜けが起きない。

## Client Componentを使う処理

### 参加状況のリアルタイム更新(05-waiting-game)

- ページ読み込み時に、現在の参加人数を`select count(*) from game_results where game_id = ...`で取得して初期表示する。
- ブラウザ用のSupabaseクライアントで`game_results`テーブルのINSERTイベントを、対象の`game_id`でフィルタして購読する。

```ts
supabase
  .channel(`game_results:${gameId}`)
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "game_results",
      filter: `game_id=eq.${gameId}`,
    },
    () => {
      // 参加人数を再取得 or カウントをインクリメント
    },
  )
  .subscribe();
```

- 参加人数が`player_count`に到達したら、自動的に06-result-gameへ遷移する(spec.mdの「全員が送信済み: 結果画面へ」に対応)。
- 「結果を確認する」ボタンによる手動遷移も並行して用意し、Realtimeが何らかの理由で届かない場合の逃げ道にする。

## 期限切れの扱い

- バッチ処理や定期実行は行わない。`expires_at`はしあい作成時に保存するのみ。
- 各画面へのアクセス時に、その場で`expires_at < now()`を判定する(Server Component / Server Actionの中で実施)。
- 期限切れと判定された場合は07-game-expired画面を表示する。

## RLSポリシーの設計思想

- 認証機能を持たないアプリのため、`anon`キーでの読み書きを前提にしている。
- 読み取り(select)はすべて公開。しあいの結果はURLを知っていれば誰でも見られる仕様のため。
- 書き込み(insert)は「しあい作成」「手の送信」のみ許可し、条件(期限内・上限未達)をRLSのポリシー自体に埋め込むことで、アプリ側のバグに関わらずDBレベルで整合性を保証する。
- update / deleteのポリシーは作成していない。結果もしあいも一度作成したら変更・削除できない、という仕様に合わせている。

## 使い分けの判断基準(まとめ)

- 「リクエスト1回で完結する処理」→ Server Action
- 「接続を張りっぱなしにする必要がある処理」→ Client Component
- 「外部サービスからの呼び出しやCron実行が必要になったら」→ Route Handler(現時点では未使用、将来の拡張ポイント)
