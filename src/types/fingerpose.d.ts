declare module 'fingerpose' {
  export class GestureDescription {
    constructor(name: string);
    addCurl(finger: number, curl: number, confidence: number): void;
    addDirection(finger: number, direction: number, confidence: number): void;
  }

  export class GestureEstimator {
    constructor(gestures: GestureDescription[]);
    estimate(landmarks: any[], minConfidence: number): Promise<{
      gestures: Array<{
        name: string;
        score: number;
      }>;
    }>;
  }

  export const Finger: {
    Thumb: number;
    Index: number;
    Middle: number;
    Ring: number;
    Pinky: number;
    All: number;
  };

  export const FingerCurl: {
    NoCurl: number;
    HalfCurl: number;
    FullCurl: number;
  };

  export const FingerDirection: {
    VerticalUp: number;
    VerticalDown: number;
    HorizontalLeft: number;
    HorizontalRight: number;
    DiagonalUpRight: number;
    DiagonalUpLeft: number;
    DiagonalDownRight: number;
    DiagonalDownLeft: number;
    Right: number;
    Up: number;
  };
} 