import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  IconButton,
  styled,
} from '@mui/material';
import { FiberManualRecord, Stop, Replay } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const VideoContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  borderRadius: '16px',
  overflow: 'hidden',
  aspectRatio: '16/9',
});

const Studio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: 1280,
          height: 720,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        if (recordedVideoRef.current) {
          recordedVideoRef.current.src = URL.createObjectURL(blob);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedChunks([]);
    if (recordedVideoRef.current) {
      recordedVideoRef.current.src = '';
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledPaper>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#2D3748', fontWeight: 700 }}>
          ASL Recording Studio
        </Typography>
        <VideoContainer>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </VideoContainer>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          {!isRecording ? (
            <IconButton
              onClick={startRecording}
              sx={{
                background: '#FF7043',
                color: 'white',
                '&:hover': { background: '#FF8B3D' },
              }}
            >
              <FiberManualRecord />
            </IconButton>
          ) : (
            <IconButton
              onClick={stopRecording}
              sx={{
                background: '#FF7043',
                color: 'white',
                '&:hover': { background: '#FF8B3D' },
              }}
            >
              <Stop />
            </IconButton>
          )}
          <IconButton
            onClick={resetRecording}
            sx={{
              background: '#4A5568',
              color: 'white',
              '&:hover': { background: '#2D3748' },
            }}
          >
            <Replay />
          </IconButton>
        </Stack>
        {recordedChunks.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#2D3748' }}>
              Recorded Video
            </Typography>
            <video
              ref={recordedVideoRef}
              controls
              style={{
                width: '100%',
                borderRadius: '16px',
                marginTop: '16px',
              }}
            />
          </Box>
        )}
      </StyledPaper>
    </Container>
  );
};

export default Studio; 