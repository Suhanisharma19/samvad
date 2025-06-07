import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface Sign {
  title?: string;
  letter?: string;
  number?: string;
  emotion?: string;
  word?: string;
  description: string;
  imageUrl: string;
}

interface SignCardProps {
  sign: Sign;
}

interface ScrollableSignRowProps {
  signs: Sign[];
  title: string;
}

const basicSigns: Sign[] = [
  {
    title: 'Hello',
    description: 'Wave your open hand side to side',
    imageUrl: '/images/hello.jpg',
  },
  {
    title: 'Thank You',
    description: 'Touch your chin with your fingertips and move your hand forward',
    imageUrl: '/images/thankyou.jpg',
  },
  {
    title: 'Please',
    description: 'Rub your palm in a circular motion on your chest',
    imageUrl: '/images/please.jpg',
  },
  {
    title: 'Sorry',
    description: 'Make a fist and rub it in a circular motion on your chest',
    imageUrl: '/images/sorry.jpg',
  },
  {
    title: 'Yes',
    description: 'Make a fist and nod it up and down like a head nodding',
    imageUrl: '/images/yes.jpg',
  },
  {
    title: 'No',
    description: 'Extend your index and middle fingers, then move them side to side',
    imageUrl: '/images/no.jpg',
  },
  {
    title: 'Help',
    description: 'Make a thumbs up with one hand and move it up on top of the other flat palm',
    imageUrl: '/images/help.jpg',
  },
  {
    title: 'Love',
    description: 'Cross your arms over your chest like hugging yourself',
    imageUrl: '/images/love.jpg',
  },
];

const commonPhrases: Sign[] = [
  {
    title: 'How are you?',
    description: 'Point to the person, then make a "Y" hand shape and move it forward',
    imageUrl: '/images/howareyou.jpg',
  },
  {
    title: 'Nice to meet you',
    description: 'Sign "nice" by moving your flat hand down your chest, then point to the person',
    imageUrl: '/images/Nicetomeetyou.png',
  },
  {
    title: 'Good morning',
    description: 'Sign "good" then make a rising sun motion with your hand',
    imageUrl: '/images/goodmorning.jpg',
  },
  {
    title: 'Good night',
    description: 'Sign "good" then make a setting sun motion with your hand',
    imageUrl: '/images/goodnight.jpg',
  },
];

const emergencySigns: Sign[] = [
  {
    title: 'Help Emergency',
    description: 'Cross your hands at the wrists in an "X" shape and move them up',
    imageUrl: '/images/help.jpg',
  },
  {
    title: 'Hospital',
    description: 'Make an "H" hand shape and move it in a cross pattern',
    imageUrl: '/images/Hospital.png',
  },
  {
    title: 'Pain',
    description: 'Point your index fingers toward each other and move them together',
    imageUrl: '/images/pain.jpg',
  },
  {
    title: 'Call 911',
    description: 'Make the number "9-1-1" signs followed by a phone call motion',
    imageUrl: '/images/help.jpg',
  },
];

interface CategorySign extends Sign {
  letter?: string;
  number?: string;
  emotion?: string;
  word?: string;
}

interface Category {
  title: string;
  content: string;
  signs?: CategorySign[];
}

