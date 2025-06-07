import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { GestureDescription, GestureEstimator } from 'fingerpose';
import { aslGestures } from '../utils/aslGestures';

// Define hand connections for the stick figure
const HAND_CONNECTIONS: [number, number][] = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index finger
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle finger
  [0, 9], [9, 10], [10, 11], [11, 12],
  // Ring finger
  [0, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm base
  [0, 5], [5, 9], [9, 13], [13, 17]
];

interface UseHandTrackingProps {
  onGestureDetected?: (gesture: string) => void;
  enabled: boolean;
  videoElement: HTMLVideoElement | null;
}

interface Gesture {
  name: string;
  score: number;
}

export const useHandTracking = ({ onGestureDetected, enabled, videoElement }: UseHandTrackingProps) => {
  const [handLandmarks, setHandLandmarks] = useState<Array<Array<{ x: number; y: number; z: number }>>>([]);
  const [gestureDetected, setGestureDetected] = useState<string>('');
  const modelRef = useRef<handpose.HandPose | null>(null);
  const handsRef = useRef<Hands | null>(null);
  const gestureEstimator = useRef<GestureEstimator | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const lastGestureRef = useRef<string>('');
  const lastGestureTimeRef = useRef<number>(0);
  const GESTURE_COOLDOWN = 1000; // 1 second cooldown between same gestures

  useEffect(() => {
    if (!enabled || !videoElement) return;

    const initializeHandTracking = async () => {
      try {
        console.log('Initializing hand tracking...');
        await tf.ready();
        console.log('TensorFlow.js ready');
        
        modelRef.current = await handpose.load();
        console.log('Handpose model loaded');
        
        handsRef.current = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        handsRef.current.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7
        });

        handsRef.current.onResults(onResults);
        console.log('MediaPipe Hands initialized');

        // Initialize gesture estimator with all ASL gestures
        gestureEstimator.current = new GestureEstimator(Object.values(aslGestures));
        console.log('Gesture estimator initialized');

        cameraRef.current = new Camera(videoElement, {
          onFrame: async () => {
            if (handsRef.current && videoElement) {
              await handsRef.current.send({ image: videoElement });
            }
          },
          width: 640,
          height: 480
        });

        await cameraRef.current.start();
        console.log('Camera started');
      } catch (error) {
        console.error('Error initializing hand tracking:', error);
      }
    };

    initializeHandTracking();

    return () => {
      if (handsRef.current) {
        handsRef.current.close();
      }
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [enabled, videoElement]);

  const onResults = async (results: Results) => {
    if (!results.multiHandLandmarks) return;

    setHandLandmarks(results.multiHandLandmarks);
    console.log('Hand landmarks detected:', results.multiHandLandmarks.length);

    if (modelRef.current && results.multiHandLandmarks.length > 0 && gestureEstimator.current) {
      try {
        const predictions = await modelRef.current.estimateHands(videoElement!);
        
        // Process gestures for the dominant hand (first detected hand)
        if (predictions.length > 0) {
          const gesture = await gestureEstimator.current.estimate(predictions[0].landmarks, 7.5);
          
          if (gesture.gestures.length > 0) {
            const confidenceThreshold = 8;
            const possibleGestures = gesture.gestures
              .filter((g: Gesture) => g.score > confidenceThreshold)
              .sort((a: Gesture, b: Gesture) => b.score - a.score);
            
            if (possibleGestures.length > 0) {
              const detectedGesture = possibleGestures[0];
              const currentTime = Date.now();
              
              // Only trigger if it's a different gesture or enough time has passed
              if (detectedGesture.name !== lastGestureRef.current || 
                  currentTime - lastGestureTimeRef.current > GESTURE_COOLDOWN) {
                setGestureDetected(detectedGesture.name);
                onGestureDetected?.(detectedGesture.name);
                lastGestureRef.current = detectedGesture.name;
                lastGestureTimeRef.current = currentTime;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error estimating hand pose:', error);
      }
    }
  };

  const drawHandLandmarks = (ctx: CanvasRenderingContext2D) => {
    if (!handLandmarks.length) return;

    // Clear the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw hand landmarks for each detected hand
    handLandmarks.forEach((landmarks, index) => {
      const color = index === 0 ? '#00FF00' : '#FF0000'; // Green for first hand, Red for second hand
      
      // Draw the connecting lines
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
        color: color,
        lineWidth: 3
      });

      // Draw the landmarks
      drawLandmarks(ctx, landmarks, {
        color: '#FFFFFF',
        lineWidth: 2,
        radius: 4
      });
    });
  };

  return {
    handLandmarks,
    gestureDetected,
    drawHandLandmarks
  };
}; 