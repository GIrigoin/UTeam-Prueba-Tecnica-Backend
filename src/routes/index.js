const express = require("express");
const personRouter = require("./personRoute");
const movieRouter = require("./movieRoute");
const router = express.Router();

router.use("/person", personRouter);
router.use("/movie", movieRouter);

module.exports = router;
