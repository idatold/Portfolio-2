import plantioImg from "../assets/projects/plantio.png";
import pistachioImg from "../assets/projects/pistachioscreenshot1.jpg";
import bidhiveImg from "../assets/projects/bidhivescreenshot.jpg";
import museumImg from "../assets/projects/communitysciencemuseumscreenshot.png";
import rainydaysImg from "../assets/projects/rainydaysscreenshot.jpg";
import holidazeImg from "../assets/projects/holidazescreenshot.jpg";
import whimsyImg from "../assets/projects/whimsyandwordsscreenshot.jpg";

const projects = [
  {
    id: "cssfw-plantio",
    slug: "plantio",
    title: "Plantio",
    tech: ["HTML", "Tailwind", "JavaScript"],
    imgSrc: plantioImg,
    imgAlt: "Plantio mock social app preview",
    line1: "Mock-only social app UI.",
    line2: "Login/register, feed, tags, create-post.",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "A mock social app UI built with Tailwind and vanilla JS. Focus on layout, components, and interactions without a backend.",
    description: [
      "Plantio explores a clean social feed layout with reusable components and subtle motion. Forms and interactions are client-only (no API).",
      "Great for showcasing UI skills, responsive design, and accessible patterns like focus rings and keyboard-friendly nav.",
    ],
    highlights: [
      "Mock auth & profile UI",
      "Responsive feed/cards",
      "Create-post form (client-only)",
      "Tag filter and simple search",
    ],
    images: [{ src: plantioImg, alt: "Plantio home feed screenshot" }],
    links: {
      demoUrl: "https://plantioidatold.netlify.app/",
      repoUrl: "https://github.com/idatold/css-frameworks",
    },
  },
  {
    id: "jsfw-pistachio",
    slug: "pistachio-shop",
    title: "Pistachio Shop",
    tech: ["Next.js", "TypeScript", "Tailwind", "Zustand", "Axios"],
    imgSrc: pistachioImg,
    imgAlt: "Pistachio online shop preview",
    line1: "Next.js + TS e-commerce demo.",
    line2: "Search/sort, cart, contact form.",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "A small e-commerce demo with product grid, search/sort, and a Zustand-powered cart.",
    description: [
      "Built with Next.js + TypeScript for type-safe components and fast routing.",
      "State is centralized in a lightweight store (Zustand) for cart and filters.",
    ],
    highlights: [
      "Search & sort controls",
      "Zustand cart with persistence",
      "Product detail pages",
      "Contact form with validation",
    ],
    images: [{ src: pistachioImg, alt: "Pistachio product grid screenshot" }],
    links: {
      demoUrl: "https://pistachio-jsframeworks-idatold.vercel.app/",
      repoUrl: "https://github.com/idatold/jsframeworks",
    },
  },
  {
    id: "sp2-bidhive",
    slug: "bidhive-auction-house",
    title: "BidHive Auction House",
    tech: ["HTML", "Tailwind", "JavaScript", "Vite", "Axios"],
    imgSrc: bidhiveImg,
    imgAlt: "BidHive auction site preview",
    line1: "Auction platform with Noroff API v2.",
    line2: "Browse, bid, profiles; CRUD listings.",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "An auction platform using the Noroff API v2: list items, place bids, and manage profiles.",
    description: [
      "SPA built with Vite + JavaScript and Axios for API requests. Emphasis on clean UI and clear bid flows.",
      "Includes authenticated areas for creating listings and managing profile data.",
    ],
    highlights: [
      "Auth + profiles",
      "Create/Update/Delete listings",
      "Bidding flow",
      "Responsive, accessible UI",
    ],
    images: [{ src: bidhiveImg, alt: "BidHive auction list screenshot" }],
    links: {
      demoUrl: "https://bidhive-sv2.netlify.app/",
      repoUrl: "https://github.com/idatold/Semester-Project-2",
    },
  },
  {
    id: "holidaze",
    slug: "holidaze",
    title: "Holidaze",
    tech: ["React", "Vite", "Tailwind", "Router", "Axios"],
    imgSrc: holidazeImg,
    imgAlt: "Holidaze venue booking app preview",
    line1: "Venue booking app with guarded routes.",
    line2: "Search, book, manage profile & venues.",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "A booking app with venue search, details, and owner dashboards—guarded routes included.",
    description: [
      "React + Vite SPA with Router for protected areas (owner vs guest).",
      "Tailwind design system and reusable components keep UI consistent.",
    ],
    highlights: [
      "Search & filter venues",
      "Bookings + calendars",
      "Owner dashboards",
      "Protected routes",
    ],
    images: [{ src: holidazeImg, alt: "Holidaze venue page screenshot" }],
    links: {
      demoUrl: "https://holidazeidatold.netlify.app/",
      repoUrl: "https://github.com/idatold/holidaze",
    },
  },
  {
    id: "whimsy",
    slug: "whimsy-and-words",
    title: "Whimsy & Words",
    tech: ["HTML", "CSS", "JavaScript"],
    imgSrc: whimsyImg,
    imgAlt: "Whimsy & Words book blog preview",
    line1: "Book blog using Noroff Blog API.",
    line2: "Auth, create/edit posts, tags & carousel.",
    year: "2024",
    role: "Frontend Developer",
    summary:
      "A cozy book blog powered by the Noroff Blog API with authoring tools and tag browsing.",
    description: [
      "Focus on clean typography and simple content workflows.",
      "Create, edit, and browse posts with client-side routing and caching.",
    ],
    highlights: [
      "Author auth + CRUD posts",
      "Tag-based filtering",
      "Homepage carousel",
      "Deployed on Netlify",
    ],
    images: [{ src: whimsyImg, alt: "Whimsy & Words homepage screenshot" }],
    links: {
      demoUrl: "https://fed1-pe1-idatold.netlify.app/",
      repoUrl: "https://github.com/NoroffFEU/FED1-PE1-idatold",
    },
  },
  {
    id: "museum",
    slug: "community-science-museum",
    title: "Community Science Museum",
    tech: ["HTML", "CSS"],
    imgSrc: museumImg,
    imgAlt: "Community Science Museum preview",
    line1: "Static, responsive site.",
    line2: "Pure HTML & CSS; clean layout.",
    year: "2023",
    role: "Frontend Developer",
    summary:
      "A fully static, responsive museum site—accessibility and structure first.",
    description: [
      "Built with semantic HTML and modern CSS. No frameworks.",
      "Great example of craft in spacing, hierarchy, and content flow.",
    ],
    highlights: [
      "Semantic HTML",
      "Responsive grid & typography",
      "WCAG-friendly colors",
    ],
    images: [{ src: museumImg, alt: "Museum homepage screenshot" }],
    links: {
      demoUrl: "https://community-science-museum-idatold.netlify.app/",
      repoUrl: "https://github.com/idatold/Semester-project-1-idatold",
    },
  },
  {
    id: "rainydays",
    slug: "rainydays",
    title: "RainyDays",
    tech: ["HTML", "CSS", "JavaScript"],
    imgSrc: rainydaysImg,
    imgAlt: "RainyDays e-commerce preview",
    line1: "Rain-jacket e-commerce UI.",
    line2: "Filtering, product pages, checkout UX.",
    year: "2023",
    role: "Frontend Developer",
    summary:
      "An e-commerce UI for rain jackets with product filtering and a clean checkout flow.",
    description: [
      "Vanilla JS storefront with simple state and accessible components.",
      "Deployed on Netlify for fast previews and CI-friendly deploys.",
    ],
    highlights: [
      "Filters & product detail pages",
      "Cart & checkout UX",
      "Responsive cards & grids",
    ],
    images: [{ src: rainydaysImg, alt: "RainyDays product grid screenshot" }],
    links: {
      demoUrl: "https://rainydays-idatold.netlify.app/",
      repoUrl:
        "https://github.com/NoroffFEU/html-css-course-assignment-idatold",
    },
  },
];

export default projects;
