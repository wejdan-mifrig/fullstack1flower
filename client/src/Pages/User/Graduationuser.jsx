import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Graduationuser() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#1c1b18', 
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: '#f4f1ea',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: { xs: '3rem', md: '6rem' },
        }}
      >
        HELLO Aasdfhjmkk
      </Typography>
    </Box>
  );
}