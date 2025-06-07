interface AnimationDictionary {
  [key: string]: string;
}

// Speech synthesis function
export const speakText = (text: string): void => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower rate for better clarity
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
};

// Basic dictionary of common phrases and their corresponding animations
const signLanguageAnimations: AnimationDictionary = {
  'hello': '/images/hello_gif.gif',
  'goodbye': '/images/goodbye_gif.gif',
  'thank you': '/images/thank_you_gif.gif',
  'yes': '/images/yes_gif.gif',
  'no': '/images/no_gif.gif',
  'help': '/images/help_gif.gif',
  'how are you': '/images/how_are_you_gif.gif',
  'good': '/images/good_gif.gif',
  'bad': '/images/bad_gif.gif',
  'please': '/images/please_gif.gif',
  'i love you': '/images/I_Love_You_gif.gif',
  'love': '/images/love_gif.gif',
  'happy': '/images/happy_gif.gif',
  'sad': '/images/sad_gif.gif',
  'sorry': '/images/sorry_gif.gif',
  'friend': '/images/friend_gif.gif',
  'family': '/images/family_gif.gif',
  // Add more mappings as needed
};

// Function to find the most relevant animation for a given text
export const findRelevantAnimation = (text: string): string | null => {
  const lowercaseText = text.toLowerCase();
  
  // Direct match
  if (signLanguageAnimations[lowercaseText]) {
    return signLanguageAnimations[lowercaseText];
  }

  // Check if any phrase is contained in the text
  for (const [phrase, animation] of Object.entries(signLanguageAnimations)) {
    if (lowercaseText.includes(phrase)) {
      return animation;
    }
  }

  return null;
};

// Function to generate response text based on user input
export const generateResponse = (text: string): string => {
  const lowercaseText = text.toLowerCase();
  
  // Basic response mapping with sign language explanations
  const responses: AnimationDictionary = {
    'hello': 'To sign "hello" in ASL, wave your hand with your palm facing out, starting from your forehead and moving outward. This is a friendly and common greeting in sign language!',
    'how are you': 'The sign for "how are you" in ASL is made by pointing to the other person (you), then making a curved hand motion from your chest outward (are), and pointing back to the other person (you). It\'s a caring way to ask about someone\'s wellbeing!',
    'goodbye': 'To sign "goodbye" in ASL, wave your open hand side to side, similar to a regular wave goodbye. It\'s a universal and friendly way to say farewell!',
    'thank you': 'The sign for "thank you" is made by touching your chin or lips with the fingertips of your flat hand, then moving your hand forward and down in the direction of the person you\'re thanking. It\'s a graceful and heartfelt gesture!',
    'help': 'To sign "help" in ASL, make your dominant hand into a thumbs-up, and push it up with your other flat hand. This represents giving someone a boost or assistance!',
    'i love you': 'The "I love you" sign combines the letters I, L, and Y: extend your thumb (I), index finger (L), and pinky (Y). This beautiful sign is universally recognized!',
    'love': 'To sign "love," cross your arms over your chest, like hugging yourself. This sign beautifully represents the warmth and embrace of love!',
    'happy': 'The sign for "happy" is made by brushing your hand upward over your chest several times. This upward motion represents the lifting feeling of happiness!',
    'sad': 'To sign "sad," place both hands on your chest and move them downward. This downward motion represents the feeling of heaviness in our hearts when we\'re sad.',
    'sorry': 'The sign for "sorry" is made by making a fist and rubbing it in a circular motion over your chest. This represents the feeling of regret or apology in your heart.',
    'friend': 'To sign "friend," link your index fingers together, then switch their positions. This represents the bond between friends - linked together!',
    'family': 'The sign for "family" joins all fingers together in both hands, showing how family members are connected. It\'s a beautiful representation of unity!',
  };

  // Check for exact matches
  if (responses[lowercaseText]) {
    return responses[lowercaseText];
  }

  // Check for partial matches
  for (const [phrase, response] of Object.entries(responses)) {
    if (lowercaseText.includes(phrase)) {
      return response;
    }
  }

  // Default response with educational context
  return "Let me show you how to express that in ASL. Sign language uses a combination of hand shapes, facial expressions, and body movements to communicate. Watch the animation to learn this sign!";
};

export interface AIResponse {
  text: string;
  animation: string;
  shouldSpeak: boolean; // New property to control speech output
}

// Function to process user input and return both text and animation
export const processUserInput = async (text: string, enableVoice: boolean = false): Promise<AIResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const response = generateResponse(text);
  const animation = findRelevantAnimation(text);

  if (enableVoice) {
    speakText(response);
  }

  return {
    text: response,
    animation: animation || '/images/default_gif.gif', // Fallback animation
    shouldSpeak: enableVoice
  };
}; 