const TMDB_API_KEY = "473325b3147e1041c91a26d3406d4017";

export const fetchTopMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
};

