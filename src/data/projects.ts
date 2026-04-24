import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "fractal",
    title: "Fractal",
    description: "A compiler for a minimalistic programming language.",
    longDescription:
      "Built entirely in Rust, Fractal is a compiler for a custom minimalistic language - covering lexing, parsing, and code generation from scratch.",
    tags: ["Rust", "Compilers", "PL Theory"],
    github: "https://github.com/Pixelrick420/Fractal",
    year: "2026",
  },
  {
    id: "handwritten-digits",
    title: "Handwritten Digits",
    description:
      "Neural net built from scratch for handwritten digit recognition on MNIST.",
    longDescription:
      "A fully connected neural network trained from scratch with NumPy on the MNIST dataset, achieving ~98% test accuracy. Includes a Tkinter GUI for real-time digit drawing and prediction.",
    tags: ["Python", "NumPy", "Neural Networks", "MNIST"],
    github: "https://github.com/Pixelrick420/Handwritten-Digits",
    year: "2025",
  },
  {
    id: "chatsocket",
    title: "ChatSocket",
    description: "Socket-based group chat with a CLI interface.",
    longDescription:
      "A multi-client group chat application built in C using raw POSIX sockets. Fully terminal-based, supporting real-time messaging between connected clients.",
    tags: ["C", "Networking", "Sockets", "CLI"],
    github: "https://github.com/Pixelrick420/ChatSocket",
    year: "2025",
  },
  {
    id: "automata",
    title: "Automata",
    description:
      "A tool that converts regex to NFA, rendered as an interactive graph.",
    longDescription:
      "A JavaScript tool that takes a regular expression and constructs the equivalent Non-deterministic Finite Automaton, rendered as an interactive graph.",
    tags: ["JavaScript", "Automata Theory", "Visualization"],
    github: "https://github.com/Pixelrick420/Automata",
    year: "2024",
  },
  {
    id: "ascii",
    title: "Ascii",
    description:
      "A tool that converts visual media to ascii art with support for realtime video.",
    longDescription:
      "A tool for converting images and videos to ascii to be displayed on the terminal. Includes support for realtime video display and a small accompanying GUI app.",
    tags: ["Python", "Ascii Art", "Real-time"],
    github: "https://github.com/Pixelrick420/Ascii",
    year: "2024",
  },
  {
    id: "mesh",
    title: "mesh",
    description:
      "Collaborative pixel art canvas, one pixel at a time; similar to r/place.",
    longDescription:
      "A real-time collaborative canvas where multiple users paint pixels together. Built with Firebase for live sync and a clean browser-based interface.",
    tags: ["JavaScript", "Firebase", "Real-time", "Canvas"],
    github: "https://github.com/Pixelrick420/mesh",
    year: "2024",
  },
  {
    id: "election",
    title: "Election",
    description:
      "Electronic voting interface for school elections; deployed at GHSS panamaram.",
    longDescription:
      "A secure, Python-based electronic voting system designed for school use. Handles voter authentication, ballot casting, and real-time result tallying.",
    tags: ["Python", "Flask", "MySQL", "Auth"],
    github: "https://github.com/Pixelrick420/Election",
    year: "2023",
  },
  {
    id: "below-c-level",
    title: "Below-C-Level",
    description: "A VS Code extension that makes sure you never code again.",
    longDescription:
      "A satirical VS Code extension. Features include bad programming jokes, snake game that eats your code, shakesperian insult indentifiers etc",
    tags: ["TypeScript", "VS Code", "Extension"],
    github: "https://github.com/Pixelrick420/Below-C-Level",
    year: "2025",
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    description:
      "A real-time leaderboard tracking team scores and rankings live during a tech event",
    longDescription:
      "A real-time leaderboard tracking team scores and rankings live during a tech event. Includes admin panel to provide live updates.",
    tags: ["TypeScript", "React", "Real-time"],
    github: "https://github.com/Pixelrick420/Leaderboard",
    live: "https://hackquest-leaderboard.vercel.app",
    year: "2026",
  },
  {
    id: "asteroids",
    title: "Asteroids",
    description:
      "The classic game of asteroids, running on my custom 2d graphics engine.",
    longDescription: "",
    tags: ["Game", "C++", "2d graphics"],
    github: "https://github.com/Pixelrick420/Asteroids",
    year: "2024",
  },
  {
    id: "sort",
    title: "Sort",
    description:
      "A sorting algorithm visualisation project. Built using plain Javscript",
    longDescription: "A sorting algorithm visualisation project.",
    tags: ["Algorithms", "Visualization", "Javascript"],
    github: "https://github.com/Pixelrick420/Sort",
    year: "2023",
  },
  {
    id: "gameoflife",
    title: "GameOfLife",
    description: "John Conway's Game of Life",
    longDescription:
      "John Conway's Game of Life, implemented using HTML canvas showcasing minimalistic css and an attempt at writing a funny blogpost",
    tags: ["HTML", "Canvas", "Cellular Automata"],
    github: "https://github.com/Pixelrick420/GameOfLife",
    year: "2023",
  },
  {
    id: "shell",
    title: "Shell",
    description: "A lightweight Unix-like shell built in pure Python.",
    longDescription:
      "A pure Python implementation of a Unix-like shell with built-in commands (cd, pwd, ls, echo, mv, touch), tab completion, command history, and I/O redirection. Built following the CodeCrafters 'Build your own Shell' course.",
    tags: ["Python", "Shell", "CLI", "Systems"],
    github: "https://github.com/Pixelrick420/Shell",
    year: "2024",
  },
  {
    id: "tetris",
    title: "Tetris",
    description:
      "Simple implementation of tetris running in the windows console.",
    longDescription: "Fun & Simple Original tetris",
    tags: ["Game", "Terminal", "Python"],
    github: "https://github.com/Pixelrick420/Tetris",
    year: "2023",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "This site - built with Vite, React, and TypeScript.",
    longDescription: "Minimalistic portfolio website",
    tags: ["React", "TypeScript", "Vite", "Design"],
    github: "https://github.com/Pixelrick420/Home",
    live: "https://pixelrick-resume.vercel.app",
    year: "2026",
  },
];
