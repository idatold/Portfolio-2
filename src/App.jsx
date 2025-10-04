import Header from "./components/Header";
import SideFooter from "./components/SideFooter";
import Home from "./routes/Home";            // ← add this

export default function App() {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr]">
      <Header />
      <main id="main" role="main" className="px-8 py-6 max-w-[1100px] w-full mx-auto">
        <Home />                              {/* ← render the hero here */}
      </main>
      <SideFooter github="https://github.com/your-handle" linkedin="https://www.linkedin.com/in/your-handle" year={2025} />
    </div>
  );
}
