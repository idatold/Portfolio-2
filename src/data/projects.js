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
    // to: "/projects/plantio" // optional explicit path (computed by carousel if omitted)
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
  },
  {
    id: "sp2-bidhive",
    slug: "bidhive-auction-house",
    title: "BidHive Auction House",
    tech: ["HTML", "Tailwind", "JavaScript", "Vite", "Axios", "REST"],
    imgSrc: bidhiveImg,
    imgAlt: "BidHive auction site preview",
    line1: "Auction platform with Noroff API v2.",
    line2: "Browse, bid, profiles; CRUD listings.",
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
  },
  {
    id: "whimsy",
    slug: "whimsy-and-words",
    title: "Whimsy & Words",
    tech: ["HTML", "CSS", "JavaScript", "REST", "Netlify"],
    imgSrc: whimsyImg,
    imgAlt: "Whimsy & Words book blog preview",
    line1: "Book blog using Noroff Blog API.",
    line2: "Auth, create/edit posts, tags & carousel.",
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
  },
  {
    id: "rainydays",
    slug: "rainydays",
    title: "RainyDays",
    tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    imgSrc: rainydaysImg,
    imgAlt: "RainyDays e-commerce preview",
    line1: "Rain-jacket e-commerce UI.",
    line2: "Filtering, product pages, checkout UX.",
  },
];

export default projects;
