export const CATEGORIES = [
  "AI",
  "Generative AI",
  "Software Engineering",
  "Machine Learning",
  "Deep Learning",
  "Image Processing",
  "Hackathons",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Short forms people search for, e.g. "ml" or "swe".
export const CATEGORY_ALIASES: Record<Category, string[]> = {
  "AI": ["ai", "artificial intelligence"],
  "Generative AI": ["genai", "gen ai", "generative ai"],
  "Software Engineering": ["swe", "software engineering"],
  "Machine Learning": ["ml", "machine learning"],
  "Deep Learning": ["dl", "deep learning"],
  "Image Processing": ["image processing"],
  "Hackathons": ["hackathon", "hackathons", "hackathon winner"],
};

export interface Project {
  name: string;
  categories: Category[];
  // In-site detail page; projects without one open demo_link instead.
  route?: string;
  icon?: string;
  // Display size for non-square logos; defaults to 48x48.
  iconSize?: { width: number; height: number };
  // Shown in the Projects desktop window and Google search.
  desktop?: boolean;
  description: string;
  technologies: string[];
  demo_link: string;
  source_code_link: string;
}

export const DEFAULT_PROJECT_ICON = "/images/portfolio-icon.png";

export const projects: Project[] = [
  {
    name: "AI Autotab Chrome Extension",
    categories: ["AI"],
    route: "/projects/ai-autotab-chrome-extension",
    icon: "/images/project-icons/chromext.png",
    desktop: true,
    description: "Created an AI Autotab chrome extension that autocompletes phrases and sentences, improving productivity",
    technologies: ["Chrome Extension", "AI", "Productivity", "JavaScript"],
    demo_link: "https://github.com/yulijasso/autotab-chrome-ext",
    source_code_link: "https://github.com/yulijasso/autotab-chrome-ext"
  },
  {
    name: "AI Code Editor",
    categories: ["AI"],
    route: "/projects/ai-code-editor",
    icon: "/images/project-icons/aicodeditor.png",
    desktop: true,
    description: "Integrated an AI tutor that improves user productivity and promotes in-platform learning in code editor app, Judge00. Integrated key features, such as OpenRouter API key input, line explanations, and automatic changes from AI tutor to IDE",
    technologies: ["AI Tutor", "Code Editor", "OpenRouter API", "IDE Integration"],
    demo_link: "https://aicode-editor.vercel.app/",
    source_code_link: "https://github.com/yulijasso/aicode-editor"
  },
  {
    name: "AI Search Engine",
    categories: ["AI"],
    route: "/projects/ai-search-engine",
    icon: "/images/project-icons/searchengine.png",
    desktop: true,
    description: "Created a tool that scrapes web content and provides AI-generated answers with reliable source citations. Implemented Groq LLM, web scraping with Cheerio and Puppeteer, and optimized performance with rate limiting",
    technologies: ["Groq LLM", "Web Scraping", "Cheerio", "Puppeteer", "AI Search"],
    demo_link: "https://webchat-lyart.vercel.app/",
    source_code_link: "https://github.com/yulijasso/webchat"
  },
  {
    name: "We R Cooked",
    categories: ["AI", "Hackathons"],
    route: "/projects/we-r-cooked",
    icon: "/images/project-icons/wercooked.png",
    desktop: true,
    description: "Implemented a creative simulation of Don Pollo incoming calls using ElevenLabs AI conversation widget integration. Integrated a Google T-rex replica game into application. Won Memenome Best Don Pollo Integration Hack, winning grand prize of 1k at jia.seed brainrot hackathon(1k+ participants)",
    technologies: ["ElevenLabs AI", "Game Integration", "Hackathon Winner", "AI Conversation"],
    demo_link: "https://github.com/yulijasso/we-r-cooked",
    source_code_link: "https://github.com/yulijasso/we-r-cooked"
  },
  {
    name: "Healthcare AI RAG Tutoring System",
    categories: ["AI", "Hackathons"],
    route: "/projects/ai-tutoring-system",
    icon: "/images/project-icons/aitutor.png",
    desktop: true,
    description: "AI Tutoring System, developed during Hack Research 2023 and took the 1st place win in AI Healthcare, is an innovative app that uses GPT-4 and advanced data extraction techniques to enhance healthcare education. By combining web scraping, embeddings, and retrieval-augmented generation, it sets a new standard for AI-driven learning tools in the medical field.",
    technologies: ["GPT-4", "Web Scraping", "Embeddings", "RAG", "Healthcare AI", "Hackathon Winner"],
    demo_link: "https://youtu.be/ReinaBoNaWo",
    source_code_link: "https://github.com/yulijasso/hack-research-proj"
  },
  {
    name: "Bin Fiesta",
    categories: ["AI", "Hackathons"],
    route: "/projects/bin-fiesta",
    icon: "/images/project-icons/binfiesta.png",
    desktop: true,
    description: "In Bin Fiesta, I developed a Google Gemini AI-powered chatbot that provides users with personalized recycling guidance, contributing to our 1st place win in Sustainability at Frontera Hacks. The project combines real-time AI interaction with a user-friendly interface built in Next.js, encouraging eco-friendly practices through accessible recycling information.",
    technologies: ["Google Gemini AI", "Next.js", "Chatbot", "Sustainability", "Hackathon Winner"],
    demo_link: "https://youtu.be/tXxWyIuusXI",
    source_code_link: "https://github.com/yulijasso/binfiesta"
  },
  {
    name: "Balanced Perspective",
    categories: ["Machine Learning", "Deep Learning"],
    route: "/projects/balanced-perspective",
    icon: "/images/project-icons/newspaper.png",
    desktop: true,
    description: "The project, Balanced Perspective, aims to use deep learning for unbiased news summarization. By leveraging a CNN classifier to detect political bias and the PEGASUS transformer model for abstractive summarization, it produces summaries intended to present balanced perspectives across articles from different political spectrums.",
    technologies: ["Deep Learning", "CNN", "PEGASUS", "NLP", "News Analysis"],
    demo_link: "https://github.com/yulijasso/deep-learning-proj",
    source_code_link: "https://github.com/yulijasso/deep-learning-proj"
  },
  {
    name: "SuperTux CNN Path Prediction",
    categories: ["Machine Learning", "Deep Learning"],
    route: "/projects/mario-kart-cnn",
    icon: "/images/project-icons/mario-kart.png",
    desktop: true,
    description: "I developed a Convolutional Neural Network that predicts a kart's driving path using visual inputs. Rather than going through segmentation and depth estimation, I predicted the lane boundaries in the vehicle's coordinate frame directly from the image, achieving optimal lateral and longitudinal error!",
    technologies: ["CNN", "Computer Vision", "Path Prediction", "Deep Learning"],
    demo_link: "https://github.com/yulijasso/online_deep_learning",
    source_code_link: "https://github.com/yulijasso/online_deep_learning"
  },
  {
    name: "Album Database",
    categories: ["Software Engineering"],
    route: "/projects/album-database",
    icon: "/images/project-icons/albumdatabase.png",
    desktop: true,
    description: "This project focuses on transferring data from an original SQLite database to a new relational schema. It involves creating tables for musicians, albums, and instruments, importing data from a CSV, and setting up relationships between these tables to support efficient data retrieval and reporting.",
    technologies: ["SQLite", "Relational Database", "Data Migration", "CSV Import"],
    demo_link: "https://github.com/yulijasso/album-database",
    source_code_link: "https://github.com/yulijasso/album-database"
  },
  {
    name: "Image Analysis and Interpolation with Fourier Transforms",
    categories: ["Image Processing"],
    route: "/projects/image-analysis",
    icon: "/images/project-icons/ct_scan.png",
    desktop: true,
    description: "This project utilizes Fourier transforms to analyze and process a lung CT scan, extracting magnitude and phase spectrums and downsampling the image. Linear interpolation and zero-padding techniques are then applied to upsample the image, with mean squared error calculated to evaluate the quality of the interpolated images.",
    technologies: ["Fourier Transforms", "Image Processing", "CT Scan Analysis", "Interpolation"],
    demo_link: "https://github.com/yulijasso/digital-image-processing-proj",
    source_code_link: "https://github.com/yulijasso/digital-image-processing-proj"
  },
  {
    name: "Rails Book System",
    categories: ["Software Engineering"],
    route: "/projects/rails-book-system",
    icon: "/images/project-icons/booksystem.png",
    desktop: true,
    description: "I developed a book club management app providing the organizer, with full CRUD functionality to manage book suggestions, track reading status, and approve or reject recommendations from members. The app allows members to sign up, suggest books, and view read/unread lists, while the organizer can control the visibility of suggestions to maintain a high-quality selection process.",
    technologies: ["Ruby on Rails", "CRUD", "Book Management", "User Authentication"],
    demo_link: "https://youtu.be/Tg-l2x3FodU",
    source_code_link: "https://github.com/yulijasso/rails-book-system"
  },
  {
    name: "Discord Bot",
    categories: ["AI"],
    route: "/projects/discord-bot",
    description: "A Python Discord bot that detects user messages and responds using spaCy natural language processing to pick out keywords and intents, hosted behind a small web server so it stays online.",
    technologies: ["Python", "Discord API", "spaCy", "NLP"],
    demo_link: "https://github.com/yulijasso/discord-bot",
    source_code_link: "https://github.com/yulijasso/discord-bot"
  },
  {
    name: "Axolotl Code",
    categories: ["AI", "Software Engineering"],
    icon: "/images/project-icons/aicodeditor.png",
    description: "A minimal online code editor and collaborative coding platform. Write, run, and share code in 50+ languages with real-time multiplayer editing, an in-editor AI assistant with ghost-text suggestions, and multi-file projects.",
    technologies: ["Monaco Editor", "Judge0", "PartyKit", "OpenRouter", "Neon Postgres", "Clerk", "Stripe", "Vercel"],
    demo_link: "https://axolotlcode.vercel.app",
    source_code_link: "https://github.com/yulijasso/axolotlcode"
  },
  {
    name: "Researchella",
    categories: ["AI"],
    icon: "/images/project-icons/researchella.webp",
    iconSize: { width: 80, height: 35 },
    desktop: true,
    description: "A NotebookLM-style AI research assistant. Upload PDFs, images, web pages, YouTube videos, or Drive files and chat with them using RAG with citations, or generate quizzes, flashcards, podcasts, reports, and mind maps.",
    technologies: ["Next.js", "RAG", "Pinecone", "GPT-4 Vision", "Clerk", "Upstash Redis", "Chakra UI"],
    demo_link: "https://researchella.vercel.app/",
    source_code_link: "https://github.com/yulijasso/researchella"
  },
  {
    name: "CityAssist Dashboard",
    categories: ["Software Engineering"],
    icon: "/images/project-icons/aitutor.png",
    description: "Admin dashboard for CityAssist, a multi-tenant civic chatbot platform. City staff manage departments, knowledge bases, conversations, and analytics for their resident-facing assistant.",
    technologies: ["Next.js", "TypeScript", "Multi-tenant", "Dashboard"],
    demo_link: "https://cityassist.vercel.app",
    source_code_link: "https://github.com/yulijasso/cityassist"
  },
  {
    name: "CityAssist Backend",
    categories: ["AI"],
    icon: "/images/project-icons/aitutor.png",
    description: "Multi-tenant civic chatbot backend. Cities embed a widget that answers resident questions using a LangGraph agent backed by live Tavily web search, with Groq or Claude as the LLM.",
    technologies: ["LangGraph", "LangChain", "Groq", "Tavily", "tRPC", "PostgreSQL", "Drizzle", "Redis", "Clerk"],
    demo_link: "https://github.com/yulijasso/city-assist-backend",
    source_code_link: "https://github.com/yulijasso/city-assist-backend"
  },
  {
    name: "STX CityAssist",
    categories: ["AI"],
    icon: "/images/project-icons/aitutor.png",
    description: "Python version of the CityAssist civic chatbot: a FastAPI + LangChain backend with Tavily web search, a Gradio QA interface, a Next.js admin dashboard, and an embeddable Vite widget.",
    technologies: ["FastAPI", "LangChain", "Gradio", "Next.js", "PostgreSQL", "Redis", "Docker"],
    demo_link: "https://github.com/yulijasso/stx-city-assist",
    source_code_link: "https://github.com/yulijasso/stx-city-assist"
  },
  {
    name: "City Connect",
    categories: ["Software Engineering", "AI"],
    icon: "/images/project-icons/cityconnect.png",
    desktop: true,
    description: "City Connect is an AI-powered resident engagement platform that gives source-cited answers in English and Spanish. I mostly did the backend engineering, built the admin dashboard, and implemented role-based access control.",
    technologies: ["Backend Engineering", "Admin Dashboard", "Role-Based Access Control", "Next.js", "TypeScript", "Clerk"],
    demo_link: "https://city-connect-brand-website.vercel.app",
    source_code_link: "https://github.com/yulijasso/city-connect-brand-website"
  },
  {
    name: "RAG Chatbot",
    categories: ["AI"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "A retrieval-augmented chatbot built on Next.js and the AI SDK, with file uploads, pgvector embeddings, LangChain document loaders, and Voyage AI for retrieval.",
    technologies: ["Next.js", "AI SDK", "RAG", "pgvector", "LangChain", "Voyage AI", "Drizzle"],
    demo_link: "https://rag-chatbot-yuliana-jassos-projects.vercel.app/",
    source_code_link: "https://github.com/yulijasso/rag-chatbot"
  },
  {
    name: "PawPal+",
    categories: ["AI"],
    description: "A Streamlit pet-care planner with a rule-based daily scheduler plus an AI care advisor that checks the plan against a curated pet-care knowledge base (AKC, VCA, AAHA) and applies cited, RAG-informed edits.",
    technologies: ["Python", "Streamlit", "RAG", "LLM", "Scheduling"],
    demo_link: "https://yulijasso-applied-ai-system-project-app-cyvzts.streamlit.app/",
    source_code_link: "https://github.com/yulijasso/applied-ai-system-project"
  },
  {
    name: "Angel of My Heart",
    categories: ["Software Engineering"],
    description: "A full-featured jewelry e-commerce store with product filtering and sorting, ring size selection, a persistent cart, Stripe Checkout, and dark mode.",
    technologies: ["Next.js", "Chakra UI", "Stripe", "E-commerce"],
    demo_link: "https://github.com/yulijasso/angelofmyheart",
    source_code_link: "https://github.com/yulijasso/angelofmyheart"
  },
  {
    name: "xAI Chatbot",
    categories: ["AI"],
    icon: "/images/project-icons/aitutor.png",
    description: "A chat app that talks to xAI's Grok model through a Next.js API route.",
    technologies: ["Next.js", "TypeScript", "xAI", "Grok", "Chatbot"],
    demo_link: "https://github.com/yulijasso/xAI-chatbot",
    source_code_link: "https://github.com/yulijasso/xAI-chatbot"
  },
  {
    name: "Class Material",
    categories: ["Software Engineering"],
    description: "A course notes and materials hub with course pages, sections, file uploads, a rich-text note editor, and a blog.",
    technologies: ["Next.js", "TypeScript", "Prisma", "Tiptap", "Radix UI"],
    demo_link: "https://class-material-zeta.vercel.app",
    source_code_link: "https://github.com/yulijasso/class-material"
  },
  {
    name: "Market Anomaly Detection",
    categories: ["Machine Learning"],
    icon: "/images/project-icons/newspaper.png",
    description: "An early-warning system for financial market crashes. A machine learning model classifies market conditions as crash or no crash and proposes investment strategies for risk mitigation.",
    technologies: ["Machine Learning", "Anomaly Detection", "Python", "Gradio", "Finance"],
    demo_link: "https://market-anomaly-detection.vercel.app",
    source_code_link: "https://github.com/yulijasso/market-anomaly-detection"
  },
  {
    name: "RAG Financial Analysis",
    categories: ["AI"],
    icon: "/images/project-icons/newspaper.png",
    description: "Automates stock research by pulling Yahoo Finance data, embedding it into a Pinecone vector store, and answering questions about companies with OpenAI using retrieval-augmented generation.",
    technologies: ["RAG", "LangChain", "Pinecone", "OpenAI", "yfinance"],
    demo_link: "https://github.com/yulijasso/RAG-Financial-Analysis-Automation-with-LLMs",
    source_code_link: "https://github.com/yulijasso/RAG-Financial-Analysis-Automation-with-LLMs"
  },
  {
    name: "NLP Question Answering",
    categories: ["Machine Learning", "Deep Learning"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "A question-answering model trained on the SQuAD dataset with Hugging Face transformers, including answer-span extraction and named-entity helpers.",
    technologies: ["NLP", "Transformers", "Hugging Face", "SQuAD", "PyTorch"],
    demo_link: "https://github.com/yulijasso/nlp-project",
    source_code_link: "https://github.com/yulijasso/nlp-project"
  },
  {
    name: "RAG Codebase",
    categories: ["AI"],
    icon: "/images/project-icons/searchengine.png",
    description: "An AI chatbot built on the Next.js AI SDK chatbot template.",
    technologies: ["Next.js", "AI SDK", "RAG", "shadcn/ui"],
    demo_link: "https://rag-codebase-mu.vercel.app",
    source_code_link: "https://github.com/yulijasso/rag-codebase"
  },
  {
    name: "CardGPT",
    categories: ["AI"],
    description: "An AI flashcard generator. Enter a topic or text and OpenAI turns it into flashcard sets you can save and study, with Clerk sign-in and Stripe subscriptions.",
    technologies: ["Next.js", "OpenAI", "Clerk", "Firebase", "Stripe", "Material UI"],
    demo_link: "https://github.com/yulijasso/cardGPT",
    source_code_link: "https://github.com/yulijasso/cardGPT"
  },
  {
    name: "AITutor",
    categories: ["Software Engineering"],
    icon: "/images/project-icons/aitutor.png",
    description: "Landing page for AITutor, an AI tutoring app built with Next.js and Tailwind CSS.",
    technologies: ["Next.js", "Tailwind CSS", "AI Tutor"],
    demo_link: "https://github.com/yulijasso/chatgpt-rag",
    source_code_link: "https://github.com/yulijasso/chatgpt-rag"
  },
  {
    name: "Gemini To-Do",
    categories: ["AI"],
    description: "A to-do app with a floating Gemini AI chatbot assistant, plus Jest tests and a GitHub Actions CI workflow.",
    technologies: ["Next.js", "Gemini AI", "Chakra UI", "Jest", "GitHub Actions"],
    demo_link: "https://github.com/yulijasso/todo-geminiai",
    source_code_link: "https://github.com/yulijasso/todo-geminiai"
  },
  {
    name: "Next.js + Chakra + Firebase + Clerk Starter",
    categories: ["Software Engineering"],
    description: "A starter app wiring together Next.js, Chakra UI, Firebase, and Clerk authentication.",
    technologies: ["Next.js", "Chakra UI", "Firebase", "Clerk"],
    demo_link: "https://github.com/yulijasso/Next.js.-app-with-Chakra-UI-Firebase-and-Clerk-authentication",
    source_code_link: "https://github.com/yulijasso/Next.js.-app-with-Chakra-UI-Firebase-and-Clerk-authentication"
  },
  {
    name: "Inventory Management App",
    categories: ["Software Engineering"],
    description: "An inventory tracker that adds, removes, and counts items stored in Firebase Firestore, built with Material UI.",
    technologies: ["Next.js", "Firebase", "Firestore", "Material UI"],
    demo_link: "https://inventory-management-app-gules.vercel.app",
    source_code_link: "https://github.com/yulijasso/inventory-management-app"
  },
  {
    name: "Gemini Nano Explain Chrome Extension",
    categories: ["AI"],
    icon: "/images/project-icons/chromext.png",
    description: "Chrome experiments with Gemini Nano, Chrome's built-in on-device AI model, for explaining text right in the browser.",
    technologies: ["Chrome Extension", "Gemini Nano", "On-device AI", "JavaScript"],
    demo_link: "https://github.com/yulijasso/gemininano-explain-chrome-ext",
    source_code_link: "https://github.com/yulijasso/gemininano-explain-chrome-ext"
  },
  {
    name: "AI Completer Gmail Extension",
    categories: ["AI"],
    icon: "/images/project-icons/chromext.png",
    description: "A Chrome extension that adds a 'Write this better' button to the Gmail compose window and rewrites drafts with OpenAI.",
    technologies: ["Chrome Extension", "InboxSDK", "OpenAI", "Gmail"],
    demo_link: "https://github.com/yulijasso/aicompleter-chrome-extension",
    source_code_link: "https://github.com/yulijasso/aicompleter-chrome-extension"
  },
  {
    name: "AI Autocomplete Extension (v1)",
    categories: ["AI"],
    icon: "/images/project-icons/chromext.png",
    description: "An early version of the AI autotab extension that suggests completions in any text field using OpenAI.",
    technologies: ["Chrome Extension", "OpenAI", "JavaScript"],
    demo_link: "https://github.com/yulijasso/chrome-ex-former-file-",
    source_code_link: "https://github.com/yulijasso/chrome-ex-former-file-"
  },
  {
    name: "Hello Chrome Extension",
    categories: ["Software Engineering"],
    icon: "/images/project-icons/chromext.png",
    description: "A starter Chrome extension with a popup and content script, the first step toward the AI Chrome extensions.",
    technologies: ["Chrome Extension", "JavaScript"],
    demo_link: "https://github.com/yulijasso/hellochrome-extension",
    source_code_link: "https://github.com/yulijasso/hellochrome-extension"
  },
  {
    name: "Dino Game",
    categories: ["Software Engineering"],
    icon: "/images/project-icons/wercooked.png",
    description: "A clone of the Chrome dinosaur game built with JavaScript and HTML Canvas, with a game loop, collision detection, and screen scaling.",
    technologies: ["JavaScript", "HTML Canvas", "Game Dev"],
    demo_link: "https://github.com/yulijasso/dinogame-next.js",
    source_code_link: "https://github.com/yulijasso/dinogame-next.js"
  },
  {
    name: "Vision Language Models for SuperTuxKart",
    categories: ["Deep Learning"],
    icon: "/images/project-icons/mario-kart.png",
    description: "Advanced deep learning coursework, including fine-tuning a multimodal LLM and a CLIP-style contrastive model to answer questions about SuperTuxKart images.",
    technologies: ["Deep Learning", "VLM", "CLIP", "PyTorch"],
    demo_link: "https://github.com/yulijasso/advancesdl-hw",
    source_code_link: "https://github.com/yulijasso/advancesdl-hw"
  },
  {
    name: "Time Series Chain Forecasting",
    categories: ["Machine Learning"],
    icon: "/images/project-icons/newspaper.png",
    description: "Senior project: a predictive time series model using an MLP neural network to forecast future chains.",
    technologies: ["MLP", "Neural Networks", "Time Series", "Python", "MATLAB"],
    demo_link: "https://github.com/yulijasso/senior-project",
    source_code_link: "https://github.com/yulijasso/senior-project"
  },
  {
    name: "Interview Prep",
    categories: ["Software Engineering"],
    description: "Python notebooks for coding interview practice covering arrays and hashing, two pointers, and Python basics.",
    technologies: ["Python", "Algorithms", "Data Structures"],
    demo_link: "https://github.com/yulijasso/interview-prep",
    source_code_link: "https://github.com/yulijasso/interview-prep"
  },
  {
    name: "Mentor Demo Server",
    categories: ["Software Engineering"],
    description: "A Node.js + Express REST server for a to-do app backed by a PostgreSQL database.",
    technologies: ["Node.js", "Express", "PostgreSQL", "REST API"],
    demo_link: "https://github.com/yulijasso/demo-mentor-proj",
    source_code_link: "https://github.com/yulijasso/demo-mentor-proj"
  },
  {
    name: "Photo Generator",
    categories: ["Software Engineering"],
    description: "A SwiftUI iOS app that asynchronously fetches and displays a new random photo on each tap.",
    technologies: ["Swift", "SwiftUI", "iOS"],
    demo_link: "https://github.com/yulijasso/photo-generator",
    source_code_link: "https://github.com/yulijasso/photo-generator"
  },
  {
    name: "WGAN-GP Image Generation",
    categories: ["Generative AI", "Machine Learning", "Deep Learning", "Image Processing"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Trained a Wasserstein GAN with gradient penalty (WGAN-GP) on MNIST to generate handwritten digit images, using the gradient penalty to stabilize adversarial training.",
    technologies: ["PyTorch", "WGAN-GP", "GANs", "MNIST", "Jupyter Notebook"],
    demo_link: "https://github.com/yulijasso/wgan-gp-image-generation",
    source_code_link: "https://github.com/yulijasso/wgan-gp-image-generation"
  },
  {
    name: "Generative Adversarial Networks",
    categories: ["Generative AI", "Machine Learning", "Deep Learning"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Built and trained a generative adversarial network on a 2D toy distribution, visualizing how the generator learns to match the target data.",
    technologies: ["PyTorch", "GANs", "Generative Models", "Jupyter Notebook"],
    demo_link: "https://github.com/yulijasso/generative-adversarial-networks",
    source_code_link: "https://github.com/yulijasso/generative-adversarial-networks"
  },
  {
    name: "RealNVP Normalizing Flows",
    categories: ["Generative AI", "Machine Learning", "Deep Learning"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Implemented RealNVP, an invertible normalizing-flow model with affine coupling layers, for exact density estimation and sampling.",
    technologies: ["PyTorch", "Normalizing Flows", "RealNVP", "Generative Models", "Jupyter Notebook"],
    demo_link: "https://github.com/yulijasso/realnvp-normalizing-flows",
    source_code_link: "https://github.com/yulijasso/realnvp-normalizing-flows"
  },
  {
    name: "Multilayer Perceptron from Scratch",
    categories: ["Generative AI", "Machine Learning", "Deep Learning"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Built multilayer perceptrons from scratch with ReLU and sigmoid activations, MSE and Huber losses, and a gradient descent training loop, then studied how network depth and width affect training and test loss.",
    technologies: ["Python", "PyTorch", "NumPy", "Neural Networks", "Gradient Descent", "Jupyter Notebook"],
    demo_link: "https://github.com/yulijasso/multilayer-perceptron-from-scratch",
    source_code_link: "https://github.com/yulijasso/multilayer-perceptron-from-scratch"
  },
  {
    name: "Optimization Algorithms Comparison",
    categories: ["Generative AI", "Machine Learning"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Implemented gradient descent, momentum, RMSProp, Adam, and sign-based gradient descent from scratch, then compared their trajectories on a 2D non-convex function with two Gaussian wells to see which optimizers escape to the deeper minimum.",
    technologies: ["Python", "NumPy", "Matplotlib", "Optimization", "Gradient Descent", "Adam", "Jupyter Notebook"],
    demo_link: "https://github.com/yulijasso/optimization-algorithms-comparison",
    source_code_link: "https://github.com/yulijasso/optimization-algorithms-comparison"
  },
  {
    name: "Energy-Based Models with Langevin Sampling",
    categories: ["Generative AI", "Machine Learning", "Deep Learning"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Trained an energy-based model on a 2D toy problem and generated samples from it using Langevin dynamics.",
    technologies: ["PyTorch", "Energy-Based Models", "Langevin Dynamics", "Generative Models", "Jupyter Notebook"],
    demo_link: "https://github.com/yulijasso/energy-based-models-langevin-sampling",
    source_code_link: "https://github.com/yulijasso/energy-based-models-langevin-sampling"
  },
  {
    name: "Statewave Open Source Contribution",
    categories: ["AI", "Software Engineering"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Open source contribution to Statewave, a memory runtime for AI agents. Fixed the multi-agent shared-context demo so agents record each context read as an episode, letting the timeline inspector show its Agent Context Retrievals section and a real context-read count (fixes smaramwbc/statewave#485).",
    technologies: ["Python", "Statewave", "Multi-Agent Systems", "Open Source"],
    demo_link: "https://github.com/smaramwbc/statewave-multi-agent-shared-context/pull/7",
    source_code_link: "https://github.com/yulijasso/statewave-multi-agent-shared-context"
  },
  {
    name: "studentAssist",
    categories: ["AI"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "A conversational AI assistant for colleagues, built in TypeScript on the CityAssist multi-tenant chatbot stack: a LangGraph agent with live web search behind an embeddable chat widget.",
    technologies: ["TypeScript", "Next.js", "LangGraph", "LangChain", "Tavily"],
    demo_link: "https://github.com/yulijasso/studentAssist",
    source_code_link: "https://github.com/yulijasso/studentAssist"
  },
  {
    name: "Claude Skills & Hooks for Open Source",
    categories: ["AI"],
    icon: DEFAULT_PROJECT_ICON,
    desktop: true,
    description: "Open Source AI Capstone (CodePath AI301): a toolkit of Claude Code skills and hooks that apply open source best practices, from picking an issue to reproducing it, planning the fix, and pre-checking the pull request. Each skill is backed by eval runs, and the toolkit was used to make a real open source contribution.",
    technologies: ["Claude Code", "Skills", "Hooks", "Evals", "Open Source"],
    demo_link: "https://github.com/yulijasso/ai301-coursework",
    source_code_link: "https://github.com/yulijasso/ai301-coursework"
  }
];


export const projectHref = (project: Project) => project.route ?? project.demo_link;

export const desktopProjects = projects.filter((p) => p.desktop);
