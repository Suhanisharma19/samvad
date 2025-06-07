import React, { useRef, useState, useEffect } from 'react';
import * as fp from 'fingerpose';
import { aslGestures } from '../utils/aslGestures';
import { GestureDetectionManager } from '../utils/gestureDetectionManager';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  useTheme,
  styled,
} from '@mui/material';
import { GestureDescription } from 'fingerpose';

const StyledWebcam = styled(Webcam)(({ theme }) => ({
  borderRadius: '24px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  width: '100%',
  maxWidth: '640px',
  height: 'auto',
  transform: 'scaleX(-1)',
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255,112,67,0.1) 0%, rgba(255,152,0,0.1) 100%)',
  borderRadius: '24px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(255,112,67,0.2)',
  },
}));

const ResultBadge = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '1.25rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(255,112,67,0.3)',
}));

interface GesturePrediction {
  name: string;
  score: number;
}

const GestureRecognition = () => {
  const theme = useTheme();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectedSign, setDetectedSign] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState(true);
  const handposeModelRef = useRef<handpose.HandPose | null>(null);
  const gestureManagerRef = useRef<GestureDetectionManager | null>(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confidence, setConfidence] = useState(0);

  // Initialize models and gesture manager
  useEffect(() => {
    const loadModels = async () => {
      // Load the handpose model
      const handModel = await handpose.load();
      handposeModelRef.current = handModel;

      // Initialize gesture manager
      gestureManagerRef.current = new GestureDetectionManager((gesture: string) => {
        setDetectedSign(gesture);
        // Visual feedback that gesture was detected
        setIsDetecting(false);
        setTimeout(() => setIsDetecting(true), 1000);
      });

      setModel(handModel);
      setLoading(false);
    };

    loadModels();
  }, []);

  // Run detection
  useEffect(() => {
    const detectGestures = async () => {
      if (!webcamRef.current || !canvasRef.current || !handposeModelRef.current || !gestureManagerRef.current) {
        return;
      }

      const webcam = webcamRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const handposeModel = handposeModelRef.current;
      const gestureManager = gestureManagerRef.current;

      // Set up canvas
      canvas.width = webcam.video?.videoWidth || 640;
      canvas.height = webcam.video?.videoHeight || 480;

      const detect = async () => {
        if (webcam.video?.readyState === 4) {
          // Get video properties
          const video = webcam.video;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Set video width and height
          webcam.video.width = videoWidth;
          webcam.video.height = videoHeight;

          // Make detection
          const hand = await handposeModel.estimateHands(video);

          if (hand.length > 0) {
            // Get landmarks
            const GE = new fp.GestureEstimator(Object.values(aslGestures));
            const gesture = await GE.estimate(hand[0].landmarks, 8);

            if (gesture.gestures.length > 0) {
              // Convert gesture predictions to the expected format
              const predictions = gesture.gestures.map((g: GesturePrediction) => ({
                gesture: g.name,
                confidence: g.score
              }));
              gestureManager.processGestureDetection(predictions);
            }
          }

          // Draw hand skeleton if needed
          if (context && hand.length > 0) {
            drawHand(hand[0], context);
          }
        }
      };

      const runDetection = () => {
        detect();
        requestAnimationFrame(runDetection);
      };

      runDetection();
    };

    detectGestures();
  }, []);

  // Draw hand skeleton function
  const drawHand = (predictions: handpose.AnnotatedPrediction, ctx: CanvasRenderingContext2D) => {
    // Drawing logic for hand skeleton
    if (predictions.landmarks) {
      for (let i = 0; i < predictions.landmarks.length; i++) {
        const x = predictions.landmarks[i][0];
        const y = predictions.landmarks[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 3 * Math.PI);
        ctx.fillStyle = isDetecting ? '#00FF00' : '#FF0000';
        ctx.fill();
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
          }}
        >
          ASL Gesture Recognition
        </Typography>
      </motion.div>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GradientCard>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <StyledWebcam
                    ref={webcamRef}
                    mirrored={true}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      zIndex: 1,
                    }}
                  />
                  {loading && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        textAlign: 'center',
                      }}
                    >
                      <CircularProgress
                        size={60}
                        thickness={4}
                        sx={{
                          color: theme.palette.primary.main,
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" color="white">
                        Loading model...
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </GradientCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GradientCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Detected Gesture
                </Typography>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={detectedSign}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ResultBadge sx={{ mb: 3 }}>
                      {detectedSign || 'None'}
                    </ResultBadge>
                  </motion.div>
                </AnimatePresence>

                <Typography variant="h6" gutterBottom>
                  Confidence
                </Typography>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '8px',
                    background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  {confidence.toFixed(1)}%
                </Typography>
              </CardContent>
            </GradientCard>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => window.location.reload()}
                sx={{
                  py: 2,
                  background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(255,112,67,0.23)',
                  },
                }}
              >
                Reset Detection
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GestureRecognition; 