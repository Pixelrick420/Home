import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "fractal",
    title: "Fractal",
    description: "A compiler for a minimalistic programming language.",
    tags: ["Rust", "Compilers", "PL Theory"],
    github: "https://github.com/Pixelrick420/Fractal",
    year: "2026",
    what: "Fractal is a compiled programming language for beginners, combining Python's friendly syntax with the discipline of a typed, compiled language. It ships with a desktop IDE and a browser playground. I built it with a team of three.",
    problem:
      "Beginner languages tend to hide how computers actually run code. Fractal keeps the compiled pipeline visible, with clear error messages, so newcomers learn what compilation really does.",
    stack:
      "The compiler and editor are written in Rust, with the lexer, parser, and code generator all implemented from scratch.",
    demo: "https://fractal-programming.vercel.app/demo",
  },
  {
    id: "chatsocket",
    title: "ChatSocket",
    description: "Socket-based group chat with a CLI interface.",
    tags: ["C", "Sockets", "TUI"],
    github: "https://github.com/Pixelrick420/ChatSocket",
    year: "2025",
    what: "ChatSocket is a multi-room chat application for macOS and Linux, with a TLS server, a command-line client, and a full-screen terminal client.",
    problem:
      "Most chat servers can read the messages they relay. ChatSocket encrypts messages end-to-end, so the server passes them along without ever being able to read them, and resists replay attacks and identity spoofing.",
    stack:
      "It is written in C with OpenSSL for TLS and cryptography. The terminal interface is a custom renderer built directly on ANSI control codes, with no external widget toolkit.",
  },
  {
    id: "automata",
    title: "Automata",
    description:
      "A tool that converts regex to NFA, rendered as an interactive graph.",
    tags: ["JavaScript", "Automata Theory", "Visualization"],
    github: "https://github.com/Pixelrick420/Automata",
    year: "2024",
    what: "Automata is a web app that converts regular expressions into nondeterministic finite automata (NFAs), rendering the result as an interactive diagram you can drag and rearrange.",
    problem:
      "Automata theory is abstract and hard to grasp from text alone. Seeing the machine built step by step makes it click.",
    stack:
      "The frontend is built with Next.js and React, with a FastAPI backend in Python. It is deployed on Vercel and Render.",
    demo: "https://regex-automata.vercel.app",
  },
  {
    id: "ascii",
    title: "Ascii",
    description:
      "A tool that converts visual media to ascii art with support for realtime video.",
    tags: ["Python", "Image Processing"],
    github: "https://github.com/Pixelrick420/Ascii",
    year: "2024",
    what: "Ascii converts images, videos, and live camera feeds into ASCII art, rendered in full color in the terminal using ANSI escape sequences.",
    problem:
      "Most ASCII art tools only handle static images. This one keeps up with motion, live camera feed included.",
    stack:
      "It is written in Python, using Pillow for image processing and OpenCV for video and camera capture.",
  },
  {
    id: "mesh",
    title: "mesh",
    description:
      "Collaborative pixel art canvas, one pixel at a time; similar to r/place.",
    tags: ["JavaScript", "Firebase"],
    github: "https://github.com/Pixelrick420/mesh",
    year: "2024",
    what: "Mesh is a collaborative pixel-art canvas inspired by r/place. Users place one pixel at a time on a shared canvas, with changes syncing to everyone instantly.",
    problem:
      "I really liked r/place so i wanted to make my own version. Although simple, this projecthelped me learn a lot about data design.",
    stack:
      "It is built with Next.js and React on the frontend. Firebase handles authentication and real-time data, and the app is deployed on Vercel.",
    demo: "https://pixel-mesh.vercel.app",
  },
  {
    id: "election",
    title: "Election",
    description:
      "Electronic voting interface for school elections; deployed at GHSS panamaram.",
    tags: ["Python", "Tkinter", "SQLite3"],
    github: "https://github.com/Pixelrick420/Election",
    year: "2023",
    what: "Election is a voting system for school elections. Voters cast ballots on a full-screen kiosk, and the app tallies results live. It was deployed and used at GHSS Panamaram.",
    problem:
      "Paper ballots are slow to count and easy to miscount. Election replaces the process with a secure digital one that delivers results instantly.",
    stack:
      "It is written in Python with a Tkinter GUI and an SQLite3 database. It runs on a single machine with no networking, and admin access is protected with SHA-256 password hashing.",
  },
  {
    id: "handwritten-digits",
    title: "Handwritten Digits",
    description:
      "Neural net built from scratch for handwritten digit recognition on MNIST.",
    tags: ["Python", "NumPy", "Neural Networks"],
    github: "https://github.com/Pixelrick420/Handwritten-Digits",
    year: "2025",
    what: "Handwritten Digits is a neural network trained on the MNIST dataset to recognize handwritten digits. A small GUI lets you draw a digit and watch the model predict it in real time.",
    problem:
      "Deep-learning frameworks hide how a neural network actually works. This project builds the whole model from scratch, so every step from training to prediction stays visible.",
    stack:
      "It uses Python and NumPy for the network math, and Tkinter for the drawing interface. The trained model reaches about 98% accuracy on the test set.",
  },
  {
    id: "below-c-level",
    title: "Below-C-Level",
    description: "A VS Code extension that makes sure you never code again.",
    tags: ["TypeScript", "VS Code", "Yeoman"],
    github: "https://github.com/Pixelrick420/Below-C-Level",
    year: "2025",
    what: "Below C Level is a VS Code extension built for a 'useless projects' hackathon. It adds absurd tools to the editor, like a snake game that eats your code and a renamer that turns variables into Shakespearean insults. I built it with a team of two.",
    problem:
      "Code editors are all productivity and no fun. This one attacks burnout with deliberate nonsense instead.",
    stack:
      "It is written in TypeScript for the VS Code extension API. Generated content comes from calls to the Groq API.",
    demo: "https://marketplace.visualstudio.com/items?itemName=Theerttha.below-c-level",
  },
  {
    id: "sharewave",
    title: "ShareWave",
    description: "A mobile app that can share files through sound.",
    tags: ["Flutter", "Dart", "Android"],
    github: "https://github.com/Pixelrick420/ShareWave",
    year: "2026",
    what: "ShareWave is an Android app that transfers files between two nearby phones using only their speakers and microphones. The sender shows a short code, the receiver types it in, and the file moves through sound. It is still a work in progress.",
    problem:
      "File transfer normally needs Wi-Fi, Bluetooth, or the internet. ShareWave needs none of them, and encrypts the transfer so a recording of the audio carries only ciphertext.",
    stack:
      "It is built with Flutter and Dart. The audio channel uses parallel-tone MFSK modulation with Reed-Solomon error correction and AES-GCM encryption.",
  },
  {
    id: "asteroids",
    title: "Asteroids",
    description:
      "The classic game of asteroids, running on my custom 2d graphics engine.",
    tags: ["C++", "2d graphics"],
    github: "https://github.com/Pixelrick420/Asteroids",
    year: "2024",
    what: "Asteroids is the classic arcade game, rebuilt from scratch. You fly a ship, rotate and thrust, and shoot asteroids that split into smaller ones as you destroy them.",
    problem:
      "Implementing the game taught me a lot about real-time graphics and game loops. I also learnt a lot of cool maths.",
    stack:
      "It is written in C++ using the SDL2 library for graphics and input, on a custom-built 2D engine with transformation matrices for movement and collision detection to end runs.",
  },
  {
    id: "sort",
    title: "Sort",
    description:
      "A sorting algorithm visualisation project. Built using plain Javscript",
    tags: ["Algorithms", "Visualization", "Javascript"],
    github: "https://github.com/Pixelrick420/Sort",
    year: "2023",
    what: "Sort is a visualizer for sorting algorithms, animating algorithms like bubble sort and merge sort so you can watch how they reorder data step by step.",
    problem:
      "Sorting algorithms are abstract and easy to misread on paper. Watching each comparison and swap play out makes the difference between algorithms obvious.",
    stack:
      "It is built with plain JavaScript and runs in the browser. The live demo is hosted on GitHub Pages.",
    demo: "https://pixelrick420.github.io/Sort/",
  },
  {
    id: "gameoflife",
    title: "GameOfLife",
    description: "John Conway's Game of Life",
    tags: ["HTML", "Canvas", "Cellular Automata"],
    github: "https://github.com/Pixelrick420/GameOfLife",
    year: "2023",
    what: "GameOfLife is an implementation of John Conway's Game of Life, where cells live, die, and multiply on a grid according to simple rules.",
    problem:
      "The Game of Life shows how simple rules create complex behavior. This implementation makes it interactive, so you can set up a pattern and watch it play out.",
    stack:
      "It is built with HTML5 Canvas and runs in the browser. The live demo is hosted on GitHub Pages.",
    demo: "https://pixelrick420.github.io/GameOfLife/",
  },
  {
    id: "shell",
    title: "Shell",
    description: "A lightweight Unix-like shell built in pure Python.",
    tags: ["Python", "Shell", "Systems"],
    github: "https://github.com/Pixelrick420/Shell",
    year: "2024",
    what: "Shell is a lightweight Unix-like shell with built-in commands, tab completion, command history, and I/O redirection.",
    problem:
      "This project exposes what happens under the hood of a shell, from parsing commands to executing them. It follows the CodeCrafters 'Build your own Shell' course.",
    stack:
      "It is written in pure Python with no framework, and adds readline support for line editing on Linux and macOS.",
  },
  {
    id: "tetris",
    title: "Tetris",
    description:
      "Simple implementation of tetris running in the windows console.",
    tags: ["Game", "WinAPI", "C++"],
    github: "https://github.com/Pixelrick420/Tetris",
    year: "2023",
    what: "Tetris is a port of the classic puzzle game that runs in the Windows console, with a level-select menu, a next-piece preview, and retro ASCII graphics.",
    problem:
      "Console games prove that a good game does not need fancy graphics, just responsive input and a tight loop.",
    stack:
      "It is written in C++ using the WinAPI for console input and output. A rotation matrix handles tetromino rotation, and the game loop runs on a fixed time step.",
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    description:
      "A real-time leaderboard tracking team scores and rankings live during a tech event",
    tags: ["TypeScript", "React", "Firebase"],
    github: "https://github.com/Pixelrick420/Leaderboard",
    year: "2026",
    what: "Leaderboard is a real-time scoreboard built for HackQuest, a live tech event, tracking team scores and rankings as the event runs.",
    problem:
      "I wanted teams to be able to quickly check their standing and adjust their strategies accordingly. This really came in handy.",
    stack: "It is built with React and TypeScript, and deployed on Vercel.",
    demo: "https://hackquest-leaderboard.vercel.app/",
  },
];
