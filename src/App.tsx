
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Participants from "./pages/Participants";
import NewParticipant from "./pages/NewParticipant";
import EditParticipant from "./pages/EditParticipant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/participants" replace />} />
            <Route 
              path="/participants" 
              element={
                <ProtectedRoute>
                  <Participants />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/participants/new" 
              element={
                <ProtectedRoute>
                  <NewParticipant />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/participants/:id/edit" 
              element={
                <ProtectedRoute>
                  <EditParticipant />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
