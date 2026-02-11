import { useState, FormEvent } from 'react';
import { useMap } from 'react-leaflet';
import axios from 'axios';
import type { KostFeature } from '../types/map';

interface UseSearchFieldOptions {
  kosts: KostFeature[];
  city?: string;
  onNotFound?: (query: string) => void;
}

interface UseSearchFieldResult {
  query: string;
  setQuery: (value: string) => void;
  searching: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useSearchField({
  kosts,
  city = 'Jakarta',
  onNotFound,
}: UseSearchFieldOptions): UseSearchFieldResult {
  const map = useMap();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setSearching(true);
    try {
      const lower = trimmed.toLowerCase();

      // Cari dulu di data kost lokal
      const foundKost = kosts.find((k) =>
        k.properties.nama.toLowerCase().includes(lower),
      );

      if (foundKost) {
        const [lng, lat] = foundKost.geometry.coordinates;
        map.flyTo([lat, lng], 18, { duration: 1.5 });
        return;
      }

      // Fallback ke Nominatim
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          format: 'json',
          q: `${trimmed}, ${city}`,
        },
      });

      if (Array.isArray(res.data) && res.data.length > 0) {
        const { lat, lon } = res.data[0];
        map.flyTo([parseFloat(lat), parseFloat(lon)], 14, { duration: 2 });
      } else if (onNotFound) {
        onNotFound(trimmed);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return { query, setQuery, searching, handleSubmit };
}