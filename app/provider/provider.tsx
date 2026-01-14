"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  // useState isliye use kar rahe hain taaki har render par naya client na banay
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute tak data purana nahi mana jayega
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools se aap browser mein hi saari API requests dekh sakenge */}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
}