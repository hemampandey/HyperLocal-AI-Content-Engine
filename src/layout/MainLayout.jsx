import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
