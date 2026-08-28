export const TOTAL_FRAMES = 192;
export const FRAME_PATTERN_WEBP = '/frames/webp/frame-{NNNN}.webp';
export const FRAME_PATTERN_WEBP_MOBILE = '/frames/webp-mobile/frame-{NNNN}.webp';
export const FRAME_PATTERN_PNG = '/frames/frame-{NNNN}.png';

export interface FrameConfig {
  pattern: string;
  totalFrames: number;
  /** Step between frame indices (1 = every frame, 2 = every other) */
  step: number;
  initialBatchSize: number;
}

/**
 * Detects device capabilities and returns the optimal frame configuration.
 * - Desktop: all 192 WebP frames at full resolution
 * - Mobile (≤768px): every-other WebP frame at half resolution (96 frames)
 */
export function getFrameConfig(): FrameConfig {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return {
      pattern: FRAME_PATTERN_WEBP_MOBILE,
      totalFrames: TOTAL_FRAMES,
      step: 2, // Load every other frame on mobile
      initialBatchSize: 15,
    };
  }

  return {
    pattern: FRAME_PATTERN_WEBP,
    totalFrames: TOTAL_FRAMES,
    step: 1,
    initialBatchSize: 30,
  };
}

export function generateFramePaths(count: number, pattern: string, step: number = 1): string[] {
  const paths: string[] = [];
  for (let i = 1; i <= count; i += step) {
    const paddedIndex = i.toString().padStart(4, '0');
    paths.push(pattern.replace('{NNNN}', paddedIndex));
  }
  return paths;
}

export function getFrameIndex(progress: number, totalFrames: number): number {
  // progress is 0 to 1
  const index = Math.floor(progress * totalFrames);
  // clamp between 0 and totalFrames - 1
  return Math.max(0, Math.min(index, totalFrames - 1));
}
