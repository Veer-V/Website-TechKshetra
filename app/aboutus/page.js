'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Button, useTheme, Paper, Avatar, Collapse } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import teamMembers from '@/data/teamMembers';
import mentors from '@/data/mentors';
import { useRouter } from 'next/navigation';
import TeamMemberCard from '@/components/TeamMemberCard';
import MentorCard from '@/components/MentorCard';

const founders = [
  { name: 'Ms Esmita Gupta', initials: 'EG', imageUrl: 'https://ik.imagekit.io/2c0oz10ww1/Mentor/EsmitaGupta_U4zZG_izw?updatedAt=1752890071527' },
  { name: 'Ms Anjali Bunker', initials: 'AB', imageUrl: 'https://ik.imagekit.io/2c0oz10ww1/Mentor/Anjali_Bunker?updatedAt=1751210065486' },
];


const AboutTechKshetra = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 900, margin: 'auto', textAlign: 'justify' }}>
      <Typography variant="body1" paragraph>
        On the occasion of Teacher’s Day, 5th September 2023, the IT Club “TechKshetra – Birla” was born with a powerful vision — to promote and share the wonders of technology beyond the boundaries of the classroom. Our goal was simple yet impactful: to create a space where both tech and non-tech students could explore the world of technology through fun, interactive, and engaging experiences.
      </Typography>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography variant="body1" paragraph>
          Since then, for over two years, we have proudly conducted a wide range of activities — from workshops, hackathons, seminars, debates, and ideathons to cultural events infused with a tech twist. Each initiative has helped students grow, connect, and unleash their potential in a vibrant, ever-evolving tech landscape.
        </Typography>
        <Typography variant="body1" paragraph>
          In 2024, embracing growth and collaboration, TechKshetra took a monumental step forward by merging with the Computer Science Department. This integration infused the club with greater energy, resources, and diversity — opening a new chapter in our journey. Together, both departments united to redefine our college’s tech culture, fostering an inclusive environment that champions learning, leadership, and limitless innovation.
        </Typography>
      </Collapse>
      <Button onClick={() => setExpanded(!expanded)} sx={{ mt: 1 }}>
        {expanded ? 'Read Less' : 'Read More'}
      </Button>
    </Paper>
  );
};

const FoundersSection = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, my: 4, flexWrap: 'wrap' }}>
      {founders.map((founder) => (
        <Box key={founder.name} sx={{ textAlign: 'center' }}>
          {founder.imageUrl ? (
            <img
              src={founder.imageUrl}
              alt={founder.name}
              style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }}
            />
          ) : (
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                fontSize: 40,
                fontWeight: 'bold',
                mx: 'auto',
              }}
            >
              {founder.initials}
            </Avatar>
          )}
          <Typography variant="subtitle1" color="textPrimary" sx={{ mt: 1 }}>
            {founder.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

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

        {/* Founders Section at the top */}
        <FoundersSection />

        <Typography variant="h6" color="textSecondary" paragraph>
          Welcome to B. K. Birla College, Kalyan's first CS and IT club of technology, innovation and more...
        </Typography>

        {/* About TechKshetra Section with Read More toggle */}
        <AboutTechKshetra />
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
