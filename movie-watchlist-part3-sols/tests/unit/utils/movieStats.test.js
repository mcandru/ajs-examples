import { calculateMovieStats } from "../../../utils/movieStats.js";

describe("Movie Statistics Utilities", () => {
  describe("calculateMovieStats", () => {
    test("should calculate stats for empty array", () => {
      const stats = calculateMovieStats([]);
      expect(stats.averageRating).toBe(null);
      expect(stats.totalCount).toBe(0);
      expect(stats.unwatchedCount).toBe(0);
      expect(stats.watchedCount).toBe(0);
    });

    test("should calculate stats for movies with no watched movies", () => {
      const movies = [
        { name: "Iron Man", watched: false },
        { name: "All the President's Men", watched: false },
        { name: "Taxi Driver", watched: false },
      ];
      const stats = calculateMovieStats(movies);
      expect(stats.watchedCount).toBe(0);
      expect(stats.unwatchedCount).toBe(movies.length);
      expect(stats.totalCount).toBe(movies.length);
      expect(stats.averageRating).toBe(null);
    });

    test("should calculate average rating correctly", () => {
      const movies = [
        { name: "Iron Man", watched: true, rating: 8 },
        { name: "All the President's Men", watched: true, rating: 9 },
        { name: "Taxi Driver", watched: true, rating: 9.5 },
      ];
      const stats = calculateMovieStats(movies);
      expect(stats.watchedCount).toBe(3);
      expect(stats.unwatchedCount).toBe(0);
      expect(stats.totalCount).toBe(3);
      expect(stats.averageRating).toBe(8.8);
    });

    test("should ignore unwatched movies when calculating average rating", () => {
      const movies = [
        { name: "Iron Man", watched: true, rating: 8 },
        { name: "All the President's Men", watched: false, rating: 9 },
        { name: "Taxi Driver", watched: true, rating: 9.5 },
      ];
      const stats = calculateMovieStats(movies);
      expect(stats.watchedCount).toBe(2);
      expect(stats.unwatchedCount).toBe(1);
      expect(stats.totalCount).toBe(3);
      expect(stats.averageRating).toBe(8.8);
    });

    test("should ignore watched movies without ratings", () => {
      const movies = [
        { name: "Iron Man", watched: true, rating: null },
        { name: "All the President's Men", watched: true, rating: 9.0 },
        { name: "Taxi Driver", watched: true },
      ];
      const stats = calculateMovieStats(movies);
      expect(stats.watchedCount).toBe(3);
      expect(stats.unwatchedCount).toBe(0);
      expect(stats.totalCount).toBe(3);
      expect(stats.averageRating).toBe(9);
    });
  });
});
