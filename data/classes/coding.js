// Coding: Semester 1 final (Fri Dec 18, period 7).
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Built from the class notebook: intro to AI, Karel, Python / JS basics, canvas graphics,
// conditionals, loops, functions and strings.
// Code answers were checked by running the code in Python.
(function () {
  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Intro to AI (Unit 1)', short: 'AI',
      sections: [
        {
          id: 'u1-basics', title: 'AI basics',
          list: [
            'Safe and responsible AI use: presenting AI work as your own is academic dishonesty.',
            'Human vs. artificial intelligence. The Turing Test checks whether a machine can act so much like a human that you cannot tell the difference.',
            'Generative AI creates new content (text, images). Predictive AI predicts outcomes from data.',
            'Large Language Models (LLMs) work with text. Multimodal models work with more than one kind of input, like text and images.',
            'Prompt engineering: writing clear, detailed prompts to get better answers.',
            'AI ethics and diversity in the industry matter because AI reflects the data and people behind it.'
          ]
        },
        {
          id: 'u1-keys', title: 'API key security and the SMART app project',
          list: [
            'Never put an API key in code that users can see. Route requests through a backend or serverless proxy.',
            'Snake Oil / SMART App project: design a SMART application (for example, Elderly Assist using the Gemini API).'
          ]
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Karel and Computational Thinking (Unit 2)', short: 'Karel',
      sections: [
        {
          id: 'u2-commands', title: 'Karel commands',
          table: { head: ['Command', 'What it does'], rows: [
            ['move()', 'Moves Karel one step forward'],
            ['turn_left()', 'Turns Karel 90° left'],
            ['put_ball()', 'Puts down a ball'],
            ['take_ball()', 'Picks up a ball'],
            ['turn_right()', 'SuperKarel / UltraKarel only'],
            ['turn_around()', 'SuperKarel / UltraKarel only']
          ] }
        },
        {
          id: 'u2-thinking', title: 'Computational thinking',
          list: [
            'Decomposition: break a big problem into smaller parts.',
            'Functions: def function_name(): lets you reuse code. Top-down design starts with the big idea and breaks it down.',
            'Pseudocode and flowcharts plan a program before you write it.',
            'Syntax error: you broke a language rule (a missing colon or parenthesis). Logic error: the algorithm is flawed and the program does the wrong thing, or loops forever.',
            'Comments start with #. Use proper indentation.',
            'Challenges: Fetch Karel, Racing Karel, Tower Builder, Random Hurdles, Super Cleanup, Opposite Corner.'
          ]
        }
      ]
    },
    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'Variables, Data Types, Math and Input (Unit 3)', short: 'Basics',
      sections: [
        {
          id: 'u3-vars', title: 'Output, variables and types',
          list: [
            'Output: print() in Python, console.log() in JavaScript.',
            'Variables: declare, assign and initialize. A variable can change (mutation); a constant should not.',
            'Python is a dynamically typed, interpreted language.',
            'Use type() to check a data type.'
          ],
          table: { head: ['Type', 'Python name', 'Example'], rows: [
            ['String', 'str', '"hello"'],
            ['Integer', 'int', '42'],
            ['Float', 'float', '3.14'],
            ['Boolean', 'bool', 'True']
          ] }
        },
        {
          id: 'u3-input', title: 'Input and casting',
          list: [
            'Python: input() always gives a string. JavaScript: readLine(), readInt(), readFloat().',
            'Type casting: str(), int(), float(). Example: int(input("Age? ")).',
            'You cannot add a string and an integer without converting one.'
          ]
        },
        {
          id: 'u3-math', title: 'Operators and order of operations',
          table: { head: ['Operator', 'Meaning', 'Example'], rows: [
            ['+  −  *  /', 'Add, subtract, multiply, divide', '5 / 2 = 2.5'],
            ['**', 'Exponent', '2 ** 3 = 8'],
            ['%', 'Modulus (remainder)', '7 % 2 = 1'],
            ['//', 'Floor division', '7 // 2 = 3']
          ] },
          list: [
            'Order: Parentheses, Exponents, Negation, Multiply / Divide / Modulus, Add / Subtract (left to right).',
            'Strings: + joins them (concatenation) and * repeats them (repetition). "ab" * 3 is "ababab".',
            'Comments: # for one line, """ ... """ for multi-line docstrings.'
          ]
        }
      ]
    },
    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Canvas and Graphics (Unit 4)', short: 'Graphics',
      sections: [
        {
          id: 'u4-canvas', title: 'Canvas basics',
          list: [
            'The canvas uses an X-Y coordinate system.',
            'Graphical objects: Circle, Rectangle, Line.',
            'Stacking order: shapes are layered in the order you add them. Later shapes appear on top.',
            'Dynamic sizes: getWidth() and getHeight() make a program fit any canvas size.',
            'Projects: Ball in a Box, Raise the Flag, Color the Rainbow, 8 Ball, Meme Generator, Draw a Plant / Ghost / Fried Egg.',
            'Draw Something project: at least 5 shapes (1 line, 1 rectangle, 1 circle), 2 colors, 2 sizes.'
          ]
        }
      ]
    },
    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Conditionals and Logic (Units 5–6)', short: 'Conditionals',
      sections: [
        {
          id: 'u5-cond', title: 'Booleans and conditionals',
          list: [
            'A Boolean is True or False.',
            'Conditional statements: if, if-else, elif.',
            'Comparison operators: == != < > <= >=. Use == to compare and = to assign.',
            'Logical operators: and (&&), or (||), not (!).',
            'Floating-point numbers can have rounding errors.'
          ]
        },
        {
          id: 'u5-binary', title: 'Binary',
          list: [
            'Binary uses only 0 (OFF) and 1 (ON).',
            'Binary bracelets turn letters into binary patterns.',
            'Challenges: Do You Have a Dog, Best Day Ever, Rolling Dice, Teenagers, Rocket and Trivia, Odd or Even Shapes, Interactive Modern Art. Unit 6 challenge options: Guessing Game, Landscape Generator, RGB.'
          ]
        }
      ]
    },
    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Loops (Unit 7)', short: 'Loops',
      sections: [
        {
          id: 'u6-loops', title: 'While and for loops',
          list: [
            'A while loop runs while its condition is True.',
            'An infinite loop never ends because the condition never becomes False. Fix it by changing the variable in the loop.',
            'A for loop: for i in range(...). The variable i is the counter.',
            'range(5) gives 0, 1, 2, 3, 4. range(1, 4) gives 1, 2, 3.',
            'break exits the loop immediately. continue skips the rest of the current pass and goes to the next one.',
            'Nested control structures: loops inside loops, or if inside a loop.'
          ]
        },
        {
          id: 'u6-challenges', title: 'Challenges',
          list: [
            'Fencepost Problem, Follow the Yellow Ball Road, Row of Tennis Balls, Concentric Circles, Growing Squares, Chalkboard, Level Up, Inventory, Snake Eyes, Better Password, Riddle, Jukebox (at least 5 songs, using \\n for a new line).',
            'Graphics loops: Confetti, Caterpillar.'
          ]
        }
      ]
    },
    /* ---------- 07 ---------- */
    {
      id: 'u7', num: '07', title: 'Functions, Scope and Exceptions (Units 8–9)', short: 'Functions',
      sections: [
        {
          id: 'u7-func', title: 'Functions, parameters and return values',
          list: [
            'A function is reusable code. Parameters are placeholders for values passed in.',
            'A parameter can have a default value in the function signature: def greet(name="friend"):',
            'return sends a value back to the line that called the function. You can chain functions: the return value of one can be the input of another.',
            'A function with no return gives back None.'
          ]
        },
        {
          id: 'u7-scope', title: 'Scope and exceptions',
          list: [
            'Local variables are defined inside a function and only work there.',
            'Global variables are defined outside functions and can be used throughout the program.',
            'Exceptions: use try / except to handle errors gracefully so the program does not crash.',
            'Projects: Greeting, Negate, square_number(), Functions Calling Functions, max(x, y), isEven(x), Area of Triangle, Rainbow Revisited, Cityscape, Farming Intl, Compound Interest, Default Face, Choose Wisely Game, Scope Reflection.'
          ]
        }
      ]
    },
    /* ---------- 08 ---------- */
    {
      id: 'u8', num: '08', title: 'Strings (Unit 10)', short: 'Strings',
      sections: [
        {
          id: 'u8-index', title: 'Indexing and slicing',
          list: [
            'Indexing: s[index]. Positive indexes start at 0. Negative indexes start at -1 (the last character).',
            'An index that is out of range causes an IndexError.',
            'Slicing: s[start:end] includes start and excludes end. Shorthand: s[:end] and s[start:].',
            'Strings are immutable: you cannot change one in place. Make a new string instead.'
          ],
          table: { head: ['s = "python"', 'Result'], rows: [
            ['s[0]', '"p"'], ['s[-1]', '"n"'], ['s[1:4]', '"yth"'], ['s[:2]', '"py"'], ['s[3:]', '"hon"']
          ] }
        },
        {
          id: 'u8-methods', title: 'Looping and methods',
          list: [
            'Index-based loop: for i in range(len(s)): print(s[i])',
            'Character-based loop: for letter in s: print(letter)',
            'The in keyword checks membership: if "h" in s:',
            'Methods: .upper(), .lower(), .isupper(), .islower(), .swapcase(), .strip(), .find(substring).',
            '.find() returns the index of the first match, or -1 if it is not found.'
          ]
        }
      ]
    },
    /* ---------- 09 ---------- */
    {
      id: 'u9', num: '09', title: 'Final Exam Format', short: 'Exam',
      sections: [
        {
          id: 'u9-format', title: 'What is on the exam',
          list: [
            'A 25-question multiple-choice exam (counts for 10% or 20% of the final grade).',
            'It tests vocabulary, code syntax, logical flow and theory.',
            'There is also a final exam coding project, a practical task submitted through a Google Doc (10% or 20% of the final grade).'
          ]
        }
      ]
    }
  ];

  var flashcards = [
    { u: 1, front: 'Turing Test', back: 'A test of whether a machine can act so much like a human that you cannot tell the difference.' },
    { u: 1, front: 'Generative vs. predictive AI', back: 'Generative creates new content. Predictive forecasts outcomes from data.' },
    { u: 1, front: 'LLM', back: 'Large Language Model, an AI trained on huge amounts of text.' },
    { u: 1, front: 'Multimodal model', back: 'A model that works with more than one kind of input, like text and images.' },
    { u: 1, front: 'Prompt engineering', back: 'Writing clear, detailed prompts to get better AI answers.' },
    { u: 1, front: 'Keeping an API key safe', back: 'Route requests through a backend or serverless proxy. Never put the key in public code.' },
    { u: 1, front: 'Presenting AI work as your own', back: 'Academic dishonesty.' },
    { u: 2, front: 'Decomposition', back: 'Breaking a problem into smaller parts.' },
    { u: 2, front: 'Karel’s basic commands', back: 'move(), turn_left(), put_ball(), take_ball()' },
    { u: 2, front: 'What does SuperKarel add?', back: 'turn_right() and turn_around()' },
    { u: 2, front: 'Syntax error', back: 'Breaking a language rule, like a missing colon or parenthesis.' },
    { u: 2, front: 'Logic error', back: 'The algorithm is flawed, so the program does the wrong thing or loops forever.' },
    { u: 2, front: 'How do you define a function?', back: 'def function_name():' },
    { u: 2, front: 'Top-down design', back: 'Start with the big idea, then break it into smaller functions.' },
    { u: 3, front: 'print() vs. console.log()', back: 'print() is Python output. console.log() is JavaScript output.' },
    { u: 3, front: 'Four basic data types', back: 'str, int, float, bool' },
    { u: 3, front: 'type()', back: 'Shows a value’s data type.' },
    { u: 3, front: 'What type does input() return?', back: 'A string (str).' },
    { u: 3, front: 'Type casting functions', back: 'str(), int(), float()' },
    { u: 3, front: '**', back: 'Exponent. 2 ** 3 = 8' },
    { u: 3, front: '%', back: 'Modulus (the remainder). 7 % 2 = 1' },
    { u: 3, front: '//', back: 'Floor division. 7 // 2 = 3' },
    { u: 3, front: 'Order of operations', back: 'Parentheses, Exponents, Negation, Multiply / Divide / Modulus, Add / Subtract.' },
    { u: 3, front: 'String concatenation vs. repetition', back: '+ joins strings. * repeats a string. "ab" * 3 = "ababab".' },
    { u: 3, front: 'Python comments', back: '# for one line. """ ... """ for multi-line docstrings.' },
    { u: 4, front: 'Stacking order', back: 'Shapes are layered in the order you add them. Later shapes sit on top.' },
    { u: 4, front: 'getWidth() and getHeight()', back: 'Give the canvas size so your drawing can fit any canvas.' },
    { u: 5, front: 'Boolean', back: 'A value that is True or False.' },
    { u: 5, front: 'Comparison operators', back: '==  !=  <  >  <=  >=' },
    { u: 5, front: 'Logical operators', back: 'and (&&), or (||), not (!)' },
    { u: 5, front: '= vs. ==', back: '= assigns a value. == compares two values.' },
    { u: 5, front: 'elif', back: 'Checks another condition if the earlier if was False.' },
    { u: 5, front: 'Binary', back: 'Base 2: only 0 (OFF) and 1 (ON).' },
    { u: 6, front: 'while loop', back: 'Runs as long as its condition is True.' },
    { u: 6, front: 'Infinite loop', back: 'A loop whose condition never becomes False.' },
    { u: 6, front: 'for i in range(5)', back: 'i takes the values 0, 1, 2, 3, 4.' },
    { u: 6, front: 'break', back: 'Exits the loop immediately.' },
    { u: 6, front: 'continue', back: 'Skips the rest of this pass and moves to the next one.' },
    { u: 7, front: 'Parameter', back: 'A placeholder for a value passed into a function.' },
    { u: 7, front: 'Default parameter', back: 'A value used when none is passed: def greet(name="friend"):' },
    { u: 7, front: 'return', back: 'Sends a value back to the line that called the function.' },
    { u: 7, front: 'Local vs. global variable', back: 'Local: inside a function only. Global: outside functions, usable everywhere.' },
    { u: 7, front: 'try / except', back: 'Handles an error gracefully so the program does not crash.' },
    { u: 8, front: 'First index of a string', back: '0' },
    { u: 8, front: 'Last character index', back: '-1' },
    { u: 8, front: 'Slice s[1:4]', back: 'Includes index 1, excludes index 4.' },
    { u: 8, front: 'Immutable', back: 'Cannot be changed in place. Strings are immutable.' },
    { u: 8, front: 'IndexError', back: 'You used an index that is out of range.' },
    { u: 8, front: '.find()', back: 'Returns the index of the first match, or -1 if not found.' },
    { u: 8, front: '.swapcase()', back: 'Switches uppercase to lowercase and lowercase to uppercase.' },
    { u: 8, front: '.strip()', back: 'Removes spaces from both ends of a string.' },
    { u: 9, front: 'Coding final format', back: '25 multiple-choice questions, plus a coding project in a Google Doc.' }
  ];

  var questions = [
    // Unit 1
    { u: 1, t: 'mc', q: 'What does the Turing Test check?', c: ['Whether a machine can act so human that you cannot tell the difference', 'How fast a computer is', 'Whether code has errors', 'How much data a model has'], a: 0, why: 'The Turing Test checks whether a machine’s answers can pass as human.' },
    { u: 1, t: 'mc', q: 'Which type of AI creates new text or images?', c: ['Generative AI', 'Predictive AI', 'Binary AI', 'Karel AI'], a: 0, why: 'Generative AI creates new content. Predictive AI predicts outcomes.' },
    { u: 1, t: 'mc', q: 'What is a multimodal model?', c: ['A model that handles more than one kind of input, like text and images', 'A model that only reads text', 'A very small model', 'A model with many users'], a: 0, why: 'Multimodal means more than one mode of input or output.' },
    { u: 1, t: 'mc', q: 'What is the safest way to use an API key in an app?', c: ['Route requests through a backend or serverless proxy', 'Put it in the page’s JavaScript', 'Post it in a Google Doc', 'Share it with friends'], a: 0, why: 'A key in public code can be stolen.' },
    { u: 1, t: 'mc', q: 'What is it called when you present AI-generated work as your own?', c: ['Academic dishonesty', 'Prompt engineering', 'Decomposition', 'Debugging'], a: 0, why: 'Passing off AI work as your own breaks academic honesty rules.' },
    // Unit 2
    { u: 2, t: 'mc', q: 'What is decomposition?', c: ['Breaking a problem into smaller parts', 'Fixing a bug', 'Running a loop', 'Writing a comment'], a: 0, why: 'Decomposition makes big problems easier to solve.' },
    { u: 2, t: 'mc', q: 'Which command does regular Karel NOT have?', c: ['turn_right()', 'move()', 'turn_left()', 'put_ball()'], a: 0, why: 'turn_right() and turn_around() are added in SuperKarel.' },
    { u: 2, t: 'mc', q: 'How do you define a function in Python?', c: ['def my_function():', 'function my_function()', 'make my_function()', 'new my_function:'], a: 0, why: 'Python uses def, a name, parentheses and a colon.' },
    { u: 2, t: 'mc', q: 'A missing colon after an if statement is what kind of error?', c: ['Syntax error', 'Logic error', 'Runtime loop', 'Rounding error'], a: 0, why: 'Syntax errors break the language’s rules.' },
    { u: 2, t: 'mc', q: 'Karel’s code runs without errors but goes to the wrong corner. What kind of error is it?', c: ['Logic error', 'Syntax error', 'Type error', 'Name error'], a: 0, why: 'The code is valid, but the algorithm is wrong.' },
    { u: 2, t: 'mc', q: 'Which symbol starts a comment in Python?', c: ['#', '//', '/*', '--'], a: 0, why: 'Python comments start with #.' },
    // Unit 3
    { u: 3, t: 'mc', q: 'Which function prints output in Python?', c: ['print()', 'console.log()', 'output()', 'show()'], a: 0, why: 'console.log() is the JavaScript version.' },
    { u: 3, t: 'mc', q: 'What data type is 3.14?', c: ['float', 'int', 'str', 'bool'], a: 0, why: 'Numbers with decimals are floats.' },
    { u: 3, t: 'mc', q: 'What does input() always return in Python?', c: ['A string', 'An integer', 'A float', 'A Boolean'], a: 0, why: 'Cast it with int() or float() if you need a number.' },
    { u: 3, t: 'mc', q: 'What does int("5") + 2 give?', c: ['7', '52', '"7"', 'An error'], a: 0, why: 'int("5") is 5, and 5 + 2 is 7.' },
    { u: 3, t: 'mc', q: 'What does "5" + "2" give?', c: ['"52"', '7', '"7"', 'An error'], a: 0, why: 'Adding two strings joins them (concatenation).' },
    { u: 3, t: 'mc', q: 'What does 7 // 2 give?', c: ['3', '3.5', '1', '4'], a: 0, why: 'Floor division drops the remainder: 3.' },
    { u: 3, t: 'mc', q: 'What does 7 % 2 give?', c: ['1', '3', '3.5', '0'], a: 0, why: 'Modulus is the remainder: 1.' },
    { u: 3, t: 'mc', q: 'What does 2 ** 3 give?', c: ['8', '6', '5', '9'], a: 0, why: '** is the exponent: 2 × 2 × 2 = 8.' },
    { u: 3, t: 'mc', q: 'What does 3 + 4 * 2 give?', c: ['11', '14', '10', '9'], a: 0, why: 'Multiplication comes first: 4 × 2 = 8, then 3 + 8 = 11.' },
    { u: 3, t: 'mc', q: 'What does (3 + 4) * 2 give?', c: ['14', '11', '10', '24'], a: 0, why: 'Parentheses first: 7 × 2 = 14.' },
    { u: 3, t: 'mc', q: 'What does "ab" * 3 give?', c: ['"ababab"', '"ab3"', '"aaabbb"', 'An error'], a: 0, why: 'Multiplying a string repeats it.' },
    { u: 3, t: 'mc', q: 'What does 5 / 2 give in Python?', c: ['2.5', '2', '3', '2.0'], a: 0, why: 'The / operator always gives a float.' },
    { u: 3, t: 'mc', q: 'What does "Age: " + 15 cause?', c: ['An error, because you cannot add a string and an int', '"Age: 15"', '"Age: "', '15'], a: 0, why: 'Convert with str(15) first.' },
    { u: 3, t: 'mc', q: 'Python is a…', c: ['Dynamically typed, interpreted language', 'Compiled, statically typed language', 'Markup language', 'Database'], a: 0, why: 'You do not declare types, and code runs line by line through an interpreter.' },
    // Unit 4
    { u: 4, t: 'mc', q: 'Two circles overlap on the canvas. Which one appears on top?', c: ['The one added last', 'The one added first', 'The bigger one', 'The red one'], a: 0, why: 'Shapes stack in the order they are added.' },
    { u: 4, t: 'mc', q: 'Which functions make a drawing fit any canvas size?', c: ['getWidth() and getHeight()', 'move() and turn_left()', 'print() and input()', 'range() and len()'], a: 0, why: 'They return the canvas’s current size.' },
    { u: 4, t: 'mc', q: 'What does the Draw Something project require at minimum?', c: ['5 shapes including a line, rectangle and circle, with 2 colors and 2 sizes', '1 circle', '10 colors', 'A loop'], a: 0, why: 'That is the project’s requirement list.' },
    // Unit 5
    { u: 5, t: 'mc', q: 'Which operator checks whether two values are equal?', c: ['==', '=', '!=', '=>'], a: 0, why: '= assigns. == compares.' },
    { u: 5, t: 'mc', q: 'Which operator means “not equal to”?', c: ['!=', '==', '<=', '!'], a: 0, why: '!= is not equal.' },
    { u: 5, t: 'mc', q: 'What does True and False give?', c: ['False', 'True', 'None', 'An error'], a: 0, why: 'and is only True when both sides are True.' },
    { u: 5, t: 'mc', q: 'What does True or False give?', c: ['True', 'False', 'None', 'An error'], a: 0, why: 'or is True when at least one side is True.' },
    { u: 5, t: 'mc', q: 'What does not True give?', c: ['False', 'True', '0', 'An error'], a: 0, why: 'not flips the Boolean.' },
    { u: 5, t: 'mc', q: 'Which keyword checks a second condition after an if?', c: ['elif', 'elseif', 'then', 'else if'], a: 0, why: 'Python uses elif.' },
    { u: 5, t: 'mc', q: 'In binary, what does 1 mean?', c: ['ON', 'OFF', 'Two', 'Empty'], a: 0, why: '1 is ON and 0 is OFF.' },
    { u: 5, t: 'mc', q: 'What does age >= 13 mean?', c: ['age is 13 or more', 'age is more than 13', 'age is 13 or less', 'age is not 13'], a: 0, why: '>= means greater than or equal to.' },
    // Unit 6
    { u: 6, t: 'mc', q: 'When does a while loop stop?', c: ['When its condition becomes False', 'After 10 passes', 'When the program ends', 'Never'], a: 0, why: 'A while loop runs while the condition is True.' },
    { u: 6, t: 'mc', q: 'What causes an infinite loop?', c: ['The condition never becomes False', 'Using range()', 'Using a comment', 'Using print()'], a: 0, why: 'Usually the variable in the condition is never updated.' },
    { u: 6, t: 'mc', q: 'What values does range(5) give?', c: ['0, 1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'], a: 0, why: 'range(5) starts at 0 and stops before 5.' },
    { u: 6, t: 'mc', q: 'What values does range(1, 4) give?', c: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], a: 0, why: 'It starts at 1 and stops before 4.' },
    { u: 6, t: 'mc', q: 'What does break do?', c: ['Exits the loop immediately', 'Skips this pass', 'Restarts the loop', 'Pauses the program'], a: 0, why: 'continue skips a pass. break leaves the loop.' },
    { u: 6, t: 'mc', q: 'What does continue do?', c: ['Skips the rest of this pass and goes to the next', 'Exits the loop', 'Ends the program', 'Restarts the program'], a: 0, why: 'The loop keeps going with the next value.' },
    { u: 6, t: 'mc', q: 'A loop goes through i in range(5). Each pass it checks “if i == 3: break”, then prints i. What gets printed?', c: ['0 1 2', '0 1 2 3', '0 1 2 3 4', '3'], a: 0, why: 'When i is 3, break ends the loop before printing it.' },
    { u: 6, t: 'mc', q: 'A loop goes through i in range(5). Each pass it checks “if i == 2: continue”, then prints i. What gets printed?', c: ['0 1 3 4', '0 1', '0 1 2 3 4', '2'], a: 0, why: 'When i is 2, continue skips the print.' },
    // Unit 7
    { u: 7, t: 'mc', q: 'What is a parameter?', c: ['A placeholder for a value passed into a function', 'A loop counter', 'A comment', 'A type of error'], a: 0, why: 'Parameters receive the values (arguments) you pass in.' },
    { u: 7, t: 'mc', q: 'What does return do?', c: ['Sends a value back to where the function was called', 'Prints a value', 'Restarts the function', 'Ends the program'], a: 0, why: 'print shows a value; return hands it back to the caller.' },
    { u: 7, t: 'mc', q: 'What does a function without a return statement give back?', c: ['None', '0', 'An error', 'An empty string'], a: 0, why: 'Python returns None by default.' },
    { u: 7, t: 'mc', q: 'Where can a local variable be used?', c: ['Only inside the function where it was defined', 'Anywhere in the program', 'Only in loops', 'Only in the main program'], a: 0, why: 'Local variables are limited to their function.' },
    { u: 7, t: 'mc', q: 'A variable defined outside every function is…', c: ['Global', 'Local', 'Constant only', 'A parameter'], a: 0, why: 'Global variables can be read throughout the program.' },
    { u: 7, t: 'mc', q: 'What is try / except used for?', c: ['Handling errors gracefully', 'Repeating code', 'Defining a function', 'Drawing shapes'], a: 0, why: 'The except block runs if the try block causes an error.' },
    { u: 7, t: 'mc', q: 'What is def greet(name="friend"): an example of?', c: ['A default parameter value', 'A global variable', 'A loop', 'A string method'], a: 0, why: 'If no name is passed in, "friend" is used.' },
    // Unit 8
    { u: 8, t: 'mc', q: 'If s = "python", what is s[0]?', c: ['"p"', '"y"', '"n"', 'An error'], a: 0, why: 'Indexes start at 0.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[-1]?', c: ['"n"', '"p"', '"o"', 'An error'], a: 0, why: '-1 is the last character.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[1:4]?', c: ['"yth"', '"pyth"', '"ytho"', '"yt"'], a: 0, why: 'It includes index 1 and excludes index 4.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[:2]?', c: ['"py"', '"pyt"', '"on"', '"p"'], a: 0, why: 'It starts at the beginning and stops before index 2.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[3:]?', c: ['"hon"', '"thon"', '"pyt"', '"ho"'], a: 0, why: 'It starts at index 3 and goes to the end.' },
    { u: 8, t: 'mc', q: 'What error do you get from "hi"[5]?', c: ['IndexError', 'SyntaxError', 'TypeError', 'ValueError'], a: 0, why: 'The index is out of range.' },
    { u: 8, t: 'mc', q: 'Why does s[0] = "J" cause an error?', c: ['Strings are immutable', 'Indexes cannot be 0', 'J is not a letter', 'Strings must be lowercase'], a: 0, why: 'You must create a new string instead.' },
    { u: 8, t: 'mc', q: 'What does "hello".find("l") return?', c: ['2', '3', '1', '-1'], a: 0, why: 'The first "l" is at index 2.' },
    { u: 8, t: 'mc', q: 'What does "hello".find("z") return?', c: ['-1', '0', 'None', 'An error'], a: 0, why: '.find() returns -1 when nothing is found.' },
    { u: 8, t: 'mc', q: 'What does "Hi".swapcase() return?', c: ['"hI"', '"HI"', '"hi"', '"Hi"'], a: 0, why: 'It flips the case of each letter.' },
    { u: 8, t: 'mc', q: 'What does " hi ".strip() return?', c: ['"hi"', '" hi"', '"hi "', '" hi "'], a: 0, why: '.strip() removes spaces from both ends.' },
    { u: 8, t: 'mc', q: 'Which loop uses each character directly?', c: ['for letter in s:', 'for i in range(len(s)):', 'while s:', 'for s in range():'], a: 0, why: 'The character-based loop goes through the letters themselves.' },
    { u: 8, t: 'mc', q: 'What does "h" in "hello" return?', c: ['True', 'False', '0', 'An error'], a: 0, why: 'in checks whether the text is inside the string.' },
    // Unit 9
    { u: 9, t: 'mc', q: 'How many questions are on the Coding multiple-choice final?', c: ['25', '10', '50', '100'], a: 0, why: 'The exam is 25 multiple-choice questions.' },
    { u: 9, t: 'mc', q: 'What is the final exam coding project submitted through?', c: ['A Google Doc', 'A paper packet', 'An email', 'A video'], a: 0, why: 'It is a practical application submitted in a Google Doc.' }
  ];

  FINALS.addClass('coding', {
    // Shown on this class's Home.
    examFacts: [
      'Final: Fri Dec 18, period 7. A 25-question multiple-choice exam (10% or 20% of the final grade).',
      'It tests vocabulary, code syntax, logical flow and theory.',
      'There is also a final exam coding project, submitted through a Google Doc (10% or 20% of the final grade).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
