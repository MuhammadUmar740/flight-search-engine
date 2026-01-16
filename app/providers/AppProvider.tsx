"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AuthProvider from "./AuthProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
