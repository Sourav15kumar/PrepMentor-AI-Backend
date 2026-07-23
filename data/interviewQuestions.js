const interviewQuestions = [
  // ================= DBMS EASY =================

  {
    id: "dbms-easy-1",
    type: "subject",
    subject: "dbms",
    difficulty: "easy",
    question: "What is DBMS?",
    keywords: [
      "database",
      "data",
      "manage",
      "store",
      "retrieve",
    ],
  },

  {
    id: "dbms-easy-2",
    type: "subject",
    subject: "dbms",
    difficulty: "easy",
    question:
      "What is the difference between a primary key and a foreign key?",
    keywords: [
      "primary key",
      "unique",
      "foreign key",
      "relationship",
      "reference",
    ],
  },

  {
    id: "dbms-easy-3",
    type: "subject",
    subject: "dbms",
    difficulty: "easy",
    question: "What is normalization in DBMS?",
    keywords: [
      "redundancy",
      "dependency",
      "data integrity",
      "tables",
      "organize",
    ],
  },

  {
    id: "dbms-easy-4",
    type: "subject",
    subject: "dbms",
    difficulty: "easy",
    question:
      "What is the difference between DELETE, DROP and TRUNCATE?",
    keywords: [
      "delete rows",
      "drop table",
      "truncate",
      "structure",
      "rollback",
    ],
  },

  {
    id: "dbms-easy-5",
    type: "subject",
    subject: "dbms",
    difficulty: "easy",
    question: "What is a transaction in DBMS?",
    keywords: [
      "operations",
      "unit",
      "commit",
      "rollback",
      "acid",
    ],
  },

  // ================= DBMS MEDIUM =================

  {
    id: "dbms-medium-1",
    type: "subject",
    subject: "dbms",
    difficulty: "medium",
    question:
      "Explain ACID properties in database transactions.",
    keywords: [
      "atomicity",
      "consistency",
      "isolation",
      "durability",
    ],
  },

  {
    id: "dbms-medium-2",
    type: "subject",
    subject: "dbms",
    difficulty: "medium",
    question:
      "What is an index and how does it improve database performance?",
    keywords: [
      "search",
      "query",
      "performance",
      "data structure",
      "lookup",
    ],
  },

  {
    id: "dbms-medium-3",
    type: "subject",
    subject: "dbms",
    difficulty: "medium",
    question:
      "What is the difference between clustered and non-clustered index?",
    keywords: [
      "physical order",
      "clustered",
      "non-clustered",
      "pointer",
      "table",
    ],
  },

  {
    id: "dbms-medium-4",
    type: "subject",
    subject: "dbms",
    difficulty: "medium",
    question:
      "What is a database deadlock and how can it occur?",
    keywords: [
      "transactions",
      "resources",
      "waiting",
      "lock",
      "circular",
    ],
  },

  {
    id: "dbms-medium-5",
    type: "subject",
    subject: "dbms",
    difficulty: "medium",
    question:
      "What is the difference between SQL and NoSQL databases?",
    keywords: [
      "relational",
      "tables",
      "schema",
      "documents",
      "scalability",
    ],
  },

  // ================= SQL EASY =================

  {
    id: "sql-easy-1",
    type: "subject",
    subject: "sql",
    difficulty: "easy",
    question: "What is SQL?",
    keywords: [
      "structured query language",
      "database",
      "query",
      "data",
      "relational",
    ],
  },

  {
    id: "sql-easy-2",
    type: "subject",
    subject: "sql",
    difficulty: "easy",
    question:
      "What is the difference between WHERE and HAVING?",
    keywords: [
      "where",
      "rows",
      "having",
      "groups",
      "aggregate",
    ],
  },

  {
    id: "sql-easy-3",
    type: "subject",
    subject: "sql",
    difficulty: "easy",
    question: "What is a JOIN in SQL?",
    keywords: [
      "combine",
      "tables",
      "related",
      "columns",
      "rows",
    ],
  },

  {
    id: "sql-easy-4",
    type: "subject",
    subject: "sql",
    difficulty: "easy",
    question:
      "What is the difference between UNION and UNION ALL?",
    keywords: [
      "combine",
      "result",
      "duplicates",
      "union all",
      "union",
    ],
  },

  {
    id: "sql-easy-5",
    type: "subject",
    subject: "sql",
    difficulty: "easy",
    question: "What is a subquery?",
    keywords: [
      "query",
      "inside",
      "nested",
      "result",
      "select",
    ],
  },

  // ================= OS EASY =================

  {
    id: "os-easy-1",
    type: "subject",
    subject: "os",
    difficulty: "easy",
    question: "What is an operating system?",
    keywords: [
      "hardware",
      "software",
      "resource",
      "manage",
      "interface",
    ],
  },

  {
    id: "os-easy-2",
    type: "subject",
    subject: "os",
    difficulty: "easy",
    question:
      "What is the difference between a process and a thread?",
    keywords: [
      "process",
      "program",
      "thread",
      "execution",
      "memory",
    ],
  },

  {
    id: "os-easy-3",
    type: "subject",
    subject: "os",
    difficulty: "easy",
    question: "What is virtual memory?",
    keywords: [
      "disk",
      "memory",
      "ram",
      "address space",
      "paging",
    ],
  },

  {
    id: "os-easy-4",
    type: "subject",
    subject: "os",
    difficulty: "easy",
    question: "What is a deadlock?",
    keywords: [
      "processes",
      "resources",
      "waiting",
      "circular",
      "blocked",
    ],
  },

  {
    id: "os-easy-5",
    type: "subject",
    subject: "os",
    difficulty: "easy",
    question: "What is context switching?",
    keywords: [
      "cpu",
      "process",
      "state",
      "switch",
      "scheduler",
    ],
  },

  // ================= NETWORKING EASY =================

  {
    id: "cn-easy-1",
    type: "subject",
    subject: "networking",
    difficulty: "easy",
    question: "What is an IP address?",
    keywords: [
      "unique",
      "address",
      "device",
      "network",
      "communication",
    ],
  },

  {
    id: "cn-easy-2",
    type: "subject",
    subject: "networking",
    difficulty: "easy",
    question:
      "What is the difference between TCP and UDP?",
    keywords: [
      "connection-oriented",
      "reliable",
      "connectionless",
      "fast",
      "packets",
    ],
  },

  {
    id: "cn-easy-3",
    type: "subject",
    subject: "networking",
    difficulty: "easy",
    question: "What is DNS?",
    keywords: [
      "domain",
      "ip address",
      "resolve",
      "name",
      "server",
    ],
  },

  {
    id: "cn-easy-4",
    type: "subject",
    subject: "networking",
    difficulty: "easy",
    question: "What is the purpose of the ping command?",
    keywords: [
      "connectivity",
      "network",
      "icmp",
      "response",
      "latency",
    ],
  },

  {
    id: "cn-easy-5",
    type: "subject",
    subject: "networking",
    difficulty: "easy",
    question:
      "What is the difference between HTTP and HTTPS?",
    keywords: [
      "secure",
      "encryption",
      "ssl",
      "tls",
      "http",
    ],
  },

  // ================= MERN EASY =================

  {
    id: "mern-easy-1",
    type: "technical",
    subject: "mern",
    difficulty: "easy",
    question: "What is the MERN stack?",
    keywords: [
      "mongodb",
      "express",
      "react",
      "node",
      "javascript",
    ],
  },

  {
    id: "mern-easy-2",
    type: "technical",
    subject: "mern",
    difficulty: "easy",
    question: "What is React Context API?",
    keywords: [
      "global state",
      "props",
      "provider",
      "consumer",
      "components",
    ],
  },

  {
    id: "mern-easy-3",
    type: "technical",
    subject: "mern",
    difficulty: "easy",
    question: "What is middleware in Express?",
    keywords: [
      "request",
      "response",
      "next",
      "function",
      "route",
    ],
  },

  {
    id: "mern-easy-4",
    type: "technical",
    subject: "mern",
    difficulty: "easy",
    question: "What is JWT authentication?",
    keywords: [
      "token",
      "authentication",
      "signature",
      "payload",
      "stateless",
    ],
  },

  {
    id: "mern-easy-5",
    type: "technical",
    subject: "mern",
    difficulty: "easy",
    question: "Why is bcrypt used?",
    keywords: [
      "password",
      "hash",
      "salt",
      "security",
      "compare",
    ],
  },

  // ================= HR EASY =================

  {
    id: "hr-easy-1",
    type: "hr",
    subject: "hr",
    difficulty: "easy",
    question: "Tell me about yourself.",
    keywords: [
      "education",
      "skills",
      "projects",
      "experience",
      "goal",
    ],
  },

  {
    id: "hr-easy-2",
    type: "hr",
    subject: "hr",
    difficulty: "easy",
    question: "Why should we hire you?",
    keywords: [
      "skills",
      "quick learner",
      "contribute",
      "team",
      "problem solving",
    ],
  },

  {
    id: "hr-easy-3",
    type: "hr",
    subject: "hr",
    difficulty: "easy",
    question: "What are your strengths?",
    keywords: [
      "strength",
      "example",
      "learning",
      "team",
      "problem solving",
    ],
  },

  {
    id: "hr-easy-4",
    type: "hr",
    subject: "hr",
    difficulty: "easy",
    question: "What is your weakness?",
    keywords: [
      "weakness",
      "improve",
      "learning",
      "action",
      "progress",
    ],
  },

  {
    id: "hr-easy-5",
    type: "hr",
    subject: "hr",
    difficulty: "easy",
    question:
      "Where do you see yourself in five years?",
    keywords: [
      "growth",
      "skills",
      "responsibility",
      "company",
      "learning",
    ],
  },
];

export default interviewQuestions;