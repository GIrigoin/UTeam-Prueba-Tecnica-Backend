const {
  getPersons,
  getPersonById,
  getPersonByName,
  createPerson,
  editPerson,
  deletePerson,
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
  const { firstName, lastName, birthdate, hasInsurance, favouriteMovies } =
    req.body;

  try {
    const success = await createPerson(
      firstName,
      lastName,
      birthdate,
      hasInsurance,
      favouriteMovies
    );
    if (success) return res.send("Person correctly created");
  } catch (error) {
    res.status(500).send("Error creating person: " + error.message);
  }
};

const updatePersonHandler = async (req, res) => {
  const updateData = req.body;
  try {
    const success = await editPerson({ ...updateData });
    if (success) return res.send("Person's info successfully updated");
  } catch (error) {
    res.status(500).send("Error creating person: " + error.message);
  }
};

const deletePersonHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deletePerson(id);
    if (deleted === 0) return res.status(404).send("Target id not found");
    return res.send("Person succesfully deleted");
  } catch (error) {
    res.status(500).send("Error creating person: " + error.message);
  }
};

module.exports = {
  getPersonsHandler,
  getPersonByIdHandler,
  getPersonByNameHandler,
  createPersonHandler,
  updatePersonHandler,
  deletePersonHandler,
};
