import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
  Fab,
  Zoom,
  Tooltip,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { processUserInput, speakText } from '../utils/signLanguageUtils';
import Webcam from 'react-webcam';

interface Message {
  text: string;
  isUser: boolean;
  animation?: string; // URL to the sign language animation
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hello! I'm your sign language assistant. How can I help you today?",
    isUser: false,
    animation: '/animations/hello.gif'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showVoiceNotification, setShowVoiceNotification] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await processUserInput(input, voiceEnabled);
      
      const aiResponse: Message = {
        text: response.text,
        isUser: false,
        animation: response.animation,
      };

      setMessages(prev => [...prev, aiResponse]);

      // Show voice notification if voice is disabled
      if (!voiceEnabled) {
        setShowVoiceNotification(true);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I couldn't process that request. Please try again.",
        isUser: false,
      }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleVoice = () => {
    const newVoiceState = !voiceEnabled;
    setVoiceEnabled(newVoiceState);
    // Stop any ongoing speech when turning off voice
    if (!newVoiceState) {
      window.speechSynthesis.cancel();
      setShowVoiceNotification(true);
    }
  };

  const toggleWebcam = () => {
    setWebcamEnabled(!webcamEnabled);
  };

  // Show notification when chat is opened and voice is off
  useEffect(() => {
    if (isOpen && !voiceEnabled) {
      setShowVoiceNotification(true);
    }
  }, [isOpen, voiceEnabled]);

  const handleMessageClick = (message: Message) => {
    if (!message.isUser) {
      speakText(message.text);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Zoom in={!isOpen}>
        <Tooltip title="Open Sign Language Assistant" placement="left">
          <Fab
            color="primary"
            onClick={toggleChat}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              bgcolor: '#FF7043',
              zIndex: 9999,
              '&:hover': {
                bgcolor: '#FF8A65',
              },
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              animation: isOpen ? 'none' : 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  boxShadow: '0 0 0 0 rgba(255, 112, 67, 0.4)',
                },
                '70%': {
                  boxShadow: '0 0 0 15px rgba(255, 112, 67, 0)',
                },
                '100%': {
                  boxShadow: '0 0 0 0 rgba(255, 112, 67, 0)',
                },
              },
            }}
          >
            <SmartToyIcon />
          </Fab>
        </Tooltip>
      </Zoom>

      {/* Chat Window */}
      <Zoom in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: webcamEnabled ? 800 : 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            zIndex: 9999,
            transition: 'width 0.3s ease-in-out',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #FF7043 0%, #FF9F5A 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <SmartToyIcon />
              <Typography variant="h6">Sign Language Assistant</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <Tooltip title="Toggle webcam for sign detection">
                  <IconButton
                    size="small"
                    onClick={toggleWebcam}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    {webcamEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Tooltip title={voiceEnabled ? "Turn voice off" : "Turn voice on"}>
                  <IconButton
                    size="small"
                    onClick={toggleVoice}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    {voiceEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </IconButton>
                </Tooltip>
                {/* Voice notification tooltip */}
                {showVoiceNotification && !voiceEnabled && (
                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      mt: 1,
                      p: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      zIndex: 1000,
                      width: 'max-content',
                      maxWidth: '200px',
                      animation: 'fadeIn 0.3s ease-in-out',
                      '@keyframes fadeIn': {
                        from: {
                          opacity: 0,
                          transform: 'translateY(-10px)'
                        },
                        to: {
                          opacity: 1,
                          transform: 'translateY(0)'
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -6,
                        right: 12,
                        width: 12,
                        height: 12,
                        bgcolor: 'background.paper',
                        transform: 'rotate(45deg)',
                      }
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1 }}>
                      <VolumeOffIcon fontSize="small" sx={{ color: '#FF7043' }} />
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        Click to enable voice
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setShowVoiceNotification(false)}
                        sx={{ 
                          p: 0.5,
                          ml: 'auto',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Paper>
                )}
              </Box>
              <IconButton
                size="small"
                onClick={toggleChat}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Main content area */}
          <Box sx={{ 
            display: 'flex', 
            flex: 1,
            flexDirection: webcamEnabled ? 'row' : 'column',
          }}>
            {/* Chat area */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 350,
            }}>
              {/* Chat Messages */}
              <Box
                ref={chatContainerRef}
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '80%',
                        display: 'flex',
                        gap: 1,
                        flexDirection: message.isUser ? 'row-reverse' : 'row',
                      }}
                    >
                      {!message.isUser && (
                        <Avatar sx={{ bgcolor: '#FF7043' }}>
                          <SmartToyIcon />
                        </Avatar>
                      )}
                      <Paper
                        elevation={1}
                        onClick={() => handleMessageClick(message)}
                        sx={{
                          p: 1.5,
                          backgroundColor: message.isUser ? '#E3F2FD' : 'white',
                          borderRadius: 2,
                          cursor: !message.isUser ? 'pointer' : 'default',
                          transition: 'all 0.2s ease',
                          '&:hover': !message.isUser ? {
                            backgroundColor: 'rgba(255, 112, 67, 0.05)',
                            transform: 'scale(1.01)',
                          } : {},
                        }}
                      >
                        <Typography variant="body1">{message.text}</Typography>
                        {!message.isUser && (
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              color: 'text.secondary',
                              fontSize: '0.7rem',
                            }}
                          >
                            Click to hear this message again
                          </Typography>
                        )}
                        {message.animation && (
                          <Box
                            component="img"
                            src={message.animation}
                            alt="Sign Language Animation"
                            sx={{
                              mt: 1,
                              maxWidth: '100%',
                              borderRadius: 1,
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMessageClick(message);
                            }}
                          />
                        )}
                      </Paper>
                    </Box>
                  </Box>
                ))}
                {isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                    <CircularProgress size={20} />
                  </Box>
                )}
              </Box>

              {/* Input Area */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>

            {/* Webcam area */}
            {webcamEnabled && (
              <Box sx={{ 
                width: 450,
                p: 2,
                bgcolor: 'background.paper',
                borderLeft: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Typography variant="h6" gutterBottom>
                  Sign Language Detection
                </Typography>
                <Box sx={{ position: 'relative', flex: 1 }}>
                  <Webcam
                    ref={webcamRef}
                    mirrored
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Paper
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      p: 1,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    <Typography variant="body2" align="center">
                      Practice signing and get real-time feedback
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Zoom>
    </>
  );
};

export default AIAssistant; 