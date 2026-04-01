import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar-old"; // обов'язково новий
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // 🔹 функція пошуку
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query."); // пустий інпут
      return;
    }

    try {
      setMovies([]);
      setError(false);
      setLoading(true);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 toast-повідомлення */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* 🔹 форма пошуку */}
      <SearchBar onSubmit={handleSearch} />

      {/* 🔹 індикатори */}
      {loading && <Loader />}
      {error && <ErrorMessage />}

      {/* 🔹 галерея фільмів */}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {/* 🔹 модалка */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
