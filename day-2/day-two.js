// PROBLEM 1
/* 
The rgb function is incomplete. Complete it so that passing in RGB decimal values will result in a hexadecimal representation being returned. Valid decimal values for RGB are 0 - 255. Any values that fall out of that range must be rounded to the closest valid value.

Note: Your answer should always be 6 characters long, the shorthand with 3 will not work here.

Examples (input --> output):
255, 255, 255 --> "FFFFFF"
255, 255, 300 --> "FFFFFF"
0, 0, 0       --> "000000"
148, 0, 211   --> "9400D3"
*/

function rgb(r, g, b) {
    function toHex(value) {
        if(value < 0) value = 0;
        if(value > 255) value = 255;

        let hex = value.toString(16).toUpperCase();
        return hex.length === 1 ? "0" + hex : hex;
    }
    return toHex(r) + toHex(g) + toHex(b);
}

/* EXPLANATION OF PROBLEM 1 
1. toHex ensures each value is between 0 and 255.

2. Converts each number to a hexadecimal string.

3. Pads single-digit hex values with a leading 0.

4. Joins the hex values of R, G, and B together.
*/

// ***********************************************************************************************************************

// PROBLEM 2

/* 
Write a function that when given a URL as a string, parses out just the domain name and returns it as a string. For example:
* url = "http://github.com/carbonfive/raygun" -> domain name = "github"
* url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
* url = "https://www.cnet.com"                -> domain name = cnet"
*/

function domainName(url){
  //your code here

    //  Remove protocol for http or https
    url = url.replace('http://', '').replace('https://', '');
    // Remove www.
    url = url.replace('www.', '');

    // Split by '.' and return the first part (domain)
    return url.split('.')[0];
}

/* EXPLANATION OF PROBLEM 2 
1. Removes protocol like http:// or https:// if it exists.

2. Removes the optional www. part.

3. Splits the remaining string by . and returns the first part as the domain name.
*/

// ***********************************************************************************************************************

// PROBLEM 3
/* 
Write a function that, given a string of text (possibly with punctuation and line-breaks), returns an array of the top-3 most occurring words, in descending order of the number of occurrences.

Assumptions:
A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
Matches should be case-insensitive, and the words in the result should be lowercased.
Ties may be broken arbitrarily.
If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
Examples:
"In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income."

--> ["a", "of", "on"]


"e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"

--> ["e", "ddd", "aa"]

Bonus points (not really, but just for fun):
1. Avoid creating an array whose memory footprint is roughly as big as the input text.
2. Avoid sorting the entire array of unique words.
*/

function topThreeWords(text) {
  // Match valid words: letters with optional apostrophes
  const words = text.toLowerCase().match(/[a-z]+'?[a-z']*/g);

  if (!words) return [];

  // Count occurrences
  const count = {};
  for (const word of words) {
    // Exclude strings that are just apostrophes
    if (word.replace(/'/g, '').length > 0) {
      count[word] = (count[word] || 0) + 1;
    }
  }

  // Sort by frequency in descending order
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1]) // sort by count
    .slice(0, 3) // get top 3
    .map(entry => entry[0]); // return only words
}

// EXPLANATION OF PROBLEM 3 
// 1. text.toLowerCase().match(/[a-z]+'?[a-z']*/g) extracts all valid words.

// It allows apostrophes inside or around letters.

// It ignores punctuation and special characters.

// 2. It counts how many times each word appears in an object.

// 3. Filters out invalid words like "'" or "''".

// 4. Sorts the words by their frequency.

// 5. Returns the top 3.

// ***********************************************************************************************************************

// PROBLEM 4

/* 
There is a secret string which is unknown to you. Given a collection of random triplets from the string, recover the original string.

A triplet here is defined as a sequence of three letters such that each letter occurs somewhere before the next in the given string. "whi" is a triplet for the string "whatisup".

As a simplification, you may assume that no letter occurs more than once in the secret string.

You can assume nothing about the triplets given to you other than that they are valid triplets and that they contain sufficient information to deduce the original string. In particular, this means that the secret string will never contain letters that do not occur in one of the triplets given to you.
*/

var recoverSecret = function(triplets) {
  let secret = [];

  // Extract all unique characters from triplets
  let uniqueChars = new Set(triplets.flat());
  secret = Array.from(uniqueChars);

  let changed = true;
  while (changed) {
    changed = false;
    for (let [a, b, c] of triplets) {
      // ensure a comes before b
      if (secret.indexOf(a) > secret.indexOf(b)) {
        secret.splice(secret.indexOf(a), 1);
        secret.splice(secret.indexOf(b), 0, a);
        changed = true;
      }
      // ensure b comes before c
      if (secret.indexOf(b) > secret.indexOf(c)) {
        secret.splice(secret.indexOf(b), 1);
        secret.splice(secret.indexOf(c), 0, b);
        changed = true;
      }
    }
  }

  return secret.join('');
};

/* EXPLANATION OF PROBLEM 4 
1. Collect all unique characters in the triplets.

2. Start with them in any order.

3. Repeatedly adjust their positions to satisfy all ordering rules:

    If a should come before b but isn’t, move it.

    Same for b and c.

4. Repeat until no more changes are needed.

5. Join the characters to form the recovered secret string.
*/

// ***********************************************************************************************************************

// PROBLEM 5

/*
The Fibonacci numbers are the numbers in the following integer sequence (Fn): 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

such that:

F
(
0
)
=
0
F
(
1
)
=
1
F
(
n
)
=
F
(
n
−
1
)
+
F
(
n
−
2
)
F(0)=0
F(1)=1
F(n)=F(n−1)+F(n−2)
Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying:

F
(
n
)
∗
F
(
n
+
1
)
=
p
r
o
d
F(n)∗F(n+1)=prod

Your function takes an integer (prod) and returns an array/tuple (check the function signature/sample tests for the return type in your language):

if F(n) * F(n+1) = prod:
    (F(n), F(n+1), true)
If you do not find two consecutive F(n) verifying F(n) * F(n+1) = prod:
    (F(n), F(n+1), false)
where F(n) is the smallest one such as F(n) * F(n+1) > prod.

Examples:
714 ---> (21, 34, true)
--> since F(8) = 21, F(9) = 34 and 714 = 21 * 34

800 --->  (34, 55, false)
--> since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
 */

function productFib(prod) {
  let a = 0;
  let b = 1; 

  while (a * b < prod) {
    let next = a + b;
    a = b;
    b = next;
  }

  return [a, b, a * b === prod];
}

/* EXPLANATION OF PROBLEM 5 
1. Start with a = 0 and b = 1 (the first two Fibonacci numbers).

2. While a * b is less than the target product prod:

Compute the next Fibonacci number.

Move the window forward (a becomes b, b becomes a+b).

3. When the loop ends:

Either a * b equals prod (found exact match)

Or a * b exceeded prod (no match, but a and b are the first pair that exceeded it).
*/