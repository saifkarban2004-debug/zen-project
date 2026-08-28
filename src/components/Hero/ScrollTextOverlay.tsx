export function ScrollTextOverlay({ progress }: { progress: number }) {
  // Helper to calculate opacity fading in, staying flat, and fading out
  const getOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress < peakStart) return (progress - start) / (peakStart - start);
    if (progress > peakEnd) return (end - progress) / (end - peakEnd);
    return 1;
  };

  // Helper for smooth parallax translation
  const getTransform = (peak: number) => `translateY(${(progress - peak) * -80}px)`;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      
      {/* Scroll Indicator (Only visible at very top) */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: progress < 0.05 ? 1 - (progress * 20) : 0 }}
      >
        <div className="w-[1px] h-16 bg-slate-400 overflow-hidden relative">
          <div className="absolute top-0 w-full h-1/2 bg-slate-900 animate-[scroll_2s_ease-in-out_infinite]" />
        </div>
        <span className="mt-4 text-xs tracking-[0.3em] font-medium text-slate-700 uppercase">Scroll</span>
      </div>

      {/* TEXT BLOCK 1 */}
      <div 
        className="absolute top-[15%] md:top-[35%] left-[5%] md:left-[10%] max-w-[280px] md:max-w-sm transition-opacity duration-75 backdrop-blur-md bg-white/40 p-6 md:p-8 rounded-2xl shadow-lg border border-white/50"
        style={{ 
          opacity: getOpacity(0.02, 0.10, 0.20, 0.32),
          transform: getTransform(0.15)
        }}
      >
        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight mb-4 drop-shadow-sm">
          Pure Botanical <br/><span className="italic text-slate-700">Essence</span>
        </h2>
        <p className="text-sm md:text-base font-normal text-slate-800 tracking-wide leading-relaxed drop-shadow-sm">
          Extracted from wild blueberries. Hand-harvested to preserve the delicate natural antioxidants that revitalize your skin.
        </p>
      </div>

      {/* TEXT BLOCK 2 */}
      <div 
        className="absolute top-[70%] md:top-[45%] right-[5%] md:right-[10%] max-w-[280px] md:max-w-sm text-right transition-opacity duration-75 backdrop-blur-md bg-white/40 p-6 md:p-8 rounded-2xl shadow-lg border border-white/50"
        style={{ 
          opacity: getOpacity(0.30, 0.40, 0.55, 0.65),
          transform: getTransform(0.48)
        }}
      >
        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight mb-4 drop-shadow-sm">
          Aromatic <br/><span className="italic text-slate-700">Harmony</span>
        </h2>
        <p className="text-sm md:text-base font-normal text-slate-800 tracking-wide leading-relaxed drop-shadow-sm">
          Enriched with natural essential oils that transform your daily shower into a restorative, sensory ritual.
        </p>
      </div>

      {/* TEXT BLOCK 3 */}
      <div 
        className="absolute top-[15%] md:top-[40%] left-[5%] md:left-[12%] max-w-[280px] md:max-w-sm transition-opacity duration-75 backdrop-blur-md bg-white/40 p-6 md:p-8 rounded-2xl shadow-lg border border-white/50"
        style={{ 
          opacity: getOpacity(0.65, 0.75, 0.90, 1.0),
          transform: getTransform(0.85)
        }}
      >
        <span className="block text-xs md:text-sm tracking-[0.4em] text-slate-700 uppercase mb-4 font-semibold drop-shadow-sm">
          The Arohanc Collection
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 drop-shadow-sm">
          Elevate Your <br/>Routine
        </h2>
        <button 
          onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="pointer-events-auto group flex items-center gap-4 text-sm tracking-[0.2em] uppercase font-bold text-slate-900 hover:text-slate-600 transition-colors"
        >
          <span className="w-8 h-[2px] bg-slate-900 group-hover:w-12 transition-all duration-300" />
          Discover More
        </button>
      </div>

    </div>
  );
}
