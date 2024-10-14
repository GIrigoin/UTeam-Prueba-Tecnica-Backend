const {
  Person,
  Movie,
  Sequelize,
  MAX_MOVIES_PER_PERSON,
} = require("../db-connection");

const getMoviesOfPersonById = async (id) => {
  try {
    const person = await Person.findByPk(id, {
      attributes: [],
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["id", "title", "genre"],
      },
    });
    if (!person) throw Error("Person not Found");
    const result = person["favourite-movies"];

    return result.map((movie) => {
      return { title: movie.title, genre: movie.genre };
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const addMovieByPersonId = async (personId, title, genre) => {
  try {
    const person = await Person.findByPk(personId, {
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["title", "genre"],
      },
    });
    if (!person) throw Error("Person not found");
    if (person["favourite-movies"].length > MAX_MOVIES_PER_PERSON)
      throw Error(
        "The person has reached the maximum ammount of movies allowed. Delete some to be able to add new ones"
      );
    const isAlready = person["favourite-movies"].findIndex(
      (movie) => movie.title.toLowerCase() === title.toLowerCase()
    );
    if (isAlready >= 0) throw Error("Movie already in person's collection");

    const [newMovie, created] = await Movie.findOrCreate({
      where: {
        title: title.toLowerCase(),
      },
      defaults: { title: title.toLowerCase(), genre },
    });

    await newMovie.addPerson(person);

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteMovieFromCollection = async (personId, title) => {
  try {
    const person = await Person.findByPk(personId, {
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["title", "genre"],
      },
    });
    if (!person) throw Error("Person not found");

    const isInCollection = person["favourite-movies"].findIndex(
      (movie) => movie.title.toLowerCase() === title.toLowerCase()
    );
    if (isInCollection === -1)
      throw Error("Movie is not in person's collection");

    const toDeleteMovie = await Movie.findOne({
      attributes: ["id", "title"],
      where: { title: title.toLowerCase() },
    });
    await toDeleteMovie.removePerson(person);

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getMoviesOfPersonById,
  addMovieByPersonId,
  deleteMovieFromCollection,
};
