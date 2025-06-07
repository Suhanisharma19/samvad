import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
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
  Grid,
  Divider,
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Pause,
  PlayArrow,
  VolumeUp,
  RestartAlt,
  Help,
} from '@mui/icons-material';

const WEBCAM_WIDTH = 640;
const WEBCAM_HEIGHT = 480;

// ASL Reference Guide
const aslAlphabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const SignToSpeech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [detectedText, setDetectedText] = useState<string>('');
  const [showReference, setShowReference] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const handleGestureDetected = (gesture: string) => {
    console.log('Gesture detected:', gesture);
    // Extract just the letter from the gesture name (e.g., "aSign" -> "A")
    const letter = gesture.replace('Sign', '').toUpperCase();
    setDetectedText(prev => `${prev}${prev ? ' ' : ''}${letter}`);
  };

  const { handLandmarks, gestureDetected, drawHandLandmarks } = useHandTracking({
    onGestureDetected: handleGestureDetected,
    enabled: isCameraOn && isRecording && !isPaused,
    videoElement: webcamRef.current?.video || null,
  });

  // Initialize canvas dimensions
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = WEBCAM_WIDTH;
      canvasRef.current.height = WEBCAM_HEIGHT;
    }
  }, []);

  // Draw hand landmarks on canvas
  useEffect(() => {
    if (!canvasRef.current || !handLandmarks.length) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear previous frame
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw new landmarks
    drawHandLandmarks(ctx);
  }, [handLandmarks, drawHandLandmarks]);

  // Update video reference when webcam is ready
  useEffect(() => {
    if (webcamRef.current?.video) {
      console.log('Webcam video element ready');
    }
  }, [webcamRef.current?.video]);

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

  const toggleReference = () => {
    setShowReference(!showReference);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Sign Language to Speech Converter
            </Typography>
            <Tooltip title="Toggle ASL Reference">
              <IconButton onClick={toggleReference} color="primary">
                <Help />
              </IconButton>
            </Tooltip>
          </Box>

          <AnimatePresence>
            {showReference && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
                  <Typography variant="h6" gutterBottom>
                    ASL Alphabet Reference
                  </Typography>
                  <Grid container spacing={1}>
                    {aslAlphabet.map((letter) => (
                      <Grid item key={letter}>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 1,
                            minWidth: 40,
                            textAlign: 'center',
                            bgcolor: gestureDetected === `${letter.toLowerCase()}Sign` ? 'primary.main' : 'background.paper',
                            color: gestureDetected === `${letter.toLowerCase()}Sign` ? 'primary.contrastText' : 'text.primary',
                          }}
                        >
                          <Typography variant="body1">{letter}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {gestureDetected && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert severity="info" sx={{ mb: 2 }}>
                  Detected Sign: {gestureDetected.replace('Sign', '').toUpperCase()}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
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
                spacing={1}
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Tooltip title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}>
                  <IconButton onClick={toggleCamera} color={isCameraOn ? 'error' : 'primary'}>
                    {isCameraOn ? <VideocamOff /> : <Videocam />}
                  </IconButton>
                </Tooltip>
                <Tooltip title={isRecording ? (isPaused ? 'Resume' : 'Pause') : 'Start'}>
                  <IconButton
                    onClick={isRecording ? handlePauseRecording : handleStartRecording}
                    color={isRecording ? (isPaused ? 'warning' : 'error') : 'primary'}
                  >
                    {isRecording ? (isPaused ? <PlayArrow /> : <Pause />) : <PlayArrow />}
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
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Detected Text
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    flexGrow: 1,
                    minHeight: 200,
                    whiteSpace: 'pre-wrap',
                    mb: 2,
                    fontSize: '1.2rem',
                    letterSpacing: '0.5px',
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

export default SignToSpeech; 