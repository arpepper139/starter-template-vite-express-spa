import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import Radix Colors
import "@radix-ui/colors/gray.css";
import "@radix-ui/colors/gray-dark.css";
import "@radix-ui/colors/orange.css";
import "@radix-ui/colors/orange-dark.css";
import "@radix-ui/colors/green.css";
import "@radix-ui/colors/green-dark.css";
import "@radix-ui/colors/yellow.css";
import "@radix-ui/colors/yellow-dark.css";
import "@radix-ui/colors/red.css";
import "@radix-ui/colors/red-dark.css";

// Import our styles
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Navigation } from "./layouts/Navigation";

// Pages
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import { Users } from "./pages/Users";
import { NotFound } from "./pages/NotFound/NotFound";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navigation />
          <main style={{ padding: "1rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
