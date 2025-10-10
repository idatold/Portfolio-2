// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import SideFooter from "./components/SideFooter.jsx";
import Starfield from "./components/StarField.jsx"; // file has big F
import Home from "./routes/Home.jsx";
import Archive from "./routes/Archive.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import About from "./routes/About.jsx";
import NotFound from "./routes/NotFound.jsx";
import Contact from "./routes/Contact.jsx"; // ADDED

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-dvh flex flex-col bg-transparent">
        <Starfield count={420} />

        {/* elevate header above <main z-[1]> */}
        <div className="relative z-[60]">
          <Header />
        </div>

        <main
          id="main"
          role="main"
          className="relative z-[1] w-full max-w-[1100px] mx-auto px-6 sm:px-8 pt-3 sm:pt-5 pb-8 flex-1"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:slug" element={<ProjectDetail />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} /> {/* ADDED */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <SideFooter />
      </div>
    </BrowserRouter>
  );
}
