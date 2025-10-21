export const calculateMovieStats = (movies) => {
  const totalCount = movies.length;
  const watchedMovies = movies.filter((movie) => movie.watched);
  const watchedCount = watchedMovies.length;
  const unwatchedCount = totalCount - watchedCount;

  // Calculate average rating for watched movies
  const ratedMovies = watchedMovies.filter(
    (movie) => movie.rating !== null && movie.rating !== undefined
  );
  const averageRating =
    ratedMovies.length > 0
      ? ratedMovies.reduce((sum, movie) => sum + movie.rating, 0) /
        ratedMovies.length
      : null;

  return {
    totalCount,
    watchedCount,
    unwatchedCount,
    averageRating:
      averageRating !== null ? Number(averageRating.toFixed(1)) : null,
  };
};
