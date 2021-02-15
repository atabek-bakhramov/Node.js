
/**
 * 3: Party time
 * 
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

// One way with setting up the server:
// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();

// const makeReservation = () => {
//   app.post('/', async (req, res) => {
//     try {
//       const reservationData = {
//         name: 'Atabek',
//         numberOfPeople: 5
//       };
//       const reservationDataStringified = JSON.stringify(reservationData);
//       const response = await fetch('https://reservation100-sandbox.mxapps.io/api/reservations',
//         {
//           method: 'POST',
//           body:    reservationDataStringified,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   })
// };

// makeReservation();

// app.listen(3000);


// another way:
const fetch = require('node-fetch');

const makeReservation = async () => {
  try {
    const response = await fetch('https://reservation100-sandbox.mxapps.io/api/reservations',
      {
        method: 'POST',
        body:    JSON.stringify({
          name: 'Atabek',
          numberOfPeople: 5
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

makeReservation();
