# 見た目実装依頼ガイド

## 目的

`documents/screens/01-start.md` から `07-game-expired.md` の画面仕様をもとに、見た目を作成・調整してもらう時の共通ルールをまとめる。

このドキュメントは、画面ごとの表示内容ではなく、実装時に守るコンポーネント構成・余白指定・定数参照の方針を伝えるために使う。

## 依頼時に見る資料

- 画面の目的・表示内容・状態・遷移は、対象画面の `documents/screens/*.md` を確認する。
- 現在の実装パターンは `app/create-game/page.tsx`、`app/created-game/page.tsx`、`app/play-game/page.tsx`、`app/waiting-game/page.tsx` を確認する。
- 共通文言は `shared/consts/page.ts` と `shared/consts/pageNames.ts` を確認する。
- 共通コンポーネントは `components/` 配下の既存実装を優先して使う。

## 基本方針

- 画面固有の JSX に同じ Tailwind class のかたまりを直接増やさない。
- 既にある共通コンポーネントで表現できるものは、それを使う。
- 新しい共通 UI が必要な場合は、既存の分類に合わせて `atoms`、`molecules`、`organisms`、`templates` のいずれかに作る。
- margin は画面ごとに変わるため、共通コンポーネント内部に固定で入れず、利用側の `className` または `containerClassName` で指定する。
- 表示文言は直接文字列を書かず、原則 `shared/consts/page.ts` または `shared/consts/pageNames.ts` に定義して参照する。
- ページで `metadata` を使う場合は、`import type { Metadata } from "next"` で型だけ import する。

## コンポーネントの使い分け

### Heading2

画面内のメイン見出しには `components/atoms/Heading2.tsx` を使う。

```tsx
<Heading2>{PAGE.CREATED_GAME.TITLE}</Heading2>
```

標準スタイル:

```text
text-center text-2xl font-bold text-gray-900
```

margin が必要な場合:

```tsx
<Heading2 className="mt-8">...</Heading2>
```

### Heading3

小見出しには `components/atoms/Heading3.tsx` を使う。

```tsx
<Heading3 id="hand-title">{PAGE.PLAY_GAME.HAND.LABEL}</Heading3>
```

標準スタイル:

```text
text-base font-bold text-gray-900
```

margin が必要な場合は、利用側で `className` に指定する。

### BaseText

通常の説明文には `components/atoms/BaseText.tsx` を使う。

```tsx
<BaseText className="mt-4 text-center">
  {PAGE.WAITING_GAME.DESCRIPTION}
</BaseText>
```

標準スタイル:

```text
text-base leading-relaxed text-gray-600
```

色や配置を画面ごとに変える場合は、利用側で `className` に追加する。

### MutedText

補足・注意書きには `components/atoms/MutedText.tsx` を使う。

```tsx
<MutedText>{PAGE.CREATE_GAME.NOTICE}</MutedText>
```

### Box

囲みの情報表示には `components/atoms/Box.tsx` を使う。

```tsx
<Box aria-labelledby="waiting-status-title" className="mt-8">
  <Heading3 id="waiting-status-title">
    {PAGE.WAITING_GAME.PARTICIPATION_SUMMARY}
  </Heading3>
  <BaseText className="mt-2 text-gray-600">
    {PAGE.WAITING_GAME.EXPIRES_AT_SUMMARY}
  </BaseText>
</Box>
```

標準スタイル:

```text
rounded-lg border border-gray-200 bg-gray-50 px-4 py-5 text-center
```

`Box` 自体の margin は、利用側の `className` で指定する。

### DataList

ラベルと値の一覧には `components/molecules/DataList.tsx` を使う。

```tsx
const summaryItems = [
  {
    label: PAGE.CREATED_GAME.GAME_NAME_LABEL,
    value: PAGE.CREATED_GAME.GAME_NAME,
  },
];

<DataList items={summaryItems} className="mt-8" />
```

標準スタイル:

```text
divide-y divide-gray-100 rounded-lg border border-gray-200
```

各行の標準スタイル:

```text
grid gap-1 px-4 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4 sm:px-5
```

`DataList` 自体の margin は、利用側の `className` で指定する。

### TextField

ラベル、補足、エラー表示付きのテキスト入力には `components/molecules/TextField.tsx` を使う。

```tsx
<TextField
  id="game-name"
  type="text"
  label={PAGE.CREATE_GAME.GAME_NAME.LABEL}
  labelNote={PAGE.CREATE_GAME.GAME_NAME.NOTE}
  errorMessage={PAGE.CREATE_GAME.GAME_NAME.ERROR}
/>
```

ルール:

- 入力要素単体の見た目だけが必要な場合は `components/atoms/Input.tsx` を使う。
- ラベルとエラーを含むフォーム項目は `TextField` を使う。
- エラー時の `aria-invalid` と `aria-describedby` は `TextField` が付与する。
- 外側の余白は `containerClassName`、入力要素への追加 class は `className` で指定する。

### SelectField

