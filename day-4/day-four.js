// PROBLEM 1

/* 
"7777...8?!??!", exclaimed Bob, "I missed it again! Argh!" Every time there's an interesting number coming up, he notices and then promptly forgets. Who doesn't like catching those one-off interesting mileage numbers?

Let's make it so Bob never misses another interesting number. We've hacked into his car's computer, and we have a box hooked up that reads mileage numbers. We've got a box glued to his dash that lights up yellow or green depending on whether it receives a 1 or a 2 (respectively).

It's up to you, intrepid warrior, to glue the parts together. Write the function that parses the mileage number input, and returns a 2 if the number is "interesting" (see below), a 1 if an interesting number occurs within the next two miles, or a 0 if the number is not interesting.

Note: In Haskell, we use No, Almost and Yes instead of 0, 1 and 2.

"Interesting" Numbers
Interesting numbers are 3-or-more digit numbers that meet one or more of the following criteria:

Any digit followed by all zeros: 100, 90000
Every digit is the same number: 1111
The digits are sequential, incementing†: 1234
The digits are sequential, decrementing‡: 4321
The digits are a palindrome: 1221 or 73837
The digits match one of the values in the awesomePhrases array
† For incrementing sequences, 0 should come after 9, and not before 1, as in 7890.
‡ For decrementing sequences, 0 should come after 1, and not before 9, as in 3210.

So, you should expect these inputs and outputs:

// "boring" numbers
isInteresting(3, [1337, 256]);    // 0
isInteresting(3236, [1337, 256]); // 0

// progress as we near an "interesting" number
isInteresting(11207, []); // 0
isInteresting(11208, []); // 0
isInteresting(11209, []); // 1
isInteresting(11210, []); // 1
isInteresting(11211, []); // 2

// nearing a provided "awesome phrase"
isInteresting(1335, [1337, 256]); // 1
isInteresting(1336, [1337, 256]); // 1
isInteresting(1337, [1337, 256]); // 2

Error Checking
A number is only interesting if it is greater than 99!
Input will always be an integer greater than 0, and less than 1,000,000,000.
The awesomePhrases array will always be provided, and will always be an array, but may be empty. (Not everyone thinks numbers spell funny words...)
You should only ever output 0, 1, or 2.
*/

function isInteresting(number, awesomePhrases) {
  // Helper to check if number has 3 or more digits
  function hasThreeOrMoreDigits(num) {
    return num >= 100;
  }

  // Helper to check if number is in awesomePhrases
  function isAwesome(num) {
    return awesomePhrases.includes(num);
  }

  // Helper to check if all digits are the same (e.g. 1111)
  function isAllSame(num) {
    const s = String(num);
    return s.split('').every(ch => ch === s[0]);
  }

  // Helper to check if number ends with zeros (e.g. 1000)
  function isFollowedByZeros(num) {
    const s = String(num);
    return s[0] !== '0' && s.slice(1).split('').every(ch => ch === '0');
  }

  // Helper to check if digits are incrementing (e.g. 1234, 7890)
  function isIncrementing(num) {
    const s = String(num);
    const sequence = '1234567890';
    return sequence.includes(s);
  }

  // Helper to check if digits are decrementing (e.g. 4321, 3210)
  function isDecrementing(num) {
    const s = String(num);
    const sequence = '9876543210';
    return sequence.includes(s);
  }

  // Helper to check if number is a palindrome (e.g. 1221)
  function isPalindrome(num) {
    const s = String(num);
    return s === s.split('').reverse().join('');
  }

  // Function to check if number is "interesting"
  function checkInteresting(num) {
    if (!hasThreeOrMoreDigits(num)) return false;
    return (
      isFollowedByZeros(num) ||
      isAllSame(num) ||
      isIncrementing(num) ||
      isDecrementing(num) ||
      isPalindrome(num) ||
      isAwesome(num)
    );
  }

  // Check current number
  if (checkInteresting(number)) return 2;

  // Check within next 2 miles
  if (checkInteresting(number + 1) || checkInteresting(number + 2)) return 1;

  return 0;
}

/* EXPLANATION OF PROBLEM 1 
1. Only numbers with 3 or more digits can be interesting.

2. It checks:

    Trailing zeros (1000)

    All same digits (7777)

    Incrementing (1234, 7890)

    Decrementing (4321, 3210)

    Palindromes (1221)

    Matching “awesome phrases” array

3. Returns 2 if the current number is interesting.

4. Returns 1 if the interesting number is within the next two miles.

5. Otherwise returns 0.
*/

// *********************************************************************************************************************

// PROBLEM 2

