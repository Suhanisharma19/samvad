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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Close as CloseIcon, ExpandMore } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

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

interface Sign {
  title: string;
  description: string;
  imageUrl: string;
}

interface Tutorial {
  title: string;
  content: string;
  signs?: Sign[];
}

const basicSigns: Sign[] = [
  {
    title: 'Hello',
    description: 'Wave your open hand side to side',
    imageUrl: 'images/hello.jpg',
  },
  {
    title: 'Thank You',
    description: 'Touch your chin with your fingertips and move your hand forward',
    imageUrl: 'images/thankyou.jpg',
  },
  {
    title: 'Please',
    description: 'Rub your palm in a circular motion on your chest',
    imageUrl: 'images/please.jpg',
  },
  {
    title: 'Sorry',
    description: 'Make a fist and rub it in a circular motion on your chest',
    imageUrl: 'images/sorry.jpg',
  },
  {
    title: 'Yes',
    description: 'Make a fist and nod it up and down like a head nodding',
    imageUrl: 'images/yes.jpg',
  },
  {
    title: 'No',
    description: 'Extend your index and middle fingers, then move them side to side',
    imageUrl: 'images/no.jpg',
  },
  {
    title: 'Help',
    description: 'Make a thumbs up with one hand and move it up on top of the other flat palm',
    imageUrl: 'images/help.jpg',
  },
  {
    title: 'Love',
    description: 'Cross your arms over your chest like hugging yourself',
    imageUrl: 'images/love.jpg',
  },
];

const alphabetSigns: Sign[] = [
  { 
    title: 'A', 
    description: 'Make a fist with thumb alongside', 
    imageUrl: 'images/A.jpg' 
  },
  { 
    title: 'B', 
    description: 'Hold your hand up with fingers straight and thumb tucked across palm', 
    imageUrl: 'images/B.png' 
  },
  { 
    title: 'C', 
    description: 'Curve your hand into a C shape', 
    imageUrl: 'images/C.jpg' 
  },
  { 
    title: 'D', 
    description: 'Make "O" with index finger pointing up', 
    imageUrl: 'images/D.jpg' 
  },
  { 
    title: 'E', 
    description: 'Curl all fingers into palm', 
    imageUrl: 'images/E.jpg' 
  },
  { 
    title: 'F', 
    description: 'Touch thumb to index finger, other fingers up', 
    imageUrl: 'images/F.jpg' 
  },
  { 
    title: 'G', 
    description: 'Point index finger sideways, thumb and fingers closed', 
    imageUrl: 'images/G.jpg' 
  },
  { 
    title: 'H', 
    description: 'Index and middle fingers together pointing sideways', 
    imageUrl: 'images/H.jpg' 
  }
];

const commonPhrasesSigns: Sign[] = [
  { 
    title: 'How are you?', 
    description: 'Point to the person, then make a "Y" hand shape and move it forward', 
    imageUrl: 'images/howareyou.jpg' 
  },
  { 
    title: 'Nice to meet you', 
    description: 'Sign "nice" by moving your flat hand down your chest, then point to the person', 
    imageUrl: 'images/Nicetomeetyou.png' 
  },
  { 
    title: 'Good morning', 
    description: 'Sign "good" then make a rising sun motion with your hand', 
    imageUrl: 'images/goodmorning.jpg' 
  },
  { 
    title: 'Good night', 
    description: 'Sign "good" then make a setting sun motion with your hand', 
    imageUrl: 'images/goodnight.jpg' 
  }
];

const numbersSigns: Sign[] = [
  { 
    title: '0', 
    description: 'Make a closed hand shape like the letter "O", all fingers curved to touch the thumb', 
    imageUrl: 'images/0.jpg' 
  },
  { 
    title: '1', 
    description: 'Point index finger up, other fingers closed in a fist', 
    imageUrl: 'images/1.jpg' 
  },
  { 
    title: '2', 
    description: 'Hold up index and middle fingers in a "V" shape, palm facing forward', 
    imageUrl: 'images/2.jpg' 
  },
  { 
    title: '3', 
    description: 'Hold up thumb, index, and middle fingers, other fingers down', 
    imageUrl: 'images/3.jpg' 
  },
  { 
    title: '4', 
    description: 'Hold up four fingers (except thumb) straight up, palm facing forward', 
    imageUrl: 'images/4.jpg' 
  },
  { 
    title: '5', 
    description: 'Open hand with all five fingers spread, palm facing forward', 
    imageUrl: 'images/5.jpg' 
  }
];

const tutorials: Tutorial[] = [
  {
    title: 'Basic Hand Positions',
    content: 'Learn the fundamental hand positions used in ASL. Master these basic signs to start communicating effectively.',
    signs: basicSigns,
  },
  {
    title: 'Alphabet Signs',
    content: 'Master the ASL alphabet from A to Z. Learn to fingerspell words and understand the foundation of ASL communication.',
    signs: alphabetSigns,
  },
  {
    title: 'Common Phrases',
    content: 'Practice everyday phrases in ASL. Learn to communicate basic needs, greetings, and common expressions.',
    signs: commonPhrasesSigns,
  },
  {
    title: 'Numbers and Counting',
    content: 'Learn how to count and express numbers in ASL. Master the number signs from 0-9 and understand how to combine them.',
    signs: numbersSigns,
  },
];

const ASLTutorial = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, tutorials.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSignClick = (sign: Sign) => {
    setSelectedSign(sign);
    setOpenDialog(true);
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
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    {tutorials[activeStep].title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {tutorials[activeStep].content}
                  </Typography>

                  {tutorials[activeStep].signs && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h5" gutterBottom>
                        {activeStep === 0 && "Basic Signs"}
                        {activeStep === 1 && "Alphabet Signs"}
                        {activeStep === 2 && "Common Phrases"}
                        {activeStep === 3 && "Number Signs"}
                      </Typography>
                      <Grid container spacing={2}>
                        {tutorials[activeStep].signs.map((sign, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                              onClick={() => handleSignClick(sign)}
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  transform: 'scale(1.02)',
                                  boxShadow: 3,
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'relative',
                                  paddingTop: '75%',
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  component="img"
                                  src={sign.imageUrl}
                                  alt={sign.title}
                                  sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                  }}
                                />
                              </Box>
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  {sign.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Click to learn more
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
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

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Practice Tools
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      component={RouterLink}
                      to="/sign-to-speech"
                    >
                      Try Sign Detection
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      component={RouterLink}
                      to="/game"
                    >
                      Play ASL Game
                    </Button>
                  </Stack>
                </Box>
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

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedSign && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5">{selectedSign.title}</Typography>
                <IconButton onClick={() => setOpenDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={selectedSign.imageUrl}
                alt={selectedSign.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  mb: 3,
                }}
              />
              <Typography variant="h6" gutterBottom>
                How to Sign
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedSign.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Practice Tips
              </Typography>
              <Typography variant="body1" paragraph>
                - Practice in front of a mirror
                - Start slowly and focus on accuracy
                - Record yourself and compare with the reference
                - Practice regularly for muscle memory
              </Typography>
              <Button
                variant="contained"
                fullWidth
                component={RouterLink}
                to="/sign-to-speech"
                sx={{
                  mt: 2,
                  background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                }}
              >
                Practice with Camera
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ASLTutorial; 