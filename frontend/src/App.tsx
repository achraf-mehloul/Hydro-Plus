import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/stores/appStore";
import { useOffline } from "@/hooks/useOffline";
import { lazy, Suspense, useEffect } from "react";

const Index = lazy(() => import("./pages/Index"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProfileSetup = lazy(() => import("./pages/ProfileSetup"));
const MapPage = lazy(() => import("./pages/MapPage"));
const CreateReport = lazy(() => import("./pages/CreateReport"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const GovernmentMode = lazy(() => import("./pages/GovernmentMode"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AppContent() {
  const darkMode = useAppStore((s) => s.darkMode);
  const language = useAppStore((s) => s.language);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  useOffline();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const fallback = (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <Routes>
        {!hasCompletedOnboarding ? (
          <Route path="*" element={<Onboarding />} />
        ) : !isAuthenticated ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/create-report" element={<CreateReport />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/government" element={<GovernmentMode />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
