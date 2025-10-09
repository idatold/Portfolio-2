import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import SideFooter from "./components/SideFooter.jsx";
import Starfield from "./components/StarField.jsx"; // file = StarField.jsx, function = Starfield
import Home from "./routes/Home.jsx";
import Archive from "./routes/Archive.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import About from "./routes/About.jsx"; // <- new
import NotFound from "./routes/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* flex column; NO overflow-x-clip so the carousel can scroll */}
      <div className="relative min-h-dvh flex flex-col bg-transparent">
        <Starfield count={420} />
        <Header />
        <main
          id="main"
          role="main"
          className="relative z-[1] w-full max-w-[1100px] mx-auto px-6 sm:px-8 py-8 flex-1"
        >
          <Routes>
            <Route path="/" element={<Home />} />

            {/* About */}
            <Route path="/about" element={<About />} />

            {/* Archive index */}
            <Route path="/archive" element={<Archive />} />

            {/* Back-compat: /projects → Archive */}
            <Route path="/projects" element={<Archive />} />

            {/* Single project under both prefixes */}
            <Route path="/archive/:slug" element={<ProjectDetail />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SideFooter />
      </div>
    </BrowserRouter>
  );
}
