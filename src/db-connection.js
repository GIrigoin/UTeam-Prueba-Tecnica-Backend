const { Sequelize } = require("sequelize");

const PersonModel = require("./models/Person");
const MovieModel = require("./models/Movie");

const sequelize = new Sequelize("sqlite::memory:", { logging: false });

PersonModel(sequelize);
MovieModel(sequelize);

const { Person, Movie } = sequelize.models;

Person.belongsToMany(Movie, {
  as: "favourite-movies",
  through: "people_movies",
});
Movie.belongsToMany(Person, { through: "people_movies" });

const MAX_MOVIES_PER_PERSON = 2;

module.exports = { conn: sequelize, Person, Movie, MAX_MOVIES_PER_PERSON };
