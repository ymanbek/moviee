import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Alert,
  Grid,
  Avatar,
  IconButton,
} from '@mui/material';
import { 
  Movie, 
  ConfirmationNumber, 
  Person, 
  Email, 
  Phone,
  ArrowBack,
  CheckCircle 
} from '@mui/icons-material';
import { clearBooking } from '../store';

function Checkout() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { selectedSeats, showtime, movieId } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pricePerSeat = 300;

  const movies = [
    { id: '1', title: 'Interstellar', poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
    { id: '2', title: 'The Dark Knight', poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg' },
    { id: '3', title: 'Inception', poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg' },
    { id: '4', title: 'The Avengers', poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg' },
    { id: '5', title: 'Dune: Part Two', poster: 'https://m.media-amazon.com/images/M/MV5BNmI4YzE1MzQtMmM2OS00ZTU5LWI0NTMtODliNzI3M2JmZGIyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg' },
    { id: '6', title: 'Oppenheimer', poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg' },
    { id: '7', title: 'Barbie', poster: 'https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg' },
    { id: '8', title: 'The Batman', poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg' },
  ];
  const movie = movies.find(m => m.id === movieId);

  const onSubmit = (data) => {
    const booking = {
      id: Date.now(),
      movieId,
      movieTitle: movie?.title || 'Фильм',
      showtime,
      seats: selectedSeats,
      totalPrice: selectedSeats.length * pricePerSeat,
      user: data,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));

    const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    const newBooked = [...bookedSeats, ...selectedSeats];
    localStorage.setItem('bookedSeats', JSON.stringify(newBooked));

    dispatch(clearBooking());
    alert('🎉 Booking Successful!');
    reset();
    navigate('/my-bookings');
  };

  if (selectedSeats.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center', 
          bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4
        }}>
          <ConfirmationNumber sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
          <Typography variant="h5" color="white" gutterBottom>
            Билеттер тандалган жок
          </Typography>
          <Typography color="rgba(255,255,255,0.7)" sx={{ mb: 3 }}>
            Билеттерди тандоо үчүн башкы бетке өтүңүз
          </Typography>
          <Button 
            onClick={() => navigate('/')} 
            variant="contained" 
            startIcon={<ArrowBack />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              }
            }}
          >
            Башкы бетке
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ 
        p: { xs: 2, md: 4 },
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" color="white" sx={{ fontWeight: 'bold' }}>
            Оформление заказа
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ 
              p: 3, 
              bgcolor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mb: 3 }}>
                Төмөнкү маалыматтарды толтуруңуз
              </Typography>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: 1, minWidth: '200px' }}>
                    <TextField
                      fullWidth
                      label="Имя"
                      {...register('firstName', { required: 'Бул талаа милдеттүү' })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#667eea' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                      }}
                      InputProps={{
                        startAdornment: <Person sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />,
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: '200px' }}>
                    <TextField
                      fullWidth
                      label="Фамилия"
                      {...register('lastName', { required: 'Бул талаа милдеттүү' })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: 'white',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                          '&.Mui-focused fieldset': { borderColor: '#667eea' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                      }}
                      InputProps={{
                        startAdornment: <Person sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />,
                      }}
                    />
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register('email', {
                    required: 'Бул талаа милдеттүү',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Туура эмес email дареги',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mt: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#667eea' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                  }}
                  InputProps={{
                    startAdornment: <Email sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="Телефон"
                  {...register('phone', {
                    required: 'Бул талаа милдеттүү',
                    pattern: {
                      value: /^[0-9+\s\-()]{10,}$/,
                      message: 'Туура эмес телефон номери',
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={{ mt: 2,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#667eea' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                  }}
                  InputProps={{
                    startAdornment: <Phone sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />,
                  }}
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transform: 'scale(1.02)',
                      transition: 'all 0.3s ease',
                    }
                  }}
                  startIcon={<CheckCircle />}
                >
                  Бронировать
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ 
              bgcolor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.1)',
              height: '100%',
              overflow: 'hidden'
            }}>
              {movie && (
                <Box sx={{ 
                  height: 120, 
                  background: `url(${movie.poster}) center/cover`,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(to top, rgba(26,26,46,1), transparent)',
                  }
                }} />
              )}
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" color="white" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Детали заказа
                </Typography>
                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Movie sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography color="white">
                    <strong>Фильм:</strong> {movie?.title}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <ConfirmationNumber sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography color="white">
                    <strong>Сеанс:</strong> {showtime}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                  <Person sx={{ color: '#667eea', fontSize: 20 }} />
                  <Box>
                    <Typography color="white">
                      <strong>Орундар:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {selectedSeats.map((seat) => (
                        <Box
                          key={seat}
                          sx={{
                            bgcolor: 'rgba(102, 126, 234, 0.2)',
                            color: '#667eea',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            border: '1px solid rgba(102, 126, 234, 0.3)'
                          }}
                        >
                          {seat}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ConfirmationNumber sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography color="white">
                    <strong>Билеттер:</strong> {selectedSeats.length}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  bgcolor: 'rgba(102, 126, 234, 0.1)',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <Typography color="white" variant="body1">
                    <strong>Жалпы сумма:</strong>
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 'bold' }}>
                    {selectedSeats.length * 300} сом
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                  }}>
                    <Typography variant="caption" sx={{ color: '#4caf50' }}>
                       Билеттер даяр
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    borderRadius: 1,
                    px: 1.5,
                    py: 0.5,
                  }}>
                    <Typography variant="caption" sx={{ color: '#ffc107' }}>
                      5 мүнөт ичинде бүтүрүңүз
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Checkout;