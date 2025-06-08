import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  styled,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  CheckCircle,
  PlayArrow,
  School,
  SignLanguage,
  Translate,
  Speed,
  VolumeUp,
  TouchApp,
  EmojiEvents,
  Psychology,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
  color: 'white',
  padding: '16px 40px',
  borderRadius: '50px',
  fontSize: '1.125rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(255, 112, 67, 0.25)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    background: 'linear-gradient(135deg, #FF8A65 0%, #FFA726 100%)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 12px 30px rgba(255, 112, 67, 0.35)',
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.98)',
  },
})) as typeof Button;

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 16px 48px rgba(255, 159, 90, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 36px rgba(255,112,67,0.2)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      color: '#FF7043',
    },
  },
}));

const IconWrapper = styled(Box)({
  color: '#FF9800',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  '& svg': {
    fontSize: '2.5rem',
  },
});

const demoSteps = [
  {
    title: 'Watch Tutorial',
    description: 'Learn how to use our sign language detection system with interactive guides',
    icon: <School fontSize="large" />,
  },
  {
    title: 'Try Basic Signs',
    description: 'Practice common signs and get instant feedback on your signing accuracy',
    icon: <SignLanguage fontSize="large" />,
  },
  {
    title: 'Real-time Translation',
    description: 'Experience seamless translation of your signs into text and speech',
    icon: <PlayArrow fontSize="large" />,
  },
];

const features = [
  {
    title: 'Real-time Detection',
    description: 'Advanced AI-powered sign language detection with high accuracy',
    icon: <Speed fontSize="large" />,
  },
  {
    title: 'Instant Translation',
    description: 'Seamless conversion of signs to text with natural language processing',
    icon: <Translate fontSize="large" />,
  },
  {
    title: 'Voice Output',
    description: 'Clear voice output for effective verbal communication',
    icon: <VolumeUp fontSize="large" />,
  },
  {
    title: 'Interactive Learning',
    description: 'Engaging tutorials and practice sessions for better learning',
    icon: <TouchApp fontSize="large" />,
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your learning progress and earn achievements',
    icon: <EmojiEvents fontSize="large" />,
  },
  {
    title: 'Smart Feedback',
    description: 'Get real-time feedback to improve your signing accuracy',
    icon: <Psychology fontSize="large" />,
  },
];

const Demo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, rgba(255,112,67,0.08) 0%, rgba(255,152,0,0.08) 100%)',
      minHeight: '100vh',
      pt: { xs: 4, md: 8 },
      pb: { xs: 8, md: 12 },
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'radial-gradient(circle at top right, rgba(255,112,67,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'radial-gradient(circle at bottom left, rgba(255,152,0,0.1) 0%, transparent 60%)',
        pointerEvents: 'none',
      },
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Experience Samvaad Demo
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              Break communication barriers with our cutting-edge sign language translation technology
            </Typography>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <RouterLink to="/studio" style={{ textDecoration: 'none' }}>
                <GradientButton
                  size="large"
                  startIcon={<PlayArrow />}
                >
                  Launch Interactive Demo
                </GradientButton>
              </RouterLink>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 12 }}>
          {demoSteps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
              >
                <GlassCard>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconWrapper 
                      className="feature-icon"
                      sx={{ 
                        mb: 3,
                        height: '120px',
                        width: '120px',
                        mx: 'auto',
                        background: 'linear-gradient(135deg, rgba(255,112,67,0.1) 0%, rgba(255,152,0,0.1) 100%)',
                        borderRadius: '60px',
                        '& svg': {
                          fontSize: '3.5rem',
                          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        },
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(255,112,67,0.2) 0%, rgba(255,152,0,0.2) 100%)',
                          '& svg': {
                            transform: 'scale(1.1) rotate(5deg)',
                            color: '#FF7043',
                          },
                        },
                      }}
                    >
                      {step.icon}
                    </IconWrapper>
                    <Typography 
                      variant="h5" 
                      fontWeight="bold"
                      sx={{ 
                        mb: 2,
                        background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        fontSize: '1rem',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 12 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 8,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                >
                  <FeatureCard>
                    <IconWrapper className="feature-icon">
                      {feature.icon}
                    </IconWrapper>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ 
                        mb: 2,
                        color: '#2D3748',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        fontSize: '1rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,112,67,0.08) 0%, transparent 70%)',
            zIndex: -1,
          },
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              color: '#2D3748',
              mb: 3,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph 
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto', 
              mb: 6,
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Create an account to unlock all features and join our community of sign language enthusiasts.
          </Typography>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <RouterLink to="/register" style={{ textDecoration: 'none' }}>
              <GradientButton
                size="large"
              >
                Sign Up Now
              </GradientButton>
            </RouterLink>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Demo; 