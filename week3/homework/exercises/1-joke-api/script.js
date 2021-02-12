/**
 * 1. Chuck Norris programs do not accept input
 * 
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console. 
 * Make use of `async/await` and `try/catch`
 * 
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */
const express = require('express');
const fetch = require('node-fetch');

const app = express();

function printChuckNorrisJoke() {
    app.get('/', async (req, res) => {
      try {
        const response = await fetch('http://api.icndb.com/joasdkes/random121');
        const data = await response.json();
        console.log(data.value.joke);
      } catch (error) {
        console.log(error.message);
      }
    })
}

printChuckNorrisJoke();

app.listen(3000)