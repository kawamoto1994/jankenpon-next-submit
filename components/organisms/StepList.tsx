import { PAGE_NAMES } from "@/shared";

interface StepListProps {
  activeIndex?: number;
  className?: string;
}

const STEPS = [
  PAGE_NAMES.CREATE_GAME,
  PAGE_NAMES.CREATED_GAME,
  PAGE_NAMES.PLAY_GAME,
  PAGE_NAMES.RESULT_GAME,
];

const StepList = (props: StepListProps) => {
  const { activeIndex, className = "" } = props;

  return (
    <ol className={`flex text-center text-base text-gray-700 ${className}`}>
      {STEPS.map((step, i) => {
        const active = activeIndex === undefined || i === activeIndex;
        return (
          <li
            key={step}
            aria-current={i === activeIndex ? "step" : undefined}
            className="flex flex-1 flex-col items-center"
          >
            <div className="flex w-full items-center">
              <span
                className={`h-px flex-1 bg-gray-200 ${i === 0 ? "invisible" : ""}`}
              />
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  active ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`h-px flex-1 bg-gray-200 ${i === STEPS.length - 1 ? "invisible" : ""}`}
              />
            </div>
            <span
              className={`mt-3 px-1 text-sm sm:text-base ${
                active
                  ? "font-bold text-gray-900"
                  : "font-medium text-gray-400"
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default StepList;
