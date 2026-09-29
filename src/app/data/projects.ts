export interface Project {
  name: string;
  route: string;
  icon: string;
  description: string;
  technologies: string[];
  demo_link: string;
  source_code_link: string;
}

export const projects: Project[] = [
  {
    name: "AI Autotab Chrome Extension",
    route: "/projects/ai-autotab-chrome-extension",
    icon: "/images/project-icons/chromext.png",
    description: "Created an AI Autotab chrome extension that autocompletes phrases and sentences, improving productivity",
    technologies: ["Chrome Extension", "AI", "Productivity", "JavaScript"],
    demo_link: "https://github.com/yuyi444/ai-autotab-extension",
    source_code_link: "https://github.com/yuyi444/ai-autotab-extension"
  },
  {
    name: "AI Code Editor",
    route: "/projects/ai-code-editor",
    icon: "/images/project-icons/aicodeditor.png",
    description: "Integrated an AI tutor that improves user productivity and promotes in-platform learning in code editor app, Judge00. Integrated key features, such as OpenRouter API key input, line explanations, and automatic changes from AI tutor to IDE",
    technologies: ["AI Tutor", "Code Editor", "OpenRouter API", "IDE Integration"],
    demo_link: "https://github.com/yuyi444/ai-code-editor",
    source_code_link: "https://github.com/yuyi444/ai-code-editor"
  },
  {
    name: "AI Search Engine",
    route: "/projects/ai-search-engine",
    icon: "/images/project-icons/searchengine.png",
    description: "Created a tool that scrapes web content and provides AI-generated answers with reliable source citations. Implemented Groq LLM, web scraping with Cheerio and Puppeteer, and optimized performance with rate limiting",
    technologies: ["Groq LLM", "Web Scraping", "Cheerio", "Puppeteer", "AI Search"],
    demo_link: "https://github.com/yuyi444/ai-search-engine",
    source_code_link: "https://github.com/yuyi444/ai-search-engine"
  },
  {
    name: "We R Cooked",
    route: "/projects/we-r-cooked",
    icon: "/images/project-icons/wercooked.png",
    description: "Implemented a creative simulation of Don Pollo incoming calls using ElevenLabs AI conversation widget integration. Integrated a Google T-rex replica game into application. Won Memenome Best Don Pollo Integration Hack, winning grand prize of 1k at jia.seed brainrot hackathon(1k+ participants)",
    technologies: ["ElevenLabs AI", "Game Integration", "Hackathon Winner", "AI Conversation"],
    demo_link: "https://github.com/yuyi444/we-r-cooked",
    source_code_link: "https://github.com/yuyi444/we-r-cooked"
  },
  {
    name: "Healthcare AI RAG Tutoring System",
    route: "/projects/ai-tutoring-system",
    icon: "/images/project-icons/aitutor.png",
    description: "AI Tutoring System, developed during Hack Research 2023 and took the 1st place win in AI Healthcare, is an innovative app that uses GPT-4 and advanced data extraction techniques to enhance healthcare education. By combining web scraping, embeddings, and retrieval-augmented generation, it sets a new standard for AI-driven learning tools in the medical field.",
    technologies: ["GPT-4", "Web Scraping", "Embeddings", "RAG", "Healthcare AI"],
    demo_link: "https://youtu.be/ReinaBoNaWo",
    source_code_link: "https://github.com/yuyi444/hack-research-proj.git"
  },
  {
    name: "Bin Fiesta",
    route: "/projects/bin-fiesta",
    icon: "/images/project-icons/binfiesta.png",
    description: "In Bin Fiesta, I developed a Google Gemini AI-powered chatbot that provides users with personalized recycling guidance, contributing to our 1st place win in Sustainability at Frontera Hacks. The project combines real-time AI interaction with a user-friendly interface built in Next.js, encouraging eco-friendly practices through accessible recycling information.",
    technologies: ["Google Gemini AI", "Next.js", "Chatbot", "Sustainability"],
    demo_link: "https://youtu.be/tXxWyIuusXI",
    source_code_link: "https://github.com/yuyi444/binfiesta.git"
  },
  {
    name: "Balanced Perspective",
    route: "/projects/balanced-perspective",
    icon: "/images/project-icons/newspaper.png",
    description: "The project, Balanced Perspective, aims to use deep learning for unbiased news summarization. By leveraging a CNN classifier to detect political bias and the PEGASUS transformer model for abstractive summarization, it produces summaries intended to present balanced perspectives across articles from different political spectrums.",
    technologies: ["Deep Learning", "CNN", "PEGASUS", "NLP", "News Analysis"],
    demo_link: "https://github.com/yuyi444/deep-learning-proj.git",
    source_code_link: "https://github.com/yuyi444/deep-learning-proj.git"
  },
  {
    name: "SuperTux CNN Path Prediction",
    route: "/projects/mario-kart-cnn",
    icon: "/images/project-icons/mario-kart.png",
    description: "I developed a Convolutional Neural Network that predicts a kart's driving path using visual inputs. Rather than going through segmentation and depth estimation, I predicted the lane boundaries in the vehicle's coordinate frame directly from the image, achieving optimal lateral and longitudinal error!",
    technologies: ["CNN", "Computer Vision", "Path Prediction", "Deep Learning"],
    demo_link: "https://github.com/yourusername/mario-kart-cnn",
    source_code_link: "https://github.com/yourusername/mario-kart-cnn"
  },
  {
    name: "Album Database",
    route: "/projects/album-database",
    icon: "/images/project-icons/albumdatabase.png",
    description: "This project focuses on transferring data from an original SQLite database to a new relational schema. It involves creating tables for musicians, albums, and instruments, importing data from a CSV, and setting up relationships between these tables to support efficient data retrieval and reporting.",
    technologies: ["SQLite", "Relational Database", "Data Migration", "CSV Import"],
    demo_link: "https://github.com/yuyi444/album-database.git",
    source_code_link: "https://github.com/yuyi444/album-database.git"
  },
  {
    name: "Image Analysis and Interpolation with Fourier Transforms",
    route: "/projects/image-analysis",
    icon: "/images/project-icons/ct_scan.png",
    description: "This project utilizes Fourier transforms to analyze and process a lung CT scan, extracting magnitude and phase spectrums and downsampling the image. Linear interpolation and zero-padding techniques are then applied to upsample the image, with mean squared error calculated to evaluate the quality of the interpolated images.",
    technologies: ["Fourier Transforms", "Image Processing", "CT Scan Analysis", "Interpolation"],
    demo_link: "https://github.com/yuyi444/digital-image-processing-proj.git",
    source_code_link: "https://github.com/yuyi444/digital-image-processing-proj.git"
  },
  {
    name: "Rails Book System",
    route: "/projects/rails-book-system",
    icon: "/images/project-icons/booksystem.png",
    description: "I developed a book club management app providing the organizer, with full CRUD functionality to manage book suggestions, track reading status, and approve or reject recommendations from members. The app allows members to sign up, suggest books, and view read/unread lists, while the organizer can control the visibility of suggestions to maintain a high-quality selection process.",
    technologies: ["Ruby on Rails", "CRUD", "Book Management", "User Authentication"],
    demo_link: "https://youtu.be/Tg-l2x3FodU",
    source_code_link: "https://github.com/yuyi444/rails-book-system.git"
  },
];
