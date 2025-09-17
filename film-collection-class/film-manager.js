class FilmDatabase {
  constructor(initialFilms = []) {
    // TODO: Initialise a films array instance variable
  }

  getAllFilms() {
    // TODO: Return all movies in the database
  }

  addFilm(title, year, genre, rating, watched) {
    // TODO: Create a new film object with auto-incrementing ID
    // TODO:  Return the new film object
  }

  searchFilms({ title, year, genre }) {
    // TODO: Use the filter() method to check each movie against the filters: title, year, genre
    // TODO: Return an array of filtered film objects
  }

  getHighlyRatedFilms(minRating = 9.0) {
    // TODO: Use filter() to return films with rating >= minRating
    // TODO: Return an array of highly rated film objects
  }

  getStatistics() {
    // TODO: Calculate statistics
    // TODO: Return an object with totalFilms, averageRating, highestRated, lowestRated
  }

  displayReport() {
    // TODO: Pretty print a report that displays statistics and a list of all films
  }
}

const filmDB = new FilmDatabase(initialFilms);
