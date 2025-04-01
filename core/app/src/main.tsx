import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/colors/orange.css"; // Force Vite to include it
import "@radix-ui/colors/gray.css";
import "@radix-ui/colors/green.css";
import "@radix-ui/colors/yellow.css";
import "@radix-ui/colors/red.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router";

import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { Users } from "./pages/Users";
import { NotFound } from "./pages/NotFound/NotFound";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="dark">
        <div className="background">
          <BrowserRouter>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </QueryClientProvider>
  </StrictMode>
);
