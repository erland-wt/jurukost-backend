type LoadingOverlayProps = {
  title1?: string;
  title2?: string;
  message?: string;
};

export function LoadingOverlay({
  title1 = 'Juru',
  title2 = 'Kost',
  message = 'Sedang memuat semua data kost di peta...',
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-9999 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-dashed rounded-full animate-spin" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <div className="text-center animate-pulse">
        <h2 className="text-xl font-bold text-emerald-700">{title1}<span className="text-xl font-bold text-amber-600">{title2}</span></h2>
        <p className="text-sm text-gray-500 mt-1">{message}</p>
      </div>
    </div>
  );
}