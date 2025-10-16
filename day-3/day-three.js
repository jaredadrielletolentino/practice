// PROBLEM 1
/* 
A format for expressing an ordered list of integers is to use a comma separated list of either

individual integers
or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example "12,13,15-17"
Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

Example:
solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
*/

function solution(list) {
  let result = [];
  let start = list[0]; // beginning of a potential range
  let prev = list[0];

  for (let i = 1; i <= list.length; i++) {
    // check if the current number continues the sequence
    if (list[i] === prev + 1) {
      prev = list[i];
    } else {
      // when the sequence ends, decide how to format it
      if (prev - start >= 2) {
        result.push(`${start}-${prev}`); // 3 or more numbers in a row
      } else if (prev - start === 1) {
        result.push(`${start}`, `${prev}`); // 2 numbers, list separately
      } else {
        result.push(`${start}`); // single number
      }
      start = list[i];
      prev = list[i];
    }
  }

  return result.join(',');
}

//  Test
console.log(solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));
// Output: "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"

/* EXPLANATION OF PROBLEM 1 
1. Loop through the list while checking if the next number continues the sequence (list[i] === prev + 1).

2. When the sequence breaks:

If the sequence length ≥ 3 → push as start-end.

If length = 2 → push both individually.

If length = 1 → push just start.

3. Join all results with commas.
*/

// *********************************************************************************************************************

// PROBLEM 2

/* 
Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.

The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.

For Sudoku rules, see the Wikipedia article
var puzzle = [
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9]];

sudoku(puzzle);
/* Should return
[[5,3,4,6,7,8,9,1,2],
[6,7,2,1,9,5,3,4,8],
[1,9,8,3,4,2,5,6,7],
[8,5,9,7,6,1,4,2,3],
[4,2,6,8,5,3,7,9,1],
[7,1,3,9,2,4,8,5,6],
[9,6,1,5,3,7,2,8,4],
[2,8,7,4,1,9,6,3,5],
[3,4,5,2,8,6,1,7,9]] 
*/

function sudoku(puzzle) {

  // Check if number is valid in given row, col
  function isValid(row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (puzzle[row][x] === num) return false;
    }

    // Check column
    for (let y = 0; y < 9; y++) {
      if (puzzle[y][col] === num) return false;
    }

    // Check 3x3 box
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (puzzle[startRow + r][startCol + c] === num) return false;
      }
    }

    return true;
  }

  // Recursive backtracking solver
  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === 0) { // empty cell
          for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
              puzzle[row][col] = num;

              if (solve()) return true; // continue if solution works
              puzzle[row][col] = 0;     // backtrack
            }
          }
          return false; // no valid number found, backtrack
        }
      }
    }
    return true; // solved
  }

  solve();
  return puzzle;
}

// Test Case
let puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

console.log(sudoku(puzzle));

/* EXPLANATION OF PROBLEM 2 
1. Find empty cell (0)

2. Try numbers 1–9:

Check if it’s valid in row, column, and 3×3 subgrid.

If valid → place the number → recursively solve the next empty cell.

If no number works → backtrack.

3. If all cells are filled → puzzle is solved.
*/

// *********************************************************************************************************************

// PROBLEM 3

/* 
Write a function called sumIntervals/sum_intervals that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.

Intervals
Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.

Overlapping Intervals
List containing overlapping intervals:
[
   [1, 4],
   [7, 10],
   [3, 5]
]

The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5], which has a length of 4.
Examples:
sumIntervals( [
   [1, 2],
   [6, 10],
   [11, 15]
] ) => 9

sumIntervals( [
   [1, 4],
   [7, 10],
   [3, 5]
] ) => 7

sumIntervals( [
   [1, 5],
   [10, 20],
   [1, 6],
   [16, 19],
   [5, 11]
] ) => 19

sumIntervals( [
   [0, 20],
   [-100000000, 10],
   [30, 40]
] ) => 100000030

Tests with large intervals
Your algorithm should be able to handle large intervals. All tested intervals are subsets of the range [-1000000000, 1000000000].
*/

