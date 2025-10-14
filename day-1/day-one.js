// PROBLEM 1

// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.

// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !

function pigIt(str) {
    // Code here
  return str
    .split(' ')
    .map(word => {
      // Check if the word is just punctuation
      return /^[A-Za-z]+$/.test(word)
        ? word.slice(1) + word[0] + 'ay'
        : word;
    })
    .join(' ');
}

/* EXPLANATION OF PROBLEM 1
1. split(' ') – breaks the sentence into words.

2. map() – iterates over each word.

3. ^[A-Za-z]+$ – regex checks if the word contains only letters (not punctuation).

4. If it's a word, move the first letter to the end and add ay.

5. If it’s punctuation, return it as is.

6. join(' ') – rebuilds the sentence.
*/

// *****************************************

// PROBLEM 2

/* Write a function that takes an integer as input, and returns the number of bits that are equal to one in the binary representation of that number. You can guarantee that input is non-negative.

Example: The binary representation of 1234 is 10011010010, so the function should return 5 in this case */

function countBits(n) {
  // Program Me
    //   Convert the number to binary using toString(2)
    const binary = n.toString(2);
    // Remove all zero using replace and count remaining length
    const onesCount = binary.replace(/0/g, '').length;

    return onesCount;
}

/* EXPLANATION OF PROBLEM 2

1. n.toString(2)

The toString(2) method converts the number to its binary string.

Example: 1234.toString(2) → "10011010010"

.replace(/0/g, '')

2. This removes all 0 characters from the binary string using a regular expression.

"10011010010".replace(/0/g, '') → "11111"

.length

3. Getting the length of the resulting string tells us how many 1s there were.

"11111".length → 5

4. return onesCount

Finally, return the total count. */

// ********************************************

// PROBLEM 3

/* You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:

[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"

Note: For 4 or more names, the number in "and 2 others" simply increases.
*/

function likes(names) {
  // TODO
  const count = names.length;

  if(count === 0) {
    return "no one likes this";
  } else if (count === 1) {
    return `${names[0]} likes this`;
  } else if (count === 2) {
    return `${names[0]} and ${names[1]} like this`;
  } else if (count === 3) {
    return `${names[0]}, ${names[1]} and ${names[2]} like this`;
  } else {
    return `${names[0]}, ${names[1]} and ${count - 2} others like this`;
  }
}

/* EXPLANATION OF PROBLEM 3
1. const count = names.length;

Count how many names are in the array.

2. Check each case with if–else:

0 names → “no one likes this”

1 name → “Name likes this”

2 names → “Name1 and Name2 like this”

3 names → “Name1, Name2 and Name3 like this”

4 or more → “Name1, Name2 and X others like this” (where X = total names - 2)

3. Use template literals (${...}) for cleaner and more readable string formatting.
*/

// ********************************************

// PROBLEM 4

/* Given a string of words, you need to find the highest scoring word.

Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.

For example, the score of abad is 8 (1 + 2 + 1 + 4).

You need to return the highest scoring word as a string.

If two words score the same, return the word that appears earliest in the original string.

All letters will be lowercase and all inputs will be valid. */

function high(x) {
    // Step 1: split string into words
    const words = x.split(' ');

    let highestScore = 0;
    let highestWord = '';

    for (const word of words) {
        // Step 2: calculate score of each word
        const score = word
        .split('')
        .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0);
        // 'a'.charCodeAt(0) = 97 → 97 - 96 = 1

        // Step 3: compare scores
        if (score > highestScore) {
        highestScore = score;
        highestWord = word;
        }
    }

    return highestWord;
}

/* EXPLANATION OF PROBLEM 4
1. x.split(' ')

Break the sentence into individual words.

2. char.charCodeAt(0) - 96

Converts each letter to its alphabet position.

'a' → 97 → 97 - 96 = 1

'z' → 122 → 122 - 96 = 26

3. reduce()

Sums up the scores of all letters in the word.

4. if (score > highestScore)

Keep track of the highest scoring word so far.

If two words have the same score, we do nothing on tie → the earlier word stays as the winner.

5. return highestWord

After the loop, return the word with the max score. 
*/

// ********************************************

// PROBLEM 5

/* 
Task
In this simple Kata your task is to create a function that turns a string into a Mexican Wave. You will be passed a string and you must return an array of strings where an uppercase letter is a person standing up.

Rules
1.  The input string will always consist of lowercase letters and spaces, but may be empty, in which case you must return an empty array. 2.  If the character in the string is whitespace then pass over it as if it was an empty seat

Examples:
"hello" => ["Hello", "hEllo", "heLlo", "helLo", "hellO"]
" s p a c e s " => [ " S p a c e s ", " s P a c e s ", " s p A c e s ", " s p a C e s ", " s p a c E s ", " s p a c e S "]
*/

function wave(str){
    // Code here
    const result = [];

    for (let i = 0; i < str.length; i++) {
        // Skip whitespace
        if (str[i] === ' ') continue;

        // Build the wave string
        const waveStr =
        str.slice(0, i) + // part before the current letter
        str[i].toUpperCase() + // the "standing up" letter
        str.slice(i + 1); // part after the current letter

        result.push(waveStr);
    }

    return result;
}

/* EXPLANATION OF PROBLEM 5 
1. Initialize result – this array will store all wave strings.

2. Loop through each character of str:

If it’s a space, continue (skip to the next iteration).

Otherwise:

str.slice(0, i) gets everything before the current character.

str[i].toUpperCase() capitalizes the current character.

str.slice(i + 1) gets everything after the current character.

3. Push the new wave string into the result array.

4. Return result at the end.
*/