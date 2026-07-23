const operatingSystem = {
  id: "operating-system",
  title: "Operating System",
  shortTitle: "OS",
  category: "Core Computer Science",

  description:
    "Learn operating system fundamentals, processes, threads, scheduling and deadlocks.",

  estimatedHours: 4,

  resources: [
    {
      id: "os-course",
      title: "Operating System Course",
      provider: "NPTEL",
      type: "course",
      url: "https://nptel.ac.in/courses/106105214",
    },
  ],

  topics: [
    {
      id: "introduction-to-os",
      title: "Introduction to Operating System",

      description:
        "Understand the role and major responsibilities of an operating system.",

      difficulty: "Easy",
      estimatedMinutes: 15,

      notes: {
        introduction:
          "An operating system is system software that manages computer hardware, software resources and communication between applications and hardware.",

        keyPoints: [
          "The OS acts as an interface between the user and hardware.",
          "It manages CPU, memory, files and input-output devices.",
          "It provides security and user access control.",
          "It schedules programs for execution.",
          "Examples include Windows, Linux, macOS and Android.",
        ],

        realWorldExample:
          "When multiple applications run on a laptop, the operating system decides how much CPU time and memory each application receives.",

        interviewAnswer:
          "An operating system is system software that manages hardware and software resources. It handles process management, memory management, file management, device management and security.",

        revisionPoints: [
          "OS connects applications with hardware.",
          "OS manages CPU and memory.",
          "OS manages files and devices.",
          "OS provides security.",
        ],
      },

      resources: [
        {
          title: "Read Operating System Introduction",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/operating-systems/introduction-of-operating-system-set-1/",
        },
      ],
    },

    {
      id: "process-vs-thread",
      title: "Process vs Thread",

      description:
        "Understand processes, threads and the main differences between them.",

      difficulty: "Easy",
      estimatedMinutes: 20,

      notes: {
        introduction:
          "A process is a program currently being executed. A thread is the smallest unit of execution inside a process.",

        keyPoints: [
          "Each process has its own memory space.",
          "Threads of the same process share memory.",
          "Creating a process is more expensive than creating a thread.",
          "Communication between threads is faster.",
          "A problem in one process usually does not directly affect another process.",
          "A problem in one thread may affect the whole process.",
        ],

        realWorldExample:
          "A web browser can run different tabs as separate processes, while a single tab may use multiple threads for rendering, network requests and user interactions.",

        interviewAnswer:
          "A process is an independent program in execution with its own memory, while a thread is a lightweight execution unit inside a process. Threads share the same process resources and are faster to create and communicate between.",

        revisionPoints: [
          "Process has separate memory.",
          "Threads share process memory.",
          "Threads are lightweight.",
          "Process creation is more expensive.",
        ],
      },

      resources: [
        {
          title: "Read Process vs Thread",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/operating-systems/difference-between-process-and-thread/",
        },
      ],
    },

    {
      id: "deadlock",
      title: "Deadlock",

      description:
        "Learn deadlock conditions, prevention and avoidance.",

      difficulty: "Medium",
      estimatedMinutes: 25,

      notes: {
        introduction:
          "Deadlock occurs when two or more processes wait indefinitely for resources held by each other.",

        keyPoints: [
          "Mutual exclusion means a resource can be used by one process at a time.",
          "Hold and wait means a process holds one resource while waiting for another.",
          "No preemption means a resource cannot be forcibly taken.",
          "Circular wait means processes form a circular dependency.",
          "All four conditions are required for deadlock.",
          "Deadlock can be prevented by breaking at least one condition.",
          "Banker's Algorithm can be used for deadlock avoidance.",
        ],

        realWorldExample:
          "Process A holds resource 1 and waits for resource 2. Process B holds resource 2 and waits for resource 1. Neither process can continue.",

        interviewAnswer:
          "Deadlock is a condition where processes wait indefinitely for resources held by one another. Its four necessary conditions are mutual exclusion, hold and wait, no preemption and circular wait.",

        revisionPoints: [
          "Deadlock means indefinite waiting.",
          "Four necessary conditions exist.",
          "Break one condition to prevent deadlock.",
          "Banker's Algorithm supports avoidance.",
        ],
      },

      resources: [
        {
          title: "Read Deadlock Notes",
          provider: "GeeksforGeeks",
          type: "article",
          url: "https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/",
        },
      ],
    },
  ],
};

export default operatingSystem;