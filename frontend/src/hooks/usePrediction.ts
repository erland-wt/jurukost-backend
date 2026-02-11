import { useState } from 'react';
import { api } from '../lib/api';
import type {
  LatLng,
  PredictionInputs,
  PredictionResult,
} from '../types/map';

const DEFAULT_INPUTS: PredictionInputs = {
  is_ac: false,
  is_wifi: false,
  is_kamar_mandi_dalam: false,
};

export function usePrediction() {
  const [predictionPoint, setPredictionPoint] = useState<LatLng | null>(null);
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [inputs, setInputs] = useState<PredictionInputs>(DEFAULT_INPUTS);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleSelectPoint = (latlng: LatLng) => {
    setPredictionPoint(latlng);
    setPredictionResult(null);
  };

  const handlePredict = async () => {
    if (!predictionPoint) return;
    setIsPredicting(true);
    try {
      const payload = {
        latitude: predictionPoint.lat,
        longitude: predictionPoint.lng,
        is_ac: inputs.is_ac ? 1 : 0,
        is_wifi: inputs.is_wifi ? 1 : 0,
        is_kamar_mandi_dalam: inputs.is_kamar_mandi_dalam ? 1 : 0,
      };
      const res = await api.post('/api/predict/', payload);
      setPredictionResult(res.data as PredictionResult);
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setIsPredicting(false);
    }
  };

  return {
    predictionPoint,
    predictionResult,
    inputs,
    setInputs,
    isPredicting,
    handleSelectPoint,
    handlePredict,
  };
}