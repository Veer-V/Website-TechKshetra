'use client';

import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, useTheme } from '@mui/material';
import { events } from '@/data/events';
import { format } from 'date-fns';

const UpcomingEvents = () => {
  const theme = useTheme();

  // Filter future events and sort by date ascending
  const today = new Date();
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date - b.date);

  if (upcomingEvents.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h6">No upcoming events.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4, width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Upcoming Events
      </Typography>
      {upcomingEvents.map(event => (
        <Card key={event.id} sx={{ display: 'flex', mb: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            sx={{ width: 160 }}
            image={event.image}
            alt={event.title}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <CardContent>
              <Typography component="h5" variant="h5">
                {event.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {format(event.date, 'PPP')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {event.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                For: {event.for}
              </Typography>
              {event.registrationLink && (
                <Button
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Register
                </Button>
              )}
            </CardContent>
          </Box>
        </Card>
      ))}
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
        View all events in the <a href="/events" style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>Event Calendar</a>.
      </Typography>
    </Box>
  );
};

export default UpcomingEvents;
