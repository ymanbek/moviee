import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import { toggleSeat } from '../store';

function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSeats, showtime, movieId } = useSelector((state) => state.booking);
  const [bookedSeats, setBookedSeats] = useState([]);
  const pricePerSeat = 300;

  // Фильмдердин тизмеси - useMemo менен мемоизациялоо
  const movies = useMemo(() => [
    {
      id: '1',
      title: 'Interstellar',
      year: '2014',
      genre: 'Sci-Fi, Adventure',
      runtime: '169 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    },
    {
      id: '2',
      title: 'The Dark Knight',
      year: '2008',
      genre: 'Action, Crime, Drama',
      runtime: '152 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    },
    {
      id: '3',
      title: 'Inception',
      year: '2010',
      genre: 'Sci-Fi, Action, Thriller',
      runtime: '148 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
      id: '4',
      title: 'The Avengers',
      year: '2012',
      genre: 'Action, Sci-Fi, Adventure',
      runtime: '143 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    },
    {
      id: '5',
      title: 'Dune: Part Two',
      year: '2024',
      genre: 'Sci-Fi, Adventure',
      runtime: '166 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BNmI4YzE1MzQtMmM2OS00ZTU5LWI0NTMtODliNzI3M2JmZGIyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
    },
    {
      id: '6',
      title: 'Oppenheimer',
      year: '2023',
      genre: 'Biography, Drama, History',
      runtime: '180 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
    },
    {
      id: '7',
      title: 'Barbie',
      year: '2023',
      genre: 'Comedy, Adventure, Fantasy',
      runtime: '114 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
    },
    {
      id: '8',
      title: 'The Batman',
      year: '2022',
      genre: 'Action, Crime, Drama',
      runtime: '176 min',
      poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg',
    },
  ], []); // useMemo - [] менен бир гана жолу түзүлөт

  const movie = movies.find(m => m.id === movieId);

  // Брондолгон орундарды LocalStorage дан алуу
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
    setBookedSeats(stored);
  }, []); // Бош массив - компонент түзүлгөндө бир гана жолу иштейт

  // Эгерде movieId же showtime жок болсо, башкы бетке кайтаруу
  useEffect(() => {
    if (!movieId || !showtime) {
      navigate('/');
    }
  }, [movieId, showtime, navigate]); // ✅ Бардык көз карандылыктар кошулду

  const isSeatBooked = (seat) => bookedSeats.includes(seat);
  const isSeatSelected = (seat) => selectedSeats.includes(seat);

  const handleSeatClick = (seat) => {
    if (isSeatBooked(seat)) return;
    dispatch(toggleSeat(seat));
  };

  const getSeatColor = (seat) => {
    if (isSeatBooked(seat)) return '#ff1744';
    if (isSeatSelected(seat)) return '#4caf50';
    return '#757575';
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Кеминде бир орун тандаңыз!');
      return;
    }
    navigate('/checkout');
  };

  const totalPrice = selectedSeats.length * pricePerSeat;

  // Кино залынын схемасы
  const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const cols = Array.from({ length: 10 }, (_, i) => i + 1);

  // Эгерде movie табылбаса
  if (!movie) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 4 }}>
          Фильм табылган жок. Башкы бетке өтүңүз.
        </Alert>
        <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 2 }}>
          Башкы бетке
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Зал схемасы */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, bgcolor: '#1a1a1a' }}>
            <Typography variant="h5" color="white" align="center" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="subtitle1" color="gray" align="center" gutterBottom>
              Сеанс: {showtime} | {movie.year}
            </Typography>
            <Typography variant="body2" color="gray" align="center" sx={{ mb: 3 }}>
              ⬇️ ЭКРАН ⬇️
            </Typography>
            <Box
              sx={{
                height: 4,
                bgcolor: 'gray',
                width: '80%',
                mx: 'auto',
                mb: 4,
                borderRadius: 2,
              }}
            />

            <Box sx={{ overflowX: 'auto' }}>
              {rows.slice(0, 8).map((row) => (
                <Box key={row} sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Typography sx={{ width: 30, color: 'gray', textAlign: 'center', fontSize: 14 }}>
                    {row}
                  </Typography>
                  {cols.map((col) => {
                    const seat = `${row}${col}`;
                    return (
                      <Button
                        key={seat}
                        onClick={() => handleSeatClick(seat)}
                        disabled={isSeatBooked(seat)}
                        sx={{
                          minWidth: 36,
                          height: 36,
                          bgcolor: getSeatColor(seat),
                          color: 'white',
                          '&:hover': {
                            bgcolor: isSeatBooked(seat) ? '#ff1744' : '#66bb6a',
                          },
                          fontSize: 12,
                          p: 0,
                          borderRadius: 1,
                          '&.Mui-disabled': {
                            opacity: 0.8,
                          },
                        }}
                      >
                        {col}
                      </Button>
                    );
                  })}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#757575', borderRadius: 1 }} />
                <Typography color="gray" variant="body2">Бош</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#4caf50', borderRadius: 1 }} />
                <Typography color="gray" variant="body2">Тандалган</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, bgcolor: '#ff1744', borderRadius: 1 }} />
                <Typography color="gray" variant="body2">Брондолгон</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Оң панель - Тандалган орундар */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1a1a1a', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="white" gutterBottom>
                Бронирование
              </Typography>
              <Divider sx={{ my: 2, borderColor: 'gray' }} />
              
              <Typography color="white" variant="body1">
                <strong>{movie.title}</strong>
              </Typography>
              <Typography color="gray" variant="body2">
                Сеанс: {showtime}
              </Typography>

              <Divider sx={{ my: 2, borderColor: 'gray' }} />

              <Typography color="white" variant="body2" gutterBottom>
                Тандалган орундар:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seat) => (
                    <Chip 
                      key={seat} 
                      label={seat} 
                      color="success" 
                      size="small"
                      onDelete={() => dispatch(toggleSeat(seat))}
                    />
                  ))
                ) : (
                  <Typography color="gray" variant="body2">Орун тандалган жок</Typography>
                )}
              </Box>

              <Typography color="white" variant="body2">
                Билеттердин саны: {selectedSeats.length}
              </Typography>
              <Typography color="white" variant="h6" sx={{ mt: 1 }}>
                Жалпы сумма: {totalPrice} сом
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleContinue}
                sx={{ mt: 3 }}
                disabled={selectedSeats.length === 0}
              >
                Улантуу
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Booking;