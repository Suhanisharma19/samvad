import React from 'react';
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
} from '@mui/material';
import {
  CheckCircle,
  PlayArrow,
  School,
  SignLanguage,
} from '@mui/icons-material';

const demoSteps = [
  {
    title: 'Watch Tutorial',
    description: 'Learn how to use our sign language detection system',
    icon: <School fontSize="large" />,
  },
  {
    title: 'Try Basic Signs',
    description: 'Practice with common signs and see real-time translation',
    icon: <SignLanguage fontSize="large" />,
  },
  {
    title: 'Start Recording',
    description: 'Record your own signs and see them translated instantly',
    icon: <PlayArrow fontSize="large" />,
  },
];

const features = [
  'Real-time sign language detection',
  'Instant text translation',
  'Voice output support',
  'Easy-to-use interface',
  'High accuracy recognition',
  'Multiple language support',
];

const Demo = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Try Samvaad Demo
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Experience the power of our sign language translation technology
        </Typography>
        <Button
          component={RouterLink}
          to="/studio"
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
        >
          Start Demo
        </Button>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              How It Works
            </Typography>
            <List>
              {demoSteps.map((step, index) => (
                <ListItem key={index} sx={{ py: 2 }}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {step.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={step.title}
                    secondary={step.description}
                    primaryTypographyProps={{
                      variant: 'h6',
                      gutterBottom: true,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Features
            </Typography>
            <List>
              {features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 4 }}>
              <Typography variant="body1" paragraph>
                Ready to explore more? Create an account to unlock all features and start breaking communication barriers.
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="outlined"
                size="large"
              >
                Sign Up Now
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Demo; 