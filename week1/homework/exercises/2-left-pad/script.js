/**
 ** Exercise 2: To the left, to the left...
 * 
 * Copy and paste your code from the previous exercise.
 * Replace the function `padLeft` to use
 * this new NPM package called `left-pad` instead then
 * Pad the numbers to 8 characters to confirm that it works correctly
 *
 */

let numbers = ["12", "846", "2", "1236"];

// YOUR CODE GOES HERE

// This code snippet follows the requirements of the exercise 2:
// const leftPad = require('left-pad');
// numbers.forEach(element => {
//   console.log(leftPad(element, 5, '_'));
// });
// But the left-pad module is deprecated.

// There is a built-in method in JS
// String.prototype.padStart()
numbers.forEach(element => {
  console.log(element.padStart(5, '_'));
});
