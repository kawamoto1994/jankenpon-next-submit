import type { ReactNode } from "react";

interface DataListItem {
  label: string;
  value: ReactNode;
}

interface DataListProps {
  items: DataListItem[];
  className?: string;
}

const DataList = (props: DataListProps) => {
  const { items, className = "" } = props;

  return (
    <dl
      className={`divide-y divide-gray-100 rounded-lg border border-gray-200 ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 px-4 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4 sm:px-5"
        >
          <dt className="text-sm font-bold text-gray-500">{item.label}</dt>
          <dd className="text-base font-medium text-gray-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default DataList;