const categories: Category[] = [
  {
    title: 'Alphabet',
    content: 'Learn to sign the letters A-Z using American Sign Language (ASL).',
    signs: [
      { letter: 'A', description: 'Make a fist with thumb alongside', imageUrl: '/images/A.jpg' },
      { letter: 'B', description: 'Hold your hand up with fingers straight and thumb tucked across palm', imageUrl: '/images/B.png' },
      { letter: 'C', description: 'Curve your hand into a C shape', imageUrl: '/images/C.jpg' },
      { letter: 'D', description: 'Make "O" with index finger pointing up', imageUrl: '/images/D.jpg' },
      { letter: 'E', description: 'Curl all fingers into palm', imageUrl: '/images/E.jpg' },
      { letter: 'F', description: 'Touch thumb to index finger, other fingers up', imageUrl: '/images/F.jpg' },
      { letter: 'G', description: 'Point index finger sideways, thumb and fingers closed', imageUrl: '/images/G.jpg' },
      { letter: 'H', description: 'Index and middle fingers together pointing sideways', imageUrl: '/images/H.jpg' },
      { letter: 'I', description: 'Make a fist with pinky finger up', imageUrl: '/images/I.jpg' },
      { letter: 'J', description: 'Make "I" and draw a J in the air', imageUrl: '/images/J.jpg' },
      { letter: 'K', description: 'Index finger up, middle finger angled from thumb', imageUrl: '/images/K.jpg' },
      { letter: 'L', description: 'Make "L" shape with thumb and index finger', imageUrl: '/images/L.jpg' },
      { letter: 'M', description: 'Place thumb between last three fingers', imageUrl: '/images/M.jpg' },
      { letter: 'N', description: 'Place thumb between last two fingers', imageUrl: '/images/N.jpg' },
      { letter: 'O', description: 'Form a circle with all fingers', imageUrl: '/images/O.jpg' },
      { letter: 'P', description: 'Point middle finger down, thumb and index touching', imageUrl: '/images/P.png' },
      { letter: 'Q', description: 'Point index finger down, thumb and pinky out', imageUrl: '/images/Q.png' },
      { letter: 'R', description: 'Cross middle finger over index finger', imageUrl: '/images/R.jpg' },
      { letter: 'S', description: 'Make a fist with thumb over fingers', imageUrl: '/images/S.jpg' },
      { letter: 'T', description: 'Make a fist with thumb between index and middle fingers', imageUrl: '/images/T.jpg' },
      { letter: 'U', description: 'Hold up index and middle fingers together', imageUrl: '/images/U.jpg' },
      { letter: 'V', description: 'Make peace sign with index and middle fingers', imageUrl: '/images/v.jpg' },
      { letter: 'W', description: 'Hold up three fingers (index, middle, ring)', imageUrl: '/images/W.jpg' },
      { letter: 'X', description: 'Make a hook with index finger', imageUrl: '/images/X.jpg' },
      { letter: 'Y', description: 'Extend thumb and pinky, other fingers closed', imageUrl: '/images/Y.jpg' },
      { letter: 'Z', description: 'Draw Z in air with index finger', imageUrl: '/images/Z.jpg' }
    ],
  },
  {
    title: 'Numbers',
    content: 'Master signing numbers from 0-9 and learn counting in ASL.',
    signs: [
      { 
        number: '0', 
        description: 'Make a closed hand shape like the letter "O", all fingers curved to touch the thumb', 
        imageUrl: '/images/0.jpg' 
      },
      { 
        number: '1', 
        description: 'Point index finger up, other fingers closed in a fist', 
        imageUrl: '/images/1.jpg' 
      },
      { 
        number: '2', 
        description: 'Hold up index and middle fingers in a "V" shape, palm facing forward', 
        imageUrl: '/images/2.jpg' 
      },
      { 
        number: '3', 
        description: 'Hold up thumb, index, and middle fingers, other fingers down', 
        imageUrl: '/images/3.jpg' 
      },
      { 
        number: '4', 
        description: 'Hold up four fingers (except thumb) straight up, palm facing forward', 
        imageUrl: '/images/4.jpg' 
      },
      { 
        number: '5', 
        description: 'Open hand with all five fingers spread, palm facing forward', 
        imageUrl: '/images/5.jpg' 
      },
      { 
        number: '6', 
        description: 'Make "3" sign and extend pinky finger, thumb touches palm', 
        imageUrl: '/images/6.jpg' 
      },
      { 
        number: '7', 
        description: 'Touch thumb to palm, hold up index, middle, ring, and pinky fingers', 
        imageUrl: '/images/7.jpg' 
      },
      { 
        number: '8', 
        description: 'Hold up thumb, index, and middle fingers in a gun shape, then extend ring and pinky', 
        imageUrl: '/images/8.jpg' 
      },
      { 
        number: '9', 
        description: 'Make "F" handshape by touching index finger and thumb, other fingers straight', 
        imageUrl: '/images/9.jpg' 
      }
    ],
  },
  {
    title: 'Common Phrases',
    content: 'Essential everyday phrases and greetings in sign language.',
    signs: commonPhrases,
  },
  {
    title: 'Emergency Signs',
    content: 'Important signs for emergency situations and medical terms.',
    signs: emergencySigns,
  },
  {
    title: 'Emotions',
    content: 'Express feelings and emotions in sign language.',
    signs: [
      { emotion: 'Happy', description: 'Brush your flat hand up your chest and face', imageUrl: '/images/happy.jpg' },
      { emotion: 'Sad', description: 'Drag your fingers down from your eyes like tears', imageUrl: '/images/sad.jpg' },
      { emotion: 'Angry', description: 'Make claws with both hands in front of your face', imageUrl: '/images/angry.jpg' },
    ],
  },
  {
    title: 'Time & Calendar',
    content: 'Learn to sign days, months, and time-related concepts.',
    signs: [
      { word: 'Today', description: 'Make a "T" hand shape and move it down', imageUrl: '/images/today.jpg' },
      { word: 'Tomorrow', description: 'Make a "T" hand shape and move it forward', imageUrl: '/images/tomorrow.jpg' },
      { word: 'Yesterday', description: 'Make a "Y" hand shape and move it backward', imageUrl: '/images/yesterday.jpg' },
    ],
  },
];