ラベル、エラー表示、選択肢付きのセレクト入力には `components/molecules/SelectField.tsx` を使う。

```tsx
const playerCountOptions = [
  { value: 2, label: "2人" },
  { value: 3, label: "3人" },
];

<SelectField
  id="player-count"
  label={PAGE.CREATE_GAME.PLAYER_COUNT.LABEL}
  options={playerCountOptions}
  defaultValue=""
  errorMessage={PAGE.CREATE_GAME.PLAYER_COUNT.ERROR}
/>
```

ルール:

- `options` を渡すと、先頭に `placeholder` の disabled option を追加して選択肢を生成する。
- `placeholder` の初期値は `"選択してください"`。
- `options` を使わず、独自の `<option>` を `children` として渡すこともできる。
- 入力要素単体の見た目だけが必要な場合は `components/atoms/Select.tsx` を使う。
- ラベルとエラーを含むフォーム項目は `SelectField` を使う。
- エラー時の `aria-invalid` と `aria-describedby` は `SelectField` が付与する。

### PrimaryButton

主要アクションには `components/atoms/PrimaryButton.tsx` を使う。

```tsx
<PrimaryButton href="/create-game" className="mt-8" iconName="arrow">
  {PAGE.CREATED_GAME.CREATE_NEW_GAME}
</PrimaryButton>
```

標準スタイル:

```text
bg-black text-white hover:bg-gray-800
```

### SecondaryButton

補助アクションには `components/atoms/SecondaryButton.tsx` を使う。

```tsx
<SecondaryButton type="button" className="mt-3" onClick={onClick}>
  {PAGE.CREATED_GAME.JOIN_URL_COPY}
</SecondaryButton>
```

標準スタイル:

```text
border border-gray-300 bg-white text-gray-900 hover:bg-gray-50
```

### RadioButton

1つの選択肢をボタン風に見せるラジオ入力には `components/atoms/RadioButton.tsx` を使う。

```tsx
<RadioButton
  name="hand"
  value="rock"
  label={PAGE.PLAY_GAME.HAND.OPTIONS[0].label}
  className="border-rose-200 bg-rose-50 text-rose-950 peer-focus-visible:outline-rose-300 peer-checked:border-rose-700"
/>
```

標準スタイル:

```text
flex min-h-14 w-full cursor-pointer items-center justify-center rounded-full border px-3 py-3 text-base font-bold shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-300 peer-checked:-translate-y-0.5 peer-checked:text-white peer-checked:shadow-lg
```

ルール:

- 3択など、見た目はボタンでも HTML 的に1つだけ選ぶ入力は `button` ではなく `input type="radio"` で作る。
- `RadioButton` は atom として、1つのラジオ入力とラベル表示だけを担当する。
- 選択肢ごとの色や画面固有の見た目は、利用側または `RadioButtonGroup` の `optionClassNames` から渡す。
- フォーカス表示は `peer-focus-visible:*` を使う。
- 選択中のスタイルは `peer-checked:*` を使い、どれを選択しているか分かる見た目にする。

### RadioButtonGroup

複数のラジオ選択肢を並べる場合は `components/molecules/RadioButtonGroup.tsx` を使う。

```tsx
const handOptionClassNames = {
  rock:
    "border-rose-200 bg-rose-50 text-rose-950 shadow-rose-100 hover:border-rose-300 hover:bg-rose-100 peer-focus-visible:border-rose-700 peer-focus-visible:outline-rose-300 peer-checked:border-rose-700 peer-checked:bg-rose-600 peer-checked:hover:border-rose-700 peer-checked:hover:bg-rose-600",
  scissors:
    "border-sky-200 bg-sky-50 text-sky-950 shadow-sky-100 hover:border-sky-300 hover:bg-sky-100 peer-focus-visible:border-sky-700 peer-focus-visible:outline-sky-300 peer-checked:border-sky-700 peer-checked:bg-sky-600 peer-checked:hover:border-sky-700 peer-checked:hover:bg-sky-600",
  paper:
    "border-amber-200 bg-amber-50 text-amber-950 shadow-amber-100 hover:border-amber-300 hover:bg-amber-100 peer-focus-visible:border-amber-600 peer-focus-visible:outline-amber-300 peer-checked:border-amber-600 peer-checked:bg-amber-500 peer-checked:hover:border-amber-600 peer-checked:hover:bg-amber-500",
};

<RadioButtonGroup
  name="hand"
  options={PAGE.PLAY_GAME.HAND.OPTIONS}
  optionClassNames={handOptionClassNames}
  errorMessage={PAGE.PLAY_GAME.HAND.ERROR_REQUIRED}
  className="mt-3"
/>
```

標準レイアウト:

```text
grid grid-cols-3 gap-3
```

ルール:

- `RadioButtonGroup` 自体の margin は、利用側の `className` で指定する。
- エラー時の `aria-invalid` と `aria-describedby` は各 `RadioButton` に付与する。
- エラーメッセージはグループ直後に表示する。
- 新しくラジオ選択 UI を作る場合は、先に atom の `RadioButton` を作り、それを組み合わせる molecule として `RadioButtonGroup` を作る。

