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

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
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

const FeatureCard = ({ title, description, image, delay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <GlassCard>
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" color="#2D3748">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#4A5568' }}>
          {description}
        </Typography>
      </CardContent>
    </GlassCard>
  </motion.div>
);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Real-time Translation',
      description: 'Convert ASL signs to text instantly using advanced AI recognition',
      image: '/images/learn-asl.jpg',
    },
    {
      title: 'Record & Convert',
      description: 'Record your signs and get accurate text translations with our studio feature',
      image: '/images/practice-mode.jpg',
    },
    {
      title: 'Learn ASL',
      description: 'Practice and improve your signing skills with interactive tutorials',
      image: '/images/game-mode.jpg',
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
        }}
      >
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
              fontWeight: 700,
              color: '#2D3748',
            }}
          >
            How It Works
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <FeatureCard {...feature} delay={index * 0.2} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF7043 0%, #FF9F5A 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: 'white', mb: 4, fontWeight: 700 }}
            >
              Start Converting Signs to Text
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 4, color: 'rgba(255,255,255,0.9)' }}
            >
              Join our community and make sign language communication effortless
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <RouterLink to="/register" style={{ textDecoration: 'none' }}>
                <GradientButton
                  size="large"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#FF7043',
                    padding: '16px 40px',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    borderRadius: '50px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                      transition: 'all 0.6s ease',
                    },
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
                      '&:before': {
                        left: '100%',
                      }
                    },
                    '&:active': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  Get Started Now
                </GradientButton>
              </RouterLink>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* AI Assistant */}
      <AIAssistant />
    </Box>
  );
};

export default Home; 