/* 
Given an array X of positive integers, its elements are to be transformed by running the following operation on them as many times as required:

if X[i] > X[j] then X[i] = X[i] - X[j]

When no more transformations are possible, return its sum ("smallest possible sum").

For instance, the successive transformation of the elements of input X = [6, 9, 21] is detailed below:

X_1 = [6, 9, 12] # -> X_1[2] = X[2] - X[1] = 21 - 9
X_2 = [6, 9, 6]  # -> X_2[2] = X_1[2] - X_1[0] = 12 - 6
X_3 = [6, 3, 6]  # -> X_3[1] = X_2[1] - X_2[0] = 9 - 6
X_4 = [6, 3, 3]  # -> X_4[2] = X_3[2] - X_3[1] = 6 - 3
X_5 = [3, 3, 3]  # -> X_5[1] = X_4[0] - X_4[1] = 6 - 3

The returning output is the sum of the final transformation (here 9).
Example
solution([6, 9, 21]) #-> 9

Solution steps:
[6, 9, 12] #-> X[2] = 21 - 9
[6, 9, 6] #-> X[2] = 12 - 6
[6, 3, 6] #-> X[1] = 9 - 6
[6, 3, 3] #-> X[2] = 6 - 3
[3, 3, 3] #-> X[1] = 6 - 3

Additional notes:
There are performance tests consisted of very big numbers and arrays of size at least 30000. Please write an efficient algorithm to prevent timeout.
*/

function solution(numbers) {
  // Helper function to find GCD of two numbers
  function gcd(a, b) {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Find GCD of the entire array
  let currentGCD = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    currentGCD = gcd(currentGCD, numbers[i]);
    if (currentGCD === 1) break; // early exit (1 is smallest possible)
  }

  // Return smallest possible sum
  return currentGCD * numbers.length;
}

/* EXPLANATION OF PROBLEM 2 
1. GCD calculation is O(log(min(a,b))) per pair.

2. For an array of 30,000 elements, this is very fast compared to simulating the subtraction process.

3. We also break early if GCD becomes 1 since it can’t get any smaller.
*/

// *********************************************************************************************************************

// PROBLEM 3

/* 
This is the first part. You can solve the second part here when you are done with this. Multiply two numbers! Simple!

The arguments are passed as strings.
The numbers may be way very large
Answer should be returned as a string
The returned "number" should not start with zeros e.g. 0123 is invalid
Note: 100 randomly generated tests!

Usage of BigInt is disallowed and will be checked in the full test suite.
*/

function multiply(a, b) {
  // Handle multiplication by 0 quickly
  if (a === "0" || b === "0") return "0";

  const result = Array(a.length + b.length).fill(0);
  const aRev = a.split('').reverse();
  const bRev = b.split('').reverse();

  // Multiply each digit of a by each digit of b
  for (let i = 0; i < aRev.length; i++) {
    for (let j = 0; j < bRev.length; j++) {
      const mul = (aRev[i] - '0') * (bRev[j] - '0');
      result[i + j] += mul;

      // Handle carry over
      if (result[i + j] >= 10) {
        result[i + j + 1] += Math.floor(result[i + j] / 10);
        result[i + j] %= 10;
      }
    }
  }

  // Remove leading zeros if any
  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop();
  }

  // Convert result back to string
  return result.reverse().join('');
}

/* EXPLANATION OF PROBLEM 3 
1. No built-in BigInt or number conversion.

2. Uses string digits and an integer array to store intermediate sums.

3. Handles very large numbers (hundreds or thousands of digits).

4. Removes leading zeros at the end.

5. Efficient: O(n × m) where n and m are the lengths of the input strings.
*/

// *********************************************************************************************************************

// PROBLEM 4

/* 
As breadcrumb menùs are quite popular today, I won't digress much on explaining them, leaving the wiki link to do all the dirty work in my place.

What might not be so trivial is instead to get a decent breadcrumb from your current url. For this kata, your purpose is to create a function that takes a url, strips the first part (labelling it always HOME) and then builds it making each element but the last a <a> element linking to the relevant path; last has to be a <span> element getting the active class.

All elements need to be turned to uppercase and separated by a separator, given as the second parameter of the function; the last element can terminate in some common extension like .html, .htm, .php or .asp; if the name of the last element is index.something, you treat it as if it wasn't there, sending users automatically to the upper level folder.

A few examples can be more helpful than thousands of words of explanation, so here you have them:

generateBC("mysite.com/pictures/holidays.html", " : ") == '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
generateBC("www.microsoft.com/docs/index.htm", " * ") == '<a href="/">HOME</a> * <span class="active">DOCS</span>'

Seems easy enough?

Well, probably not so much, but we have one last extra rule: if one element (other than the root/home) is longer than 30 characters, you have to shorten it, acronymizing it (i.e.: taking just the initials of every word); url will be always given in the format this-is-an-element-of-the-url and you should ignore words in this array while acronymizing: ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]; a url composed of more words separated by - and equal or less than 30 characters long needs to be just uppercased with hyphens replaced by spaces.

Ignore anchors (www.url.com#lameAnchorExample) and parameters (www.url.com?codewars=rocks&pippi=rocksToo) when present.

Examples:
generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") == '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'

You will always be provided valid url to webpages in common formats, so you probably shouldn't bother validating them.
*/

