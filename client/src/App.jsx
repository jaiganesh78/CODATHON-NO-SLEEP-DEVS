import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f6f6] text-zinc-900">
      <Navbar />
      <AppRoutes />
    </div>
  );
}
