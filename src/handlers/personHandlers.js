const {
  getPersons,
  getPersonById,
  getPersonByName,
  createPerson,
} = require("../controllers/personControllers");

const getPersonsHandler = async (req, res) => {
  try {
    const persons = await getPersons();
    return res.json(persons);
  } catch (error) {
    res.status(500).send("Error searching persons: " + error.message);
  }
};

const getPersonByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) throw Error("Invalid Id");
    const person = await getPersonById(id);
    if (person) return res.json(person);
    return res.status(404).send("Person not found");
  } catch (error) {
    res.status(500).send("Error searching person: " + error.message);
  }
};

const getPersonByNameHandler = async (req, res) => {
  const { firstName, lastName } = req.query;
  try {
    if (!firstName && !lastName)
      throw Error("First name and last name required");
    const person = await getPersonByName(firstName, lastName);
    if (person) return res.json(person);
    return res.status(404).send("Person not found");
  } catch (error) {
    res.status(500).send("Error searching person: " + error.message);
  }
};

const createPersonHandler = async (req, res) => {
  const { firstname, lastName, birthdate, hasInsurance, favouriteMovies } =
    req.body;

  const success = await createPerson(
    firstname,
    lastName,
    birthdate,
    hasInsurance,
    favouriteMovies
  );
  if (success) return res.send("Person correctly created");

  try {
  } catch (error) {
    res.status(500).send("Error creating person: " + error.message);
  }
};

module.exports = {
  getPersonsHandler,
  getPersonByIdHandler,
  getPersonByNameHandler,
  createPersonHandler,
};
