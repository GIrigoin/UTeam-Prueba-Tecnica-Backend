const { Person, Movie } = require("../db-connection");

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
        "first-name": firstName,
        "last-name": lastName,
      },
    });
    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = { getPersons, getPersonById, getPersonByName };
