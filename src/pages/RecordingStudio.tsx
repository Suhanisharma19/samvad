import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { useHandTracking } from '../hooks/useHandTracking';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  Alert,
  Button,
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Pause,
  PlayArrow,
  VolumeUp,
  RestartAlt,
} from '@mui/icons-material';

const WEBCAM_WIDTH = 640;
const WEBCAM_HEIGHT = 480;

const RecordingStudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [detectedText, setDetectedText] = useState<string>('');
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Initialize canvas dimensions
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = WEBCAM_WIDTH;
      canvasRef.current.height = WEBCAM_HEIGHT;
    }
  }, []);

  const handleGestureDetected = (gesture: string) => {
    console.log('Gesture detected:', gesture);
    setDetectedText(prev => `${prev}${prev ? ' ' : ''}${gesture}`);
  };

  const { handLandmarks, gestureDetected, drawHandLandmarks } = useHandTracking({
    onGestureDetected: handleGestureDetected,
    enabled: isCameraOn,
    videoElement: webcamRef.current?.video || null,
  });

  // Update video reference when webcam is ready
  useEffect(() => {
    if (webcamRef.current?.video) {
      console.log('Webcam video element ready');
    }
  }, [webcamRef.current?.video]);

  // Draw hand landmarks on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Only draw if hands are detected
    if (handLandmarks.length > 0) {
      drawHandLandmarks(ctx);
    }
  }, [handLandmarks, drawHandLandmarks]);

  const handleStartRecording = () => {
    console.log('Starting recording...');
    setIsRecording(true);
    setIsPaused(false);
    setDetectedText('');
  };

  const handlePauseRecording = () => {
    console.log('Pausing recording...');
    setIsPaused(!isPaused);
  };

  const handleSpeak = () => {
    if (detectedText) {
      const utterance = new SpeechSynthesisUtterance(detectedText);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const resetStudio = () => {
    setIsRecording(false);
    setIsPaused(false);
    setDetectedText('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Sign Language to Speech Converter
          </Typography>

          <AnimatePresence>
            {gestureDetected && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert severity="info" sx={{ mb: 2 }}>
                  Detected Gesture: {gestureDetected}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {/* Video Preview */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Paper
                elevation={2}
                sx={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  borderRadius: 2,
                  bgcolor: 'black',
                }}
              >
                {isCameraOn && (
                  <>
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      width={WEBCAM_WIDTH}
                      height={WEBCAM_HEIGHT}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transform: 'scaleX(-1)',
                      }}
                      videoConstraints={{
                        width: WEBCAM_WIDTH,
                        height: WEBCAM_HEIGHT,
                        facingMode: 'user',
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        transform: 'scaleX(-1)',
                        pointerEvents: 'none',
                      }}
                    />
                  </>
                )}
                {!isCameraOn && (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography color="white">Camera is off</Typography>
                  </Box>
                )}
              </Paper>

              {/* Controls */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Tooltip title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}>
                  <IconButton
                    onClick={toggleCamera}
                    color={isCameraOn ? 'primary' : 'default'}
                  >
                    {isCameraOn ? <Videocam /> : <VideocamOff />}
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={
                    isRecording
                      ? isPaused
                        ? 'Resume Recording'
                        : 'Pause Recording'
                      : 'Start Recording'
                  }
                >
                  <IconButton
                    onClick={
                      isRecording
                        ? handlePauseRecording
                        : handleStartRecording
                    }
                    color="primary"
                    disabled={!isCameraOn}
                  >
                    {isRecording && !isPaused ? <Pause /> : <PlayArrow />}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Reset">
                  <IconButton
                    onClick={resetStudio}
                    color="default"
                    disabled={!isRecording && !detectedText}
                  >
                    <RestartAlt />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            {/* Text Output */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  height: '100%',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Detected Text
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    minHeight: 200,
                    whiteSpace: 'pre-wrap',
                    mb: 2,
                  }}
                >
                  {detectedText || 'No text detected yet...'}
                </Typography>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    startIcon={<VolumeUp />}
                    variant="contained"
                    onClick={handleSpeak}
                    disabled={!detectedText}
                    fullWidth
                  >
                    Speak Text
                  </Button>
                </motion.div>
              </Paper>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default RecordingStudio; 