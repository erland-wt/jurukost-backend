import { FormEvent } from 'react';
import type { KostFeature } from '../../types/map';
import { useSearchField } from '../../hooks/useSearchField';

interface Props {
  kosts: KostFeature[];
}

export function SearchField({ kosts }: Props) {
  const { query, setQuery, searching, handleSubmit } = useSearchField({
    kosts,
    city: 'Jakarta',
    onNotFound: () => alert('Lokasi atau Nama Kost tidak ditemukan 😔'),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    void handleSubmit(e);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 sm:top-5 z-1000 px-3 sm:px-4">
      <div className="mx-auto w-full max-w-xl">
        <form
          onSubmit={onSubmit}
          className="pointer-events-auto flex w-full items-center gap-2 rounded-2xl sm:rounded-full bg-white/95 px-3 py-2 sm:px-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md focus-within:ring-2 focus-within:ring-emerald-500/70"
        >
          <input
            type="text"
            placeholder="Cari nama kost atau lokasi..."
            className="w-full flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Cari kost"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-emerald-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:bg-gray-400 disabled:shadow-none"
            disabled={searching}
          >
            {searching ? 'Mencari...' : 'Cari'}
          </button>
        </form>
      </div>
    </div>
  );
}