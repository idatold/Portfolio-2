import Header from "./components/Header";
import SideFooter from "./components/SideFooter";
import Home from "./routes/Home";
import Starfield from "./components/StarField.jsx";

export default function App() {
  return (
    <div className="relative min-h-dvh grid grid-rows-[auto_1fr_auto] bg-transparent min-w-0 [overflow-x:clip]">
      {/* Global gradient + stars (fixed under everything) */}
      <Starfield count={420} />

      {/* If Header's root is a grid child, make sure it has min-w-0 inside its component */}
      <Header />

      <main
        id="main"
        role="main"
        className="relative z-[1] px-8 py-6 max-w-[1100px] w-full mx-auto min-w-0 [overflow-x:clip]"
      >
        <Home />
        {/* If/when you add routing, swap <Home /> for <Outlet /> */}
      </main>

      {/* If SideFooter's root is a grid child, give it min-w-0 inside its component */}
      <SideFooter
        github="https://github.com/your-handle"
        linkedin="https://www.linkedin.com/in/your-handle"
        year={2025}
      />
    </div>
  );
}
