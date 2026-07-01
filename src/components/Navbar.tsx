import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Menu, X, Shield, Lock, Award } from "lucide-react";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  onOpenAuth: () => void;
}

export default function Navbar({ currentView, setView, onOpenAuth }: NavbarProps) {
  const { user, logout } = useApp();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dynamic scroll listener for past-hero shadow
  useEffect(() => {
    const handleScroll = () => {
      // Past hero section (typically around 500-600px of scroll)
      if (window.scrollY > 350) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (targetView: string, sectionId?: string) => {
    setIsMenuOpen(false);
    if (sectionId) {
      if (currentView !== "home") {
        setView("home");
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      setView(targetView);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Centralized Navigation Menu definitions
  const menuItems = user ? (
    user.subscriptionStatus === "premium" ? [
      { id: "home", label: "Home", action: () => handleNav("home") },
      { id: "daily-plan", label: "My Plan", action: () => handleNav("daily-plan") },
      { id: "library", label: "Workouts", action: () => handleNav("library") },
      { id: "workout-generator", label: "AI Generator", action: () => handleNav("workout-generator") },
      { id: "workout-videos", label: "Videos", action: () => handleNav("workout-videos") },
      { id: "saved-exercises", label: "Saved", action: () => handleNav("saved-exercises") },
      { id: "nutrition", label: "Nutrition", action: () => handleNav("nutrition") },
      { id: "community", label: "Community", action: () => handleNav("community") },
      { id: "coach", label: "AI Coach", action: () => handleNav("coach") },
    ] : [
      { id: "home", label: "Home", action: () => handleNav("home") },
      { id: "workout-videos", label: "Videos", action: () => handleNav("workout-videos") },
      { id: "saved-exercises", label: "Saved", action: () => handleNav("saved-exercises") },
      { id: "community", label: "Community", action: () => handleNav("community") },
    ]
  ) : [
    { id: "home", label: "Home", action: () => handleNav("home") },
    { id: "workout-videos", label: "Videos", action: () => handleNav("workout-videos") },
    { id: "pricing", label: "Pricing", action: () => handleNav("home", "pricing") },
    { id: "testimonials-segment", label: "Reviews", action: () => handleNav("home", "testimonials-segment") },
    { id: "contact", label: "Contact", action: () => handleNav("home", "contact") },
  ];

  if (user && user.role === "admin") {
    menuItems.push({
      id: "admin",
      label: "Admin CPU",
      action: () => handleNav("admin")
    });
  }

  // Unified logo element containing bold sans font and shield
  const LogoElement = ({ isLight = false }: { isLight?: boolean }) => (
    <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => handleNav("home")}>
      <Shield className={`w-6 h-6 shrink-0 ${isLight ? "text-white fill-white" : "text-[#D32F2F] fill-[#D32F2F]"}`} />
      <span className={`font-sans font-black text-xl md:text-2xl tracking-tighter leading-none ${isLight ? "text-white" : "text-black"} uppercase`}>
        ALEXFITNESSHUB
      </span>
    </div>
  );

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-[#D32F2F] h-[76px] flex items-center transition-all duration-300 ${
          isScrolledPastHero ? "shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-b border-[#B71C1C]" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Show only logo - no separate text title */}
            <LogoElement isLight={true} />

            {/* Desktop Horizontal Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 overflow-x-auto py-1 scrollbar-none">
              {menuItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`text-[10px] xl:text-[11px] font-sans font-black uppercase tracking-wider px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-white text-[#D32F2F] shadow-sm"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Sticky Header actions: Auth & Hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              
              {!user ? (
                <button
                  onClick={onOpenAuth}
                  className="hidden sm:inline-flex text-[11px] font-sans font-bold uppercase tracking-wider h-9 px-5 rounded-full border border-white hover:bg-white hover:text-[#D32F2F] text-white transition-all duration-200 cursor-pointer"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="hidden sm:inline-flex text-[11px] font-sans font-bold uppercase tracking-wider h-9 px-5 rounded-full border border-white/40 text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  Sign Out
                </button>
              )}

              {/* Hamburger icon: 3 white lines */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-white hover:opacity-80 transition focus:outline-none cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <div className="space-y-1.5 w-6">
                  <span className="block h-0.5 w-6 bg-white rounded transition"></span>
                  <span className="block h-0.5 w-6 bg-white rounded transition"></span>
                  <span className="block h-0.5 w-6 bg-white rounded transition"></span>
                </div>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Slide-In Left Side Panel (cover 55-60% of screen width) */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dimmed backdrop overlay that handles clicks to close */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Snappy Left Slide-in Panel */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-[58%] sm:w-[50%] md:w-[40%] bg-white shadow-[8px_0_32px_rgba(0,0,0,0.12)] border-r border-slate-100 p-6 flex flex-col justify-between pointer-events-auto transition-transform duration-[280ms] ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Top Panel Brand Logo */}
          <div className="space-y-6">
            <div className="flex justify-start border-b border-slate-100 pb-4">
              <LogoElement />
            </div>

            {/* Vertical list of nav links with dividers */}
            <nav className="flex flex-col space-y-1 overflow-y-auto max-h-[60vh] pr-1">
              {menuItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <div key={item.id} className="w-full">
                    <button
                      onClick={item.action}
                      className={`w-full text-left text-xs font-sans font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-[#D32F2F] text-white"
                          : "text-[#1C1C1C] hover:bg-[#F7F7F7]"
                      }`}
                    >
                      {item.label}
                    </button>
                    {/* Light gray divider */}
                    <div className="h-px bg-slate-100 my-1 last:hidden" />
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Panel CTA: login options */}
          <div className="pt-5 border-t border-slate-100 space-y-2">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#D32F2F] text-white hover:bg-[#B71C1C] active:scale-95 transition-all duration-200 font-sans font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Login / Sign In</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:scale-95 transition-all duration-200 font-sans font-bold text-xs tracking-wide shadow-xs cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {user.subscriptionStatus === "premium" ? (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setView("dashboard");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#D32F2F] text-white hover:bg-[#B71C1C] active:scale-95 transition-all duration-250 font-sans font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-white" />
                    <span>My Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setView("home");
                      setTimeout(() => {
                        const el = document.getElementById("pricing");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-amber-500 to-[#D32F2F] text-white hover:opacity-95 active:scale-95 transition-all duration-250 font-sans font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-white animate-pulse" />
                    <span>⭐ Upgrade to Premium</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Red "X" Close Button placed Top-Right over visible sliver of content */}
        {isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(false)}
            className="fixed top-6 right-6 z-50 p-2.5 bg-[#D32F2F] text-white rounded-full hover:bg-[#B71C1C] transition-all duration-200 shadow-lg pointer-events-auto cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Header spacer to offset content */}
      <div className="h-[76px] bg-transparent" />
    </>
  );
}
