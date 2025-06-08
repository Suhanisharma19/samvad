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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Tooltip,
  Badge,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { aslGestures } from '../utils/aslGestures';
import {
  Close as CloseIcon,
  EmojiEvents as TrophyIcon,
  School as TutorialIcon,
  Timer as TimerIcon,
  SportsScore as ScoreIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

interface GameHistory {
  score: number;
  date: Date;
  mode: string;
  difficulty: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: number;
  type: 'score' | 'streak' | 'speed';
  unlocked: boolean;
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

const GAME_MODES = {
  CLASSIC: 'classic',
  TIME_ATTACK: 'timeAttack',
  STREAK: 'streak',
  PRACTICE: 'practice',
};

const DIFFICULTIES = {
  EASY: { name: 'Easy', timeLimit: 90, confidenceThreshold: 0.7 },
  MEDIUM: { name: 'Medium', timeLimit: 60, confidenceThreshold: 0.8 },
  HARD: { name: 'Hard', timeLimit: 30, confidenceThreshold: 0.9 },
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'score10',
    title: 'Beginner Signer',
    description: 'Score 10 points in Classic mode',
    condition: 10,
    type: 'score',
    unlocked: false,
  },
  {
    id: 'score25',
    title: 'Skilled Signer',
    description: 'Score 25 points in Classic mode',
    condition: 25,
    type: 'score',
    unlocked: false,
  },
  {
    id: 'streak5',
    title: 'On Fire',
    description: 'Get a 5 sign streak',
    condition: 5,
    type: 'streak',
    unlocked: false,
  },
  {
    id: 'speed3',
    title: 'Quick Hands',
    description: 'Sign 3 signs in under 5 seconds',
    condition: 3,
    type: 'speed',
    unlocked: false,
  },
];

const ASLGame = () => {
  const theme = useTheme();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentSign, setCurrentSign] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [gameMode, setGameMode] = useState(GAME_MODES.CLASSIC);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.MEDIUM);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [lastSignTime, setLastSignTime] = useState<number | null>(null);
  const [speedSignCount, setSpeedSignCount] = useState(0);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      setModel(net);
      setLoading(false);
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0 && gameMode !== GAME_MODES.PRACTICE) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameMode !== GAME_MODES.PRACTICE) {
      endGame();
    }
  }, [isPlaying, timeLeft, gameMode]);

  const checkAchievements = (newScore: number, newStreak: number) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;
      switch (achievement.type) {
        case 'score':
          shouldUnlock = newScore >= achievement.condition;
          break;
        case 'streak':
          shouldUnlock = newStreak >= achievement.condition;
          break;
        case 'speed':
          shouldUnlock = speedSignCount >= achievement.condition;
          break;
      }

      if (shouldUnlock) {
        // Show achievement notification
        // You could add a toast or notification here
      }

      return {
        ...achievement,
        unlocked: shouldUnlock ? true : achievement.unlocked,
      };
    });

    setAchievements(updatedAchievements);
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(difficulty.timeLimit);
    setIsPlaying(true);
    setSpeedSignCount(0);
    setLastSignTime(null);
    generateNewSign();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameHistory(prev => [
      ...prev,
      {
        score,
        date: new Date(),
        mode: gameMode,
        difficulty: difficulty.name,
      },
    ]);
    if (streak > bestStreak) {
      setBestStreak(streak);
    }
  };

  const generateNewSign = () => {
    const signs = Object.keys(aslGestures);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    setCurrentSign(randomSign);
  };

  const handleCorrectSign = () => {
    const now = Date.now();
    setScore((prev) => prev + 1);
    setStreak((prev) => prev + 1);
    
    if (lastSignTime && now - lastSignTime < 5000) {
      setSpeedSignCount((prev) => prev + 1);
    } else {
      setSpeedSignCount(1);
    }
    
    setLastSignTime(now);
    checkAchievements(score + 1, streak + 1);
    generateNewSign();
  };

  const handleIncorrectSign = () => {
    setStreak(0);
    setSpeedSignCount(0);
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
          
          if (detectedSign === currentSign && maxConfidence > difficulty.confidenceThreshold) {
            handleCorrectSign();
          } else {
            handleIncorrectSign();
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

  const renderGameControls = () => (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color={gameMode === GAME_MODES.CLASSIC ? 'primary' : 'inherit'}
            onClick={() => setGameMode(GAME_MODES.CLASSIC)}
          >
            Classic Mode
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color={gameMode === GAME_MODES.TIME_ATTACK ? 'primary' : 'inherit'}
            onClick={() => setGameMode(GAME_MODES.TIME_ATTACK)}
          >
            Time Attack
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color={gameMode === GAME_MODES.STREAK ? 'primary' : 'inherit'}
            onClick={() => setGameMode(GAME_MODES.STREAK)}
          >
            Streak Mode
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color={gameMode === GAME_MODES.PRACTICE ? 'primary' : 'inherit'}
            onClick={() => setGameMode(GAME_MODES.PRACTICE)}
          >
            Practice Mode
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Difficulty
        </Typography>
        <Grid container spacing={2}>
          {Object.values(DIFFICULTIES).map((diff) => (
            <Grid item xs={4} key={diff.name}>
              <Button
                fullWidth
                variant="contained"
                color={difficulty.name === diff.name ? 'primary' : 'inherit'}
                onClick={() => setDifficulty(diff)}
              >
                {diff.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );

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
                {!isPlaying && renderGameControls()}
                
                <Box sx={{ position: 'relative' }}>
                  <StyledWebcam
                    ref={webcamRef}
                    mirrored
                    videoConstraints={{
                      width: 640,
                      height: 480,
                      facingMode: "user"
                    }}
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
                        {gameMode === GAME_MODES.PRACTICE ? '∞' : timeLeft}
                      </Typography>
                      <Typography variant="body2">
                        {gameMode === GAME_MODES.PRACTICE ? 'Practice' : 'Seconds'}
                      </Typography>
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

                <Box sx={{ mt: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Current Streak
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {streak}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Best Streak
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {bestStreak}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </GradientCard>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setShowTutorial(true)}
                startIcon={<TutorialIcon />}
              >
                Tutorial
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setShowAchievements(true)}
                startIcon={<TrophyIcon />}
              >
                Achievements
              </Button>
            </Box>

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
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(game.date).toLocaleTimeString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {game.mode} - {game.difficulty}
                        </Typography>
                      </Box>
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

      {/* Tutorial Dialog */}
      <Dialog
        open={showTutorial}
        onClose={() => setShowTutorial(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">How to Play</Typography>
            <IconButton onClick={() => setShowTutorial(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Game Modes
          </Typography>
          <Typography paragraph>
            • Classic: Score as many points as possible within the time limit
          </Typography>
          <Typography paragraph>
            • Time Attack: Signs must be completed faster as you progress
          </Typography>
          <Typography paragraph>
            • Streak: Build the longest streak of correct signs
          </Typography>
          <Typography paragraph>
            • Practice: No time limit, practice at your own pace
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Difficulty Levels
          </Typography>
          <Typography paragraph>
            • Easy: 90 seconds, more forgiving recognition
          </Typography>
          <Typography paragraph>
            • Medium: 60 seconds, standard recognition
          </Typography>
          <Typography paragraph>
            • Hard: 30 seconds, strict recognition
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Tips
          </Typography>
          <Typography paragraph>
            • Make sure your hand is clearly visible in the camera
          </Typography>
          <Typography paragraph>
            • Keep your hand steady when making signs
          </Typography>
          <Typography paragraph>
            • Practice each sign slowly before attempting speed
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Achievements Dialog */}
      <Dialog
        open={showAchievements}
        onClose={() => setShowAchievements(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Achievements</Typography>
            <IconButton onClick={() => setShowAchievements(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {achievements.map((achievement) => (
              <Grid item xs={12} key={achievement.id}>
                <Card
                  sx={{
                    opacity: achievement.unlocked ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <TrophyIcon
                        color={achievement.unlocked ? 'primary' : 'disabled'}
                        fontSize="large"
                      />
                      <Box>
                        <Typography variant="h6">{achievement.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ASLGame; 