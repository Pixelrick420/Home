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
    id: "gravity",
    title: "Gravity",
    description:
      "An N-body gravity sandbox with a Rust and WebAssembly engine and a WebGL2 renderer.",
    tags: ["Rust", "WebAssembly", "WebGL2"],
    github: "https://github.com/Pixelrick420/Gravity",
    year: "2026",
    what: "Gravity is an N-body sandbox that simulates up to 2,000 particles pulling on each other in real time. You pick a starting layout, such as a spiral galaxy, two clusters, or a galaxy crash, and watch it evolve while adjusting particle count, size, and speed.",
    problem:
      "Summing the pull between every pair of particles gets expensive very quickly. Gravity uses the Fast Multipole Method, which approximates the pull of distant groups of particles instead of computing every pair.",
    stack:
      "The physics engine is written in Rust as a quadtree-based FMM with unit tests, and compiled to WebAssembly. A web worker runs the engine and draws the particles with WebGL2, while the controls use Svelte 5 and Tailwind CSS 4. Every push to main runs the tests and deploys to GitHub Pages.",
    demo: "https://pixelrick420.github.io/Gravity",
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
    id: "chargpt",
    title: "CharGPT",
    description:
      "A tiny GPT built from scratch in NumPy, with a hand-written backward pass.",
    tags: ["Python", "NumPy", "Transformers"],
    github: "https://github.com/Pixelrick420/CharGPT",
    year: "2026",
    what: "CharGPT is a small character-level GPT written in pure NumPy and trained on the Tiny Shakespeare corpus. It is a 6-layer decoder-only transformer with 8 attention heads, based on a Deep-ML project.",
    problem:
      "Frameworks hide how a transformer actually learns. CharGPT writes every forward and backward step by hand, from attention and layer norm to the optimizer update, so nothing is left to autograd.",
    stack:
      "It is written in Python with NumPy only. Training uses AdamW with warmup, cosine decay, and gradient clipping, and reaches a validation loss of about 1.46. A second pass warm-starts from the baseline and widens the context from 64 to 128 tokens.",
  },
  {
    id: "papyrus",
    title: "Papyrus",
    description: "An offline document viewer for Android.",
    tags: ["Kotlin", "Jetpack Compose", "Android"],
    github: "https://github.com/Pixelrick420/Papyrus",
    year: "2026",
    what: "Papyrus is a document viewer for Android that opens PDFs, Markdown, plain text, code, and Office files, indexes them in a local library, and renders everything entirely on-device.",
    problem:
      "Most document viewers depend on the network or upload your files somewhere. Papyrus declares no permissions at all, so nothing ever leaves the phone.",
    stack:
      "It is written in Kotlin with Jetpack Compose, using Room for the library index, PdfRenderer for PDFs, and its own tokenizer for syntax highlighting. Documents open through the Storage Access Framework.",
  },
  {
    id: "automata",
    title: "Automata",
    description:
      "A web app that converts regular expressions into NFAs and draws them interactively.",
    tags: ["Next.js", "FastAPI", "Automata Theory"],
    github: "https://github.com/Pixelrick420/Automata",
    year: "2025",
    what: "Automata converts a regular expression into a nondeterministic finite automaton and draws it in the browser. The states can be dragged around, and the diagram updates instantly for each new expression.",
    problem:
      "Drawing automata by hand is slow and easy to get wrong. This tool builds the NFA for any expression using Thompson's construction, so the structure is easy to inspect and check.",
    stack:
      "The backend is a FastAPI service in Python that adds explicit concatenation, converts the expression to postfix with the shunting-yard algorithm, and builds the NFA with a stack. The frontend is Next.js with SVG rendering, deployed on Vercel with the API on Render.",
    demo: "https://regex-automata.vercel.app",
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
    id: "mesh",
    title: "mesh",
    description:
      "Collaborative pixel art canvas, one pixel at a time; similar to r/place.",
    tags: ["JavaScript", "Firebase"],
    github: "https://github.com/Pixelrick420/mesh",
    year: "2024",
    what: "Mesh is a collaborative pixel-art canvas inspired by r/place. Users place one pixel at a time on a shared canvas, with changes syncing to everyone instantly.",
    problem:
      "I really liked r/place so I wanted to make my own version. Although simple, this project helped me learn a lot about data design.",
    stack:
      "It is built with Next.js and React on the frontend. Firebase handles authentication and real-time data, and the app is deployed on Vercel.",
    demo: "https://pixel-mesh.vercel.app",
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
    id: "paint",
    title: "Paint",
    description: "A drawing program for Linux built in C++23 with SDL3.",
    tags: ["C++", "SDL3", "Linux"],
    github: "https://github.com/Pixelrick420/Paint",
    year: "2026",
    what: "Paint is a desktop drawing program with pencil, eraser, line, rectangle, circle, and fill tools, a color palette, adjustable line thickness, zoom and pan, and an optional grid. Drawings can be saved as BMP files.",
    problem:
      "I wanted to understand how a drawing program works underneath, so the canvas, the shape-drawing routines, and the BMP writer are all written by hand rather than pulled from a library.",
    stack:
      "It is written in C++23 on SDL3 and SDL3_ttf, split into app, drawing, and I/O modules and built with Make. A GitHub Actions workflow produces a static binary that runs on Linux systems without SDL3 installed.",
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
    id: "masm",
    title: "MASM",
    description:
      "An 8086 assembly workflow, with a Python tool that converts MASM to trainer-kit code.",
    tags: ["Assembly", "8086", "Python"],
    github: "https://github.com/Pixelrick420/MASM",
    year: "2025",
    what: "MASM is a development environment for 8086 assembly. A single build command assembles, links, and runs a program in DOSBox, and a Python converter turns MASM source into an absolute-addressed listing for 8086 trainer kits. It includes a set of sample programs, such as LCM and HCF, factorial, and sorting.",
    problem:
      "Trainer kits work with fixed memory addresses rather than labels and variable names, so MASM programs need every symbol resolved before they can be entered. The converter automates that translation.",
    stack:
      "The converter is written in Python and works in two passes. The first builds a symbol table with data at 0800h and code at 0300h, and the second resolves every label and variable to an absolute address, calculating instruction sizes along the way. Builds are automated with a batch script around MASM and LINK.",
  },
  {
    id: "blog",
    title: "Blog",
    description:
      "A full-stack blogging platform with rich-text posts, likes, and recommendations.",
    tags: ["Node.js", "Express", "Supabase"],
    github: "https://github.com/Pixelrick420/Blog",
    year: "2026",
    what: "Blog (BLCK.BLOG) is a full-stack blogging platform where users sign up, write rich-text posts, and like and share what they read. The home page recommends posts from categories the reader has liked, and every author gets a profile page.",
    problem:
      "I wanted to build a complete app end to end, with authentication, a database, and real features instead of a static demo. The hosted backend is currently paused, so the source on GitHub is the best way to explore it.",
    stack:
      "It is built with Node.js and Express 5 with EJS templates. Supabase provides the Postgres database and authentication, sessions are kept server-side, and posts are written in the Quill editor, with auto-generated excerpts and read-time estimates.",
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
    id: "virtualkeys",
    title: "VirtualKeys",
    description:
      "An on-screen keyboard with a built-in text editor for KDE Plasma.",
    tags: ["Python", "PyQt5", "Linux"],
    github: "https://github.com/Pixelrick420/VirtualKeys",
    year: "2025",
    what: "VirtualKeys is an on-screen keyboard for KDE Plasma on Kubuntu. It has a full QWERTY layout with working shift states and symbols, and a built-in text editor with copy, paste, and clear.",
    problem:
      "A setup without a physical keyboard needs one that stays out of the way and fits the screen. VirtualKeys sizes itself from the screen resolution and keeps focus handling clean between the keyboard and the editor.",
    stack:
      "It is written in Python with PyQt5, using signals and slots for input handling and a stylesheet for the dark theme. A setup script installs the dependencies into a virtual environment.",
  },
];

export const FEATURED_COUNT = 6;

export const featuredProjects: Project[] = projects.slice(0, FEATURED_COUNT);
