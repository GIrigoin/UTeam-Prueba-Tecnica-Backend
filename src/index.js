const PORT = 3001;
const server = require("./app");
const { conn } = require("./db-connection");
const populateDB = require("./utils.js/populateDB");

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, async () => {
    await populateDB();
    console.log("Server raised in port: " + PORT);
  });
});
