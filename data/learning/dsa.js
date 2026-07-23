const dsa = {
  id: "dsa",
  title: "Data Structures and Algorithms",
  shortTitle: "DSA",
  category: "Problem Solving",

  description:
    "Learn core data structures, complexity analysis and problem-solving patterns.",

  estimatedHours: 6,

  resources: [
    {
      id: "dsa-roadmap",
      title: "Data Structures and Algorithms",
      provider: "GeeksforGeeks",
      type: "course",
      url: "https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/",
    },
  ],

  topics: [
    {
      id: "time-and-space-complexity",
      title: "Time and Space Complexity",

      description:
        "Understand Big O notation and algorithm efficiency.",

      difficulty: "Easy",
      estimatedMinutes: 25,

      notes: {
        introduction:
          "Time complexity describes how the running time of an algorithm grows as the input size increases. Space complexity describes how much additional memory is required.",

        keyPoints: [
          "O(1) means constant time.",
          "O(log n) commonly appears in binary search.",
          "O(n) means linear time.",
          "O(n log n) appears in efficient sorting algorithms.",
          "O(n²) commonly appears in nested loops.",
          "Complexity focuses on growth rather than exact execution time.",
        ],

        realWorldExample:
          "Searching through every item in an array requires O(n) time, while binary search on a sorted array requires O(log n) time.",

        interviewAnswer:
          "Time complexity measures how execution time grows with input size, while space complexity measures additional memory usage. Big O notation is commonly used to express the worst-case growth rate.",

        revisionPoints: [
          "Single loop is generally O(n).",
          "Nested loops are commonly O(n²).",
          "Binary search is O(log n).",
          "Hash-map lookup is generally O(1) average case.",
        ],
      },

      resources: [
        {
          title: "Read Complexity Analysis",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/dsa/analysis-algorithms-big-o-analysis/",
        },
      ],
    },

    {
      id: "arrays",
      title: "Arrays",

      description:
        "Understand array storage, traversal and common interview patterns.",

      difficulty: "Easy",
      estimatedMinutes: 25,

      notes: {
        introduction:
          "An array stores multiple values in contiguous memory locations and allows elements to be accessed using indexes.",

        keyPoints: [
          "Array indexes usually start from zero.",
          "Access by index takes O(1) time.",
          "Searching an unsorted array takes O(n) time.",
          "Insertion in the middle may require shifting elements.",
          "Common patterns include two pointers, sliding window and prefix sum.",
          "Arrays provide good cache performance because memory is contiguous.",
        ],

        realWorldExample:
          "A list of interview scores can be stored in an array and traversed to calculate the average score.",

        interviewAnswer:
          "An array is a linear data structure that stores elements in contiguous memory locations. It provides constant-time indexed access, but insertion and deletion in the middle may require shifting elements.",

        revisionPoints: [
          "Indexed access is O(1).",
          "Linear search is O(n).",
          "Middle insertion may be O(n).",
          "Important patterns include two pointers and sliding window.",
        ],
      },

      resources: [
        {
          title: "Read Array Data Structure",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/dsa/array-data-structure-guide/",
        },
      ],
    },

    {
      id: "linked-list",
      title: "Linked List",

      description:
        "Understand nodes, links, traversal and linked-list operations.",

      difficulty: "Medium",
      estimatedMinutes: 30,

      notes: {
        introduction:
          "A linked list is a linear data structure where each node stores data and a reference to the next node.",

        keyPoints: [
          "Linked-list nodes are not stored in contiguous memory.",
          "Each node contains data and a pointer.",
          "Accessing an element requires traversal.",
          "Insertion at the beginning can take O(1) time.",
          "Searching generally takes O(n) time.",
          "A doubly linked list stores both next and previous pointers.",
        ],

        realWorldExample:
          "Browser history can be represented using a doubly linked list where users can move forward and backward.",

        interviewAnswer:
          "A linked list stores data in nodes connected through pointers. It supports efficient insertion and deletion when the node position is known, but random indexed access is not available.",

        revisionPoints: [
          "Nodes are connected through pointers.",
          "Random access is not available.",
          "Traversal takes O(n).",
          "Head insertion takes O(1).",
        ],
      },

      resources: [
        {
          title: "Read Linked List",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/dsa/linked-list-data-structure/",
        },
      ],
    },
  ],
};

export default dsa;