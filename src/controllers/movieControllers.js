const { Person, Movie, Sequelize } = require("../db-connection");

const getMoviesOfPersonById = async (id) => {
  try {
    const person = await Person.findByPk(id, {
      attributes: [],
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["title", "genre"],
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
    const person = await Person.findByPk(personId);
    if (!person) throw Error("Person not found");

    const [newMovie, created] = await Movie.findOrCreate({
      where: {
        title: title.toLowerCase(),
      },
      defaults: { title, genre },
    });
    console.log(newMovie);

    await newMovie.addPerson(person);

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getMoviesOfPersonById, addMovieByPersonId };
