import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  styled,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

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

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  fontSize: '1.125rem',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255,112,67,0.23)',
  },
}));

const tutorials = [
  {
    title: 'Basic Hand Positions',
    content: 'Learn the fundamental hand positions used in ASL...',
    image: '/images/basic-hand-positions.jpg',
  },
  {
    title: 'Alphabet Signs',
    content: 'Master the ASL alphabet from A to Z...',
    image: '/images/alphabet-signs.jpg',
  },
  {
    title: 'Common Phrases',
    content: 'Practice everyday phrases in ASL...',
    image: '/images/common-phrases.jpg',
  },
  {
    title: 'Numbers and Counting',
    content: 'Learn how to count and express numbers in ASL...',
    image: '/images/numbers.jpg',
  },
];

const ASLTutorial = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, tutorials.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
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
          ASL Tutorial
        </Typography>
      </motion.div>

      <Box sx={{ mb: 8 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: theme.palette.primary.main,
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {tutorials.map((tutorial, index) => (
            <Step key={tutorial.title}>
              <StepLabel>{tutorial.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GradientCard>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    component="img"
                    src={tutorials[activeStep].image}
                    alt={tutorials[activeStep].title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      mb: 4,
                    }}
                  />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    {tutorials[activeStep].title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {tutorials[activeStep].content}
                  </Typography>
                </CardContent>
              </GradientCard>
            </motion.div>
          </AnimatePresence>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GradientCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Your Progress
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Completion
                  </Typography>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStep + 1) / tutorials.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: '8px',
                      background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {`${activeStep + 1} of ${tutorials.length} lessons completed`}
                </Typography>
              </CardContent>
            </GradientCard>

            <Box sx={{ mt: 4, display: 'grid', gap: 2 }}>
              <StyledButton
                onClick={handleBack}
                disabled={activeStep === 0}
                fullWidth
              >
                Previous Lesson
              </StyledButton>
              <StyledButton
                onClick={handleNext}
                disabled={activeStep === tutorials.length - 1}
                fullWidth
              >
                Next Lesson
              </StyledButton>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ASLTutorial; 