import { useEffect, useMemo, useState } from 'react';
import type { AxiosResponse } from 'axios';
import { api } from '../lib/api';
import type { AnalisisStatus, KostFeature } from '../types/map';

type FilterStatus = AnalisisStatus | 'All';

// Bentuk response API
interface FeatureCollectionResponse {
  type: 'FeatureCollection';
  features: KostFeature[];
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FeatureCollectionResponse;
}

type KostsApiResponse = FeatureCollectionResponse | PaginatedResponse;

export function useKostData() {
  const [kosts, setKosts] = useState<KostFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAllKosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url: string | null = '/api/kosts/';
        let allFeatures: KostFeature[] = [];

        while (url) {
          const response: AxiosResponse<KostsApiResponse> =
            await api.get<KostsApiResponse>(url as string);
          const data: KostsApiResponse = response.data;

          let features: KostFeature[] = [];

          // 1) Non-paginated: { type: 'FeatureCollection', features: [...] }
          if ('features' in data && Array.isArray(data.features)) {
            features = data.features;
          }
          // 2) Paginated:
          // { count, next, previous, results: { type:'FeatureCollection', features:[...] } }
          else if (
            'results' in data &&
            data.results &&
            Array.isArray(data.results.features)
          ) {
            features = data.results.features;
          } else {
            console.warn('Format /api/kosts/ tidak sesuai FeatureCollection', data);
          }

          allFeatures = allFeatures.concat(features);

          let nextUrl: string | null = null;
          if ('next' in data) {
            nextUrl = (data as PaginatedResponse).next;
          }
          url = nextUrl;
        }

        if (!isMounted) return;

        console.log('Total loaded kost features:', allFeatures.length);
        setKosts(allFeatures);
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setError('Gagal memuat data kost.');
        setKosts([]);
      } finally {
        if (!isMounted) return;
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchAllKosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredKosts = useMemo(() => {
    const base = Array.isArray(kosts) ? kosts : [];
    if (filterStatus === 'All') return base;

    return base.filter((kost) => {
      const status = kost.properties.analisis_harga?.status ?? 'Normal';
      return status === filterStatus;
    });
  }, [kosts, filterStatus]);

  return { kosts, filteredKosts, isLoading, error, filterStatus, setFilterStatus };
}