import type { ReactNode } from "react";

import Logo from "@/components/atoms/Logo";
import StepList from "@/components/organisms/StepList";

interface GameLayoutProps {
  logoSrOnlySuffix?: string;
  beforeSteps?: ReactNode;
  stepActiveIndex?: number;
  stepsClassName?: string;
  children: ReactNode;
}

const GameLayout = (props: GameLayoutProps) => {
  const {
    logoSrOnlySuffix,
    beforeSteps,
    stepActiveIndex,
    stepsClassName = "mt-6",
    children,
  } = props;

  return (
    <div>
      <main className="flex min-h-dvh justify-center bg-[url(/images/bg.png)] bg-cover bg-center bg-fixed px-4 py-6 md:p-10">
        <div className="w-full max-w-2xl rounded-4xl border border-gray-200 bg-white p-8 shadow-xl md:p-12">
          <Logo srOnlySuffix={logoSrOnlySuffix} />

          {beforeSteps}

          <StepList activeIndex={stepActiveIndex} className={stepsClassName} />

          {children}
        </div>
      </main>
    </div>
  );
};

export default GameLayout;
