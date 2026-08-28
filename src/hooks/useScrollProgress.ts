import { useEffect, useRef, useState, type RefObject } from 'react';

// Easing factor: lower = smoother/slower, higher = faster/snappier
const EASING = 0.08;

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>) {
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const [progressState, setProgressState] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let isRunning = true;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      
      let newProgress = 0;
      if (scrollableDistance > 0) {
        const scrollDistance = -rect.top;
        newProgress = Math.max(0, Math.min(scrollDistance / scrollableDistance, 1));
      }
      
      targetProgressRef.current = newProgress;
    };

    // Constant animation loop for smooth interpolation
    const tick = () => {
      if (!isRunning) return;

      const current = progressRef.current;
      const target = targetProgressRef.current;
      
      // If we are close enough, just snap to it to prevent endless micro-updates
      if (Math.abs(target - current) > 0.0001) {
        progressRef.current = current + (target - current) * EASING;
        
        // Only trigger React re-render if change is large enough (prevents thrashing)
        // Canvas will use progressRef directly for perfectly smooth 60fps
        if (Math.abs(progressRef.current - progressState) > 0.01) {
          setProgressState(progressRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return { progressRef, progressState };
}
