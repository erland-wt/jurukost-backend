import type { AnalisisStatus } from '../../types/map';

interface Props {
  status: AnalisisStatus;
}

export function StatusBadge({ status }: Props) {
  if (status === 'Underprice') {
    return (
      <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200 shadow-sm">
        💰 GOOD DEAL
      </span>
    );
  }
  if (status === 'Overprice') {
    return (
      <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 shadow-sm">
        ⚠️ OVERPRICE
      </span>
    );
  }
  return (
    <span className="bg-gray-100 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200 shadow-sm">
      ⚖️ NORMAL
    </span>
  );
}