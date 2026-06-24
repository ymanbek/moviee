import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { setBooking } from "../store";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showtimes = ["12:00", "15:00", "18:00", "21:00"];

  const localMovies = useMemo(
    () => [
      {
        id: "1",
        title: "Interstellar",
        year: "2014",
        genre: "Sci-Fi, Adventure",
        runtime: "169 min",
        plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        imdbRating: "8.6",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      },
      {
        id: "2",
        title: "The Dark Knight",
        year: "2008",
        genre: "Action, Crime, Drama",
        runtime: "152 min",
        plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        imdbRating: "9.0",
        director: "Christopher Nolan",
        actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
      },
      {
        id: "3",
        title: "Inception",
        year: "2010",
        genre: "Sci-Fi, Action, Thriller",
        runtime: "148 min",
        plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        imdbRating: "8.8",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      },
      {
        id: "4",
        title: "The Avengers",
        year: "2012",
        genre: "Action, Sci-Fi, Adventure",
        runtime: "143 min",
        plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        imdbRating: "8.0",
        director: "Joss Whedon",
        actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
      },
      {
        id: "5",
        title: "Dune: Part Two",
        year: "2024",
        genre: "Sci-Fi, Adventure",
        runtime: "166 min",
        plot: "Paul Atreides continues his journey on the desert planet Arrakis as he seeks revenge against those who destroyed his family.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNmI4YzE1MzQtMmM2OS00ZTU5LWI0NTMtODliNzI3M2JmZGIyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
        imdbRating: "8.5",
        director: "Denis Villeneuve",
        actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
      },
      {
        id: "6",
        title: "Oppenheimer",
        year: "2023",
        genre: "Biography, Drama, History",
        runtime: "180 min",
        plot: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
        imdbRating: "8.4",
        director: "Christopher Nolan",
        actors: "Cillian Murphy, Emily Blunt, Robert Downey Jr.",
      },
      {
        id: "7",
        title: "Barbie",
        year: "2023",
        genre: "Comedy, Adventure, Fantasy",
        runtime: "114 min",
        plot: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
        imdbRating: "7.0",
        director: "Greta Gerwig",
        actors: "Margot Robbie, Ryan Gosling, America Ferrera",
      },
      {
        id: "8",
        title: "The Batman",
        year: "2022",
        genre: "Action, Crime, Drama",
        runtime: "176 min",
        plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        poster:
          "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg",
        imdbRating: "7.8",
        director: "Matt Reeves",
        actors: "Robert Pattinson, Zoë Kravitz, Paul Dano",
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    const found = localMovies.find((m) => m.id === id);
    if (found) {
      setMovie(found);
      setError(null);
    } else {
      setError("Фильм табылган жок");
    }
    setLoading(false);
  }, [id, localMovies]);

  const handleSelectShowtime = (time) => {
    dispatch(setBooking({ movieId: id, showtime: time }));
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || "Фильм табылган жок"}
        </Alert>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Башкы бетке
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ bgcolor: "#1a1a1a", overflow: "hidden" }}>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                display: "block",
              }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x400?text=No+Image";
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" color="white" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" color="gray" gutterBottom>
            {movie.year}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {movie.genre.split(",").map((g) => (
              <Chip
                key={g.trim()}
                label={g.trim()}
                color="primary"
                size="small"
              />
            ))}
            <Chip
              label={movie.runtime}
              variant="outlined"
              size="small"
              sx={{ color: "gray" }}
            />
            {movie.imdbRating && (
              <Chip
                label={`⭐ ${movie.imdbRating}`}
                size="small"
                sx={{ bgcolor: "#2a2a2a", color: "gold" }}
              />
            )}
          </Box>

          <Typography variant="body1" color="white" paragraph sx={{ mt: 2 }}>
            {movie.plot}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {movie.director && (
              <Typography color="gray" variant="body2">
                <strong>Режиссёр:</strong> {movie.director}
              </Typography>
            )}
            {movie.actors && (
              <Typography color="gray" variant="body2">
                <strong>Актёрлор:</strong> {movie.actors}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3, borderColor: "gray" }} />

          <Typography variant="h5" color="white" gutterBottom>
            Сеанстар
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {showtimes.map((time) => (
              <Button
                key={time}
                variant="contained"
                color="secondary"
                onClick={() => handleSelectShowtime(time)}
                sx={{
                  minWidth: 80,
                  bgcolor: "#2a2a2a",
                  "&:hover": {
                    bgcolor: "#e50914",
                  },
                }}
              >
                {time}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MovieDetails;
