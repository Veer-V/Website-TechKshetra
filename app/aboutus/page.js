'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import teamMembers from '@/data/teamMembers';
import mentors from '@/data/mentors';
import { useRouter } from 'next/navigation';
import TeamMemberCard from '@/components/TeamMemberCard';
import MentorCard from '@/components/MentorCard';

const AboutUs = () => {
  const [showAllTeamMembers, setShowAllTeamMembers] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const visibleTeamMembers = showAllTeamMembers ? teamMembers : teamMembers.slice(0, 3);
  const visibleMentors = mentors.slice(0, 5); // Always limit to 5 mentors

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: '100%',
        my: { xs: 8, sm: 10, md: 12 },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box my={4}>
          <Typography variant="body1" color="textSecondary">Powered By</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                overflow: 'visible',
                position: 'relative',
                borderRadius: 0,
                border: 'none',
              }}
            >
              <Image loader={imageKitLoader} src="/College/Collegelogo" alt="B. K. Birla College Logo" layout="fill" objectFit="contain" />
            </Box>
            <Typography variant="h4" color="textSecondary">
              B. K. Birla College of Arts, Science and Commerce
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: 300, height: 300, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 2 }}>
          <Image
            loader={imageKitLoader}
            src={theme.palette.mode === 'light' ? '/College/Clublogo1' : '/College/Clublogo1'}
            alt="TechKshetra logo"
            layout="fill"
            objectFit="cover"
          />
        </Box>

        <Typography variant="h6" color="textSecondary" paragraph>
          Welcome to B. K. Birla College, Kalyan's first CS and IT club of technology, innovation and more...
        </Typography>
      </Box>

      <Box mt={6}>
        <Typography variant="h4" gutterBottom>Meet Our Team Members</Typography>
        <Grid container spacing={4}>
          {visibleTeamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamMemberCard member={member} />
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          {!showAllTeamMembers ? (
            <Button
              variant="contained"
              color="primary"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAllTeamMembers(true)}
            >
              View All Members
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAllTeamMembers(false)}
            >
              Show Less
            </Button>
          )}
        </Box>
      </Box>

      <Box mt={6}>
        <Typography variant="h4" gutterBottom>Meet Our Mentors</Typography>
        <Grid container spacing={2} justifyContent="center">
          {visibleMentors.slice(0, 2).map((mentor, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <MentorCard mentor={mentor} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={10} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          component={motion.a}
          whileHover={{ scale: 1.05 }}
          href="mailto:techkshetra.cs.it.club@gmail.com"
          startIcon={<EmailIcon />}
        >
          Email Us
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;