function sumIntervals(intervals) {
    if(intervals.length === 0) return 0;

    // Sort intervals by start value
    intervals.sort((a, b) => a[0] - b[0]);

    let total = 0;
    let [currentStart, currentEnd] = intervals[0];

    for(let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];

        if(start <= currentEnd) {
            // Overlaps - extend the current intervals if needed
            currentEnd = Math.max(currentEnd, end);
        } else {
            // No overlap -add previous interval length
            total += currentEnd - currentStart;
            // Move to next interval
            currentStart = start;
            currentEnd = end;
        }
    }

    // Add the last interval length
    total += currentEnd - currentStart;

    return total;
}

// Test cases
console.log(sumIntervals([[1, 2], [6, 10], [11, 15]])); 
// ➝ 9

console.log(sumIntervals([[1, 4], [7, 10], [3, 5]])); 
// ➝ 7

console.log(sumIntervals([[1, 5], [10, 20], [1, 6], [16, 19], [5, 11]])); 
// ➝ 19

console.log(sumIntervals([[0, 20], [-100000000, 10], [30, 40]]));
// ➝ 100000030

/* EXPLANATION OF PROBLEM 3 
1. Sort intervals so overlapping intervals are adjacent.

2. Keep track of a current merged interval (currentStart, currentEnd).

3. For each interval:

If it overlaps with the current one, merge them by extending the end.

If it doesn’t overlap, add the length of the previous merged interval to total and move on.

4. Add the length of the last merged interval.
*/

// *********************************************************************************************************************

// PROBLEM 4

/* 
Your task in this Kata is to emulate text justification in monospace font. You will be given a single-lined text and the expected justification width. The longest word will never be greater than this width.

Here are the rules:

Use spaces to fill in the gaps between words.
Each line should contain as many words as possible.
Use '\n' to separate lines.
Last line should not terminate in '\n'
'\n' is not included in the length of a line.
Gaps between words can't differ by more than one space.
Lines should end with a word not a space.
Large gaps go first, then smaller ones ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 1 spaces)).
Last line should not be justified, use only one space between words.
Lines with one word do not need gaps ('somelongword\n').
Example with width=30:
Lorem  ipsum  dolor  sit amet,
consectetur  adipiscing  elit.
Vestibulum    sagittis   dolor
mauris,  at  elementum  ligula
tempor  eget.  In quis rhoncus
nunc,  at  aliquet orci. Fusce
at   dolor   sit   amet  felis
suscipit   tristique.   Nam  a
imperdiet   tellus.  Nulla  eu
vestibulum    urna.    Vivamus
tincidunt  suscipit  enim, nec
ultrices   nisi  volutpat  ac.
Maecenas   sit   amet  lacinia
arcu,  non dictum justo. Donec
sed  quam  vel  risus faucibus
euismod.  Suspendisse  rhoncus
rhoncus  felis  at  fermentum.
Donec lorem magna, ultricies a
nunc    sit    amet,   blandit
fringilla  nunc. In vestibulum
velit    ac    felis   rhoncus
pellentesque. Mauris at tellus
enim.  Aliquam eleifend tempus
dapibus. Pellentesque commodo,
nisi    sit   amet   hendrerit
fringilla,   ante  odio  porta
lacus,   ut   elementum  justo
nulla et dolor.

Also you can always take a look at how justification works in your text editor or directly in HTML (css: text-align: justify).
*/

function justify(text, width) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = [];
  let currentLength = 0;

  // Step 1: Split text into lines
  for (let word of words) {
    if (currentLength + currentLine.length + word.length > width) {
      lines.push(currentLine);
      currentLine = [];
      currentLength = 0;
    }
    currentLine.push(word);
    currentLength += word.length;
  }
  if (currentLine.length) lines.push(currentLine);

  // Step 2: Justify each line (except the last)
  return lines.map((line, index) => {
    if (index === lines.length - 1 || line.length === 1) {
      // Last line or single word → left align
      return line.join(' ');
    }

    const totalWordsLength = line.reduce((acc, w) => acc + w.length, 0);
    let totalSpaces = width - totalWordsLength;
    const gaps = line.length - 1;
    const baseSpace = Math.floor(totalSpaces / gaps);
    let extraSpaces = totalSpaces % gaps;

    // Step 3: Distribute spaces (larger gaps first)
    return line
      .map((word, i) => {
        if (i === gaps) return word;
        const spaces = baseSpace + (extraSpaces-- > 0 ? 1 : 0);
        return word + ' '.repeat(spaces);
      })
      .join('');
  }).join('\n');
}

