import { Marker, Popup, useMapEvents } from 'react-leaflet';
import type { LatLng, PredictionInputs, PredictionResult } from '../../types/map';
import { iconRed } from './icons';

interface Props {
  predictionPoint: LatLng | null;
  inputs: PredictionInputs;
  setInputs: (inputs: PredictionInputs) => void;
  predictionResult: PredictionResult | null;
  isPredicting: boolean;
  onSelectPoint: (point: LatLng) => void;
  onPredict: () => void;
}

function ClickHandler({ onSelectPoint }: { onSelectPoint: (p: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onSelectPoint({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export function PredictionMarker({
  predictionPoint,
  inputs,
  setInputs,
  predictionResult,
  isPredicting,
  onSelectPoint,
  onPredict,
}: Props) {
  return (
    <>
      <ClickHandler onSelectPoint={onSelectPoint} />
      {predictionPoint && (
        <Marker position={[predictionPoint.lat, predictionPoint.lng]} icon={iconRed}>
          <Popup minWidth={280}>
            <div className="font-sans p-2">
              <h3 className="font-bold border-b pb-2 mb-3 text-gray-800 flex items-center gap-2">
                🤖 AI Price Estimator
              </h3>
              <div className="space-y-3 mb-4 text-sm text-gray-700">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={inputs.is_ac}
                    onChange={(e) =>
                      setInputs({ ...inputs, is_ac: e.target.checked })
                    }
                    className="accent-blue-600"
                  />
                  <span>Fasilitas AC</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={inputs.is_kamar_mandi_dalam}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        is_kamar_mandi_dalam: e.target.checked,
                      })
                    }
                    className="accent-blue-600"
                  />
                  <span>Kamar Mandi Dalam</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={inputs.is_wifi}
                    onChange={(e) =>
                      setInputs({ ...inputs, is_wifi: e.target.checked })
                    }
                    className="accent-blue-600"
                  />
                  <span>WiFi Internet</span>
                </label>
              </div>
              <button
                onClick={onPredict}
                disabled={isPredicting}
                className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-bold text-sm hover:shadow-lg transition disabled:bg-gray-400"
              >
                {isPredicting ? 'Menganalisa...' : '✨ Hitung Harga Wajar'}
              </button>

              {predictionResult && predictionResult.lokasi_analisis && (
                <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-200 animate-in fade-in zoom-in duration-300">
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-white p-1 rounded shadow-sm">
                      <div>🚆</div>
                      <div className="text-[10px] font-bold text-gray-600">
                        {predictionResult.lokasi_analisis.jarak_mrt_km} km
                      </div>
                    </div>
                    <div className="bg-white p-1 rounded shadow-sm">
                      <div>🛍️</div>
                      <div className="text-[10px] font-bold text-gray-600">
                        {predictionResult.lokasi_analisis.jarak_mall_km} km
                      </div>
                    </div>
                    <div className="bg-white p-1 rounded shadow-sm">
                      <div>🚌</div>
                      <div className="text-[10px] font-bold text-gray-600">
                        {predictionResult.lokasi_analisis.jarak_bus_km} km
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-2 border-t border-green-200">
                    <p className="text-xs text-gray-500">
                      Estimasi Harga Wajar:
                    </p>
                    <p className="text-xl font-extrabold text-green-700 mt-1">
                      Rp{' '}
                      {predictionResult.prediksi_harga.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}