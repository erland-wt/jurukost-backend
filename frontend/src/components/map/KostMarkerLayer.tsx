import { Marker, Popup } from 'react-leaflet';
import type { KostFeature } from '../../types/map';
import { iconBlue } from './icons';
import { StatusBadge } from './StatusBadge';

interface Props {
  kosts?: KostFeature[];
}

export function KostMarkerLayer({ kosts = [] }: Props) {
  return (
    <>
      {kosts.map((kost) => {
        if (!kost.geometry || !kost.geometry.coordinates) return null;

        const analisis = kost.properties.analisis_harga;
        const [lng, lat] = kost.geometry.coordinates;

        const bgImage =
          kost.properties.gambar_url &&
          kost.properties.gambar_url.length > 10
            ? kost.properties.gambar_url
            : `https://source.unsplash.com/random/300x200/?bedroom&sig=${kost.id}`;

        return (
          <Marker key={kost.id} position={[lat, lng]} icon={iconBlue}>
            <Popup className="custom-popup" minWidth={300}>
              <div className="font-sans overflow-hidden">
                <div className="h-32 bg-gray-200 w-full mb-2 rounded-t-lg flex items-center justify-center relative overflow-hidden group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                  />
                  {analisis && (
                    <div className="absolute top-2 right-2 z-10">
                      <StatusBadge status={analisis.status} />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-0.5 text-[10px] rounded backdrop-blur-sm shadow-sm">
                    📏 {kost.properties.luas_kamar || 'Unknown'}
                  </div>
                </div>

                <div className="px-1">
                  <h3 className="font-bold text-lg leading-tight mb-1 text-gray-800 line-clamp-1">
                    {kost.properties.nama}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 truncate">
                    📍 {kost.properties.alamat}
                  </p>

                  <div className="flex justify-between items-end mb-3 border-b pb-2 border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-500">Harga Sewa:</p>
                      <p className="font-bold text-blue-600 text-lg">
                        Rp{' '}
                        {Number(
                          kost.properties.harga_per_bulan,
                        ).toLocaleString('id-ID')}
                      </p>
                    </div>
                    {analisis && (
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500">Wajar AI:</p>
                        <p className="text-sm font-semibold text-gray-600">
                          Rp{' '}
                          {analisis.harga_wajar_ai.toLocaleString('id-ID')}
                        </p>
                      </div>
                    )}
                  </div>

                  {analisis && (
                    <div className="mb-3 bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="grid grid-cols-3 gap-1 text-center">
                        <div>
                          <div className="text-lg">🚆</div>
                          <div className="text-[9px] font-bold text-gray-600">
                            {analisis.jarak_mrt} km
                          </div>
                        </div>
                        <div>
                          <div className="text-lg">🛍️</div>
                          <div className="text-[9px] font-bold text-gray-600">
                            {analisis.jarak_mall} km
                          </div>
                        </div>
                        <div>
                          <div className="text-lg">🚌</div>
                          <div className="text-[9px] font-bold text-gray-600">
                            {analisis.jarak_bus} km
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mb-1">
                    {kost.properties.is_ac && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100">
                        ❄️ AC
                      </span>
                    )}
                    {kost.properties.is_wifi && (
                      <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded border border-green-100">
                        📶 WiFi
                      </span>
                    )}
                    {kost.properties.is_kamar_mandi_dalam && (
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded border border-orange-100">
                        🚿 KM Dalam
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}