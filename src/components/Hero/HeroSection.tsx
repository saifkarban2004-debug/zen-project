import { useRef, useEffect, useState, useMemo } from 'react';
import { generateFramePaths, getFrameConfig } from '../../utils/frameUtils';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useImageSequence } from '../../hooks/useImageSequence';
import { ImageSequenceCanvas } from '../ImageSequence/ImageSequenceCanvas';
import { ScrollTextOverlay } from './ScrollTextOverlay';
import { LoadingScreen } from './LoadingScreen';
import { ScrollIndicator } from './ScrollIndicator';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const frameConfig = useMemo(() => getFrameConfig(), []);
  const framePaths = useMemo(
    () => generateFramePaths(frameConfig.totalFrames, frameConfig.pattern, frameConfig.step),
    [frameConfig]
  );

  const { progressRef, progressState } = useScrollProgress(containerRef);
  const frames = useImageSequence(framePaths, frameConfig.initialBatchSize);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Scroll height based on actual frame count (accounts for mobile step)
  const scrollHeight = prefersReducedMotion ? '100vh' : `${framePaths.length * 25}px`;

  return (
    <>
      <LoadingScreen 
        isVisible={!frames.isInitialBatchReady} 
        progress={frames.progress} 
      />
      
      <section 
        id="hero" 
        ref={containerRef} 
        style={{ height: scrollHeight }}
        className="relative w-full max-w-none"
      >
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#e8edf2]">
          <ImageSequenceCanvas 
            frames={frames} 
            progressRef={progressRef}
            prefersReducedMotion={prefersReducedMotion}
            totalFrames={framePaths.length}
            className="absolute inset-0 z-0" 
          />
          
          <ScrollTextOverlay progress={progressState} />

          {/* Scroll Down Indicator */}
          <div 
            className={`absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none transition-opacity duration-500 ${
              progressState > 0.02 || !frames.isInitialBatchReady ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <ScrollIndicator />
          </div>
        </div>
      </section>
    </>
  );
}
