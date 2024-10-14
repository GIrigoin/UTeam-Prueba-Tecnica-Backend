const {
  getMoviesOfPersonById,
  addMovieByPersonId,
  deleteMovieFromCollection,
} = require("../controllers/movieControllers");

const getMoviesByPersonIdHandler = async (req, res) => {
  const { personId } = req.params;
  try {
    const result = await getMoviesOfPersonById(personId);
    res.json(result);
  } catch (error) {
    res.status(500).send("Error searching movies: " + error.message);
  }
};

const addMovieHandler = async (req, res) => {
  const { personId, title, genre } = req.body;
  try {
    if (!personId) throw Error("Person's id required");
    if (!title || !genre) throw Error("Movie title and genre required");
    const success = await addMovieByPersonId(personId, title, genre);
    if (success) return res.send("Movie successfully added");
  } catch (error) {
    res.status(500).send("Error adding movie: " + error.message);
  }
};

const deleteMovieHandler = async (req, res) => {
  const { personId, title } = req.body;
  try {
    if (!personId) throw Error("Person's id required");
    if (!title) throw Error("Movie's name required");

    const success = await deleteMovieFromCollection(personId, title);
    if (success) return res.send("Movie successfully deleted");
  } catch (error) {
    res.status(500).send("Error deleting movie: " + error.message);
  }
};

module.exports = {
  getMoviesByPersonIdHandler,
  addMovieHandler,
  deleteMovieHandler,
};
