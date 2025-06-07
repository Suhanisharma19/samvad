declare module '@mediapipe/hands' {
  export interface Results {
    multiHandLandmarks?: Array<Array<{
      x: number;
      y: number;
      z: number;
    }>>;
  }

  export class Hands {
    constructor(config?: {
      locateFile?: (file: string) => string;
    });
    setOptions(options: {
      maxNumHands?: number;
      modelComplexity?: number;
      minDetectionConfidence?: number;
      minTrackingConfidence?: number;
    }): void;
    onResults(callback: (results: Results) => void): void;
    send(options: { image: HTMLVideoElement }): Promise<void>;
    close(): void;
  }
}

declare module '@mediapipe/camera_utils' {
  export class Camera {
    constructor(
      videoElement: HTMLVideoElement,
      config: {
        onFrame?: () => Promise<void>;
        width?: number;
        height?: number;
      }
    );
    start(): Promise<void>;
    stop(): void;
  }
} 