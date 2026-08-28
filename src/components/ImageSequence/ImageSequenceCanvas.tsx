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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastRenderedFrame = -1;
    let lastCanvasW = 0;
    let lastCanvasH = 0;
    const isMobile = window.innerWidth <= 768;
    const maxDpr = isMobile ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const render = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Cache the 2D context — only get it once
      if (!ctxRef.current) {
        ctxRef.current = canvas.getContext('2d', { alpha: false });
      }
      const ctx = ctxRef.current;
      if (!ctx) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Calculate the current frame
      const staticFrame = isMobile ? 52 : 105;
      const currentFrameIndex = prefersReducedMotion 
        ? staticFrame 
        : getFrameIndex(progressRef.current, totalFrames);

      // Resize canvas only when container size actually changes
      const rect = container.getBoundingClientRect();
      const targetW = Math.floor(rect.width * dpr);
      const targetH = Math.floor(rect.height * dpr);

      let didResize = false;
      if (targetW !== lastCanvasW || targetH !== lastCanvasH) {
        canvas.width = targetW;
        canvas.height = targetH;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        lastCanvasW = targetW;
        lastCanvasH = targetH;
        didResize = true;
        // Context state is reset after resize, so re-apply settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      // Skip drawing if frame hasn't changed and no resize
      if (!didResize && currentFrameIndex === lastRenderedFrame) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastRenderedFrame = currentFrameIndex;

      const img = frames.getFrame(currentFrameIndex);

      // Reset transform
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Background fill
      ctx.fillStyle = '#e8edf2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (img) {
        ctx.scale(dpr, dpr);

        const viewW = rect.width;
        const viewH = rect.height;

        // Cover-fit
        const scale = Math.max(viewW / img.width, viewH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const x = (viewW - drawW) / 2;
        const y = (viewH - drawH) / 2;

        ctx.drawImage(img, x, y, drawW, drawH);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ctxRef.current = null;
    };
  }, [frames, prefersReducedMotion, progressRef, totalFrames]);

  return (
    <div ref={containerRef} className={`w-full h-full relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
