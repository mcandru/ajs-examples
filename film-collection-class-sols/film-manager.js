class FilmDatabase {
  constructor(initialFilms = []) {
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
        highestRating: null,
        lowestRating: null,
      };
    }

    const ratings = this.films.map((film) => film.rating);
    const averageRating = ratings.reduce((sum, r) => sum + r, 0) / totalFilms;
    const highestRating = this.films.reduce(
      (maxRating, film) => (film.rating > maxRating ? film.rating : maxRating),
      this.films[0].rating
    );
    const lowestRating = this.films.reduce(
      (minRating, film) => (film.rating < minRating ? film.rating : minRating),
      this.films[0].rating
    );

    return {
      totalFilms,
      averageRating,
      highestRating,
      lowestRating,
    };
  }

  displayReport() {
    // Won't implement
  }
}

const filmDB = new FilmDatabase(initialFilms);
