const javascript = {
  id: "javascript",
  title: "JavaScript",
  shortTitle: "JavaScript",
  category: "Programming",

  description:
    "Learn JavaScript fundamentals used in frontend, backend and MERN development.",

  estimatedHours: 4,

  resources: [
    {
      id: "javascript-guide",
      title: "JavaScript Guide",
      provider: "MDN",
      type: "documentation",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    },
  ],

  topics: [
    {
      id: "variables-and-data-types",
      title: "Variables and Data Types",

      description:
        "Understand let, const, primitive types and reference types.",

      difficulty: "Easy",
      estimatedMinutes: 20,

      notes: {
        introduction:
          "Variables are used to store values that can be accessed and processed by a JavaScript program.",

        keyPoints: [
          "const is used when reassignment is not required.",
          "let is used when a value may be reassigned.",
          "JavaScript is dynamically typed.",
          "Primitive types include string, number, boolean, undefined, null, bigint and symbol.",
          "Objects and arrays are reference types.",
          "Primitive values are copied by value.",
        ],

        realWorldExample:
          "In a login form, email and password values change while the user types. React state stores these changing values, while constant configuration values can use const.",

        interviewAnswer:
          "JavaScript is dynamically typed. Primitive values are copied by value, while objects and arrays are reference types. I use const by default and let when reassignment is required.",

        revisionPoints: [
          "Use const by default.",
          "Use let for reassignment.",
          "JavaScript is dynamically typed.",
          "Objects and arrays are reference types.",
        ],
      },

      resources: [
        {
          title: "Read JavaScript Data Types",
          provider: "MDN",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
        },
      ],
    },

    {
      id: "functions",
      title: "Functions",

      description:
        "Learn function declarations, arrow functions, parameters and return values.",

      difficulty: "Easy",
      estimatedMinutes: 20,

      notes: {
        introduction:
          "A function is a reusable block of code designed to perform a particular task.",

        keyPoints: [
          "Functions can receive parameters.",
          "Functions can return values.",
          "Function declarations are hoisted.",
          "Arrow functions provide shorter syntax.",
          "Arrow functions do not create their own this value.",
          "Callbacks are functions passed to another function.",
        ],

        realWorldExample:
          "Functions such as handleSubmit, handleLogin and handleLogout execute when users interact with a React application.",

        interviewAnswer:
          "A function is a reusable block of code. JavaScript supports declarations, expressions and arrow functions. Arrow functions are concise and use the lexical this value from their surrounding scope.",

        revisionPoints: [
          "Parameters are function inputs.",
          "Return value is function output.",
          "Functions improve reusability.",
          "Arrow functions use lexical this.",
        ],
      },

      resources: [
        {
          title: "Read JavaScript Functions",
          provider: "MDN",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
        },
      ],
    },

    {
      id: "promises-and-async-await",
      title: "Promises and Async/Await",

      description:
        "Understand asynchronous programming and API request handling.",

      difficulty: "Medium",
      estimatedMinutes: 30,

      notes: {
        introduction:
          "A promise represents the future result of an asynchronous operation.",

        keyPoints: [
          "A promise can be pending, fulfilled or rejected.",
          "then handles a successful result.",
          "catch handles an error.",
          "async functions always return a promise.",
          "await waits for a promise inside an async function.",
          "try and catch are commonly used for async error handling.",
          "Promise.all executes multiple independent promises together.",
        ],

        realWorldExample:
          "When React calls an Express API using Axios, Axios returns a promise. The component uses await to receive the response and try-catch to handle errors.",

        interviewAnswer:
          "Promises handle asynchronous operations in JavaScript. Async and await provide cleaner syntax over promise chaining. I normally use await inside try-catch blocks for API calls and error handling.",

        revisionPoints: [
          "Promise represents a future result.",
          "Promise states are pending, fulfilled and rejected.",
          "await works inside async functions.",
          "Use try-catch for errors.",
        ],
      },

      resources: [
        {
          title: "Read Promises",
          provider: "MDN",
          type: "documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
        },
      ],
    },
  ],
};

export default javascript;