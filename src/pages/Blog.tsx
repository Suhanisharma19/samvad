import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  styled,
} from '@mui/material';
import { motion } from 'framer-motion';
import { AccessTime, PersonOutline, ArrowForward } from '@mui/icons-material';

const BlogCard = styled(Card)(({ theme }) => ({
  background: 'white',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 48px rgba(255, 159, 90, 0.2)',
    '& .blog-image': {
      transform: 'scale(1.05)',
    },
    '& .read-more': {
      color: '#FF7043',
      transform: 'translateX(5px)',
    },
  },
}));

const blogPosts = [
  {
    title: "Getting Started with ASL: A Beginner's Guide",
    description: "Learn the basics of American Sign Language and discover tips for effective practice and learning strategies.",
    image: "/images/sign.jpg",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Learning",
  },
  {
    title: "The Evolution of Sign Language Technology",
    description: "Explore how AI and machine learning are revolutionizing sign language translation and making communication more accessible.",
    image: "/images/hello.jpg",
    author: "Dr. Michael Chen",
    date: "March 12, 2024",
    readTime: "7 min read",
    category: "Technology",
  },
  {
    title: "Common ASL Mistakes and How to Avoid Them",
    description: "Discover the most common mistakes beginners make when learning ASL and learn how to overcome these challenges.",
    image: "/images/Nicetomeetyou.png",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Tips & Tricks",
  },
];

const Blog = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#F7FAFC' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                mb: 2,
                background: 'linear-gradient(135deg, #FF7043 0%, #FF9800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Latest from Our Blog
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#4A5568',
                maxWidth: '800px',
                mx: 'auto',
                mb: 1,
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              }}
            >
              Discover insights, tips, and latest updates about ASL learning
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <BlogCard>
                  <Box sx={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={post.image}
                      alt={post.title}
                      className="blog-image"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#FF7043',
                          fontWeight: 600,
                        }}
                      >
                        {post.category}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {post.description}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                      pt: 2,
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ fontSize: '1rem', mr: 0.5, color: '#718096' }} />
                          <Typography variant="body2" color="#718096">
                            {post.readTime}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonOutline sx={{ fontSize: '1rem', mr: 0.5, color: '#718096' }} />
                          <Typography variant="body2" color="#718096">
                            {post.author}
                          </Typography>
                        </Box>
                      </Box>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: '#718096',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                        }}
                        className="read-more"
                      >
                        <Typography variant="body2" sx={{ mr: 0.5 }}>
                          Read More
                        </Typography>
                        <ArrowForward sx={{ fontSize: '1rem' }} />
                      </Box>
                    </Box>
                  </CardContent>
                </BlogCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;