

interface LoadingScreenProps {
  isVisible: boolean;
  progress: number;
}

export function LoadingScreen({ isVisible, progress }: LoadingScreenProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-serif tracking-widest text-slate-100">
          ZEN
        </h2>
        
        <div className="flex flex-col items-center space-y-4">
          <span className="text-xs md:text-sm tracking-[0.2em] font-light text-slate-400">
            LOADING EXPERIENCE
          </span>
          
          <div className="w-48 md:w-64 h-px bg-slate-800 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-slate-300 transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <span className="text-xs text-slate-500 font-light tracking-widest">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
