import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import WorkoutLibrary from "./components/WorkoutLibrary";
import DashboardView from "./components/DashboardView";
import WorkoutGeneratorView from "./components/WorkoutGeneratorView";
import CoachView from "./components/CoachView";
import AdminDashboard from "./components/AdminDashboard";
import OnboardingWizard from "./components/OnboardingWizard";
import AuthModal from "./components/AuthModal";
import NutritionView from "./components/NutritionView";
import CommunityView from "./components/CommunityView";
import SuccessView from "./components/SuccessView";
import SavedExercisesView from "./components/SavedExercisesView";
import WorkoutVideos from "./components/WorkoutVideos";
import DailyPlanView from "./components/DailyPlanView";
import AppReadmeView from "./components/AppReadmeView";


function FitnessAppContent() {
  const { user, loading } = useApp();
  const [currentView, setView] = useState("home");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Activate Tawk.to Live Chat dynamically on load
  React.useEffect(() => {
    if (document.getElementById("tawkto-script")) return;

    const tawkId = (import.meta as any).env?.VITE_TAWKTO_PROPERTY_ID || "670fbc51ddc77395e509cfcb/1ibbiop81"; // Responsive Default Test/Production Property

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.id = "tawkto-script";
    s1.async = true;
    s1.src = `https://embed.tawk.to/${tawkId}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }, []);

  // Keep track of exact scroll positions for each page view
  const scrollPositions = React.useRef<Record<string, number>>({});

  // Continuously record scrolling offsets for the active view in real-time
  React.useEffect(() => {
    const handleScroll = () => {
      if (document.body.style.overflow !== "hidden") {
        scrollPositions.current[currentView] = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentView]);

  // Frame-perfect scroll restoration when currentView changes
  React.useEffect(() => {
    const targetScroll = scrollPositions.current[currentView] || 0;
    
    let attempts = 0;
    const maxAttempts = 15;
    
    const restoreScroll = () => {
      window.scrollTo({ top: targetScroll, behavior: "instant" });
      attempts++;
      
      // If layout rendering is still catching up, retry on the next animation frame
      if (attempts < maxAttempts && Math.abs(window.scrollY - targetScroll) > 2) {
        requestAnimationFrame(restoreScroll);
      }
    };

    const timer = setTimeout(restoreScroll, 30);
    return () => clearTimeout(timer);
  }, [currentView]);

  // Protected navigation handler
  const handleSetView = (targetView: string) => {
    if ((targetView === "dashboard" || targetView === "coach" || targetView === "nutrition" || targetView === "community" || targetView === "success-stories" || targetView === "saved-exercises" || targetView === "workout-generator") && !user) {
      setIsAuthOpen(true);
      return;
    }
    setView(targetView);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-900 font-sans text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D32F2F] border-t-transparent" />
          <span className="uppercase tracking-wider font-semibold text-[#D32F2F] animate-pulse">
            Initializing your premium fitness experience...
          </span>
        </div>
      </div>
    );
  }

  // Force onboarding configuration on first sign up
  if (user && user.onboarded === false) {
    return (
      <div className="min-h-screen bg-white text-slate-900 transition-colors duration-200">
        <Navbar 
          currentView={currentView} 
          setView={handleSetView} 
          onOpenAuth={() => setIsAuthOpen(true)} 
        />
        <OnboardingWizard />
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-200">
      
      {/* Dynamic Header Navbar navigation */}
      <Navbar 
        currentView={currentView} 
        setView={handleSetView} 
        onOpenAuth={() => setIsAuthOpen(true)} 
      />

      {/* Main Switchboard Route Mounting */}
      <main className="pb-16 min-h-[calc(100vh-76px)] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-grow flex flex-col"
          >
            {currentView === "home" && (
              <HomeView setView={handleSetView} onOpenAuth={() => setIsAuthOpen(true)} />
            )}
            {currentView === "library" && (
              <WorkoutLibrary setView={setView} />
            )}
            {currentView === "workout-generator" && user && (
              <WorkoutGeneratorView />
            )}
            {currentView === "dashboard" && user && (
              <DashboardView setView={handleSetView} />
            )}
            {currentView === "nutrition" && user && (
              <NutritionView />
            )}
            {currentView === "daily-plan" && user && (
              <DailyPlanView />
            )}
            {currentView === "coach" && user && (
              <CoachView />
            )}
            {currentView === "community" && user && (
              <CommunityView />
            )}
            {currentView === "success-stories" && user && (
              <SuccessView />
            )}
            {currentView === "saved-exercises" && user && (
              <SavedExercisesView setView={handleSetView} />
            )}
            {currentView === "workout-videos" && (
              <WorkoutVideos />
            )}
            {currentView === "readme" && (
              <AppReadmeView />
            )}
            {currentView === "admin" && user && user.role === "admin" && (
              <AdminDashboard />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Auth State Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <FitnessAppContent />
    </AppProvider>
  );
}
