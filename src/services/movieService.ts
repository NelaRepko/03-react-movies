import axios from "axios";
import type { Movie } from "../types/movie";


console.log("TMDB Token:", import.meta.env.VITE_TMDB_TOKEN);

interface FetchMoviesResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!TMDB_TOKEN) {
  throw new Error("TMDB token is not defined in environment variables");
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<FetchMoviesResponse>(BASE_URL, {
      params: {
        query,
        language: "en-US",      // обов’язково
        include_adult: false,   // обов’язково
        page: 1,                // перша сторінка
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("fetchMovies error:", error);
    throw error; // кидаємо помилку, щоб App міг її обробити
  }
};
