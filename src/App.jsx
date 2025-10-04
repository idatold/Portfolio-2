import Header from "./components/Header";
import SideFooter from "./components/SideFooter";

export default function App() {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr]">
      <Header />

      <main
        id="main"
        role="main"
        className="px-8 py-6 max-w-[1100px] w-full mx-auto"
      >
        <h1 className="mt-4 mb-2 text-5xl">Portfolio Home</h1>
        <p className="opacity-80">
          We’ll build the real home grid and project cards after Tailwind. For now,
          you should see the gradient background and this content.
        </p>
      </main>

      {/* Side footer overlay (transparent) */}
      <SideFooter
        github="https://github.com/your-handle"
        linkedin="https://www.linkedin.com/in/your-handle"
        year={2025}
      />
    </div>
  );
}
