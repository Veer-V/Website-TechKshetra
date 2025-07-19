'use client';

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
      <Box>
        <Typography variant="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/')}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
