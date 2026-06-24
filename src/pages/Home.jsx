import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { toggleFavorite } from '../store';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const localMovies = [
    {
      id: '1',
      title: 'Interstellar',
      year: '2014',
      genre: 'Sci-Fi, Adventure',
      runtime: '169 min',
      plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      imdbRating: '8.6',
    },
    {
      id: '2',
      title: 'The Dark Knight',
      year: '2008',
      genre: 'Action, Crime, Drama',
      runtime: '152 min',
      plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
      imdbRating: '9.0',
    },
    {
      id: '3',
      title: 'Inception',
      year: '2010',
      genre: 'Sci-Fi, Action, Thriller',
      runtime: '148 min',
      plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
      imdbRating: '8.8',
    },
    {
      id: '4',
      title: 'The Avengers',
      year: '2012',
      genre: 'Action, Sci-Fi, Adventure',
      runtime: '143 min',
      plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
      poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      imdbRating: '8.0',
    },
    {
      id: '5',
      title: 'Dune: Part Two',
      year: '2024',
      genre: 'Sci-Fi, Adventure',
      runtime: '166 min',
      plot: "Paul Atreides continues his journey on the desert planet Arrakis as he seeks revenge against those who destroyed his family.",
      poster: 'https://m.media-amazon.com/images/M/MV5BNmI4YzE1MzQtMmM2OS00ZTU5LWI0NTMtODliNzI3M2JmZGIyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg',
      imdbRating: '8.5',
    },
    {
      id: '6',
      title: 'Oppenheimer',
      year: '2023',
      genre: 'Biography, Drama, History',
      runtime: '180 min',
      plot: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
      poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
      imdbRating: '8.4',
    },
    {
      id: '7',
      title: 'Barbie',
      year: '2023',
      genre: 'Comedy, Adventure, Fantasy',
      runtime: '114 min',
      plot: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
      poster: 'https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
      imdbRating: '7.0',
    },
    {
      id: '8',
      title: 'The Batman',
      year: '2022',
      genre: 'Action, Crime, Drama',
      runtime: '176 min',
      plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg',
      imdbRating: '7.8',
    },
  ];

  useEffect(() => {
    setLoading(true);
    setMovies(localMovies);
    
    const allGenres = localMovies.flatMap(m => m.genre.split(', '));
    setGenres([...new Set(allGenres)]);
    setLoading(false);
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre 
      ? movie.genre.includes(selectedGenre) 
      : true;
    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Фильмдерди издөө..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
          variant="outlined"
          size="small"
          InputLabelProps={{ style: { color: 'gray' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: 'gray' }}>Жанр</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Жанр"
            sx={{ color: 'white' }}
          >
            <MenuItem value="">Бардык жанрлар</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>{genre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button 
          variant="outlined" 
          onClick={() => {
            setSearchTerm('');
            setSelectedGenre('');
          }}
          sx={{ color: 'white', borderColor: 'gray' }}
        >
          Тазалоо
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              bgcolor: '#1a1a1a',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 24px rgba(229, 9, 20, 0.3)'
              }
            }}>
              <CardMedia
                component="img"
                height="400"
                image={movie.poster}
                alt={movie.title}
                sx={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" color="white" gutterBottom noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="gray" sx={{ mb: 1 }}>
                  {movie.genre}
                </Typography>
                <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
                  {movie.runtime}
                </Typography>
                {movie.imdbRating && (
                  <Chip 
                    label={`⭐ ${movie.imdbRating}`} 
                    size="small" 
                    sx={{ mb: 2, bgcolor: '#2a2a2a', color: 'gold' }}
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    component={Link}
                    to={`/movie/${movie.id}`}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Подробнее
                  </Button>
                  <Button
                    onClick={() => dispatch(toggleFavorite(movie.id))}
                    color={favorites.includes(movie.id) ? 'error' : 'default'}
                    size="small"
                  >
                    {favorites.includes(movie.id) ? <Favorite /> : <FavoriteBorder />}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredMovies.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="gray">
            Фильмдер табылган жок
          </Typography>
        </Box>
      )}

      {movies.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" color="gray">
            {movies.length} фильм көрсөтүлүүдө
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Home;