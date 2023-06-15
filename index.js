const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let persons = [
  {
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []
  }
]; // This is your in-memory database

app.set('db', persons);

const database = app.get('db');
 

app.use(express.json());
app.use(cors());


const personRoute = require("./routes/person_route");


personRoute(app, database);


app.use((req, res, next) => res.status(404).send("Page not found"));



app.use((err, req, res, next) => {
    res.status(500).send("Uknown server error");
  });


const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log("server runnig on port ${port}");
  });
}


module.exports = app;