// Example test
const example = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis dolor mauris, at elementum ligula tempor eget. In quis rhoncus nunc, at aliquet orci. Fusce at dolor sit amet felis suscipit tristique. Nam a imperdiet tellus. Nulla eu vestibulum urna. Vivamus tincidunt suscipit enim, nec ultrices nisi volutpat ac. Maecenas sit amet lacinia arcu, non dictum justo. Donec sed quam vel risus faucibus euismod. Suspendisse rhoncus rhoncus felis at fermentum. Donec lorem magna, ultricies a nunc sit amet, blandit fringilla nunc. In vestibulum velit ac felis rhoncus pellentesque. Mauris at tellus enim. Aliquam eleifend tempus dapibus. Pellentesque commodo, nisi sit amet hendrerit fringilla, ante odio porta lacus, ut elementum justo nulla et dolor.";
console.log(justify(example, 30));

/* EXPLANATION OF PROBLEM 4 
1. Split into words using regex to handle multiple spaces.

2. Build lines that fit within the given width.

3. For each line (except the last):

Compute remaining spaces.

Evenly distribute them between gaps.

If not divisible evenly, assign extra spaces to the left gaps first.

4. Join lines with \n.

Handles:

Single-word lines (no extra spacing).

Large and small space distribution correctly.

Last line is not justified.

Very long texts efficiently.
*/

// *********************************************************************************************************************

// PROBLEM 5

/* 
The year is 1214. One night, Pope Innocent III awakens to find the the archangel Gabriel floating before him. Gabriel thunders to the pope:

Gather all of the learned men in Pisa, especially Leonardo Fibonacci. In order for the crusades in the holy lands to be successful, these men must calculate the millionth number in Fibonacci's recurrence. Fail to do this, and your armies will never reclaim the holy land. It is His will.

The angel then vanishes in an explosion of white light.

Pope Innocent III sits in his bed in awe. How much is a million? he thinks to himself. He never was very good at math.

He tries writing the number down, but because everyone in Europe is still using Roman numerals at this moment in history, he cannot represent this number. If he only knew about the invention of zero, it might make this sort of thing easier.

He decides to go back to bed. He consoles himself, The Lord would never challenge me thus; this must have been some deceit by the devil. A pretty horrendous nightmare, to be sure.

Pope Innocent III's armies would go on to conquer Constantinople (now Istanbul), but they would never reclaim the holy land as he desired.

In this kata you will have to calculate fib(n) where:
fib(0) := 0
fib(1) := 1
fib(n + 2) := fib(n + 1) + fib(n)

Write an algorithm that can handle n up to 2000000.

Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.

HINT I: Can you rearrange the equation fib(n + 2) = fib(n + 1) + fib(n) to find fib(n) if you already know fib(n + 1) and fib(n + 2)? Use this to reason what value fib has to have for negative values.
*/

function fib(n) {
  // Handle negative numbers using: F(-n) = (-1)^(n+1) * F(n)
  if (n < 0) {
    const f = fib(-n);
    return (n % 2 === 0) ? -f : f;
  }

  // Fast doubling method
  function fibFast(n) {
    if (n === 0) return [0n, 1n];
    const [a, b] = fibFast(Math.floor(n / 2));
    const c = a * (2n * b - a);
    const d = a * a + b * b;
    if (n % 2 === 0) {
      return [c, d];
    } else {
      return [d, c + d];
    }
  }

  return fibFast(n)[0];
}

// Test Cases
console.log(fib(0).toString());         // "0"
console.log(fib(1).toString());         // "1"
console.log(fib(10).toString());        // "55"
console.log(fib(-10).toString());       // "-55"
console.log(fib(100).toString());       // "354224848179261915075"

/* EXPLANATION OF PROBLEM 5 
Fast Doubling Formula:

F(2k) = F(k) * [2*F(k+1) − F(k)]

F(2k+1) = F(k+1)^2 + F(k)^2

This avoids repeated work and computes in logarithmic time.
For negative numbers:

F(-n) = (-1)^(n+1) * F(n)
→ negative Fibonacci numbers alternate in sign.

This allows computing fib(2_000_000) very quickly and exactly.
    Time complexity: O(log n)
    Space complexity: O(log n) due to recursion depth.
*/