### Modal

モーダル表示には `components/molecules/Modal.tsx` を使う。

```tsx
<Modal
  open={Boolean(modalMessage)}
  title={modalMessage}
  closeLabel={PAGE.CREATED_GAME.MODAL_CLOSE}
  onClose={() => setModalMessage(undefined)}
/>
```

ルール:

- `Modal` は Client Component。
- 開閉状態や `navigator.clipboard` などの副作用は利用側の Client Component で扱う。
- `open` が `false` の場合は何も描画しない。
- 本文が必要な場合は `children` を渡す。

### BaseButtonLayout

ボタンの共通レイアウトは `components/templates/BaseButtonLayout.tsx` に集約する。

共通スタイル:

```text
relative flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-bold transition
```

`PrimaryButton` と `SecondaryButton` はこのレイアウトを使う。画面側から直接 `BaseButtonLayout` を使うのではなく、用途に応じて `PrimaryButton` または `SecondaryButton` を使う。

## アイコン指定

ボタンにアイコンを表示する場合は、`iconName` を使う。

```tsx
<PrimaryButton iconName="arrow">...</PrimaryButton>
```

ルール:

- `iconName` にはパスを書かない。
- `iconName` には拡張子を書かない。
- アイコンファイルは必ず `public/images/` に `.svg` として配置する。
- `iconName="arrow"` の場合、参照先は `/images/arrow.svg` になる。
- `iconName` を渡さない場合、アイコンは表示しない。

アイコン props の初期値:

| props | 初期値 |
|---|---|
| `iconAlt` | `""` |
| `iconWidth` | `16` |
| `iconHeight` | `16` |
| `iconClassName` | `""` |

実際のアイコン class は、共通の `absolute right-6` に `iconClassName` を追加したものになる。

```tsx
<PrimaryButton
  iconName="arrow"
  iconAlt=""
  iconWidth={16}
  iconHeight={16}
  iconClassName="opacity-90"
>
  ...
</PrimaryButton>
```

## レイアウト

画面全体の枠には `components/templates/GameLayout.tsx` を使う。

```tsx
<GameLayout
  logoSrOnlySuffix={PAGE.CREATED_GAME.TITLE}
  stepActiveIndex={1}
  stepsClassName="mt-10"
>
  ...
</GameLayout>
```

ルール:

- `stepsClassName` のように、画面ごとに余白が変わるものは利用側で指定する。
- ステップ表示の前に要素を差し込みたい場合は `beforeSteps` を使う。
- `stepActiveIndex` を省略すると、全ステップが active 表示になる。
- `GameLayout` 内の主要コンテンツは、必要に応じて `<section className="mt-10 text-left">` や `<form className="mt-10 flex flex-col gap-8 text-left">` で組む。

### StepList

ステップ表示は `components/organisms/StepList.tsx` が担当する。

`GameLayout` から利用するのが基本で、画面側から直接使う必要は少ない。

ステップ文言は `shared/consts/pageNames.ts` の `PAGE_NAMES` を参照する。

## Client Component と metadata

`useState`、`navigator.clipboard`、クリックイベントなどを使うページは `"use client"` を付ける。

Client Component の `page.tsx` からは `metadata` を export できないため、必要な場合は同じルート配下の `layout.tsx` に `metadata` を置く。

例:

```text
app/created-game/page.tsx
app/created-game/layout.tsx
```

## 画面実装時のチェックリスト

- 対象画面の `documents/screens/*.md` を読んだか。
- 既存の共通コンポーネントを使える箇所を確認したか。
- margin を共通コンポーネント内部に固定していないか。
- 文言を `shared/consts/page.ts` または `shared/consts/pageNames.ts` に定義しているか。
- ラベルとエラーを含む入力には `TextField` または `SelectField` を使っているか。
- 1つだけ選ぶ入力は、見た目がボタンでもラジオボタンとして実装しているか。
- ラジオ選択 UI は atom の `RadioButton` と molecule の `RadioButtonGroup` に分けているか。
- キーボード操作時のフォーカス表示に `peer-focus-visible:*` を使っているか。
- 選択中の見た目に `peer-checked:*` を使っているか。
- ボタンアイコンは `iconName` で指定しているか。
- アイコンファイルは `public/images/{iconName}.svg` に置いているか。
- Client Component の `page.tsx` から `metadata` を export していないか。
- `npm run typecheck` と `npm run lint` を通したか。

## 依頼文の例

```text
documents/screens/04-play-game.md を確認して、参加者のじゃんけん画面の見た目を作成してください。

実装時は documents/screens/00-visual-implementation-guide.md の方針に従ってください。
既存の Heading2 / Heading3 / BaseText / DataList / TextField / SelectField / RadioButtonGroup / PrimaryButton / SecondaryButton / GameLayout を優先して使い、margin は利用側の className または containerClassName に指定してください。
表示文言は shared/consts/page.ts に定義して参照してください。
```
