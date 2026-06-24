import { configureStore, createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      const index = state.favorites.indexOf(movieId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movieId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    selectedSeats: [],
    showtime: null,
    movieId: null,
  },
  reducers: {
    setBooking: (state, action) => {
      const { movieId, showtime } = action.payload;
      state.movieId = movieId;
      state.showtime = showtime;
      state.selectedSeats = [];
    },
    toggleSeat: (state, action) => {
      const seat = action.payload;
      const index = state.selectedSeats.indexOf(seat);
      if (index > -1) {
        state.selectedSeats.splice(index, 1);
      } else {
        state.selectedSeats.push(seat);
      }
    },
    clearBooking: (state) => {
      state.selectedSeats = [];
      state.showtime = null;
      state.movieId = null;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const { setBooking, toggleSeat, clearBooking } = bookingSlice.actions;

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    booking: bookingSlice.reducer,
  },
});
