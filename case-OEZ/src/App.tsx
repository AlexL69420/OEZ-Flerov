import { ThisFooter } from "./components/Footer";
import Header from "./components/Header";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-baseline gap-2 dark:bg-slate-600">
      <Header />
      <MainContent />
      <ThisFooter />
    </main>
  );
}

export default App;
