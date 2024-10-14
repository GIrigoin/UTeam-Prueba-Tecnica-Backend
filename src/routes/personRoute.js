const { Router } = require("express");
const personRouter = Router();
const {
  getPersonsHandler,
  getPersonByIdHandler,
  getPersonByNameHandler,
  createPersonHandler,
  updatePersonHandler,
  deletePersonHandler,
} = require("../handlers/personHandlers");

//Importar handlers y agregarlos
personRouter.get("/", getPersonsHandler);
personRouter.get("/byId/:id", getPersonByIdHandler);
personRouter.get("/byName", getPersonByNameHandler);
personRouter.post("/", createPersonHandler);
personRouter.put("/", updatePersonHandler);
personRouter.delete("/:id", deletePersonHandler);

module.exports = personRouter;