function generateBC(url, separator) {
  const ignoreWords = ["the","of","in","from","by","with","and","or","for","to","at","a"];

  // Clean URL
  url = url.replace(/https?:\/\//, '')
           .replace(/\/$/, '')
           .replace(/#.*$/, '')
           .replace(/\?.*$/, '');

  const parts = url.split('/');
  parts.shift(); // remove domain

  // remove index page if present
  if (parts.length && /^index\.(html|htm|php|asp)$/i.test(parts[parts.length - 1])) {
    parts.pop();
  }

  function formatName(str) {
    str = str.split('.')[0]; // remove extension if any
    const cleanStr = str.replace(/[-_]/g, ' ');
    if (cleanStr.length > 30) {
      return cleanStr
        .split(' ')
        .filter(word => word && !ignoreWords.includes(word.toLowerCase()))
        .map(word => word[0])
        .join('')
        .toUpperCase();
    } else {
      return cleanStr.toUpperCase();
    }
  }

  // Build result
  const result = [];

  if (parts.length === 0) {
    return '<span class="active">HOME</span>';
  } else {
    result.push('<a href="/">HOME</a>');
  }

  // Start path with a single leading slash and append "part + /" each iteration
  let path = '/';

  parts.forEach((part, index) => {
    const isLast = index === parts.length - 1;
    const name = formatName(part);

    // append without adding an extra slash
    path += part + '/';

    if (isLast) {
      result.push(`<span class="active">${name}</span>`);
    } else {
      result.push(`<a href="${path}">${name}</a>`);
    }
  });

  return result.join(separator);
}

// *********************************************************************************************************************

// PROBLEM 5

/* 
Professor Chambouliard hast just discovered a new type of magnet material. He put particles of this material in a box made of small boxes arranged in K rows and N columns as a kind of 2D matrix K x N where K and N are postive integers. He thinks that his calculations show that the force exerted by the particle in the small box (k, n) is:

v
(
k
,
n
)
=
1
k
(
n
+
1
)
2
k
v(k,n)= 
k(n+1) 
2k
 
1
​
 
The total force exerted by the first row with k = 1 is:

u
(
1
,
N
)
=
∑
n
=
1
n
=
N
v
(
1
,
n
)
=
1
1
⋅
2
2
+
1
1
⋅
3
2
+
⋯
+
1
1
⋅
(
N
+
1
)
2
u(1,N)= 
n=1
∑
n=N
​
 v(1,n)= 
1⋅2 
2
 
1
​
 + 
1⋅3 
2
 
1
​
 +⋯+ 
1⋅(N+1) 
2
 
1
​
 
We can go on with k = 2 and then k = 3 etc ... and consider:

S
(
K
,
N
)
=
∑
k
=
1
k
=
K
u
(
k
,
N
)
=
∑
k
=
1
k
=
K
(
∑
n
=
1
n
=
N
v
(
k
,
n
)
)
→
(
d
o
u
b
l
e
(
m
a
x
k
,
m
a
x
n
)
)
S(K,N)= 
k=1
∑
k=K
​
 u(k,N)= 
k=1
∑
k=K
​
 ( 
n=1
∑
n=N
​
 v(k,n))→(double(max 
k
​
 ,max 
n
​
 ))
Task:
To help Professor Chambouliard can we calculate the function doubles that will take as parameter maxk and maxn such that doubles(maxk, maxn) = S(maxk, maxn)? Experiences seems to show that this could be something around 0.7 when maxk and maxn are big enough.

Examples:
doubles(1, 3)  => 0.4236111111111111
doubles(1, 10) => 0.5580321939764581
doubles(10, 100) => 0.6832948559787737

Notes:
In u(1, N) the dot is the multiplication operator.
Don't truncate or round: Have a look at the testing function in "Sample Tests".
link to symbol Sigma
*/

function doubles(maxk, maxn) {
    // your code
    let sum = 0;
    for(let k = 1; k <= maxk; k++) {
        for(let n = 1; n <= maxn; n++) {
            sum += 1 / (k * Math.pow(n + 1, 2 * k));
        }
    }
    return sum;
}

/* EXPLANATION OF PROBLEM 5 
1. Directly applies the given formula without approximation.

2. Uses Math.pow(n + 1, 2 * k) for the exponential term.

3. No rounding or truncation — preserves floating-point precision as required by the problem.
*/