const dbms = {
  id: "dbms",
  title: "Database Management System",
  shortTitle: "DBMS",
  category: "Core Computer Science",

  description:
    "Learn database fundamentals, keys, normalization and other important placement concepts.",

  estimatedHours: 4,

  resources: [
    {
      id: "dbms-course",
      title: "Database Management System Course",
      provider: "NPTEL",
      type: "course",
      url: "https://nptel.ac.in/courses/106105175",
    },
    {
      id: "sql-tutorial",
      title: "PostgreSQL Tutorial",
      provider: "PostgreSQL",
      type: "documentation",
      url: "https://www.postgresql.org/docs/current/tutorial.html",
    },
  ],

  topics: [
    {
      id: "introduction-to-dbms",
      title: "Introduction to DBMS",

      description:
        "Understand databases, DBMS and why applications use database systems.",

      difficulty: "Easy",
      estimatedMinutes: 15,

      notes: {
        introduction:
          "A database is an organized collection of related data. A Database Management System, or DBMS, is software used to store, manage, retrieve and update that data.",

        keyPoints: [
          "A database stores organized and related information.",
          "DBMS acts as an interface between an application and its data.",
          "DBMS supports create, read, update and delete operations.",
          "It provides data security and controlled access.",
          "It helps maintain data consistency.",
          "Examples include MySQL, PostgreSQL, Oracle and MongoDB.",
        ],

        realWorldExample:
          "In an e-commerce application, users, products, orders and payments are stored in a database. The backend uses the DBMS to retrieve products and save new orders.",

        interviewAnswer:
          "A DBMS is software that allows users and applications to store, organize, retrieve and manage data efficiently. It also provides security, consistency, concurrency control and backup support.",

        revisionPoints: [
          "Database means organized data.",
          "DBMS is software used to manage databases.",
          "Backend applications communicate with the DBMS.",
          "DBMS supports CRUD operations.",
        ],
      },

      resources: [
        {
          title: "Read DBMS Introduction",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/dbms/introduction-of-dbms-database-management-system-set-1/",
        },
      ],
    },

    {
      id: "keys-in-dbms",
      title: "Keys in DBMS",

      description:
        "Understand primary keys, foreign keys, candidate keys and composite keys.",

      difficulty: "Easy",
      estimatedMinutes: 20,

      notes: {
        introduction:
          "Keys are columns or combinations of columns used to identify records and create relationships between database tables.",

        keyPoints: [
          "A primary key uniquely identifies each record in a table.",
          "A primary key cannot contain duplicate values.",
          "A primary key should not contain null values.",
          "A foreign key references a key from another table.",
          "A candidate key can uniquely identify a record.",
          "A composite key is created using multiple columns.",
          "A super key is any set of columns that uniquely identifies a record.",
        ],

        realWorldExample:
          "In a users table, user_id can be the primary key. In an orders table, user_id can be a foreign key that connects each order with its user.",

        interviewAnswer:
          "A primary key uniquely identifies a record in its own table, while a foreign key refers to the primary key of another table and creates a relationship between the two tables.",

        revisionPoints: [
          "Primary key means unique identification.",
          "Foreign key creates relationships.",
          "Candidate key is a possible primary key.",
          "Composite key contains multiple columns.",
        ],
      },

      resources: [
        {
          title: "Read Keys in DBMS",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/dbms/types-of-keys-in-relational-model-candidate-super-primary-alternate-and-foreign/",
        },
      ],
    },

    {
      id: "normalization",
      title: "Normalization",

      description:
        "Understand data redundancy, dependencies and normal forms.",

      difficulty: "Medium",
      estimatedMinutes: 30,

      notes: {
        introduction:
          "Normalization is a database design technique used to reduce duplicate data and improve data consistency.",

        keyPoints: [
          "Duplicate data is also called data redundancy.",
          "Normalization divides large tables into smaller related tables.",
          "First Normal Form requires atomic values.",
          "Second Normal Form removes partial dependency.",
          "Third Normal Form removes transitive dependency.",
          "BCNF is a stronger version of Third Normal Form.",
          "Too much normalization can increase the number of joins.",
        ],

        realWorldExample:
          "Instead of storing a customer's name, phone number and address in every order row, customer details are stored once in a users table. The orders table stores only the user ID.",

        interviewAnswer:
          "Normalization is the process of organizing database tables to reduce redundancy and improve data integrity. Common normal forms are 1NF, 2NF and 3NF, which remove repeating groups, partial dependencies and transitive dependencies.",

        revisionPoints: [
          "Normalization reduces duplicate data.",
          "1NF means atomic values.",
          "2NF removes partial dependency.",
          "3NF removes transitive dependency.",
          "Normalized tables are connected using keys.",
        ],
      },

      resources: [
        {
          title: "Read Normalization Notes",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/",
        },
      ],
    },
  ],
};

export default dbms;