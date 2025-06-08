import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import AIAssistant from '../components/AIAssistant';
import {
  CameraAlt,
  Translate,
  School,
  TouchApp,
  Speed,
  Psychology,
  AccessTime,
  PersonOutline,
  ArrowForward,
} from '@mui/icons-material';

interface FeatureCardProps {
  title: string;
  description: string;
  steps: string[];
  color: string;
  icon: React.ReactNode;
  delay?: number;
}

const GradientButton = styled(Button)({
  background: '#FF9F5A',
  color: 'white',
  padding: '16px 48px',
  borderRadius: '30px',
  fontSize: '1.25rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(255, 159, 90, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#FF8B3D',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255, 159, 90, 0.4)',
  },
});

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'white',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 48px rgba(255, 159, 90, 0.2)',
  },
}));

const WaveBox = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '200px',
  background: 'white',
  borderTopLeftRadius: '50% 80px',
  borderTopRightRadius: '50% 80px',
});

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '& svg': {
    fontSize: '2.5rem',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
}));

const FeatureCard = ({ title, description, steps, color, icon, delay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <GlassCard>
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        <IconWrapper
          sx={{
            background: `linear-gradient(135deg, ${color}11 0%, ${color}22 100%)`,
            border: `2px solid ${color}33`,
            '&:hover': {
              background: `linear-gradient(135deg, ${color}22 0%, ${color}33 100%)`,
              transform: 'scale(1.05) rotate(5deg)',
              '& svg': {
                transform: 'scale(1.1)',
                color: color,
              },
            },
          }}
        >
          {icon}
        </IconWrapper>
        <Typography 
          variant="h5" 
          gutterBottom 
          fontWeight="bold" 
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#4A5568',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
        <Box 
          sx={{ 
            mt: 2,
            background: `linear-gradient(135deg, ${color}08 0%, ${color}11 100%)`,
            borderRadius: '16px',
            p: 2,
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: index === steps.length - 1 ? 0 : 1,
                py: 1,
                opacity: 0.9,
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1,
                  transform: 'translateX(5px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
                  color: color,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#4A5568',
                  fontWeight: 500,
                  textAlign: 'left',
                }}
              >
                {step}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </GlassCard>
  </motion.div>
);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Capture Your Signs',
      description: 'Our advanced AI technology captures your hand movements in real-time with high precision. Simply position your hands in front of your camera and start signing.',
      steps: ['Position your hands', 'Start signing', 'Get instant feedback'],
      color: '#FF7043',
      icon: <CameraAlt fontSize="large" />,
    },
    {
      title: 'Instant Translation',
      description: 'Watch as your signs are instantly converted into text and speech. Our AI model recognizes ASL signs with high accuracy and provides immediate translations.',
      steps: ['Sign detection', 'AI processing', 'Text conversion'],
      color: '#FF9800',
      icon: <Translate fontSize="large" />,
    },
    {
      title: 'Learn & Practice',
      description: 'Master ASL through interactive tutorials, practice sessions, and fun games. Track your progress and earn achievements as you improve your signing skills.',
      steps: ['Follow tutorials', 'Practice signs', 'Track progress'],
      color: '#FFA726',
      icon: <School fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF7043 0%, #FF9F5A 100%)',
          position: 'relative',
          pt: { xs: 8, md: 12 },
          pb: { xs: 20, md: 24 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Every gesture has a voice
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  Break communication barriers with real-time ASL translation
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: { xs: 4, md: 0 } }}
                >
                  <RouterLink to="/learn" style={{ textDecoration: 'none' }}>
                    <GradientButton
                      size="large"
                      sx={{
                        background: 'white',
                        color: '#FF7043',
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '15px',
                        textTransform: 'none',
                        border: '1px solid rgba(255, 112, 67, 0.3)',
                        boxShadow: '0 8px 0 rgba(0, 0, 0, 0.1), 0 15px 20px rgba(255, 112, 67, 0.2)',
                        transform: 'translateY(-4px)',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                          zIndex: 1
                        },
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 10px 0 rgba(0, 0, 0, 0.1), 0 20px 25px rgba(255, 112, 67, 0.25)',
                          background: '#fff',
                        },
                        '&:active': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 0 rgba(0, 0, 0, 0.1), 0 10px 15px rgba(255, 112, 67, 0.2)',
                        }
                      }}
                    >
                      Start learning now
                    </GradientButton>
                  </RouterLink>
                  <RouterLink to="/studio" style={{ textDecoration: 'none' }}>
                    <GradientButton
                      size="large"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '15px',
                        textTransform: 'none',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 0 rgba(0, 0, 0, 0.15), 0 15px 20px rgba(0, 0, 0, 0.2)',
                        transform: 'translateY(-4px)',
                        transition: 'all 0.2s ease',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                          zIndex: 1
                        },
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 10px 0 rgba(0, 0, 0, 0.15), 0 20px 25px rgba(0, 0, 0, 0.25)',
                          background: 'rgba(255, 255, 255, 0.15)',
                        },
                        '&:active': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 0 rgba(0, 0, 0, 0.15), 0 10px 15px rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      Start Recording
                    </GradientButton>
                  </RouterLink>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  src="home.png"
                  alt="ASL Learning"
                  sx={{
                    width: { xs: '280px', md: '400px' },
                    height: { xs: '280px', md: '400px' },
                    objectFit: 'cover',
                    borderRadius: '50%',
                    display: 'block',
                    margin: '0 auto',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    border: '8px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 25px 45px rgba(0, 0, 0, 0.2)',
                      border: '8px solid rgba(255, 255, 255, 0.3)',
                    }
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <WaveBox />
      </Box>

      {/* Features Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 8, md: 12 },
          position: 'relative',
          zIndex: 1,
          background: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(255,112,67,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at bottom left, rgba(255,152,0,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ 
                fontWeight: 800,
                color: '#2D3748',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                mb: 2,
                background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#4A5568',
                maxWidth: '800px',
                mx: 'auto',
                mb: 8,
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              }}
            >
              Transform your sign language communication with our intuitive three-step process
            </Typography>
          </Box>
        </motion.div>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <FeatureCard {...feature} delay={index * 0.2} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* AI Assistant */}
      <AIAssistant />
    </Box>
  );
};

export default Home; 