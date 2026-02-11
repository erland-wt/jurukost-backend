"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useKostData } from "../hooks/useKostData";
import { usePrediction } from "../hooks/usePrediction";

import { LoadingOverlay } from "./map/LoadingOverlay";
import { SearchField } from "./map/SearchField";
import { FilterControl } from "./map/FilterControl";
import { KostMarkerLayer } from "./map/KostMarkerLayer";
import { PredictionMarker } from "./map/PredictionMarker";

type MapProps = {
  className?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
};

export default function Map({
  className = "",
  initialCenter = [-6.2088, 106.8456],
  initialZoom = 12,
}: MapProps) {
  const {
    kosts,
    filteredKosts,
    isLoading,
    error,
    filterStatus,
    setFilterStatus,
  } = useKostData();

  const {
    predictionPoint,
    predictionResult,
    inputs,
    setInputs,
    isPredicting,
    handleSelectPoint,
    handlePredict,
  } = usePrediction();

  return (
    <div className={`relative h-full w-full ${className}`}>
      {isLoading && (
        <LoadingOverlay
          title1="Juru"
          title2="Kost"
          message="Sedang memuat semua data kost & marker di peta..."
        />
      )}
      {error && (
        <div className="absolute top-4 left-4 z-1100 rounded bg-red-50 px-4 py-2 text-sm text-red-700 shadow">
          {error}
        </div>
      )}

      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OSM contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SearchField kosts={kosts} />
        <FilterControl filter={filterStatus} setFilter={setFilterStatus} />

        <KostMarkerLayer kosts={filteredKosts} />

        <PredictionMarker
          predictionPoint={predictionPoint}
          inputs={inputs}
          setInputs={setInputs}
          predictionResult={predictionResult}
          isPredicting={isPredicting}
          onSelectPoint={handleSelectPoint}
          onPredict={handlePredict}
        />
      </MapContainer>
    </div>
  );
}