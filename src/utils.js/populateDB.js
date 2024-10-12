const { Person, Movie } = require("../db-connection");

const people = [
  {
    "first-name": "pablo",
    "last-name": "lamberti",
    birthdate: "1987-04-03",
    "has-insurance": false,
  },
  {
    "first-name": "maria",
    "last-name": "garcia",
    birthdate: "1990-05-14",
    "has-insurance": true,
  },
  {
    "first-name": "juan",
    "last-name": "perez",
    birthdate: "1982-11-22",
    "has-insurance": false,
  },
  {
    "first-name": "ana",
    "last-name": "lopez",
    birthdate: "1995-07-30",
    "has-insurance": true,
  },
  {
    "first-name": "carlos",
    "last-name": "gomez",
    birthdate: "1983-02-18",
    "has-insurance": false,
  },
  {
    "first-name": "sofia",
    "last-name": "martinez",
    birthdate: "1998-09-25",
    "has-insurance": true,
  },
  {
    "first-name": "diego",
    "last-name": "sanchez",
    birthdate: "1979-12-10",
    "has-insurance": false,
  },
  {
    "first-name": "lucia",
    "last-name": "hernandez",
    birthdate: "1992-04-15",
    "has-insurance": true,
  },
  {
    "first-name": "martin",
    "last-name": "fernandez",
    birthdate: "1985-06-27",
    "has-insurance": false,
  },
  {
    "first-name": "valentina",
    "last-name": "jimenez",
    birthdate: "1993-08-04",
    "has-insurance": true,
  },
  {
    "first-name": "nicolas",
    "last-name": "rodriguez",
    birthdate: "1980-01-12",
    "has-insurance": false,
  },
  {
    "first-name": "camila",
    "last-name": "morales",
    birthdate: "1991-03-20",
    "has-insurance": true,
  },
  {
    "first-name": "marcos",
    "last-name": "suarez",
    birthdate: "1984-10-05",
    "has-insurance": false,
  },
  {
    "first-name": "elena",
    "last-name": "romero",
    birthdate: "1994-12-01",
    "has-insurance": true,
  },
  {
    "first-name": "pedro",
    "last-name": "torres",
    birthdate: "1986-08-15",
    "has-insurance": false,
  },
  {
    "first-name": "isabel",
    "last-name": "alonso",
    birthdate: "1997-09-12",
    "has-insurance": true,
  },
  {
    "first-name": "fernando",
    "last-name": "dominguez",
    birthdate: "1981-02-22",
    "has-insurance": false,
  },
  {
    "first-name": "julieta",
    "last-name": "vazquez",
    birthdate: "1996-07-29",
    "has-insurance": true,
  },
  {
    "first-name": "santiago",
    "last-name": "ramos",
    birthdate: "1988-05-06",
    "has-insurance": false,
  },
  {
    "first-name": "laura",
    "last-name": "ruiz",
    birthdate: "1999-11-15",
    "has-insurance": true,
  },
  {
    "first-name": "jorge",
    "last-name": "blanco",
    birthdate: "1987-03-28",
    "has-insurance": false,
  },
  {
    "first-name": "patricia",
    "last-name": "medina",
    birthdate: "1990-12-30",
    "has-insurance": true,
  },
  {
    "first-name": "raul",
    "last-name": "vega",
    birthdate: "1983-01-09",
    "has-insurance": false,
  },
  {
    "first-name": "adriana",
    "last-name": "delgado",
    birthdate: "1992-05-17",
    "has-insurance": true,
  },
  {
    "first-name": "victor",
    "last-name": "ortiz",
    birthdate: "1986-11-03",
    "has-insurance": false,
  },
  {
    "first-name": "paula",
    "last-name": "mendoza",
    birthdate: "1998-08-23",
    "has-insurance": true,
  },
  {
    "first-name": "sebastian",
    "last-name": "muñoz",
    birthdate: "1982-03-16",
    "has-insurance": false,
  },
  {
    "first-name": "daniela",
    "last-name": "soto",
    birthdate: "1995-04-21",
    "has-insurance": true,
  },
  {
    "first-name": "ricardo",
    "last-name": "navarro",
    birthdate: "1984-07-07",
    "has-insurance": false,
  },
  {
    "first-name": "gabriela",
    "last-name": "rivas",
    birthdate: "1991-10-09",
    "has-insurance": true,
  },
];
const movies = [
  {
    title: "The Lord of the Rings",
    genre: "fantasy",
  },
  {
    title: "Inception",
    genre: "sci-fi",
  },
  {
    title: "Titanic",
    genre: "romance",
  },
  {
    title: "The Godfather",
    genre: "crime",
  },
  {
    title: "The Dark Knight",
    genre: "action",
  },
  {
    title: "Pulp Fiction",
    genre: "crime",
  },
  {
    title: "Forrest Gump",
    genre: "drama",
  },
  {
    title: "The Matrix",
    genre: "sci-fi",
  },
  {
    title: "Star Wars",
    genre: "fantasy",
  },
  {
    title: "Fight Club",
    genre: "drama",
  },
  {
    title: "The Shawshank Redemption",
    genre: "drama",
  },
  {
    title: "The Lion King",
    genre: "animation",
  },
  {
    title: "Jurassic Park",
    genre: "sci-fi",
  },
  {
    title: "Back to the Future",
    genre: "sci-fi",
  },
  {
    title: "Gladiator",
    genre: "action",
  },
  {
    title: "Braveheart",
    genre: "historical",
  },
  {
    title: "Avatar",
    genre: "sci-fi",
  },
  {
    title: "Harry Potter",
    genre: "fantasy",
  },
  {
    title: "Schindler's List",
    genre: "historical",
  },
  {
    title: "The Avengers",
    genre: "action",
  },
  {
    title: "Toy Story",
    genre: "animation",
  },
  {
    title: "Finding Nemo",
    genre: "animation",
  },
  {
    title: "Saving Private Ryan",
    genre: "war",
  },
  {
    title: "The Silence of the Lambs",
    genre: "thriller",
  },
  {
    title: "The Green Mile",
    genre: "drama",
  },
  {
    title: "Interstellar",
    genre: "sci-fi",
  },
  {
    title: "The Terminator",
    genre: "sci-fi",
  },
  {
    title: "Rocky",
    genre: "sports",
  },
  {
    title: "Jaws",
    genre: "thriller",
  },
  {
    title: "Casablanca",
    genre: "romance",
  },
];

const populateDB = async () => {
  try {
    await Person.bulkCreate(people);
    await Movie.bulkCreate(movies);
    console.log("Mock data created");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = populateDB;
