# Server ActionのVitestとの相性確認

前回の[2026-07-19-server-action-file-structure.md](./2026-07-19-server-action-file-structure.md)で決定したファイル構成をもとに、別ルートで並行して進んでいるVitestによるテスト環境整備との相性を確認した。

## 確認内容

- `actions.ts`からexportした関数はただの非同期関数なので、Vitestから直接importして呼び出し、返り値やエラーを検証できる。UIのレンダリングは不要。
- Supabaseとの通信は`lib/supabase/server.ts`経由に統一しているため、テスト時は`vi.mock("@/lib/supabase/server")`でモックに差し替えれば、実際のDBに接続せずバリデーションロジック(参加人数の範囲、しあい名の文字数、手の値など)だけを単体テストできる。
- ファイル先頭の`"use server"`はNext.jsのビルド時にのみ意味を持つ目印であり、Vitest実行時には特に影響しない。
- `page.tsx`側(UI表示)のテストが必要になった場合は、React Testing Library等の併用が想定されるが、まずは`actions.ts`側のロジックをVitestで単体テストする組み合わせで進める。

## 現在の状態

- 実装時は`actions.ts`側をVitestで単体テストする方針で進める。
