import { GestureDescription } from 'fingerpose';
import { aslGestures } from './aslGestures';

interface DetectionResult {
  gesture: string;
  confidence: number;
}

export class GestureDetectionManager {
  private lastDetectedGesture: string | null = null;
  private detectionTimeout: NodeJS.Timeout | null = null;
  private isDetecting: boolean = true;
  private confidenceThreshold: number = 8.5;
  private detectionCooldown: number = 1000; // 1 second cooldown between detections
  private onGestureDetected: (gesture: string) => void;

  constructor(onGestureDetected: (gesture: string) => void) {
    this.onGestureDetected = onGestureDetected;
  }

  /**
   * Process the estimation results and detect gestures
   * @param predictions Array of gesture predictions with confidence scores
   */
  public processGestureDetection(predictions: DetectionResult[]): void {
    if (!this.isDetecting) return;

    // Sort predictions by confidence
    const sortedPredictions = [...predictions].sort((a, b) => b.confidence - a.confidence);
    const bestPrediction = sortedPredictions[0];

    // Check if we have a prediction with sufficient confidence
    if (bestPrediction && bestPrediction.confidence > this.confidenceThreshold) {
      const detectedGesture = bestPrediction.gesture;

      // If it's a new gesture, different from the last detected one
      if (detectedGesture !== this.lastDetectedGesture) {
        this.handleNewGestureDetected(detectedGesture);
      }
    } else {
      // If no confident prediction, reset last detected gesture
      // This allows detecting the same gesture again after showing no gesture
      this.lastDetectedGesture = null;
    }
  }

  /**
   * Handle a newly detected gesture
   * @param gesture The detected gesture name
   */
  private handleNewGestureDetected(gesture: string): void {
    // Update last detected gesture
    this.lastDetectedGesture = gesture;

    // Temporarily pause detection
    this.isDetecting = false;

    // Clear any existing timeout
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
    }

    // Notify about the detected gesture
    this.onGestureDetected(gesture);

    // Set cooldown period before detecting new gestures
    this.detectionTimeout = setTimeout(() => {
      this.isDetecting = true;
      this.lastDetectedGesture = null;
    }, this.detectionCooldown);
  }

  /**
   * Set the confidence threshold for gesture detection
   * @param threshold New confidence threshold (0-10)
   */
  public setConfidenceThreshold(threshold: number): void {
    this.confidenceThreshold = Math.max(0, Math.min(10, threshold));
  }

  /**
   * Set the cooldown period between gesture detections
   * @param milliseconds Cooldown period in milliseconds
   */
  public setDetectionCooldown(milliseconds: number): void {
    this.detectionCooldown = Math.max(0, milliseconds);
  }

  /**
   * Reset the detection state
   */
  public reset(): void {
    this.lastDetectedGesture = null;
    this.isDetecting = true;
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
    }
  }
} 