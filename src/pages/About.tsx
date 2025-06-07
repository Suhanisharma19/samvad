import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          About Samvaad
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph>
          Breaking barriers in sign language communication through technology
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              At Samvaad, we believe that communication should be accessible to everyone. Our mission is to bridge the gap between sign language users and the wider community through innovative technology solutions.
            </Typography>
            <Typography paragraph>
              We strive to create tools that make sign language communication more accessible, efficient, and natural for everyone involved.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h4" gutterBottom>
              Our Technology
            </Typography>
            <Typography paragraph>
              Using advanced AI and machine learning algorithms, our platform provides real-time sign language detection and translation. We continuously improve our technology to ensure accurate and reliable results.
            </Typography>
            <Typography paragraph>
              Our system is designed to be user-friendly while maintaining high performance and accuracy in translation.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              Join Our Community
            </Typography>
            <Typography paragraph>
              We're building a community of users, developers, and sign language experts who are passionate about making communication more accessible. Whether you're a sign language user, interpreter, or someone interested in learning, you're welcome to join our community.
            </Typography>
            <Typography>
              Together, we can make sign language communication more accessible and break down barriers between communities.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 