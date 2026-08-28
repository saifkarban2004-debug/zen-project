import { useEffect, useRef } from 'react';
import { useImageSequence } from '../../hooks/useImageSequence';
import { getFrameIndex } from '../../utils/frameUtils';

interface ImageSequenceCanvasProps {
  frames: ReturnType<typeof useImageSequence>;
  progressRef: React.MutableRefObject<number>;
  prefersReducedMotion: boolean;
  totalFrames: number;
  className?: string;
}

export function ImageSequenceCanvas({ frames, progressRef, prefersReducedMotion, totalFrames, className = '' }: ImageSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastRenderedFrame = -1;
    const isMobile = window.innerWidth <= 768;

    const render = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Calculate the current frame instantly inside the loop
      // Use half the static frame index on mobile since we have half the frames
      const staticFrame = isMobile ? 52 : 105;
      const currentFrameIndex = prefersReducedMotion 
        ? staticFrame 
        : getFrameIndex(progressRef.current, totalFrames);

      // We always ensure the canvas size is correct according to the container
      const rect = container.getBoundingClientRect();
      const viewportWidth = rect.width;
      const viewportHeight = rect.height;
      // Cap DPR at 1.5 on mobile to reduce canvas pixel count (~30% savings)
      const maxDpr = isMobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      const needsResize = canvas.width !== Math.floor(viewportWidth * dpr) || canvas.height !== Math.floor(viewportHeight * dpr);

      // Only resize if needed to avoid thrashing
      if (needsResize) {
        canvas.width = Math.floor(viewportWidth * dpr);
        canvas.height = Math.floor(viewportHeight * dpr);
        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${viewportHeight}px`;
      }

      // If no resize and frame hasn't changed, skip drawing to save GPU
      if (!needsResize && currentFrameIndex === lastRenderedFrame) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastRenderedFrame = currentFrameIndex;

      const img = frames.getFrame(currentFrameIndex);

      // Reset transform before drawing/clearing
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Background color
      ctx.fillStyle = '#e8edf2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (img) {
        // Apply DPR scaling for drawing
        ctx.scale(dpr, dpr);

        const canvasWidth = viewportWidth;
        const canvasHeight = viewportHeight;
        const sourceWidth = img.width;
        const sourceHeight = img.height;

        // Use a cover-style scale to fill the viewport (removes pillarboxing)
        const scale = Math.max(
          canvasWidth / sourceWidth,
          canvasHeight / sourceHeight
        );

        const drawWidth = sourceWidth * scale;
        const drawHeight = sourceHeight * scale;

        // Center the frame
        const x = (canvasWidth - drawWidth) / 2;
        const y = (canvasHeight - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // The effect ONLY restarts if `frames` reference changes (which it rarely does), preventing loop tearing
    return () => cancelAnimationFrame(animationFrameId);
  }, [frames, prefersReducedMotion, progressRef, totalFrames]);

  return (
    <div ref={containerRef} className={`w-full h-full relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

