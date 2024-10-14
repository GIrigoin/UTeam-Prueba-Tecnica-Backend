const { Person, Movie } = require("../db-connection");
const { Op, Sequelize } = require("sequelize");

const getPersons = async () => {
  try {
    const persons = await Person.findAll({
      attributes: ["first-name", "last-name", "birthdate", "has-insurance"],
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["title", "genre"],
      },
    });
    return persons;
  } catch (error) {
    throw Error(error.message);
  }
};

const getPersonById = async (id) => {
  try {
    const result = await Person.findByPk(id, {
      attributes: ["first-name", "last-name", "birthdate", "has-insurance"],
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["title", "genre"],
      },
    });
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getPersonByName = async (firstName, lastName) => {
  try {
    const result = await Person.findOne({
      attributes: ["first-name", "last-name", "birthdate", "has-insurance"],
      include: {
        model: Movie,
        as: "favourite-movies",
        attributes: ["title", "genre"],
      },
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("first-name")),
            firstName.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("last-name")),
            lastName.toLowerCase()
          ),
        ],
      },
    });
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const createPerson = async (
  firstName,
  lastName,
  birthdate,
  hasInsurance,
  favouriteMovies = []
) => {
  const isAlphaRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+$/;
  const isDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  try {
    if (
      !firstName ||
      !lastName ||
      !birthdate ||
      typeof hasInsurance !== "boolean"
    )
      throw new Error("Missing some information");

    //validations
    if (!isAlphaRegex.test(firstName) || !isAlphaRegex.test(lastName))
      throw new Error(
        "Firstname and lastname only can contain alphabetic characters"
      );
    if (!isDateRegex.test(birthdate))
      throw new Error("Birthdate must be a valid date with YYYY-mm-dd format");
    if (typeof hasInsurance !== "boolean")
      throw new Error("hasInsurance must be true or false");
    //.....................................

    const [newPerson, created] = await Person.findOrCreate({
      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("first-name")),
            firstName.toLowerCase()
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("last-name")),
            lastName.toLowerCase()
          ),
        ],
      },
      defaults: {
        "first-name": firstName,
        "last-name": lastName,
        birthdate,
        "has-insurance": hasInsurance,
      },
    });
    if (!created) throw new Error("Person already in DB");

    if (favouriteMovies.length > 0) {
      favouriteMovies.forEach(async (movie) => {
        try {
          if (!movie.title || !movie.genre) return;
          const [newMovie, created] = await Movie.findOrCreate({
            where: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("title")),
              movie.title.toLowerCase()
            ),
            defaults: { title: movie.title, genre: movie.genre },
          });

          await newMovie.addPerson(newPerson);
        } catch (error) {
          throw new Error(error.message);
        }
      });
    }
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

const editPerson = async ({
  id,
  firstName,
  lastName,
  birthdate,
  hasInsurance,
  favouriteMovies,
}) => {
  const isAlphaRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+$/;
  const isDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  try {
    if (!id) throw Error("Person's id is required");
    const updatedPerson = await Person.findOne({ where: { id } });
    if (!updatedPerson) throw Error("Person not found");

    let attributes = {};

    if (firstName) {
      if (!isAlphaRegex.test(firstName))
        throw new Error("Firstname only can contain alphabetic characters");
      attributes = { ...attributes, "first-name": firstName };
    }

    if (lastName) {
      if (!isAlphaRegex.test(lastName))
        throw new Error("Lastname only can contain alphabetic characters");
      attributes = { ...attributes, "last-name": lastName };
    }

    if (birthdate) {
      if (!isDateRegex.test(birthdate))
        throw new Error(
          "Birthdate must be a valid date with YYYY-mm-dd format"
        );
      attributes = { ...attributes, birthdate };
    }

    if (typeof hasInsurance === "boolean")
      attributes = { ...attributes, "has-insurance": hasInsurance };
    await updatedPerson.update(
      { ...attributes },
      {
        where: {
          id,
        },
        fields: Object.keys(attributes),
      }
    );

    if (favouriteMovies.length > 0) {
      favouriteMovies.forEach(async (movie) => {
        try {
          if (!movie.title || !movie.genre) return;
          const [newMovie, created] = await Movie.findOrCreate({
            where: Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("title")),
              movie.title.toLowerCase()
            ),
            defaults: { title: movie.title, genre: movie.genre },
          });

          await newMovie.addPerson(updatedPerson);
        } catch (error) {
          throw new Error(error.message);
        }
      });
    }

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

const deletePerson = async (id) => {
  try {
    const deleted = await Person.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getPersons,
  getPersonById,
  getPersonByName,
  createPerson,
  editPerson,
  deletePerson,
};
