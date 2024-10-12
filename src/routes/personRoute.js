const { Router } = require("express");
const personRouter = Router();
const {
  getPersonsHandler,
  getPersonByIdHandler,
  getPersonByNameHandler,
} = require("../handlers/personHandlers");

//Importar handlers y agregarlos
personRouter.get("/", getPersonsHandler);
personRouter.get("/byId/:id", getPersonByIdHandler);
personRouter.get("/byName", getPersonByNameHandler);
// personRouter.post("/",)
// personRouter.put("/",)
// personRouter.delete("/:id",)

module.exports = personRouter;