const SignCard: React.FC<SignCardProps> = ({ sign }) => (
  <Card
    sx={{
      minWidth: 280,
      maxWidth: 280,
      height: 'auto',
      mr: 2,
      flex: '0 0 auto',
      transition: 'transform 0.2s',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        bgcolor: 'grey.100',
        borderBottom: 1,
        borderColor: 'grey.200'
      }}
    >
      <CardMedia
        component="img"
        image={sign.imageUrl}
        alt={sign.title || sign.letter || sign.number || sign.emotion || sign.word}
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          p: 2,
        }}
      />
    </Box>
    <CardContent 
      sx={{ 
        p: 2,
        '&:last-child': {
          pb: 2,
        }
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontSize: '1.1rem',
          mb: 1,
          wordBreak: 'break-word',
          lineHeight: 1.3,
        }}
      >
        {sign.title || sign.letter || sign.number || sign.emotion || sign.word}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{
          wordBreak: 'break-word',
          lineHeight: 1.5,
        }}
      >
        {sign.description}
      </Typography>
    </CardContent>
  </Card>
);

const ScrollableSignRow: React.FC<ScrollableSignRowProps> = ({ signs, title }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h5" gutterBottom sx={{ mb: 3, pl: 2 }}>
      {title}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        pb: 2,
        pl: 2,
        gap: 2,
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,112,67,0.6)',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: 'rgba(255,112,67,0.8)',
          },
        },
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'start',
        },
      }}
    >
      {signs.map((sign: Sign, index: number) => (
        <SignCard key={index} sign={sign} />
      ))}
    </Box>
  </Box>
);

const SignLanguageGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Sign Language Guide
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Learn the basics of sign language and start communicating effectively
        </Typography>
      </Box>

      {/* Basic Signs Section */}
      <ScrollableSignRow signs={basicSigns} title="Basic Signs" />

      {/* Common Phrases Section */}
      <ScrollableSignRow signs={commonPhrases} title="Common Phrases" />

      {/* Emergency Signs Section */}
      <ScrollableSignRow signs={emergencySigns} title="Emergency Signs" />

      {/* Categories Section */}
      <Typography variant="h4" gutterBottom sx={{ mb: 4, pl: 2 }}>
        Learning Categories
      </Typography>
      <Box sx={{ mb: 8 }}>
        {categories.map((category, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{category.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>{category.content}</Typography>
              {category.signs && (
                <Box
                  sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    pb: 2,
                    gap: 2,
                    '&::-webkit-scrollbar': {
                      height: 8,
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: 4,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(255,112,67,0.6)',
                      borderRadius: 4,
                      '&:hover': {
                        backgroundColor: 'rgba(255,112,67,0.8)',
                      },
                    },
                    scrollSnapType: 'x mandatory',
                    '& > *': {
                      scrollSnapAlign: 'start',
                    },
                  }}
                >
                  {category.signs.map((sign: CategorySign, signIndex: number) => (
                    <SignCard key={signIndex} sign={sign} />
                  ))}
                </Box>
              )}
              <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Practice?
        </Typography>
        <Typography variant="body1" paragraph>
          Use our recording studio to practice these signs and get instant feedback.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          href="/studio"
          sx={{
            background: 'linear-gradient(135deg, #FF7043 0%, #FF9F5A 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FF8A65 0%, #FFB74D 100%)',
            },
          }}
        >
          Go to Recording Studio
        </Button>
      </Box>
    </Container>
  );
};

export default SignLanguageGuide; 