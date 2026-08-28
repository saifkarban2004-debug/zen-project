import { useState, useEffect, useRef, useCallback } from 'react';

interface UseImageSequenceResult {
  isLoading: boolean;
  progress: number;
  isInitialBatchReady: boolean;
  getFrame: (index: number) => HTMLImageElement | null;
}

export function useImageSequence(
  framePaths: string[],
  initialBatchSize: number = 30
): UseImageSequenceResult {
  const [progress, setProgress] = useState(0);
  const [isInitialBatchReady, setIsInitialBatchReady] = useState(false);
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedCount = useRef(0);
  const totalFrames = framePaths.length;
  
  // Track failed frames to avoid retrying infinitely
  const failedFrames = useRef<Set<number>>(new Set());

  useEffect(() => {
    let isActive = true;
    const cache = frameCache.current;
    
    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (cache.has(index) || failedFrames.current.has(index)) {
          resolve();
          return;
        }

        const img = new Image();
        img.onload = () => {
          if (isActive) {
            cache.set(index, img);
            loadedCount.current += 1;
            setProgress(loadedCount.current / totalFrames);
          }
          resolve();
        };
        img.onerror = () => {
          if (isActive) {
            failedFrames.current.add(index);
            // Count failed as loaded so progress reaches 100%
            loadedCount.current += 1;
            setProgress(loadedCount.current / totalFrames);
          }
          resolve();
        };
        img.src = framePaths[index];
      });
    };

    const loadInitialBatch = async () => {
      // Phase 1: Load frame 0 immediately
      await loadFrame(0);
      
      // Phase 2: Load initial batch
      const batchSize = Math.min(initialBatchSize, totalFrames);
      
      // Concurrency limit for initial batch
      const maxConcurrency = 6;
      for (let i = 1; i < batchSize; i += maxConcurrency) {
        const chunk = [];
        for (let j = 0; j < maxConcurrency && i + j < batchSize; j++) {
          chunk.push(loadFrame(i + j));
        }
        await Promise.all(chunk);
      }
      
      if (isActive) {
        setIsInitialBatchReady(true);
        // Phase 3: Progressive background loading
        loadRemainingFrames();
      }
    };

    const loadRemainingFrames = () => {
      const loadNext = async (startIndex: number) => {
        if (!isActive) return;
        
        const chunk = [];
        for (let i = 0; i < 6 && startIndex + i < totalFrames; i++) {
          chunk.push(loadFrame(startIndex + i));
        }
        
        await Promise.all(chunk);
        
        if (startIndex + 6 < totalFrames) {
          // Use requestIdleCallback if available, else setTimeout
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => loadNext(startIndex + 6));
          } else {
            setTimeout(() => loadNext(startIndex + 6), 50);
          }
        }
      };
      
      loadNext(initialBatchSize);
    };

    loadInitialBatch();

    return () => {
      isActive = false;
    };
  }, [framePaths, initialBatchSize, totalFrames]);

  const getFrame = useCallback((index: number): HTMLImageElement | null => {
    const cache = frameCache.current;
    if (cache.has(index)) {
      return cache.get(index)!;
    }
    
    // Find nearest available frame looking backward
    for (let i = index - 1; i >= 0; i--) {
      if (cache.has(i)) return cache.get(i)!;
    }
    
    // Find nearest available frame looking forward
    for (let i = index + 1; i < totalFrames; i++) {
      if (cache.has(i)) return cache.get(i)!;
    }
    
    return null;
  }, [totalFrames]);

  return {
    isLoading: loadedCount.current < totalFrames,
    progress,
    isInitialBatchReady,
    getFrame
  };
}
