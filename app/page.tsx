import BaseText from "@/components/atoms/BaseText";
import MutedText from "@/components/atoms/MutedText";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import GameLayout from "@/components/templates/GameLayout";

export default function Home() {
  return (
    <GameLayout
      beforeSteps={
        <>
          <BaseText className="mt-8">
            URLを共有して、みんなでじゃんけんできるゲームです。
            <br />
            しあいを作って、友だちにURLを送るだけ。
          </BaseText>

          <MutedText className="mt-4">
            作成したしあいは1週間有効です。
          </MutedText>

          <h2 className="mt-10 text-base font-bold text-gray-500">遊び方</h2>
        </>
      }
    >
      <PrimaryButton href="/create-game" className="mt-10">
        しあいを作る
      </PrimaryButton>
    </GameLayout>
  );
}
