import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import SignLanguageGuide from './pages/SignLanguageGuide';
import RecordingStudio from './pages/RecordingStudio';
import SignToSpeech from './pages/SignToSpeech';
import Demo from './pages/Demo';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material';
import GestureRecognition from './components/GestureRecognition';
import ASLTutorial from './components/ASLTutorial';
import ASLGame from './components/ASLGame';
import { GlobalStyles } from '@mui/material';
import Studio from './components/Studio';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7043', // Coral orange
      light: '#FF8A65',
      dark: '#F4511E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9800', // Warm orange
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1.125rem',
          padding: '12px 28px',
          boxShadow: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(255, 112, 67, 0.23)',
          },
        },
        contained: {
          backgroundImage: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #FF8A65 0%, #FFB74D 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(255, 112, 67, 0.15)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2D3748',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)',
    '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.10)',
    '0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.10)',
    '0 25px 50px rgba(0,0,0,0.15), 0 15px 30px rgba(0,0,0,0.10)',
    '0 30px 60px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.10)',
    '0 35px 70px rgba(0,0,0,0.15), 0 25px 50px rgba(0,0,0,0.10)',
    '0 40px 80px rgba(0,0,0,0.15), 0 30px 60px rgba(0,0,0,0.10)',
    '0 45px 90px rgba(0,0,0,0.15), 0 35px 70px rgba(0,0,0,0.10)',
    '0 50px 100px rgba(0,0,0,0.15), 0 40px 80px rgba(0,0,0,0.10)',
    '0 55px 110px rgba(0,0,0,0.15), 0 45px 90px rgba(0,0,0,0.10)',
    '0 60px 120px rgba(0,0,0,0.15), 0 50px 100px rgba(0,0,0,0.10)',
    '0 65px 130px rgba(0,0,0,0.15), 0 55px 110px rgba(0,0,0,0.10)',
    '0 70px 140px rgba(0,0,0,0.15), 0 60px 120px rgba(0,0,0,0.10)',
    '0 75px 150px rgba(0,0,0,0.15), 0 65px 130px rgba(0,0,0,0.10)',
    '0 80px 160px rgba(0,0,0,0.15), 0 70px 140px rgba(0,0,0,0.10)',
    '0 85px 170px rgba(0,0,0,0.15), 0 75px 150px rgba(0,0,0,0.10)',
    '0 90px 180px rgba(0,0,0,0.15), 0 80px 160px rgba(0,0,0,0.10)',
    '0 95px 190px rgba(0,0,0,0.15), 0 85px 170px rgba(0,0,0,0.10)',
    '0 100px 200px rgba(0,0,0,0.15), 0 90px 180px rgba(0,0,0,0.10)',
    '0 105px 210px rgba(0,0,0,0.15), 0 95px 190px rgba(0,0,0,0.10)',
    '0 110px 220px rgba(0,0,0,0.15), 0 100px 200px rgba(0,0,0,0.10)',
    '0 115px 230px rgba(0,0,0,0.15), 0 105px 210px rgba(0,0,0,0.10)',
  ],
});

const globalStyles = {
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  html: {
    scrollBehavior: 'smooth',
  },
  body: {
    backgroundColor: '#FFFFFF',
    color: '#2D3748',
  },
  '.gradient-text': {
    background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  '.hover-scale': {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  '.card-hover': {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(255, 112, 67, 0.15)',
    },
  },
  '.text-gradient': {
    background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '.bg-gradient': {
    background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
  },
  '.wave-animation': {
    animation: 'wave 8s linear infinite',
    '@keyframes wave': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },
  '.floating': {
    animation: 'floating 6s ease-in-out infinite',
    '@keyframes floating': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-20px)',
      },
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyles} />
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/guide" element={<SignLanguageGuide />} />
              <Route path="/studio" element={<RecordingStudio />} />
              <Route path="/sign-to-speech" element={<SignToSpeech />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/practice" element={<GestureRecognition />} />
              <Route path="/learn" element={<ASLTutorial />} />
              <Route path="/game" element={<ASLGame />} />
              <Route path="/studio" element={<Studio />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 