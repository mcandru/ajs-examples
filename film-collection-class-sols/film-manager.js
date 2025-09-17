class FilmDatabase {
  constructor(initialFilms = []) {
    // TODO: Initialize the films array
    this.films = initialFilms;
  }

  getAllFilms() {
    return this.films;
  }

  addFilm(title, year, genre, rating, watched) {
    const lastMaxId = Math.max(...this.films.map((obj) => obj.id));
    this.films.push({ id: lastMaxId + 1, title, year, genre, rating, watched });
  }

  searchFilms({ title, year, genre }) {
    return this.films.filter((film) => {
      if (title && !film.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      if (year && film.year !== year) {
        return false;
      }

      if (genre && film.genre.toLowerCase() !== genre.toLowerCase()) {
        return false;
      }

      return true;
    });
  }

  getHighlyRatedFilms(minRating = 9.0) {
    return this.films.filter((film) => film.rating >= minRating);
  }

  getStatistics() {
    const totalFilms = this.films.length;
    if (totalFilms === 0) {
      return {
        totalFilms: 0,
        averageRating: null,
        highestRated: null,
        lowestRated: null,
      };
    }

    const ratings = this.films.map((film) => film.rating);
    const averageRating = ratings.reduce((sum, r) => sum + r, 0) / totalFilms;
    const highestRated = this.films.reduce(
      (max, film) => (film.rating > max.rating ? film : max),
      this.films[0]
    );
    const lowestRated = this.films.reduce(
      (min, film) => (film.rating < min.rating ? film : min),
      this.films[0]
    );

    return {
      totalFilms,
      averageRating,
      highestRated,
      lowestRated,
    };
  }

  displayReport() {
    // Won't implement
  }
}

const filmDB = new FilmDatabase(initialFilms);
