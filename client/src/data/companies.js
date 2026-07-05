// Company Interview Preparation Data
const companies = [
  {
    name: "Google",
    logo: "🔵",
    color: "from-blue-500 to-cyan-500",
    rounds: 5,
    difficulty: "Very Hard",
    avgSalary: { junior: "35–45 LPA", mid: "55–75 LPA", senior: "90–130 LPA" },
    about: "Google hires candidates based on Problem Solving, Coding Skills, Data Structures, Algorithms, Communication, Leadership, and System Design.",
    syllabus: "https://www.google.com/search?q=Google+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Arrays", "Strings", "HashMap", "Trees", "Graphs", "Dynamic Programming"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical Interview I", topics: ["DSA", "Coding", "OOP", "Java", "DBMS", "OS"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical Interview II", topics: ["Graphs", "DP", "Backtracking", "System Design"], duration: "45 Minutes", difficulty: "Very Hard" },
      { round: 4, title: "Googliness Interview", topics: ["Leadership", "Communication", "Behavioural"], duration: "45 Minutes", difficulty: "Medium" },
      { round: 5, title: "Hiring Manager", topics: ["Leadership", "Past Projects", "Motivation"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Sliding Window", "Prefix Sum", "HashMap", "Stack", "Queue", "Linked List", "Trees", "BST", "Heap", "Graph – DFS/BFS", "Dynamic Programming", "Greedy", "Backtracking", "Bit Manipulation"],
      CS: ["Operating System", "DBMS", "Computer Networks", "OOP"],
      SystemDesign: ["Load Balancer", "Caching", "CDN", "Microservices", "API Design", "Database Sharding", "Message Queue"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "HashMap"] },
      { week: 2, topics: ["Linked List", "Stack", "Queue"] },
      { week: 3, topics: ["Trees", "Heap", "BST"] },
      { week: 4, topics: ["Graphs", "DP", "Greedy"] }
    ],
    faqs: ["Explain HashMap.", "Difference between HashMap and Hashtable.", "What is JVM?", "What is BFS?", "Design TinyURL.", "Design YouTube."],
    tips: ["Solve 300+ LeetCode problems", "Practice Medium & Hard", "Learn System Design fundamentals", "Do mock interviews", "Read Google engineering blog"],
    resources: [
      { name: "Striver Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "NeetCode", url: "https://neetcode.io/" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/google-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
  {
    name: "Microsoft",
    logo: "🟦",
    color: "from-blue-600 to-indigo-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "30–42 LPA", mid: "50–70 LPA", senior: "80–120 LPA" },
    about: "Microsoft focuses on Problem Solving, Coding, Culture Fit, and System Design. Interviews are collaborative and friendly in tone.",
    syllabus: "https://www.google.com/search?q=Microsoft+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Aptitude", "Coding"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical Interview I", topics: ["DSA", "Arrays", "Trees", "Graphs"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical Interview II", topics: ["System Design", "OOP", "OS", "DBMS"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR & Culture Fit", topics: ["Behavioral", "Teamwork", "Leadership"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "LinkedList", "Trees", "BST", "Graphs – DFS/BFS", "DP", "Backtracking", "Sliding Window", "Two Pointers"],
      CS: ["OOP", "OS", "DBMS", "Computer Networks"],
      SystemDesign: ["Microservices", "API Design", "Caching", "Load Balancer", "Azure Architecture"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "Two Pointers"] },
      { week: 2, topics: ["Trees", "BST", "Recursion"] },
      { week: 3, topics: ["Graphs", "DP", "Backtracking"] },
      { week: 4, topics: ["System Design", "OOP Principles", "OS Concepts"] }
    ],
    faqs: ["What is polymorphism?", "Difference between process and thread.", "What is a deadlock?", "Explain BFS vs DFS.", "Design a URL shortener.", "What is SOLID principle?"],
    tips: ["Focus on problem-solving clarity", "Think out loud during interviews", "Prepare behavioral answers using STAR", "Study .NET and Azure basics", "Practice on LeetCode and HackerRank"],
    resources: [
      { name: "Striver Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/microsoft-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "InterviewBit", url: "https://www.interviewbit.com/microsoft-interview-questions/" }
    ]
  },
  {
    name: "Amazon",
    logo: "🟠",
    color: "from-orange-500 to-amber-500",
    rounds: 6,
    difficulty: "Hard",
    avgSalary: { junior: "28–40 LPA", mid: "45–65 LPA", senior: "75–110 LPA" },
    about: "Amazon interviews are heavily driven by their 16 Leadership Principles. Every technical answer should tie back to an LP.",
    syllabus: "https://www.google.com/search?q=Amazon+SDE+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Work Simulation", "Reasoning"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Phone Screen", topics: ["DSA", "Arrays", "Trees"], duration: "45 Minutes", difficulty: "Medium" },
      { round: 3, title: "Technical Loop I", topics: ["DSA", "Coding", "LP Questions"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "Technical Loop II", topics: ["System Design", "Scalability", "AWS"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 5, title: "Technical Loop III", topics: ["DP", "Graphs", "Backtracking"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 6, title: "Bar Raiser", topics: ["Leadership Principles", "Behavioral", "Culture"], duration: "60 Minutes", difficulty: "Hard" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "HashMap", "Linked List", "Trees", "BST", "Graphs", "DP", "Greedy", "Sliding Window"],
      CS: ["OS", "DBMS", "Networking", "OOP"],
      SystemDesign: ["S3", "DynamoDB", "SQS", "Lambda", "Load Balancer", "Microservices", "Eventual Consistency"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "HashMap"] },
      { week: 2, topics: ["Trees", "Linked List", "Stack/Queue"] },
      { week: 3, topics: ["Graphs", "DP", "Greedy"] },
      { week: 4, topics: ["System Design", "Leadership Principles", "AWS Basics"] }
    ],
    faqs: ["Tell me about a time you failed.", "Design Amazon's order management system.", "What is consistent hashing?", "Explain CAP theorem.", "Design a notification system.", "Difference between SQL and NoSQL."],
    tips: ["Memorize all 16 Leadership Principles", "Use STAR format for every behavioral answer", "Practice system design with AWS in mind", "Solve 200+ LeetCode problems", "Study distributed systems concepts"],
    resources: [
      { name: "Amazon LP Guide", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles" },
      { name: "Striver Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Meta",
    logo: "🔷",
    color: "from-blue-500 to-purple-500",
    rounds: 5,
    difficulty: "Very Hard",
    avgSalary: { junior: "40–55 LPA", mid: "70–95 LPA", senior: "100–150 LPA" },
    about: "Meta (Facebook) focuses heavily on coding speed, clean solutions, and system design at massive scale.",
    syllabus: "https://www.google.com/search?q=Meta+Facebook+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Recruiter Screen", topics: ["Background", "Experience", "Motivation"], duration: "30 Minutes", difficulty: "Easy" },
      { round: 2, title: "Phone Screen", topics: ["DSA", "Arrays", "Strings", "Graphs"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Coding I", topics: ["Arrays", "Trees", "DP", "Graphs"], duration: "45 Minutes", difficulty: "Very Hard" },
      { round: 4, title: "Coding II", topics: ["Backtracking", "Sliding Window", "Heap"], duration: "45 Minutes", difficulty: "Very Hard" },
      { round: 5, title: "System Design + Behavioral", topics: ["News Feed Design", "Real-time Systems", "Leadership"], duration: "60 Minutes", difficulty: "Hard" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Graphs – BFS/DFS", "Trees", "Heap", "DP", "Backtracking", "Sliding Window", "Two Pointers", "Bit Manipulation"],
      CS: ["OS", "Networking", "Distributed Systems"],
      SystemDesign: ["News Feed", "Messenger", "Stories", "Caching", "CDN", "Sharding", "Real-time Pub/Sub"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "Two Pointers", "Sliding Window"] },
      { week: 2, topics: ["Trees", "Graphs", "BFS/DFS"] },
      { week: 3, topics: ["DP", "Backtracking", "Heap"] },
      { week: 4, topics: ["System Design", "Distributed Systems", "Mock Interviews"] }
    ],
    faqs: ["Design Facebook News Feed.", "Clone a graph.", "Find all connected components.", "Design a messaging system.", "What is eventual consistency?", "Serialize and deserialize a binary tree."],
    tips: ["Speed matters — practice timed solutions", "NeetCode 150 is highly recommended", "Study distributed systems deeply", "Understand large-scale caching patterns", "Practice coding on a whiteboard or plain editor"],
    resources: [
      { name: "NeetCode 150", url: "https://neetcode.io/practice" },
      { name: "Striver Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Adobe",
    logo: "🔴",
    color: "from-red-500 to-rose-500",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "20–30 LPA", mid: "35–50 LPA", senior: "55–80 LPA" },
    about: "Adobe focuses on DSA, OOP design patterns, and domain knowledge in creative technology.",
    syllabus: "https://www.google.com/search?q=Adobe+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Aptitude", "Coding"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["Arrays", "Trees", "OOP", "Design Patterns"], duration: "45 Minutes", difficulty: "Medium-Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "LLD", "SOLID Principles"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Salary", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "LinkedList", "Trees", "Graphs", "DP", "Sorting", "Searching"],
      CS: ["OOP", "Design Patterns", "OS", "DBMS"],
      SystemDesign: ["LLD", "HLD", "SOLID", "Factory Pattern", "Observer Pattern"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "Sorting"] },
      { week: 2, topics: ["Trees", "Graphs", "Recursion"] },
      { week: 3, topics: ["OOP", "Design Patterns", "SOLID"] },
      { week: 4, topics: ["System Design", "LLD Projects", "Mock Interviews"] }
    ],
    faqs: ["What is the Factory design pattern?", "Difference between abstract class and interface.", "Explain SOLID principles.", "Design a parking lot system.", "What is polymorphism?", "Reverse a linked list."],
    tips: ["Focus on OOP and design patterns", "Practice LLD problems", "Know SOLID principles well", "Revise core CS subjects", "Prepare behavioral answers"],
    resources: [
      { name: "GeeksforGeeks Adobe", url: "https://www.geeksforgeeks.org/adobe-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "Refactoring Guru (Patterns)", url: "https://refactoring.guru/design-patterns" }
    ]
  },
  {
    name: "Apple",
    logo: "🍎",
    color: "from-gray-500 to-slate-600",
    rounds: 5,
    difficulty: "Very Hard",
    avgSalary: { junior: "40–60 LPA", mid: "70–100 LPA", senior: "110–160 LPA" },
    about: "Apple emphasizes strong fundamentals, hardware-software interaction, and polish in solutions. Expect deep dives.",
    syllabus: "https://www.google.com/search?q=Apple+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Recruiter Screen", topics: ["Background", "Experience"], duration: "30 Minutes", difficulty: "Easy" },
      { round: 2, title: "Technical Phone Screen", topics: ["DSA", "Coding"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "On-site Coding I", topics: ["Arrays", "Trees", "Graphs", "DP"], duration: "60 Minutes", difficulty: "Very Hard" },
      { round: 4, title: "On-site System Design", topics: ["iOS Architecture", "System Design", "API Design"], duration: "60 Minutes", difficulty: "Very Hard" },
      { round: 5, title: "Behavioral", topics: ["Leadership", "Collaboration", "Past Work"], duration: "45 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Graphs", "DP", "Heap", "Trie", "Bit Manipulation"],
      CS: ["OS", "Memory Management", "Networking", "Multithreading"],
      SystemDesign: ["iOS Architecture", "MVC/MVVM", "API Design", "Caching", "CDN"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "HashMap"] },
      { week: 2, topics: ["Trees", "Graphs", "Heap"] },
      { week: 3, topics: ["DP", "Trie", "Bit Manipulation"] },
      { week: 4, topics: ["System Design", "OS Concepts", "Concurrency"] }
    ],
    faqs: ["Design the App Store.", "What is MVC pattern?", "Explain memory management in iOS.", "What is a deadlock?", "How does garbage collection work?", "Design a photo sharing app."],
    tips: ["Know your core CS fundamentals deeply", "Study iOS development if applying for mobile", "Practice very hard LeetCode problems", "Understand memory and threading", "Be precise and thorough in explanations"],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "NeetCode", url: "https://neetcode.io/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Netflix",
    logo: "🔴",
    color: "from-red-600 to-red-800",
    rounds: 4,
    difficulty: "Very Hard",
    avgSalary: { junior: "50–70 LPA", mid: "90–120 LPA", senior: "140–200 LPA" },
    about: "Netflix has a unique culture of Freedom & Responsibility. They hire the best and pay top of market. Interviews are very rigorous.",
    syllabus: "https://www.google.com/search?q=Netflix+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Recruiter Screen", topics: ["Background", "Culture Fit"], duration: "30 Minutes", difficulty: "Easy" },
      { round: 2, title: "Technical Screen", topics: ["DSA", "Coding", "System Design Basics"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "Systems Design", topics: ["Streaming", "CDN", "Microservices", "Scalability"], duration: "60 Minutes", difficulty: "Very Hard" },
      { round: 4, title: "Culture + Leadership", topics: ["Netflix Culture", "Behavioral", "Decision Making"], duration: "45 Minutes", difficulty: "Hard" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "DP", "Trie", "Heap", "Sliding Window"],
      CS: ["Distributed Systems", "Streaming Protocols", "Networking"],
      SystemDesign: ["Video Streaming", "CDN", "Recommendation System", "Microservices", "Fault Tolerance", "Chaos Engineering"]
    },
    roadmap: [
      { week: 1, topics: ["DSA – Hard problems", "LeetCode Hard"] },
      { week: 2, topics: ["Distributed Systems", "Networking"] },
      { week: 3, topics: ["System Design – Streaming", "Microservices"] },
      { week: 4, topics: ["Netflix Culture Deck", "Mock Interviews"] }
    ],
    faqs: ["Design Netflix.", "What is the CAP theorem?", "How does a CDN work?", "Explain fault tolerance.", "Design a recommendation engine.", "What is chaos engineering?"],
    tips: ["Read the Netflix culture deck carefully", "Deep dive into streaming architecture", "Know distributed systems very well", "Prepare for very high difficulty coding", "Study microservices patterns"],
    resources: [
      { name: "Netflix Tech Blog", url: "https://netflixtechblog.com/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
  {
    name: "Uber",
    logo: "⬛",
    color: "from-gray-700 to-gray-900",
    rounds: 5,
    difficulty: "Hard",
    avgSalary: { junior: "25–38 LPA", mid: "45–65 LPA", senior: "75–100 LPA" },
    about: "Uber focuses on real-time systems, geo-spatial problems, and scalable microservices architecture.",
    syllabus: "https://www.google.com/search?q=Uber+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical Phone Screen", topics: ["DSA", "Arrays", "Graphs"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical I", topics: ["Real-time Systems", "Graphs", "DP"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "System Design", topics: ["Ride Matching", "Geo-spatial", "Microservices"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 5, title: "Behavioral", topics: ["Leadership", "Ownership", "Culture"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Graphs", "Dijkstra", "Priority Queue", "Geohashing", "Sliding Window", "DP"],
      CS: ["OS", "Distributed Systems", "Networking"],
      SystemDesign: ["Uber Ride Matching", "Surge Pricing", "Real-time Tracking", "Microservices", "Kafka"]
    },
    roadmap: [
      { week: 1, topics: ["Graphs", "Shortest Path Algorithms"] },
      { week: 2, topics: ["Priority Queue", "Heap", "Sliding Window"] },
      { week: 3, topics: ["System Design – Real-time", "Geo-spatial Systems"] },
      { week: 4, topics: ["Microservices", "Kafka", "Mock Interviews"] }
    ],
    faqs: ["Design Uber's ride matching system.", "What is geohashing?", "Explain Dijkstra's algorithm.", "How does surge pricing work?", "Design a real-time tracking system.", "What is Kafka?"],
    tips: ["Focus on graph algorithms", "Study geospatial indexing", "Understand real-time systems", "Practice system design with real-time constraints", "Know Kafka and message queues"],
    resources: [
      { name: "Uber Engineering Blog", url: "https://www.uber.com/blog/engineering/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Goldman Sachs",
    logo: "🏦",
    color: "from-yellow-600 to-amber-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "20–32 LPA", mid: "40–60 LPA", senior: "65–100 LPA" },
    about: "Goldman Sachs focuses on analytical skills, quant reasoning, and strong DSA. Finance domain knowledge is a plus.",
    syllabus: "https://www.google.com/search?q=Goldman+Sachs+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Quant", "Logical Reasoning"], duration: "120 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["DSA", "Coding", "OOP"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "DBMS", "Concurrency"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Finance Domain", "Motivation"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "HashMap", "Sorting", "Trees", "Graphs", "DP", "Backtracking"],
      CS: ["OOP", "DBMS", "OS", "Multithreading"],
      SystemDesign: ["Low Latency Systems", "Trade Processing", "Concurrency", "Database Design"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "HashMap", "Sorting"] },
      { week: 2, topics: ["Trees", "Graphs", "Recursion"] },
      { week: 3, topics: ["DP", "Backtracking", "OOP Concepts"] },
      { week: 4, topics: ["DBMS", "OS", "Concurrency", "Mock Interviews"] }
    ],
    faqs: ["What is multithreading?", "Explain ACID properties.", "What is a deadlock?", "Design a stock trading system.", "What is normalization?", "Difference between mutex and semaphore."],
    tips: ["Strong analytical and quant skills needed", "Know DBMS and SQL deeply", "Understand concurrency and threading", "Practice HackerRank challenges", "Prepare finance-tech crossover questions"],
    resources: [
      { name: "GeeksforGeeks GS", url: "https://www.geeksforgeeks.org/goldman-sachs-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "HackerRank", url: "https://www.hackerrank.com/" }
    ]
  },
  {
    name: "JP Morgan",
    logo: "🏛️",
    color: "from-blue-700 to-blue-900",
    rounds: 3,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "18–28 LPA", mid: "35–55 LPA", senior: "60–90 LPA" },
    about: "JP Morgan Chase focuses on DSA, system design with finance context, and strong communication skills.",
    syllabus: "https://www.google.com/search?q=JP+Morgan+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Aptitude", "Finance Basics"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical Interview", topics: ["DSA", "System Design", "DBMS", "OOP"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "HR Round", topics: ["Behavioral", "Finance Interest", "Teamwork"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Graphs", "DP", "Sorting"],
      CS: ["OOP", "DBMS", "SQL", "OS"],
      SystemDesign: ["Trade Systems", "Database Design", "Batch Processing", "API Design"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "SQL"] },
      { week: 2, topics: ["Trees", "Graphs", "OOP Concepts"] },
      { week: 3, topics: ["System Design", "Finance Domain Basics"] },
      { week: 4, topics: ["Mock Interviews", "Behavioral Prep"] }
    ],
    faqs: ["What is SQL join?", "Explain normalization.", "Design a banking system.", "What is a foreign key?", "Difference between stack and heap memory.", "What is REST API?"],
    tips: ["Know SQL and DBMS very well", "Learn basic finance concepts", "Practice system design", "Focus on communication clarity", "Review OOP design patterns"],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/jp-morgan-interview-preparation/" },
      { name: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql" }
    ]
  },
  {
    name: "Oracle",
    logo: "🔴",
    color: "from-red-600 to-orange-600",
    rounds: 4,
    difficulty: "Medium",
    avgSalary: { junior: "15–25 LPA", mid: "30–50 LPA", senior: "55–80 LPA" },
    about: "Oracle focuses on Java, Database internals, and Enterprise system design.",
    syllabus: "https://www.google.com/search?q=Oracle+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Java", "DSA", "DBMS"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["Java OOP", "Collections", "Multithreading"], duration: "45 Minutes", difficulty: "Medium" },
      { round: 3, title: "Technical II", topics: ["SQL", "Database Design", "System Design"], duration: "45 Minutes", difficulty: "Medium-Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Experience", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Graphs", "Sorting", "Hashing"],
      CS: ["Java", "OOP", "Collections", "Multithreading", "DBMS", "SQL"],
      SystemDesign: ["Database Design", "Enterprise Architecture", "API Design", "Caching"]
    },
    roadmap: [
      { week: 1, topics: ["Java Core", "OOP Concepts", "Collections"] },
      { week: 2, topics: ["Arrays", "Trees", "Graphs"] },
      { week: 3, topics: ["SQL", "DBMS", "Database Design"] },
      { week: 4, topics: ["Multithreading", "System Design", "Mock Interviews"] }
    ],
    faqs: ["What is Java garbage collection?", "Difference between HashMap and TreeMap.", "What is a transaction in DBMS?", "Explain ACID properties.", "What is an index in SQL?", "Design an e-commerce database schema."],
    tips: ["Master Java Core and Collections", "Deep dive into SQL and DBMS", "Understand database indexing and transactions", "Practice enterprise system design", "Know JVM internals"],
    resources: [
      { name: "GeeksforGeeks Oracle", url: "https://www.geeksforgeeks.org/oracle-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "SQL Practice", url: "https://www.hackerrank.com/domains/sql" }
    ]
  },
  {
    name: "Infosys",
    logo: "🟣",
    color: "from-purple-500 to-violet-500",
    rounds: 3,
    difficulty: "Easy-Medium",
    avgSalary: { junior: "3.6–6 LPA", mid: "8–15 LPA", senior: "18–30 LPA" },
    about: "Infosys recruitment is aptitude-heavy with basic coding. Focus on verbal ability, logical reasoning, and programming fundamentals.",
    syllabus: "https://www.google.com/search?q=Infosys+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Aptitude", "Logical Reasoning", "Verbal Ability", "Basic Coding"], duration: "180 Minutes", difficulty: "Easy-Medium" },
      { round: 2, title: "Technical Interview", topics: ["DSA Basics", "OOP", "DBMS", "Favorite Language"], duration: "30 Minutes", difficulty: "Medium" },
      { round: 3, title: "HR Round", topics: ["Communication", "Behavioral", "Relocation"], duration: "20 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Sorting", "Searching", "Basic Recursion"],
      CS: ["OOP Basics", "DBMS", "SQL", "OS Basics", "C/C++/Java"],
      SystemDesign: ["Basic Architecture", "Client-Server Model"]
    },
    roadmap: [
      { week: 1, topics: ["Aptitude – Quantitative", "Logical Reasoning"] },
      { week: 2, topics: ["Verbal Ability", "Coding – Easy Problems"] },
      { week: 3, topics: ["OOP", "DBMS", "SQL"] },
      { week: 4, topics: ["Mock Tests", "HR Preparation", "Communication"] }
    ],
    faqs: ["What is OOP?", "Difference between C++ and Java.", "What is normalization?", "Explain inheritance.", "What is a pointer?", "What is an operating system?"],
    tips: ["Focus heavily on aptitude and reasoning", "Practice verbal ability", "Know one programming language deeply", "Prepare for basic CS questions", "Work on communication skills"],
    resources: [
      { name: "InfyTQ", url: "https://infytq.onlineregistration.in/" },
      { name: "GeeksforGeeks Infosys", url: "https://www.geeksforgeeks.org/infosys-interview-preparation/" },
      { name: "PrepInsta", url: "https://prepinsta.com/infosys/" }
    ]
  },
  {
    name: "TCS",
    logo: "🔵",
    color: "from-cyan-600 to-blue-600",
    rounds: 3,
    difficulty: "Easy",
    avgSalary: { junior: "3.36–7 LPA", mid: "7–14 LPA", senior: "15–25 LPA" },
    about: "TCS NQT (National Qualifier Test) is the entry point. Aptitude, coding, and communication are key.",
    syllabus: "https://www.google.com/search?q=TCS+NQT+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "TCS NQT", topics: ["Numerical Ability", "Verbal Ability", "Reasoning", "Coding"], duration: "180 Minutes", difficulty: "Easy" },
      { round: 2, title: "Technical Interview", topics: ["Favorite Language", "DSA Basics", "DBMS", "OOP"], duration: "30 Minutes", difficulty: "Easy-Medium" },
      { round: 3, title: "HR Round", topics: ["Communication", "Relocation", "Goals"], duration: "20 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Sorting", "Basic Programs"],
      CS: ["OOP", "DBMS Basics", "SQL", "C/C++/Java/Python"],
      SystemDesign: []
    },
    roadmap: [
      { week: 1, topics: ["TCS NQT Syllabus", "Aptitude Practice"] },
      { week: 2, topics: ["Coding – Easy Problems", "Basic Programming"] },
      { week: 3, topics: ["OOP", "DBMS", "SQL Basics"] },
      { week: 4, topics: ["Mock NQT Tests", "HR Preparation"] }
    ],
    faqs: ["What is your favorite programming language?", "Difference between OOP and procedural programming.", "What is a primary key?", "Explain loops.", "What is recursion?", "What are your strengths and weaknesses?"],
    tips: ["Practice TCS NQT previous papers", "Focus on aptitude and reasoning", "Know basic programming well", "Prepare for HR questions", "Be confident in communication"],
    resources: [
      { name: "TCS NQT Official", url: "https://www.tcs.com/careers/tcs-nqt" },
      { name: "PrepInsta TCS", url: "https://prepinsta.com/tcs/" },
      { name: "GeeksforGeeks TCS", url: "https://www.geeksforgeeks.org/tcs-interview-preparation/" }
    ]
  },
  {
    name: "Accenture",
    logo: "⚡",
    color: "from-purple-600 to-pink-600",
    rounds: 3,
    difficulty: "Easy-Medium",
    avgSalary: { junior: "4–8 LPA", mid: "10–18 LPA", senior: "20–35 LPA" },
    about: "Accenture focuses on communication, aptitude, and basic technical skills. Great for freshers.",
    syllabus: "https://www.google.com/search?q=Accenture+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Test", topics: ["Cognitive Ability", "Technical Assessment", "Communication"], duration: "90 Minutes", difficulty: "Easy" },
      { round: 2, title: "Technical Interview", topics: ["OOP", "DSA Basics", "Favorite Language", "DBMS"], duration: "30 Minutes", difficulty: "Medium" },
      { round: 3, title: "HR Round", topics: ["Communication", "Flexibility", "Career Goals"], duration: "20 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Basic Sorting", "Searching"],
      CS: ["OOP", "DBMS", "SQL", "Basic Programming"],
      SystemDesign: []
    },
    roadmap: [
      { week: 1, topics: ["Aptitude", "Logical Reasoning"] },
      { week: 2, topics: ["OOP", "DBMS", "SQL"] },
      { week: 3, topics: ["Communication Practice", "HR Questions"] },
      { week: 4, topics: ["Mock Interviews", "Technical Revision"] }
    ],
    faqs: ["Tell me about yourself.", "What is OOP?", "Explain polymorphism.", "What is SQL JOIN?", "Where do you see yourself in 5 years?", "What is your greatest strength?"],
    tips: ["Focus on communication and soft skills", "Practice aptitude tests", "Know OOP concepts clearly", "Prepare a strong introduction", "Be flexible and show willingness to learn"],
    resources: [
      { name: "PrepInsta Accenture", url: "https://prepinsta.com/accenture/" },
      { name: "GeeksforGeeks Accenture", url: "https://www.geeksforgeeks.org/accenture-interview-preparation/" }
    ]
  },
  {
    name: "Flipkart",
    logo: "🛒",
    color: "from-yellow-500 to-orange-500",
    rounds: 5,
    difficulty: "Hard",
    avgSalary: { junior: "20–35 LPA", mid: "40–60 LPA", senior: "65–95 LPA" },
    about: "Flipkart (Walmart) focuses on DSA, system design at e-commerce scale, and leadership principles similar to Amazon.",
    syllabus: "https://www.google.com/search?q=Flipkart+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding", "Problem Solving"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["Arrays", "Trees", "Graphs"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["DP", "Backtracking", "OOP"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 4, title: "System Design", topics: ["E-commerce Scale", "Microservices", "Database"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 5, title: "HR / Leadership", topics: ["Behavioral", "Leadership", "Culture"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Graphs", "DP", "Heap", "Sliding Window", "Backtracking"],
      CS: ["OOP", "DBMS", "OS", "Distributed Systems"],
      SystemDesign: ["Product Catalog", "Shopping Cart", "Order Management", "Payment Gateway", "Search", "Recommendation"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "HashMap"] },
      { week: 2, topics: ["Trees", "Graphs", "Heap"] },
      { week: 3, topics: ["DP", "Backtracking", "OOP"] },
      { week: 4, topics: ["E-commerce System Design", "Mock Interviews"] }
    ],
    faqs: ["Design Flipkart's product search.", "What is consistent hashing?", "Explain CAP theorem.", "Design a shopping cart system.", "What is eventual consistency?", "How does a recommendation system work?"],
    tips: ["Study Amazon-style system design", "Practice hard DSA problems", "Know e-commerce domain patterns", "Prepare leadership principle answers", "Study microservices architecture"],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "GeeksforGeeks Flipkart", url: "https://www.geeksforgeeks.org/flipkart-interview-preparation/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Razorpay",
    logo: "💳",
    color: "from-blue-600 to-cyan-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "18–30 LPA", mid: "35–55 LPA", senior: "60–90 LPA" },
    about: "Razorpay focuses on payment systems, distributed transactions, and strong DSA. Fintech-specific system design is key.",
    syllabus: "https://www.google.com/search?q=Razorpay+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["DSA", "OOP", "DBMS"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "Payment Systems", "Microservices"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR / Culture", topics: ["Behavioral", "Startup Culture", "Motivation"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Graphs", "DP", "Hashing"],
      CS: ["OOP", "DBMS", "Distributed Transactions", "Security"],
      SystemDesign: ["Payment Gateway", "Idempotency", "Distributed Transactions", "Webhook System", "Fraud Detection"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Graphs", "Hashing"] },
      { week: 2, topics: ["DBMS", "Transactions", "SQL"] },
      { week: 3, topics: ["Payment System Design", "Distributed Transactions"] },
      { week: 4, topics: ["Security Basics", "Mock Interviews"] }
    ],
    faqs: ["Design a payment gateway.", "What is idempotency?", "How to handle distributed transactions?", "What is two-phase commit?", "Design a fraud detection system.", "What is a webhook?"],
    tips: ["Understand payment flows deeply", "Learn distributed transaction patterns", "Know security basics for fintech", "Study idempotency and retry mechanisms", "Practice fintech system design"],
    resources: [
      { name: "Razorpay Engineering Blog", url: "https://engineering.razorpay.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "PhonePe",
    logo: "📱",
    color: "from-purple-600 to-indigo-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "18–30 LPA", mid: "35–55 LPA", senior: "58–85 LPA" },
    about: "PhonePe focuses on fintech engineering, UPI payment systems, and large-scale distributed systems.",
    syllabus: "https://www.google.com/search?q=PhonePe+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding"], duration: "90 Minutes", difficulty: "Medium-Hard" },
      { round: 2, title: "Technical I", topics: ["DSA", "OOP", "Java/Python"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["UPI System", "Microservices", "Scalability"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Fintech Interest", "Culture"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "DP", "Hashing", "Trees"],
      CS: ["Java", "Spring Boot", "Microservices", "DBMS"],
      SystemDesign: ["UPI Payment Flow", "Wallet System", "Transaction Management", "Notification System"]
    },
    roadmap: [
      { week: 1, topics: ["DSA – Medium/Hard Problems"] },
      { week: 2, topics: ["Java", "Spring Boot", "Microservices"] },
      { week: 3, topics: ["Fintech System Design", "UPI Architecture"] },
      { week: 4, topics: ["DBMS", "Mock Interviews"] }
    ],
    faqs: ["Design UPI payment system.", "How does a digital wallet work?", "What is Spring Boot?", "Explain microservices architecture.", "What is a transaction rollback?", "Design a notification system."],
    tips: ["Understand UPI and payment flows", "Know Java and Spring Boot", "Practice fintech system design", "Study microservices deeply", "Learn about financial reconciliation"],
    resources: [
      { name: "PhonePe Tech Blog", url: "https://tech.phonepe.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Swiggy",
    logo: "🍔",
    color: "from-orange-500 to-red-500",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "18–30 LPA", mid: "35–55 LPA", senior: "60–90 LPA" },
    about: "Swiggy focuses on real-time delivery systems, location services, and high-throughput architecture.",
    syllabus: "https://www.google.com/search?q=Swiggy+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding", "Aptitude"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["DSA", "Graphs", "Location Algorithms"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["Food Delivery System", "Real-time Tracking", "Microservices"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Startup Culture", "Motivation"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Graphs", "Dijkstra", "Priority Queue", "Geohashing", "Arrays", "DP"],
      CS: ["OS", "Distributed Systems", "Networking"],
      SystemDesign: ["Food Delivery System", "Delivery Partner Assignment", "Real-time Tracking", "Recommendation", "Search"]
    },
    roadmap: [
      { week: 1, topics: ["Graphs", "Shortest Path", "Priority Queue"] },
      { week: 2, topics: ["Arrays", "DP", "Hashing"] },
      { week: 3, topics: ["Delivery System Design", "Location Services"] },
      { week: 4, topics: ["Microservices", "Mock Interviews"] }
    ],
    faqs: ["Design Swiggy's food delivery system.", "How do you assign delivery partners?", "What is geohashing?", "Design a real-time tracking system.", "Explain Dijkstra's algorithm.", "What is a message queue?"],
    tips: ["Focus on location and routing algorithms", "Study delivery system design patterns", "Know graphs and shortest path algorithms", "Understand real-time systems", "Practice geospatial system design"],
    resources: [
      { name: "Swiggy Engineering Blog", url: "https://bytes.swiggy.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Zomato",
    logo: "🍕",
    color: "from-red-500 to-rose-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "15–28 LPA", mid: "30–50 LPA", senior: "55–80 LPA" },
    about: "Zomato interviews focus on DSA, system design for food tech, and real-world problem solving.",
    syllabus: "https://www.google.com/search?q=Zomato+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["DSA", "OOP", "Problem Solving"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["Restaurant Discovery", "Order Management", "Recommendation"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Culture", "Motivation"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "Trees", "DP", "Hashing", "Sliding Window"],
      CS: ["OOP", "DBMS", "OS", "Microservices"],
      SystemDesign: ["Restaurant Search", "Order Tracking", "Recommendation Engine", "Notification System"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Hashing", "Graphs"] },
      { week: 2, topics: ["Trees", "DP", "Sliding Window"] },
      { week: 3, topics: ["Food Tech System Design"] },
      { week: 4, topics: ["OOP", "DBMS", "Mock Interviews"] }
    ],
    faqs: ["Design Zomato's restaurant search.", "What is a recommendation system?", "Design order tracking.", "What is consistent hashing?", "Explain MapReduce.", "Design a notification service."],
    tips: ["Study food-tech specific system design", "Know recommendation systems", "Practice hard DSA", "Understand search and indexing", "Learn NoSQL databases"],
    resources: [
      { name: "Zomato Engineering Blog", url: "https://engineering.zomato.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Atlassian",
    logo: "🔷",
    color: "from-blue-500 to-indigo-500",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "25–40 LPA", mid: "50–75 LPA", senior: "85–120 LPA" },
    about: "Atlassian (Jira, Confluence) focuses on distributed systems, collaboration tools, and strong software engineering principles.",
    syllabus: "https://www.google.com/search?q=Atlassian+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["DSA", "Problem Solving"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["Jira-like System", "Distributed Systems"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "Values Interview", topics: ["Atlassian Values", "Teamwork", "Leadership"], duration: "45 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Graphs", "Trees", "DP", "Arrays", "Strings"],
      CS: ["Distributed Systems", "Concurrency", "OOP"],
      SystemDesign: ["Issue Tracker", "Collaboration Tools", "Event-driven Architecture", "Real-time Sync"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Trees", "Graphs"] },
      { week: 2, topics: ["DP", "Backtracking", "OOP"] },
      { week: 3, topics: ["Distributed Systems", "System Design"] },
      { week: 4, topics: ["Atlassian Values", "Mock Interviews"] }
    ],
    faqs: ["Design a project management tool.", "What is eventual consistency?", "Explain event-driven architecture.", "What is a distributed lock?", "Design a real-time collaboration system.", "What are CRDTs?"],
    tips: ["Study Atlassian's engineering values", "Know distributed systems deeply", "Practice system design for collaboration tools", "Understand real-time sync mechanisms", "Prepare culture-fit answers"],
    resources: [
      { name: "Atlassian Engineering Blog", url: "https://www.atlassian.com/engineering" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Salesforce",
    logo: "☁️",
    color: "from-sky-500 to-blue-600",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "20–35 LPA", mid: "40–65 LPA", senior: "70–100 LPA" },
    about: "Salesforce focuses on cloud architecture, CRM systems, Java, and enterprise-level design patterns.",
    syllabus: "https://www.google.com/search?q=Salesforce+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Coding", "Aptitude"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["Java", "OOP", "DSA"], duration: "45 Minutes", difficulty: "Medium-Hard" },
      { round: 3, title: "System Design", topics: ["CRM System", "Cloud Architecture", "Scalability"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Culture", "Equality"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Trees", "Graphs", "OOP", "Design Patterns"],
      CS: ["Java", "Cloud Computing", "REST APIs", "DBMS"],
      SystemDesign: ["CRM Architecture", "Multi-tenancy", "API Design", "Cloud Services"]
    },
    roadmap: [
      { week: 1, topics: ["Java Core", "OOP", "Design Patterns"] },
      { week: 2, topics: ["Arrays", "Trees", "Graphs"] },
      { week: 3, topics: ["Cloud Architecture", "CRM Design"] },
      { week: 4, topics: ["REST API Design", "Mock Interviews"] }
    ],
    faqs: ["What is multi-tenancy?", "Design a CRM system.", "What is Apex in Salesforce?", "Explain REST vs SOAP.", "What is cloud computing?", "Design a notification system."],
    tips: ["Know Java and OOP deeply", "Learn Salesforce platform basics", "Understand multi-tenant architecture", "Practice cloud system design", "Study REST API design"],
    resources: [
      { name: "Trailhead Salesforce", url: "https://trailhead.salesforce.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/salesforce-interview-preparation/" }
    ]
  },
  {
    name: "NVIDIA",
    logo: "🟢",
    color: "from-green-500 to-emerald-600",
    rounds: 5,
    difficulty: "Very Hard",
    avgSalary: { junior: "35–55 LPA", mid: "65–95 LPA", senior: "100–150 LPA" },
    about: "NVIDIA focuses on GPU architecture, parallel computing, CUDA programming, and high-performance systems.",
    syllabus: "https://www.google.com/search?q=NVIDIA+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Systems Programming", "C++"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["C++", "Memory Management", "Data Structures"], duration: "60 Minutes", difficulty: "Very Hard" },
      { round: 3, title: "Technical II", topics: ["Parallel Computing", "CUDA Basics", "Algorithms"], duration: "60 Minutes", difficulty: "Very Hard" },
      { round: 4, title: "System Design", topics: ["GPU Architecture", "High Performance Systems"], duration: "60 Minutes", difficulty: "Very Hard" },
      { round: 5, title: "Behavioral", topics: ["Leadership", "Research Interest", "Innovation"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "DP", "C++ STL", "Memory Management"],
      CS: ["OS", "Parallel Computing", "Computer Architecture", "CUDA"],
      SystemDesign: ["GPU Pipeline", "High Performance Computing", "Memory Hierarchy", "Parallel Algorithms"]
    },
    roadmap: [
      { week: 1, topics: ["C++ Advanced", "Memory Management", "Pointers"] },
      { week: 2, topics: ["DSA – Hard", "Graphs", "DP"] },
      { week: 3, topics: ["Parallel Computing", "CUDA Basics"] },
      { week: 4, topics: ["GPU Architecture", "HPC System Design", "Mock Interviews"] }
    ],
    faqs: ["What is CUDA?", "Explain parallel computing.", "What is memory hierarchy?", "How does a GPU work?", "What is cache coherency?", "Design a GPU scheduler."],
    tips: ["Master C++ thoroughly", "Understand parallel programming", "Study GPU architecture deeply", "Know OS and memory management well", "Research NVIDIA's products and papers"],
    resources: [
      { name: "NVIDIA Developer", url: "https://developer.nvidia.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "CUDA Programming Guide", url: "https://docs.nvidia.com/cuda/cuda-c-programming-guide/" }
    ]
  },
  {
    name: "Zoho",
    logo: "🟡",
    color: "from-yellow-500 to-orange-500",
    rounds: 4,
    difficulty: "Medium",
    avgSalary: { junior: "5–10 LPA", mid: "12–22 LPA", senior: "25–40 LPA" },
    about: "Zoho values strong fundamentals and passion for product building. They prefer developers who can build things from scratch.",
    syllabus: "https://www.google.com/search?q=Zoho+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Written Test", topics: ["Programming Basics", "Logic", "Aptitude"], duration: "3 Hours", difficulty: "Medium" },
      { round: 2, title: "Coding Round", topics: ["DSA", "Problem Solving", "Java/C++"], duration: "3 Hours", difficulty: "Medium" },
      { round: 3, title: "Technical Interview", topics: ["Projects", "OOP", "System Design"], duration: "60 Minutes", difficulty: "Medium" },
      { round: 4, title: "HR Round", topics: ["Passion", "Communication", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "LinkedList", "Trees", "Sorting", "Searching"],
      CS: ["OOP", "DBMS", "SQL", "Core Java"],
      SystemDesign: ["Basic Architecture", "Database Design", "API Design"]
    },
    roadmap: [
      { week: 1, topics: ["C/C++ or Java Fundamentals"] },
      { week: 2, topics: ["DSA – Arrays, Strings, Trees"] },
      { week: 3, topics: ["OOP", "DBMS", "SQL"] },
      { week: 4, topics: ["Project Discussion", "Mock Interviews"] }
    ],
    faqs: ["Build a simple linked list.", "Write a sorting algorithm.", "What is OOP?", "Design a database schema.", "What are your projects?", "Why Zoho?"],
    tips: ["Practice writing code from scratch", "Know your projects deeply", "Strong C++ or Java fundamentals required", "Be passionate about product building", "Practice aptitude thoroughly"],
    resources: [
      { name: "GeeksforGeeks Zoho", url: "https://www.geeksforgeeks.org/zoho-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
  {
    name: "Freshworks",
    logo: "🌿",
    color: "from-green-500 to-teal-500",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "12–22 LPA", mid: "25–40 LPA", senior: "45–70 LPA" },
    about: "Freshworks focuses on SaaS product engineering, DSA, and building customer-facing tools.",
    syllabus: "https://www.google.com/search?q=Freshworks+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Aptitude", "Coding"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["DSA", "OOP", "Problem Solving"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "SaaS Architecture"], duration: "45 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Culture", "Motivation", "Communication"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Graphs", "DP"],
      CS: ["OOP", "DBMS", "REST APIs", "Microservices"],
      SystemDesign: ["SaaS Architecture", "Multi-tenancy", "API Design", "Webhooks"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Strings", "OOP"] },
      { week: 2, topics: ["Trees", "Graphs", "DP"] },
      { week: 3, topics: ["SaaS System Design", "API Design"] },
      { week: 4, topics: ["Mock Interviews", "HR Prep"] }
    ],
    faqs: ["What is multi-tenancy?", "Design a helpdesk system.", "What is a REST API?", "Explain SOLID principles.", "What is a webhook?", "Design a CRM system."],
    tips: ["Understand SaaS product architecture", "Know REST APIs deeply", "Practice DSA on LeetCode", "Study multi-tenant systems", "Prepare for product thinking questions"],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "GeeksforGeeks Freshworks", url: "https://www.geeksforgeeks.org/freshworks-interview-preparation/" }
    ]
  },
  {
    name: "Samsung",
    logo: "📱",
    color: "from-blue-600 to-sky-500",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "12–22 LPA", mid: "25–40 LPA", senior: "45–70 LPA" },
    about: "Samsung R&D India focuses on C++, OS-level programming, embedded systems, and strong DSA.",
    syllabus: "https://www.google.com/search?q=Samsung+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "C++", "Aptitude"], duration: "3 Hours", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["C++", "OS Concepts", "Data Structures"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["Embedded Systems", "OS", "Networks"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Innovation", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Graphs", "DP", "C++ STL"],
      CS: ["OS", "Multithreading", "Memory Management", "Networks", "Embedded Systems"],
      SystemDesign: ["Embedded Architecture", "Memory Optimization", "Low Level Design"]
    },
    roadmap: [
      { week: 1, topics: ["C++ Core", "STL", "Memory Management"] },
      { week: 2, topics: ["DSA – Hard Problems"] },
      { week: 3, topics: ["OS Concepts", "Multithreading"] },
      { week: 4, topics: ["Embedded Systems", "Networks", "Mock Interviews"] }
    ],
    faqs: ["What is virtual memory?", "Explain multithreading.", "What is a semaphore?", "Explain the STL map.", "What is cache memory?", "Difference between process and thread."],
    tips: ["Master C++ thoroughly", "Deep dive into OS concepts", "Understand memory management", "Know embedded systems basics", "Practice very hard DSA"],
    resources: [
      { name: "GeeksforGeeks Samsung", url: "https://www.geeksforgeeks.org/samsung-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
  {
    name: "PayPal",
    logo: "💰",
    color: "from-blue-500 to-indigo-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "22–38 LPA", mid: "40–65 LPA", senior: "70–100 LPA" },
    about: "PayPal focuses on payment technology, security, distributed systems, and strong Java/microservices skills.",
    syllabus: "https://www.google.com/search?q=PayPal+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Java", "Problem Solving"], duration: "90 Minutes", difficulty: "Medium-Hard" },
      { round: 2, title: "Technical I", topics: ["Java", "Microservices", "DSA"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["Payment Systems", "Security", "Scalability"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Finance Tech Interest", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "DP", "Trees", "Hashing"],
      CS: ["Java", "Spring Boot", "Microservices", "Security"],
      SystemDesign: ["Payment Processing", "Fraud Detection", "Transaction System", "Security Protocols"]
    },
    roadmap: [
      { week: 1, topics: ["Java", "Spring Boot", "REST APIs"] },
      { week: 2, topics: ["DSA – Medium/Hard"] },
      { week: 3, topics: ["Payment System Design", "Security Basics"] },
      { week: 4, topics: ["Microservices", "Mock Interviews"] }
    ],
    faqs: ["Design a payment processing system.", "What is OAuth?", "Explain SSL/TLS.", "What is idempotency?", "Design fraud detection.", "What is a microservice?"],
    tips: ["Understand payment and security flows", "Know OAuth and SSL deeply", "Study fintech system design", "Practice Java microservices", "Learn fraud detection patterns"],
    resources: [
      { name: "PayPal Developer", url: "https://developer.paypal.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
    ]
  },
  {
    name: "Visa",
    logo: "💳",
    color: "from-blue-700 to-yellow-500",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "22–35 LPA", mid: "40–60 LPA", senior: "65–95 LPA" },
    about: "Visa focuses on payment network architecture, security, distributed systems, and high throughput processing.",
    syllabus: "https://www.google.com/search?q=Visa+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Aptitude"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["DSA", "Java/Python", "OOP"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["Payment Networks", "High Throughput", "Security"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Finance Interest", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "Trees", "DP", "Hashing"],
      CS: ["Distributed Systems", "Security", "Networking", "DBMS"],
      SystemDesign: ["Payment Network", "Authorization System", "High Throughput Processing", "Fraud Detection"]
    },
    roadmap: [
      { week: 1, topics: ["DSA – Medium/Hard Problems"] },
      { week: 2, topics: ["Security Concepts", "Networking"] },
      { week: 3, topics: ["Payment Network Design", "Distributed Systems"] },
      { week: 4, topics: ["DBMS", "Mock Interviews"] }
    ],
    faqs: ["How does a credit card transaction work?", "What is PCI DSS?", "Design a payment authorization system.", "What is tokenization?", "Explain SSL/TLS handshake.", "What is a distributed transaction?"],
    tips: ["Understand payment network fundamentals", "Know security protocols", "Study high throughput system design", "Learn about tokenization and encryption", "Practice fintech system design"],
    resources: [
      { name: "Visa Developer", url: "https://developer.visa.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
  {
    name: "Capgemini",
    logo: "🔵",
    color: "from-blue-500 to-cyan-500",
    rounds: 3,
    difficulty: "Easy-Medium",
    avgSalary: { junior: "4–8 LPA", mid: "10–18 LPA", senior: "20–35 LPA" },
    about: "Capgemini focuses on aptitude, technical basics, and communication skills for campus hiring.",
    syllabus: "https://www.google.com/search?q=Capgemini+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Aptitude", "Logical Reasoning", "Pseudo Code", "Coding"], duration: "150 Minutes", difficulty: "Easy-Medium" },
      { round: 2, title: "Technical Interview", topics: ["OOP", "DBMS", "DSA Basics", "Favorite Language"], duration: "30 Minutes", difficulty: "Medium" },
      { round: 3, title: "HR Round", topics: ["Communication", "Relocation", "Goals"], duration: "20 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Basic Sorting", "Searching"],
      CS: ["OOP", "DBMS", "SQL", "Basic Programming"],
      SystemDesign: []
    },
    roadmap: [
      { week: 1, topics: ["Aptitude", "Logical Reasoning"] },
      { week: 2, topics: ["OOP Basics", "DBMS", "SQL"] },
      { week: 3, topics: ["Basic Coding", "HR Prep"] },
      { week: 4, topics: ["Mock Tests", "Communication Practice"] }
    ],
    faqs: ["What is inheritance?", "Explain SQL JOINs.", "What is a primary key?", "What is recursion?", "Tell me about yourself.", "Why Capgemini?"],
    tips: ["Focus on aptitude practice", "Know OOP well", "Prepare SQL queries", "Work on communication skills", "Practice pseudo code questions"],
    resources: [
      { name: "PrepInsta Capgemini", url: "https://prepinsta.com/capgemini/" },
      { name: "GeeksforGeeks Capgemini", url: "https://www.geeksforgeeks.org/capgemini-interview-preparation/" }
    ]
  },
  {
    name: "Deloitte",
    logo: "🟢",
    color: "from-green-600 to-teal-600",
    rounds: 3,
    difficulty: "Easy-Medium",
    avgSalary: { junior: "6–12 LPA", mid: "14–25 LPA", senior: "28–50 LPA" },
    about: "Deloitte UST focuses on aptitude, coding, and consulting-oriented technical skills.",
    syllabus: "https://www.google.com/search?q=Deloitte+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Aptitude", "Verbal", "Coding"], duration: "90 Minutes", difficulty: "Easy" },
      { round: 2, title: "Technical Interview", topics: ["OOP", "DBMS", "Basic DSA", "Projects"], duration: "45 Minutes", difficulty: "Medium" },
      { round: 3, title: "HR Round", topics: ["Communication", "Teamwork", "Goals"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Basic Sorting"],
      CS: ["OOP", "DBMS", "SQL", "Web Basics"],
      SystemDesign: []
    },
    roadmap: [
      { week: 1, topics: ["Aptitude Practice", "Verbal Reasoning"] },
      { week: 2, topics: ["OOP", "DBMS", "SQL"] },
      { week: 3, topics: ["Basic Coding", "Project Discussion"] },
      { week: 4, topics: ["HR Prep", "Mock Interviews"] }
    ],
    faqs: ["Tell me about your projects.", "What is DBMS?", "Explain OOP concepts.", "What is normalization?", "How do you handle pressure?", "What is your greatest achievement?"],
    tips: ["Focus on aptitude tests", "Prepare project explanations", "Know OOP and DBMS basics", "Practice communication", "Research Deloitte's services"],
    resources: [
      { name: "GeeksforGeeks Deloitte", url: "https://www.geeksforgeeks.org/deloitte-interview-preparation/" },
      { name: "PrepInsta Deloitte", url: "https://prepinsta.com/deloitte/" }
    ]
  },
  {
    name: "IBM",
    logo: "🔵",
    color: "from-blue-600 to-blue-800",
    rounds: 3,
    difficulty: "Easy-Medium",
    avgSalary: { junior: "6–12 LPA", mid: "15–25 LPA", senior: "28–50 LPA" },
    about: "IBM focuses on cognitive computing, cloud (IBM Cloud), and enterprise technology solutions.",
    syllabus: "https://www.google.com/search?q=IBM+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Aptitude", "English", "Coding"], duration: "120 Minutes", difficulty: "Easy-Medium" },
      { round: 2, title: "Technical Interview", topics: ["DSA", "OOP", "Cloud Basics", "DBMS"], duration: "45 Minutes", difficulty: "Medium" },
      { round: 3, title: "HR Round", topics: ["Behavioral", "IBM Values", "Communication"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Strings", "Trees", "Sorting"],
      CS: ["OOP", "DBMS", "Cloud Computing", "AI Basics"],
      SystemDesign: ["Cloud Architecture", "Microservices Basics"]
    },
    roadmap: [
      { week: 1, topics: ["Aptitude", "Basic Programming"] },
      { week: 2, topics: ["OOP", "DBMS", "SQL"] },
      { week: 3, topics: ["Cloud Computing Basics", "IBM Watson"] },
      { week: 4, topics: ["Mock Interviews", "HR Prep"] }
    ],
    faqs: ["What is cloud computing?", "What are IBM's Watson services?", "Explain polymorphism.", "What is DBMS?", "What is a REST API?", "What are your career goals?"],
    tips: ["Learn IBM Cloud basics", "Know AI/ML fundamentals", "Focus on communication", "Prepare for cognitive questions", "Know enterprise technology"],
    resources: [
      { name: "IBM Developer", url: "https://developer.ibm.com/" },
      { name: "GeeksforGeeks IBM", url: "https://www.geeksforgeeks.org/ibm-interview-preparation/" }
    ]
  },
  {
    name: "Cisco",
    logo: "🔗",
    color: "from-blue-500 to-indigo-500",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "15–28 LPA", mid: "30–50 LPA", senior: "55–85 LPA" },
    about: "Cisco focuses on networking, distributed systems, and strong software engineering fundamentals.",
    syllabus: "https://www.google.com/search?q=Cisco+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Networking Basics", "Coding"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["Networking Protocols", "DSA", "OS"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "Network Architecture", "Security"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Culture", "Motivation"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Graphs", "Trees", "Arrays", "Network Algorithms"],
      CS: ["Computer Networks", "TCP/IP", "OSI Model", "OS", "Security"],
      SystemDesign: ["Network Architecture", "Load Balancer", "Firewall Design", "SDN"]
    },
    roadmap: [
      { week: 1, topics: ["Computer Networks", "TCP/IP", "OSI Model"] },
      { week: 2, topics: ["DSA – Graphs, Trees"] },
      { week: 3, topics: ["Network System Design", "Security"] },
      { week: 4, topics: ["OS Concepts", "Mock Interviews"] }
    ],
    faqs: ["What is TCP/IP?", "Explain OSI layers.", "What is a subnet?", "How does BGP work?", "What is a firewall?", "Design a load balancer."],
    tips: ["Deep dive into networking concepts", "Know TCP/IP and OSI thoroughly", "Practice graph algorithms", "Study network security", "Understand SDN and network virtualization"],
    resources: [
      { name: "Cisco Learning", url: "https://learningnetwork.cisco.com/" },
      { name: "GeeksforGeeks Cisco", url: "https://www.geeksforgeeks.org/cisco-interview-preparation/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
  {
    name: "Morgan Stanley",
    logo: "🏢",
    color: "from-blue-800 to-indigo-800",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "22–38 LPA", mid: "42–65 LPA", senior: "70–110 LPA" },
    about: "Morgan Stanley focuses on strong DSA, quantitative skills, and financial technology knowledge.",
    syllabus: "https://www.google.com/search?q=Morgan+Stanley+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Quant", "Problem Solving"], duration: "120 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["DSA", "Coding", "OOP"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "Concurrency", "Finance Basics"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Finance Interest", "Leadership"], duration: "30 Minutes", difficulty: "Medium" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Trees", "Graphs", "DP", "Sorting", "Hashing"],
      CS: ["OOP", "Multithreading", "DBMS", "OS"],
      SystemDesign: ["Trade Systems", "Low Latency", "Financial Data Processing", "Risk Systems"]
    },
    roadmap: [
      { week: 1, topics: ["Arrays", "Trees", "Hashing"] },
      { week: 2, topics: ["Graphs", "DP", "Sorting"] },
      { week: 3, topics: ["OOP", "Multithreading", "Concurrency"] },
      { week: 4, topics: ["Finance Basics", "Low Latency System Design", "Mock Interviews"] }
    ],
    faqs: ["Design a stock trading system.", "What is a deadlock?", "Explain synchronization.", "What is Big-O notation?", "Design a risk management system.", "What is ACID?"],
    tips: ["Strong quant and DSA skills needed", "Understand multithreading and concurrency", "Know finance-tech crossover", "Practice LeetCode hard problems", "Study low-latency systems"],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "GeeksforGeeks Morgan Stanley", url: "https://www.geeksforgeeks.org/morgan-stanley-interview-preparation/" }
    ]
  },
  {
    name: "American Express",
    logo: "💳",
    color: "from-blue-600 to-sky-500",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "18–30 LPA", mid: "35–55 LPA", senior: "60–90 LPA" },
    about: "American Express focuses on payment technology, strong DSA, and enterprise Java development.",
    syllabus: "https://www.google.com/search?q=American+Express+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["DSA", "Java", "Problem Solving"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["Java", "Spring", "DSA"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "System Design", topics: ["Payment Systems", "Security", "Microservices"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Finance Interest", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Trees", "Graphs", "DP", "Hashing"],
      CS: ["Java", "Spring Boot", "Microservices", "Security", "DBMS"],
      SystemDesign: ["Payment Processing", "Authorization", "Fraud Detection", "Security"]
    },
    roadmap: [
      { week: 1, topics: ["Java Core", "Spring Boot"] },
      { week: 2, topics: ["DSA – Medium Problems"] },
      { week: 3, topics: ["Payment System Design", "Security"] },
      { week: 4, topics: ["Microservices", "Mock Interviews"] }
    ],
    faqs: ["Design a credit card processing system.", "What is OAuth?", "Explain JWT.", "What is Spring Boot?", "Design a fraud detection system.", "What is idempotency?"],
    tips: ["Know Java and Spring Boot deeply", "Understand payment security", "Study OAuth and JWT", "Practice fintech system design", "Know microservices patterns"],
    resources: [
      { name: "LeetCode", url: "https://leetcode.com/problemset/" },
      { name: "Spring Boot Docs", url: "https://spring.io/projects/spring-boot" }
    ]
  },
  {
    name: "Qualcomm",
    logo: "📡",
    color: "from-red-500 to-orange-500",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "18–30 LPA", mid: "35–55 LPA", senior: "60–90 LPA" },
    about: "Qualcomm focuses on embedded systems, C/C++, DSP algorithms, and wireless communication.",
    syllabus: "https://www.google.com/search?q=Qualcomm+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["C/C++", "DSA", "Embedded Concepts"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["C++", "Pointers", "OS", "Data Structures"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["DSP", "Wireless", "Embedded Systems"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Innovation", "Team Fit"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "Trees", "C++ STL", "Bit Manipulation"],
      CS: ["OS", "Embedded Systems", "Memory Management", "Multithreading", "Computer Architecture"],
      SystemDesign: ["Embedded Architecture", "RTOS", "Driver Design", "Signal Processing"]
    },
    roadmap: [
      { week: 1, topics: ["C++ Advanced", "Pointers", "Memory"] },
      { week: 2, topics: ["DSA – Hard Problems"] },
      { week: 3, topics: ["OS", "Embedded Concepts", "RTOS"] },
      { week: 4, topics: ["Wireless Basics", "DSP", "Mock Interviews"] }
    ],
    faqs: ["What is RTOS?", "Explain virtual memory.", "What is DMA?", "Difference between mutex and semaphore.", "What is cache coherency?", "Explain OFDM."],
    tips: ["Master C++ and embedded programming", "Know OS and memory management deeply", "Understand wireless communication basics", "Study RTOS concepts", "Know DSP fundamentals"],
    resources: [
      { name: "Qualcomm Developer", url: "https://developer.qualcomm.com/" },
      { name: "GeeksforGeeks Qualcomm", url: "https://www.geeksforgeeks.org/qualcomm-interview-preparation/" }
    ]
  },
  {
    name: "Intel",
    logo: "🔷",
    color: "from-blue-600 to-cyan-600",
    rounds: 4,
    difficulty: "Hard",
    avgSalary: { junior: "18–32 LPA", mid: "35–55 LPA", senior: "60–95 LPA" },
    about: "Intel focuses on hardware-software interaction, C++, computer architecture, and performance optimization.",
    syllabus: "https://www.google.com/search?q=Intel+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["C++", "DSA", "Computer Architecture"], duration: "90 Minutes", difficulty: "Hard" },
      { round: 2, title: "Technical I", topics: ["C++", "OS", "Memory Management"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 3, title: "Technical II", topics: ["Computer Architecture", "Parallel Computing", "Performance Optimization"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "Innovation", "Culture"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Graphs", "Trees", "C++ STL", "Algorithms"],
      CS: ["Computer Architecture", "OS", "Memory Hierarchy", "Parallel Computing"],
      SystemDesign: ["Processor Design", "Memory Optimization", "Performance Benchmarking"]
    },
    roadmap: [
      { week: 1, topics: ["C++ Core", "STL", "Memory Management"] },
      { week: 2, topics: ["DSA – Hard Problems"] },
      { week: 3, topics: ["Computer Architecture", "Memory Hierarchy"] },
      { week: 4, topics: ["Parallel Computing", "Performance Optimization", "Mock Interviews"] }
    ],
    faqs: ["What is cache coherency?", "Explain pipelining.", "What is out-of-order execution?", "What is branch prediction?", "Explain SIMD.", "What is virtual memory?"],
    tips: ["Know computer architecture deeply", "Master C++ and performance optimization", "Understand memory hierarchy", "Study parallel computing", "Know OS at low level"],
    resources: [
      { name: "Intel Developer", url: "https://www.intel.com/content/www/us/en/developer/overview.html" },
      { name: "GeeksforGeeks Intel", url: "https://www.geeksforgeeks.org/intel-interview-preparation/" }
    ]
  },
  {
    name: "SAP",
    logo: "🔷",
    color: "from-blue-500 to-teal-500",
    rounds: 4,
    difficulty: "Medium-Hard",
    avgSalary: { junior: "15–28 LPA", mid: "30–50 LPA", senior: "55–80 LPA" },
    about: "SAP focuses on enterprise software, ABAP programming, Java, and large-scale ERP systems.",
    syllabus: "https://www.google.com/search?q=SAP+Software+Engineer+Interview+Questions+2026",
    selectionProcess: [
      { round: 1, title: "Online Assessment", topics: ["Aptitude", "DSA", "Java"], duration: "90 Minutes", difficulty: "Medium" },
      { round: 2, title: "Technical I", topics: ["Java", "OOP", "DBMS", "DSA"], duration: "60 Minutes", difficulty: "Medium-Hard" },
      { round: 3, title: "Technical II", topics: ["System Design", "ERP Concepts", "Cloud"], duration: "60 Minutes", difficulty: "Hard" },
      { round: 4, title: "HR Round", topics: ["Behavioral", "SAP Culture", "Goals"], duration: "30 Minutes", difficulty: "Easy" }
    ],
    importantTopics: {
      DSA: ["Arrays", "Trees", "Graphs", "Sorting", "Hashing"],
      CS: ["Java", "OOP", "DBMS", "SQL", "Cloud"],
      SystemDesign: ["ERP Architecture", "Enterprise Integration", "API Design", "SAP HANA"]
    },
    roadmap: [
      { week: 1, topics: ["Java Core", "OOP Concepts"] },
      { week: 2, topics: ["DSA – Medium Problems"] },
      { week: 3, topics: ["DBMS", "SQL", "SAP HANA Basics"] },
      { week: 4, topics: ["ERP System Design", "Mock Interviews"] }
    ],
    faqs: ["What is SAP HANA?", "Explain ERP systems.", "What is Java Spring?", "What is normalization?", "Design an inventory system.", "What is REST API?"],
    tips: ["Learn SAP basics", "Know Java and Spring well", "Deep dive into DBMS and SQL", "Understand ERP architecture", "Practice system design"],
    resources: [
      { name: "SAP Learning Hub", url: "https://learning.sap.com/" },
      { name: "LeetCode", url: "https://leetcode.com/problemset/" }
    ]
  },
]

// Extra companies — lightweight entries for search coverage
// These open the Google search page when clicked (no dedicated detail page)
export const extraCompanies = [
  { name: "Wipro", logo: "🔵", color: "from-blue-500 to-indigo-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "HCL Technologies", logo: "🟢", color: "from-green-500 to-teal-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "Tech Mahindra", logo: "🟣", color: "from-purple-500 to-pink-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "Cognizant", logo: "🔵", color: "from-blue-600 to-cyan-600", rounds: 3, difficulty: "Easy-Medium" },
  { name: "Mphasis", logo: "🟠", color: "from-orange-500 to-amber-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "L&T Technology", logo: "🔴", color: "from-red-600 to-orange-500", rounds: 3, difficulty: "Medium" },
  { name: "Mindtree", logo: "🟢", color: "from-green-600 to-lime-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "Hexaware", logo: "🔷", color: "from-indigo-500 to-blue-600", rounds: 3, difficulty: "Easy-Medium" },
  { name: "KPMG", logo: "🔵", color: "from-blue-700 to-indigo-700", rounds: 3, difficulty: "Medium" },
  { name: "EY", logo: "🟡", color: "from-yellow-500 to-amber-500", rounds: 3, difficulty: "Medium" },
  { name: "PwC", logo: "🔴", color: "from-red-500 to-rose-600", rounds: 3, difficulty: "Medium" },
  { name: "McKinsey", logo: "🔵", color: "from-blue-800 to-indigo-900", rounds: 4, difficulty: "Very Hard" },
  { name: "BCG", logo: "🟢", color: "from-green-700 to-emerald-700", rounds: 4, difficulty: "Very Hard" },
  { name: "Bain", logo: "🔴", color: "from-red-700 to-rose-700", rounds: 4, difficulty: "Very Hard" },
  { name: "Twitter / X", logo: "⬛", color: "from-gray-800 to-black", rounds: 4, difficulty: "Hard" },
  { name: "LinkedIn", logo: "🔵", color: "from-blue-600 to-sky-600", rounds: 4, difficulty: "Hard" },
  { name: "Airbnb", logo: "🔴", color: "from-rose-500 to-pink-600", rounds: 5, difficulty: "Hard" },
  { name: "Lyft", logo: "🟣", color: "from-pink-500 to-purple-600", rounds: 4, difficulty: "Hard" },
  { name: "DoorDash", logo: "🔴", color: "from-red-500 to-orange-600", rounds: 4, difficulty: "Hard" },
  { name: "Stripe", logo: "🔷", color: "from-indigo-500 to-purple-600", rounds: 5, difficulty: "Very Hard" },
  { name: "Twilio", logo: "🔴", color: "from-red-500 to-rose-500", rounds: 4, difficulty: "Hard" },
  { name: "Shopify", logo: "🟢", color: "from-green-500 to-emerald-600", rounds: 4, difficulty: "Hard" },
  { name: "Palantir", logo: "⬛", color: "from-gray-700 to-slate-800", rounds: 5, difficulty: "Very Hard" },
  { name: "Snowflake", logo: "❄️", color: "from-cyan-500 to-blue-600", rounds: 4, difficulty: "Hard" },
  { name: "Databricks", logo: "🔶", color: "from-orange-500 to-red-600", rounds: 4, difficulty: "Hard" },
  { name: "Coinbase", logo: "🔵", color: "from-blue-500 to-indigo-600", rounds: 4, difficulty: "Hard" },
  { name: "Robinhood", logo: "🟢", color: "from-green-500 to-teal-600", rounds: 4, difficulty: "Hard" },
  { name: "Square / Block", logo: "⬛", color: "from-gray-700 to-gray-900", rounds: 4, difficulty: "Hard" },
  { name: "Spotify", logo: "🟢", color: "from-green-400 to-emerald-500", rounds: 4, difficulty: "Hard" },
  { name: "Slack", logo: "🔷", color: "from-purple-500 to-pink-500", rounds: 4, difficulty: "Hard" },
  { name: "Dropbox", logo: "🔵", color: "from-blue-500 to-sky-600", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Box", logo: "🔵", color: "from-blue-600 to-indigo-600", rounds: 4, difficulty: "Medium-Hard" },
  { name: "HubSpot", logo: "🟠", color: "from-orange-500 to-red-500", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Zendesk", logo: "🟢", color: "from-green-600 to-teal-500", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Okta", logo: "🔵", color: "from-blue-500 to-cyan-500", rounds: 4, difficulty: "Hard" },
  { name: "CrowdStrike", logo: "🔴", color: "from-red-600 to-orange-600", rounds: 4, difficulty: "Hard" },
  { name: "Palo Alto Networks", logo: "🔵", color: "from-blue-700 to-indigo-700", rounds: 4, difficulty: "Hard" },
  { name: "Fortinet", logo: "🔴", color: "from-red-500 to-rose-600", rounds: 4, difficulty: "Medium-Hard" },
  { name: "VMware", logo: "🔵", color: "from-blue-600 to-sky-600", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Dell Technologies", logo: "🔵", color: "from-blue-700 to-indigo-700", rounds: 3, difficulty: "Medium" },
  { name: "HP", logo: "🔵", color: "from-blue-600 to-indigo-600", rounds: 3, difficulty: "Medium" },
  { name: "Lenovo", logo: "🔴", color: "from-red-600 to-orange-500", rounds: 3, difficulty: "Medium" },
  { name: "Tata Consultancy", logo: "🔵", color: "from-cyan-600 to-blue-600", rounds: 3, difficulty: "Easy" },
  { name: "Wipro Digital", logo: "🟣", color: "from-purple-500 to-violet-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "Persistent Systems", logo: "🟢", color: "from-green-500 to-teal-500", rounds: 3, difficulty: "Easy-Medium" },
  { name: "Nagarro", logo: "🟠", color: "from-orange-400 to-red-500", rounds: 3, difficulty: "Medium" },
  { name: "GlobalLogic", logo: "🔵", color: "from-blue-500 to-cyan-500", rounds: 3, difficulty: "Medium" },
  { name: "Publicis Sapient", logo: "🔷", color: "from-indigo-500 to-purple-500", rounds: 3, difficulty: "Medium" },
  { name: "ThoughtWorks", logo: "🟣", color: "from-purple-600 to-pink-600", rounds: 4, difficulty: "Hard" },
  { name: "Ola", logo: "🟡", color: "from-yellow-500 to-orange-500", rounds: 4, difficulty: "Hard" },
  { name: "Paytm", logo: "🔵", color: "from-blue-500 to-sky-500", rounds: 4, difficulty: "Hard" },
  { name: "BYJU'S", logo: "🟣", color: "from-purple-500 to-indigo-600", rounds: 3, difficulty: "Medium" },
  { name: "Unacademy", logo: "🟢", color: "from-green-500 to-teal-500", rounds: 3, difficulty: "Medium" },
  { name: "CRED", logo: "⬛", color: "from-gray-700 to-slate-800", rounds: 4, difficulty: "Hard" },
  { name: "Meesho", logo: "🔴", color: "from-rose-500 to-pink-500", rounds: 4, difficulty: "Hard" },
  { name: "Nykaa", logo: "🟣", color: "from-purple-500 to-pink-600", rounds: 3, difficulty: "Medium-Hard" },
  { name: "Groww", logo: "🟢", color: "from-green-500 to-emerald-500", rounds: 4, difficulty: "Hard" },
  { name: "Zerodha", logo: "🟠", color: "from-orange-500 to-amber-500", rounds: 3, difficulty: "Medium-Hard" },
  { name: "Dream11", logo: "🔵", color: "from-blue-600 to-indigo-600", rounds: 4, difficulty: "Hard" },
  { name: "ShareChat", logo: "🟠", color: "from-orange-400 to-red-500", rounds: 4, difficulty: "Hard" },
  { name: "InMobi", logo: "🔵", color: "from-blue-500 to-sky-500", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Juspay", logo: "🔷", color: "from-indigo-500 to-blue-600", rounds: 4, difficulty: "Hard" },
  { name: "BrowserStack", logo: "🟠", color: "from-orange-500 to-amber-600", rounds: 4, difficulty: "Hard" },
  { name: "Nutanix", logo: "🟢", color: "from-green-600 to-teal-600", rounds: 4, difficulty: "Hard" },
  { name: "Juniper Networks", logo: "🟢", color: "from-green-500 to-emerald-600", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Amdocs", logo: "🔵", color: "from-blue-500 to-indigo-500", rounds: 3, difficulty: "Medium" },
  { name: "Mckinsey Digital", logo: "🔵", color: "from-blue-800 to-indigo-900", rounds: 4, difficulty: "Very Hard" },
  { name: "Siemens", logo: "🔵", color: "from-blue-600 to-cyan-600", rounds: 3, difficulty: "Medium" },
  { name: "Bosch", logo: "🔴", color: "from-red-600 to-rose-600", rounds: 3, difficulty: "Medium" },
  { name: "Mastercard", logo: "🔴", color: "from-red-500 to-orange-500", rounds: 4, difficulty: "Hard" },
  { name: "Intuit", logo: "🔵", color: "from-blue-500 to-sky-500", rounds: 4, difficulty: "Hard" },
  { name: "ServiceNow", logo: "🟢", color: "from-green-600 to-teal-500", rounds: 4, difficulty: "Hard" },
  { name: "Workday", logo: "🟡", color: "from-yellow-500 to-orange-500", rounds: 4, difficulty: "Medium-Hard" },
  { name: "Red Hat", logo: "🔴", color: "from-red-600 to-rose-700", rounds: 4, difficulty: "Medium-Hard" },
  { name: "HashiCorp", logo: "🔷", color: "from-indigo-500 to-purple-500", rounds: 4, difficulty: "Hard" },
  { name: "Cloudflare", logo: "🟠", color: "from-orange-500 to-amber-500", rounds: 4, difficulty: "Hard" },
  { name: "Twitch", logo: "🟣", color: "from-purple-600 to-violet-600", rounds: 4, difficulty: "Hard" },
  { name: "Bytedance / TikTok", logo: "⬛", color: "from-gray-800 to-black", rounds: 5, difficulty: "Very Hard" },
  { name: "Grab", logo: "🟢", color: "from-green-500 to-teal-500", rounds: 4, difficulty: "Hard" },
  { name: "Sea Group", logo: "🔴", color: "from-red-500 to-orange-500", rounds: 4, difficulty: "Hard" },
  { name: "Thoughtspot", logo: "🔵", color: "from-blue-500 to-indigo-500", rounds: 4, difficulty: "Hard" },
]

// Merged list: full-detail companies first, then extras
const allCompanies = [
  ...companies,
  ...extraCompanies.map(c => ({ ...c, isExtra: true }))
]

export { companies as detailedCompanies }
export default allCompanies
