export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-gray-200 border-t-primary-500 animate-spin mb-4"></div>
        <h2 className="text-2xl font-display font-medium text-gray-800">Loading Experience</h2>
        <p className="text-gray-500 mt-2">Preparing your 3D customizer...</p>
      </div>
    </div>
  );
}