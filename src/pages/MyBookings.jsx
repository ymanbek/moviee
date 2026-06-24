import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import { EventNote, Movie, ConfirmationNumber } from '@mui/icons-material';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored.reverse()); 
  }, []);

  if (bookings.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: '#1a1a1a' }}>
          <EventNote sx={{ fontSize: 80, color: 'gray', mb: 2 }} />
          <Typography variant="h5" color="white" gutterBottom>
            Бронирование жок
          </Typography>
          <Typography color="gray" sx={{ mb: 3 }}>
            Сизде азырынча брондолгон билеттер жок
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Фильмдерди көрүү
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" color="white" gutterBottom sx={{ mb: 4 }}>
        Менин брондорум
      </Typography>

      <Grid container spacing={3}>
        {bookings.map((booking) => (
          <Grid item xs={12} md={6} key={booking.id}>
            <Card sx={{ bgcolor: '#1a1a1a', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Typography variant="h6" color="white" gutterBottom>
                      {booking.movieTitle}
                    </Typography>
                    <Chip
                      icon={<Movie />}
                      label={`Сеанс: ${booking.showtime}`}
                      size="small"
                      color="primary"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<ConfirmationNumber />}
                      label={`${booking.seats.length} билет`}
                      size="small"
                      color="secondary"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="primary">
                    {booking.totalPrice} сом
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: 'gray' }} />

                <Typography color="gray" variant="body2" gutterBottom>
                  <strong>Орундар:</strong> {booking.seats.join(', ')}
                </Typography>
                <Typography color="gray" variant="body2" gutterBottom>
                  <strong>Аты-жөнү:</strong> {booking.user.firstName} {booking.user.lastName}
                </Typography>
                <Typography color="gray" variant="body2" gutterBottom>
                  <strong>Email:</strong> {booking.user.email}
                </Typography>
                <Typography color="gray" variant="body2" gutterBottom>
                  <strong>Телефон:</strong> {booking.user.phone}
                </Typography>
                <Typography color="gray" variant="caption">
                  <strong>Бронировка убактысы:</strong> {new Date(booking.date).toLocaleString()}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    label="Бронь подтверждена"
                    color="success"
                    size="small"
                    sx={{ bgcolor: '#2e7d32' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyBookings;