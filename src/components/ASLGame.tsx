import React, { useRef, useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { aslGestures } from '../utils/aslGestures';

interface GameHistory {
  score: number;
  date: Date;
}

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

const StyledWebcam = styled(Webcam)(({ theme }) => ({
  borderRadius: '24px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  width: '100%',
  maxWidth: '640px',
  height: 'auto',
  transform: 'scaleX(-1)',
}));

const ScoreCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
  color: 'white',
  padding: '16px 24px',
  borderRadius: '16px',
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(255,112,67,0.2)',
}));

const ASLGame = () => {
  const theme = useTheme();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentSign, setCurrentSign] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      setModel(net);
      setLoading(false);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    generateNewSign();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameHistory(prev => [...prev, { score, date: new Date() }]);
  };

  const generateNewSign = () => {
    const signs = Object.keys(aslGestures);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    setCurrentSign(randomSign);
  };

  const detect = async () => {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const predictions = await model.estimateHands(video);
      
      if (predictions.length > 0) {
        const GE = new fp.GestureEstimator(Object.values(aslGestures));
        const gesture = await GE.estimate(predictions[0].landmarks, 8);
        
        if (gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = Math.max.apply(null, confidence);
          const detectedSign = gesture.gestures[confidence.indexOf(maxConfidence)].name;
          
          if (detectedSign === currentSign && maxConfidence > 0.8) {
            setScore((prev) => prev + 1);
            generateNewSign();
          }
        }
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(detect, 100);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, model, currentSign]);

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
          ASL Game Challenge
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
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
                        Loading game...
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
            <GradientCard sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Game Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ScoreCard>
                      <Typography variant="h4" fontWeight="bold">
                        {score}
                      </Typography>
                      <Typography variant="body2">Score</Typography>
                    </ScoreCard>
                  </Grid>
                  <Grid item xs={6}>
                    <ScoreCard>
                      <Typography variant="h4" fontWeight="bold">
                        {timeLeft}
                      </Typography>
                      <Typography variant="body2">Seconds</Typography>
                    </ScoreCard>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Current Sign
                  </Typography>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSign}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Typography
                        variant="h3"
                        align="center"
                        sx={{
                          py: 3,
                          background: 'linear-gradient(135deg, rgba(255,112,67,0.1) 0%, rgba(255,152,0,0.1) 100%)',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {currentSign || '---'}
                      </Typography>
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </CardContent>
            </GradientCard>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={isPlaying ? endGame : startGame}
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
              {isPlaying ? 'End Game' : 'Start Game'}
            </Button>

            {gameHistory.length > 0 && (
              <GradientCard sx={{ mt: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Previous Scores
                  </Typography>
                  {gameHistory.slice(-3).map((game, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: index < gameHistory.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {new Date(game.date).toLocaleTimeString()}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {game.score} points
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </GradientCard>
            )}
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ASLGame; 