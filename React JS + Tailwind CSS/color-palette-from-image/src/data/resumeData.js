const resumeData = {
  basics: {
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    summary: "Passionate frontend developer with 7+ years of experience building responsive and performant web applications. Specialized in React ecosystem and modern JavaScript.",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    profiles: [
      {
        network: "LinkedIn",
        url: "https://linkedin.com/in/alexjohnson",
        icon: "linkedin"
      },
      {
        network: "GitHub",
        url: "https://github.com/alexjohnson",
        icon: "github"
      },
      {
        network: "Twitter",
        url: "https://twitter.com/alexjohnson",
        icon: "twitter"
      }
    ]
  },
  
  work: [
    {
      company: "TechNova Solutions",
      position: "Senior Frontend Developer",
      website: "https://technova.example.com",
      startDate: "2020-01",
      endDate: "Present",
      summary: "Lead frontend developer for multiple high-traffic web applications.",
      highlights: [
        "Led a team of 5 developers to build a modern React-based dashboard used by 50,000+ users",
        "Improved application performance by 40% through code optimization and modern techniques",
        "Implemented CI/CD pipelines reducing deployment time by 65%",
        "Mentored junior developers and conducted technical interviews"
      ]
    },
    {
      company: "WebSphere Inc.",
      position: "Frontend Developer",
      website: "https://websphere.example.com",
      startDate: "2017-03",
      endDate: "2019-12",
      summary: "Developed responsive web applications for enterprise clients.",
      highlights: [
        "Built reusable component library using React that reduced development time by 30%",
        "Collaborated with UX team to implement pixel-perfect designs across platforms",
        "Reduced bundle size by 25% using code splitting and lazy loading techniques",
        "Participated in agile development process with two-week sprint cycles"
      ]
    },
    {
      company: "Digital Creations",
      position: "Junior Web Developer",
      website: "https://digitalcreations.example.com",
      startDate: "2015-06",
      endDate: "2017-02",
      summary: "Created responsive websites for small to medium businesses.",
      highlights: [
        "Developed custom WordPress themes and plugins for 20+ client websites",
        "Implemented responsive designs ensuring compatibility across all major browsers",
        "Optimized site performance and SEO for improved search engine rankings",
        "Provided technical support and maintenance for existing client websites"
      ]
    }
  ],
  
  education: [
    {
      institution: "University of California, Berkeley",
      area: "Computer Science",
      studyType: "Bachelor of Science",
      startDate: "2011-09",
      endDate: "2015-05",
      gpa: "3.8",
      courses: [
        "Data Structures and Algorithms",
        "Web Development",
        "Database Systems",
        "Software Engineering"
      ]
    },
    {
      institution: "Frontend Masters",
      area: "Frontend Development",
      studyType: "Professional Certificate",
      startDate: "2016-01",
      endDate: "2016-06",
      courses: [
        "Advanced JavaScript",
        "React Fundamentals",
        "State Management",
        "Performance Optimization"
      ]
    }
  ],
  
  skills: [
    {
      name: "JavaScript",
      level: 95,
      keywords: ["ES6+", "TypeScript", "Functional Programming"]
    },
    {
      name: "React",
      level: 90,
      keywords: ["Hooks", "Context API", "Redux"]
    },
    {
      name: "CSS",
      level: 85,
      keywords: ["Tailwind", "SCSS", "CSS-in-JS", "Animations"]
    },
    {
      name: "HTML",
      level: 95,
      keywords: ["Semantic HTML", "Accessibility", "SEO"]
    },
    {
      name: "Testing",
      level: 80,
      keywords: ["Jest", "React Testing Library", "Cypress"]
    },
    {
      name: "Build Tools",
      level: 75,
      keywords: ["Webpack", "Vite", "Babel", "ESLint"]
    },
    {
      name: "UI/UX Design",
      level: 70,
      keywords: ["Figma", "Adobe XD", "Prototyping"]
    },
    {
      name: "Backend",
      level: 60,
      keywords: ["Node.js", "Express", "API Development"]
    }
  ],
  
  projects: [
    {
      name: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      highlights: ["React", "Redux", "Node.js", "MongoDB", "Stripe API"],
      url: "https://github.com/alexjohnson/ecommerce-platform",
      image: "https://images.pexels.com/photos/6169/woman-hand-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Weather Dashboard",
      description: "Real-time weather dashboard with location search, forecasts, and weather alerts.",
      highlights: ["React", "OpenWeather API", "Geolocation", "Chart.js"],
      url: "https://github.com/alexjohnson/weather-dashboard",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Task Management App",
      description: "Productivity application for managing tasks, projects, and deadlines with team collaboration features.",
      highlights: ["React", "Firebase", "Material UI", "Real-time updates"],
      url: "https://github.com/alexjohnson/task-management",
      image: "https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ],
  
  languages: [
    {
      language: "English",
      fluency: "Native"
    },
    {
      language: "Spanish",
      fluency: "Professional"
    },
    {
      language: "French",
      fluency: "Conversational"
    }
  ],
  
  interests: [
    {
      name: "Photography",
      keywords: ["Street", "Landscape", "Portrait"]
    },
    {
      name: "Hiking",
      keywords: ["Mountains", "National Parks", "Backpacking"]
    },
    {
      name: "Cooking",
      keywords: ["International Cuisine", "Baking", "Grilling"]
    }
  ]
};

export default resumeData;