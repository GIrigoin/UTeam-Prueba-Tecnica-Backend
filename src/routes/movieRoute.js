const { Router } = require("express");
const {
  getMoviesByPersonIdHandler,
  addMovieHandler,
} = require("../handlers/movieHandlers");
const movieRouter = Router();

//Importar handlers y agregarlos
movieRouter.get("/:personId", getMoviesByPersonIdHandler);
movieRouter.put("/", addMovieHandler);
// movieRouter.delete("/personId", )

module.exports = movieRouter;
