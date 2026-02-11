import type { AnalisisStatus } from '../../types/map';

type FilterValue = AnalisisStatus | 'All';

interface Props {
  filter: FilterValue;
  setFilter: (value: FilterValue) => void;
}

export function FilterControl({ filter, setFilter }: Props) {
  const filters: { label: string; value: FilterValue; color: string }[] = [
    { label: 'Semua', value: 'All', color: 'bg-white text-gray-700' },
    {
      label: '💰 Good Deal',
      value: 'Underprice',
      color: 'bg-green-100 text-green-800 border-green-300',
    },
    {
      label: '⚖️ Normal',
      value: 'Normal',
      color: 'bg-gray-100 text-gray-800 border-gray-300',
    },
    {
      label: '⚠️ Overprice',
      value: 'Overprice',
      color: 'bg-red-100 text-red-800 border-red-300',
    },
  ];

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-1000 flex gap-2 overflow-x-auto w-[95%] max-w-lg justify-center py-2 no-scrollbar">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`px-3 py-2 rounded-full text-xs font-bold border transition shadow-sm whitespace-nowrap ${f.color} ${
            filter === f.value
              ? 'ring-2 ring-amber-600 ring-offset-1 shadow-md scale-105'
              : 'opacity-80 hover:opacity-100'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}