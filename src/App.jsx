// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SideFooter from "./components/SideFooter";
import Starfield from "./components/StarField.jsx";
import Home from "./routes/Home";
import Archive from "./routes/Archive";
import ProjectDetail from "./routes/ProjectDetail";
import NotFound from "./routes/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-dvh grid grid-rows-[auto_1fr_auto] bg-transparent overflow-x-clip">
        <Starfield count={420} />
        <Header />
        <main
          id="main"
          role="main"
          className="relative z-[1] w-full max-w-[1100px] mx-auto px-6 sm:px-8 py-8"
        >
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Archive index */}
            <Route path="/archive" element={<Archive />} />

            {/* Single project */}
            <Route path="/archive/:slug" element={<ProjectDetail />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SideFooter />
      </div>
    </BrowserRouter>
  );
}
