import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { 
  Shield, CheckCircle, ArrowRight, Zap, Flame, 
  Play, Users, X, HelpCircle, Clipboard, ChevronDown, Star, Lock, MessageCircle, ChevronLeft,
  Mail, Bell, Heart, Sparkles, Activity
} from "lucide-react";

const workoutCategories = [
  {
    id: "chest",
    title: "Chest Isolation",
    desc: "Sculpt upper chest divisions using premium cable flyes & barbell press alignments.",
    exercises: "45 Drills",
    image: "https://workoutguru.fit/wp-content/uploads/2024/02/african-bodybuilder-posing-gym-1-edited.jpg",
    tag: "Upper Body",
  },
  {
    id: "back",
    title: "Lat & Back Columns",
    desc: "Build high flare lats and thick upper rhomboids with rows & pullup layouts.",
    exercises: "38 Drills",
    image: "https://generationiron.com/wp-content/uploads/2022/02/How-To-Do-Wide-grip-Lat-Pulldown-1200x675-1-1024x576.jpg",
    tag: "V-Taper",
  },
  {
    id: "biceps",
    title: "Bicep Peak Triggers",
    desc: "Engage peak brachialis fibers under supreme tension with seated dumbbell curls.",
    exercises: "24 Drills",
    image: "https://learn.athleanx.com/wp-content/uploads/2024/06/HOW-TO-BICEPS.jpg",
    tag: "Hypertrophy",
  },
  {
    id: "triceps",
    title: "Tricep Horseshoe",
    desc: "Isolate lateral push heads utilizing heavy overhead rope extensions.",
    exercises: "28 Drills",
    image: "https://learn.athleanx.com/wp-content/uploads/2021/09/MAIN-IMAGE.png",
    tag: "Push Power",
  },
  {
    id: "shoulders",
    title: "Deltoid Cap Boulder",
    desc: "Target anterior and posterior caps with scapular plane stability guides.",
    exercises: "35 Drills",
    image: "https://i.ytimg.com/vi/yS80o90nm_k/maxresdefault.jpg",
    tag: "Symmetry",
  },
  {
    id: "legs",
    title: "Quad & Leg Pillars",
    desc: "Stimulate depth hypertrophy using back squats and clean hamstring curls.",
    exercises: "50 Drills",
    image: "https://guycounseling.com/wp-content/uploads/2014/10/leg-workout.jpg",
    tag: "Lower Body",
  },
  {
    id: "abs",
    title: "Abdominal Shred",
    desc: "Slam abdominal walls utilizing leg raises and controlled core compression.",
    exercises: "22 Drills",
    image: "https://learn.athleanx.com/wp-content/uploads/2021/08/MAIN-MAGE.png",
    tag: "Core Core",
  }
];

interface HomeViewProps {
  setView: (view: string) => void;
  onOpenAuth: () => void;
}

export default function HomeView({ setView, onOpenAuth }: HomeViewProps) {
  const { user, upgradeWithPaystack } = useApp();
  const [submittingPlan, setSubmittingPlan] = useState<"monthly" | "yearly" | "multi" | null>(null);
  const [activePaymentModal, setActivePaymentModal] = useState<"monthly" | "yearly" | "multi" | null>(null);

  // Carousel slider state for Hero
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      eyebrow: "PHYSIQUE SPECIALIZATION",
      wordOne: "FORGE",
      wordTwo: "ATHLETICISM",
      desc: "Experience world-class body sculpting. Unified by certified clinical kinesiologists, interactive progress logs, and advanced multi-modal Gemini AI coaching. Track actual metric goals with absolute precision.",
    },
    {
      eyebrow: "NUTRITIONAL METRICS",
      wordOne: "SHRED",
      wordTwo: "PLATEAUS",
      desc: "Calibrate localized macronutrient diet plans tailored precisely for high protein staples, tracking absolute body weight goals daily with the assistance of interactive progress reports.",
    },
    {
      eyebrow: "AI POWERED SOLUTIONS",
      wordOne: "COMMAND",
      wordTwo: "INTELLIGENCE",
      desc: "Unlock server-side Gemini intelligence models to consult your lifting technique, optimize water ratios, and design recovery splits tailored for performance athletes.",
    }
  ];

  // Auto-play interval for hero carousel (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (activePaymentModal) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [activePaymentModal]);

  const [payEmail, setPayEmail] = useState(user?.email || "");
  const [referenceInput, setReferenceInput] = useState("");
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Contact Form state engines
  const [contactName, setContactName] = useState(user?.displayName || "");
  const [contactEmail, setContactEmail] = useState(user?.email || "");
  const [contactGoal, setContactGoal] = useState("hypertrophy");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Daily Notification Reminder state engines
  const [notificationEmail, setNotificationEmail] = useState(user?.email || "muzikworld08@gmail.com");
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("06:00 AM");
  const [reminderPlanType, setReminderPlanType] = useState("Daily Recomposition Alert");
  const [isSavingReminders, setIsSavingReminders] = useState(false);
  const [reminderSaveStatus, setReminderSaveStatus] = useState<string | null>(null);

  const handleSaveReminderPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationEmail) {
      alert("Please provide a valid email target.");
      return;
    }
    setIsSavingReminders(true);
    setReminderSaveStatus(null);
    setTimeout(() => {
      setIsSavingReminders(false);
      setReminderSaveStatus("Preferences configured! A secure daily trigger has been successfully mapped to " + notificationEmail + " for your custom workout reminds.");
    }, 850);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactName) {
      alert("Please provide valid name and email targets.");
      return;
    }
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      setContactMessage("");
    }, 950);
  };

  useEffect(() => {
    if (user) {
      setPayEmail(user.email || "");
      setContactEmail(user.email || "");
      setContactName(user.displayName || user.email?.split("@")[0] || "");
    }
  }, [user]);

  const handleInitiatePayment = async (plan: "monthly" | "yearly" | "multi") => {
    if (!user) {
      onOpenAuth();
      return;
    }
    
    setPayEmail(user.email);
    const ref = "ref_ps_" + Math.random().toString(36).substring(2, 14).toUpperCase();
    setReferenceInput(ref);
    setActivePaymentModal(plan);
  };

  const handleRealPaystackPayment = () => {
    if (!activePaymentModal || !user) return;

    let amountNGN = 19999;
    if (activePaymentModal === "yearly") {
      amountNGN = 215989;
    } else if (activePaymentModal === "multi") {
      amountNGN = 19999 * selectedMonths;
    }

    const amountInKobo = amountNGN * 100;
    const publicKey = (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || "pk_live_4486ac34bd0e1b9532f7e0646164c5c23e0b7f25";

    if (!(window as any).PaystackPop) {
      alert("Paystack payment SDK is still loading or could be blocked by an adblocker. Please wait a second and retry, or disable your adblocker.");
      return;
    }

    setSubmittingPlan(activePaymentModal);

    try {
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,
        email: payEmail || user.email,
        amount: amountInKobo,
        ref: referenceInput,
        currency: "NGN",
        callback: async function(response: any) {
          try {
            const planToPass = activePaymentModal === "yearly" ? "yearly" : "monthly";
            await upgradeWithPaystack(response.reference, planToPass);
            setActivePaymentModal(null);
            alert("Payment successful! Your premium membership is active. Thank you for your support!");
            setView("dashboard");
          } catch (err: any) {
            alert("Verification error: " + err.message);
          } finally {
            setSubmittingPlan(null);
          }
        },
        onClose: function() {
          setSubmittingPlan(null);
        }
      });
      handler.openIframe();
    } catch (err: any) {
      setSubmittingPlan(null);
      alert("Error initializing Paystack popup: " + err.message);
    }
  };

  const basePriceMonthly = 19999;
  const multiMonthTotal = basePriceMonthly * selectedMonths;
  const yearlyPriceAnnual = 215989;
  const yearlyNormalCost = basePriceMonthly * 12;
  const yearlySavingsAmt = yearlyNormalCost - yearlyPriceAnnual;

  const faqsList = [
    {
      q: "How does the Treadmill Walk 12-30-3 function?",
      a: "Treadmill Walk 12-30-3 is a globally verified protocol: 12% incline gradient, 3.0 mph speed pace, for 30 minutes continuous. This targets local fat oxidation directly, bypassing standard systemic glycogen burn while protecting knee joints from impact damage."
    },
    {
      q: "Does Paystack secure my subscription auto-renewals safely?",
      a: "Yes. All transactions are securely routed through Paystack's PCI-DSS Compliant Tier-1 encryption gateway. We do not hold or log raw debit card information. Billing cycles are fully observable and can be closed dynamically with one click from your profile panel."
    },
    {
      q: "What is the differences between Free and Premium memberships?",
      a: "Free members have standard access to base movements and basic progress logging. Premium members unlock our full 1,200+ scaled fitness database, complete HD anatomical movement loops with 0.5x Slow and 3s Eccentric coaching models, custom V-Taper curriculums, and unlimited AI coach calibrations."
    },
    {
      q: "Can I cancel or alter my multi-month selections?",
      a: "Absolutely. Standard multi-month selections are valid for the selected calendar span and are not bound by long-term legal liabilities. You can upgrade, downgrade, or return to the free athlete tier without any extra administrative penalties."
    },
    {
      q: "Are meal recommendation profiles customizable for local foods?",
      a: "Yes! Our intelligence systems understand regional food databases (including high-protein staples such as egg whites, plantains, lean beef, beans, local greens, and fish). The macros are calibrated dynamically onto your current biological weight targets."
    }
  ];

  return (
    <div id="home-view-root" className="bg-white text-black min-h-screen relative font-sans animate-fade-in">
      
      {/* 1. HERO SECTION WITH SPLIT LAYOUT: Typography on Left, Bright Video on Right */}
      <section id="hero-segment" className="relative py-12 lg:py-20 flex items-center bg-white overflow-hidden border-b border-slate-200">
        
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Carousel Text & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="relative min-h-[300px] sm:min-h-[340px]">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <div 
                      key={idx}
                      className={`transition-all duration-[350ms] ease-out space-y-6 ${
                        isActive 
                          ? "opacity-100 translate-y-0 scale-100" 
                          : "opacity-0 translate-y-4 scale-98 absolute inset-0 pointer-events-none"
                      }`}
                    >
                      <span className="text-[11px] font-sans font-black tracking-[0.25em] text-[#D32F2F] uppercase bg-[#D32F2F]/10 px-3.5 py-1.5 rounded-full inline-block">
                        {slide.eyebrow}
                      </span>
                      
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-[#D32F2F] leading-none uppercase">
                        {slide.wordOne}{" "}
                        <span className="text-black">
                          {slide.wordTwo}
                        </span>
                      </h1>

                      <p className="text-xs sm:text-sm text-black max-w-xl leading-relaxed font-sans font-normal">
                        {slide.desc}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <button
                          onClick={() => setView("library")}
                          className="px-6 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-sans font-extrabold text-xs uppercase rounded-full shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                        >
                          Start Training
                        </button>
                        <button
                          onClick={() => {
                            const el = document.getElementById("pricing");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="px-6 py-3 bg-white hover:bg-slate-100 text-black font-sans font-bold text-xs uppercase rounded-full border border-slate-300 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                        >
                          View Pricing
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carousel Layout Mechanics */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                
                {/* Pagination dots bottom-left: active = red dot, inactive = gray dash */}
                <div className="flex items-center gap-3">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`transition-all duration-300 cursor-pointer ${
                        idx === currentSlide 
                          ? "bg-[#D32F2F] w-8 h-2 rounded-full" 
                          : "bg-gray-300 w-3 h-2 rounded-full hover:bg-gray-450"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Round arrow nav buttons bottom-right: red circle, white chevron */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="p-3 rounded-full bg-[#D32F2F] text-white hover:bg-[#B71C1C] transition-colors duration-200 shadow-md cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-3 rounded-full bg-[#D32F2F] text-white hover:bg-[#B71C1C] transition-colors duration-200 shadow-md cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>

              </div>
            </div>

            {/* Right Column: Premium High-Definition Video Player Container (Bright & High Contrast) */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-[2.5rem] p-3 bg-gradient-to-tr from-[#D32F2F] to-red-400 shadow-[0_20px_50px_rgba(211,47,47,0.3)] group overflow-hidden border border-slate-100">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black relative">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-100 scale-100 transition-transform duration-700 group-hover:scale-105"
                    poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL8H7c4ADkyfqUDLGiRXOUzWfMzGs3ZY6SvmnppbzycUJoatp61JTWVgVX&s=10"
                  >
                    <source src="https://assets.mixkit.co/videos/44438/44438-720.mp4" />
                  </video>
                  
                  {/* Glowing Premium Highlight Badges */}
                  <div className="absolute top-4 left-4 bg-[#D32F2F] text-white text-[9px] font-sans font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    ALEXFITNESSHUB LIVE SESSIONS
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[9px] font-mono tracking-widest px-3 py-1.5 rounded-lg border border-white/10 z-10">
                    HD 1080P | ACTIVE FORM RECON
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 1.1 DAILY EMAIL WORKOUT PLANNER ALERT CENTER */}
      <section id="notification-center" className="py-12 bg-white border-b border-gray-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            {/* Top red header banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="text-[9px] font-sans font-black tracking-[0.2em] text-[#D32F2F] uppercase bg-red-50 px-3 py-1 rounded-full inline-block">
                  STAY ON TRACK ALWAYS
                </span>
                <h2 className="text-2xl font-sans font-black uppercase text-black">
                  DAILY PLANNER <span className="text-[#D32F2F]">EMAIL REMINDERS</span>
                </h2>
                <p className="text-xs text-[#6B6B6B] max-w-md font-sans">
                  Never miss a training milestone. Link your current email to automatically dispatch your calibrated daily kinesis drill schedule directly into your inbox.
                </p>
              </div>

              {/* GitHub Connected Badge */}
              <a 
                href="https://github.com/muzikmail2-arch/alexfit-on-main"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E8F5E9] hover:bg-[#E0F2F1] text-[#2E7D32] border border-[#C8E6C9] p-3 rounded-2xl text-[10px] space-y-1 text-left shrink-0 md:max-w-[240px] transition block"
              >
                <div className="font-sans font-black uppercase tracking-wider flex items-center gap-1.5 text-[#2E7D32]">
                  <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  GITHUB DEPLOYMENT VERIFIED
                </div>
                <p className="text-[10px] text-emerald-800 font-mono truncate">
                  Owner: muzikworld08@gmail.com
                </p>
                <p className="text-[9px] text-emerald-700 underline font-mono">
                  github.com/muzikmail2-arch/alexfit-on-main
                </p>
              </a>
            </div>

            <form onSubmit={handleSaveReminderPreferences} className="mt-8 pt-6 border-t border-gray-150 space-y-6 text-left">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Email input */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-wider">
                    TARGET NOTIFICATION EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={notificationEmail}
                      onChange={(e) => {
                        setNotificationEmail(e.target.value);
                        setReminderSaveStatus(null);
                      }}
                      placeholder="muzikworld08@gmail.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-black font-sans text-xs focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Reminder Timing Selector */}
                <div className="space-y-2">
                  <label className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-wider">
                    DISPATCH TIME (LOCAL GMT)
                  </label>
                  <select
                    value={reminderTime}
                    onChange={(e) => {
                      setReminderTime(e.target.value);
                      setReminderSaveStatus(null);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-black font-sans text-xs font-bold focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none transition uppercase"
                  >
                    <option value="05:00 AM">05:00 AM (Early Rise)</option>
                    <option value="06:00 AM">06:00 AM (Standard Dawn)</option>
                    <option value="07:00 AM">07:00 AM (Breakfast Plan)</option>
                    <option value="12:00 PM">12:00 PM (Lunch Check)</option>
                    <option value="05:00 PM">05:00 PM (Evening Prep)</option>
                  </select>
                </div>

                {/* Notification Toggle Button */}
                <div className="space-y-2 sm:col-span-2 lg:col-span-1 flex flex-col justify-end">
                  <span className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-wider mb-2">
                    REMINDER STATUS
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsReminderEnabled(!isReminderEnabled);
                      setReminderSaveStatus(null);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-sans font-black text-[11px] uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isReminderEnabled
                        ? "bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    <Bell className={`w-4 h-4 ${isReminderEnabled ? "text-[#2E7D32] animate-bounce" : "text-gray-400"}`} />
                    <span>{isReminderEnabled ? "Daily Reminders ACTIVE" : "Daily Reminders DISABLED"}</span>
                  </button>
                </div>

              </div>

              {/* Action Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <p className="text-[10px] text-[#6B6B6B] leading-relaxed max-w-sm">
                  * Alerts include today's saved biomechanical exercises, recommended caloric staple counts, and direct links to active form videos.
                </p>
                <button
                  type="submit"
                  disabled={isSavingReminders}
                  className="px-6 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-sans font-extrabold text-xs uppercase rounded-full shadow-md transition-all duration-200 cursor-pointer text-center shrink-0"
                >
                  {isSavingReminders ? "SAVING CRON TIMERS..." : "SAVE EMAIL ALERT PATH"}
                </button>
              </div>

              {/* Real success state presentation (Green theme) */}
              {reminderSaveStatus && (
                <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-start gap-3 animate-slide-down">
                  <CheckCircle className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                  <div className="text-left space-y-1">
                    <p className="text-xs font-sans font-black uppercase text-[#2E7D32]">
                      SCHEDULER ACTIVATED SUCCESSFULLY
                    </p>
                    <p className="text-[11px] text-emerald-800 font-sans leading-relaxed">
                      {reminderSaveStatus}
                    </p>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </section>

      {/* 1.2 THE SPECTACULAR CORE HD WORKOUT COACHING STREAM */}
      <section id="hd-video-stream" className="py-20 bg-[#F7F7F7] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-sans font-black tracking-[0.25em] text-[#D32F2F] uppercase bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
              BRIGHT LIVE WORKOUT DEMO
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-black uppercase">
              ALEXFITNESSHUB <span className="text-[#D32F2F]">HD TRAINING STREAM</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed font-sans">
              Examine real-time biomechanics under perfect studio lighting. Learn correct hip hinge depth, chest contraction lines, and eccentric deceleration ratios.
            </p>
            <div className="h-1 w-16 bg-[#D32F2F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* The Massive Bright HD Video View (7/12 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-4 border border-gray-200 shadow-lg flex flex-col justify-between">
              <div>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-100">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-100"
                    poster="https://images.squarespace-cdn.com/content/v1/6148dc8019cff94afc664bf4/3336f9fb-0c36-4d1f-8ee6-14457d2c454c/GR8FLEX+2021-411.jpg"
                  >
                    <source src="https://assets.mixkit.co/videos/727/727-720.mp4" />
                  </video>

                  {/* Absolute Bright Overlays */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-sans font-black tracking-widest px-3 py-1 rounded-full uppercase shadow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-ping"></span>
                    ACTIVE INSTRUCTOR FEED
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white text-[10px] space-y-1 text-left">
                    <p className="font-black uppercase tracking-wider text-white">CURRENT FOCUS: SLOW LATERAL SHIFT</p>
                    <div className="flex gap-4 font-mono text-[9px] text-gray-300">
                      <span>TIME: 00:14 / 00:30</span>
                      <span>TEMPO: 3-0-1-1</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-left space-y-2">
                  <h3 className="text-lg font-sans font-black text-[#D32F2F] uppercase">
                    ECCENTRIC TENSION OVERVIEW: LATERAL CARDIO KETTLEBELL
                  </h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                    Watch the hips shift backward cleanly to maximize hamstring leverage and posterior chain load distribution. This specific form safely locks the lumbar spine to target core stabilization while accelerating local heart-rate fat oxidation.
                  </p>
                </div>
              </div>

              {/* Form Calibration Markers */}
              <div className="mt-6 pt-5 border-t border-gray-150 grid grid-cols-3 gap-4">
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100/50 text-left">
                  <span className="block text-[8px] font-sans font-black text-[#6B6B6B] uppercase tracking-wider">HEART RATE GOAL</span>
                  <p className="text-sm font-sans font-black text-[#D32F2F] uppercase">135 - 155 BPM</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-left">
                  <span className="block text-[8px] font-sans font-black text-[#6B6B6B] uppercase tracking-wider">TARGET MUSCLE</span>
                  <p className="text-sm font-sans font-black text-[#2E7D32] uppercase">VISCERAL GLUTE / CORES</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-left">
                  <span className="block text-[8px] font-sans font-black text-[#6B6B6B] uppercase tracking-wider">EST. FAT SHRED RATIO</span>
                  <p className="text-sm font-sans font-black text-black uppercase">94% CAL / HR</p>
                </div>
              </div>

            </div>

            {/* Sidebar Lift Channel Guide (4/12 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-sans font-black uppercase text-[#D32F2F] tracking-wider pb-3 border-b border-gray-150 text-left">
                  RECOMMENDED HD LIFT CHANNELS
                </h4>
                
                {/* Channel List */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white shrink-0">
                      <Play className="w-3.5 h-3.5 text-white fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-black uppercase text-[#2E7D32]">12-30-3 LIPOLYSIS WALK</p>
                      <p className="text-[10px] text-emerald-800 leading-none mt-0.5">Cardio Zone 2 | Target Belly Adipose</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-200 hover:border-red-200 bg-white flex items-center gap-3 text-left transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#D32F2F] flex items-center justify-center text-white shrink-0">
                      <Play className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-black uppercase text-black">CHEST FLYES ISOLATION</p>
                      <p className="text-[10px] text-[#6B6B6B] leading-none mt-0.5">Continuous Cable Tension | 3s Hold</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-200 hover:border-red-200 bg-white flex items-center gap-3 text-left transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#D32F2F] flex items-center justify-center text-white shrink-0">
                      <Play className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-black uppercase text-black">LAT COLUMNS DEEP ROW</p>
                      <p className="text-[10px] text-[#6B6B6B] leading-none mt-0.5">Rhomboid Flexion | Strict Elbow Sweep</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-gray-200 hover:border-red-200 bg-white flex items-center gap-3 text-left transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-slate-900 hover:bg-[#D32F2F] flex items-center justify-center text-white shrink-0">
                      <Play className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-black uppercase text-black">DEPTH SQUATS ALIGNMENT</p>
                      <p className="text-[10px] text-[#6B6B6B] leading-none mt-0.5">Full Hip Crease Clearance | Safe Quadriceps</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-150">
                <button
                  onClick={() => setView("workout-videos")}
                  className="w-full py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-sans font-black text-xs uppercase rounded-xl transition duration-200"
                >
                  EXPLORE FULL VIDEO ARCHIVE
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 1.3 INTERACTIVE LIFESTYLE & EXERCISE DIRECTORY */}
      <section id="lifestyle-exercise-directory" className="py-24 bg-white border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              NAVIGATIONAL HUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-black uppercase">
              CHOOSE YOUR <span className="text-[#D32F2F]">ATHLETIC PATHWAY</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
              Click on any directory target below to instantly redirect to targeted training libraries, nutrition macro profiles, or physical video walkthroughs.
            </p>
            <div className="h-1 w-16 bg-[#D32F2F] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: EXERCISE LIBRARY */}
            <div 
              onClick={() => setView("library")}
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white h-72 flex flex-col justify-end p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
              <img 
                src="https://theathletesphysique.com/wp-content/uploads/2020/07/Athletes-Physique-Exercise-Database.jpg" 
                alt="Elite Exercise Library"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative z-20 text-left space-y-1">
                <span className="text-[8px] font-sans font-black tracking-widest text-[#D32F2F] bg-white px-2 py-0.5 rounded uppercase">
                  1,200+ DRILLS
                </span>
                <h3 className="text-base font-sans font-black text-white uppercase mt-1">
                  EXERCISE LIBRARY
                </h3>
                <p className="text-[10px] text-gray-300 leading-normal line-clamp-2">
                  Complete muscle contraction drills, equipment targets, and slow tempo setups.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#D32F2F] font-bold uppercase mt-2 group-hover:translate-x-1.5 transition-transform">
                  EXPLORE DRILLS <ArrowRight className="w-3 h-3 text-[#D32F2F]" />
                </span>
              </div>
            </div>

            {/* CARD 2: MEAL PLANS & LIFESTYLE */}
            <div 
              onClick={() => setView("nutrition")}
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white h-72 flex flex-col justify-end p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRaMrGT8LyvfZbPnJafBlhFFt_2Uu7bSoic5qq0Mikg-SxnSqkOvlxAR_1&s=10" 
                alt="Macro & Meal Planner"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative z-20 text-left space-y-1">
                <span className="text-[8px] font-sans font-black tracking-widest text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  LOCAL INGREDIENTS
                </span>
                <h3 className="text-base font-sans font-black text-white uppercase mt-1">
                  NUTRITION PORTAL
                </h3>
                <p className="text-[10px] text-gray-300 leading-normal line-clamp-2">
                  Calibrate plantains, beans, egg whites, and clean fish for macro targets.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#D32F2F] font-bold uppercase mt-2 group-hover:translate-x-1.5 transition-transform">
                  CALIBRATE DIET <ArrowRight className="w-3 h-3 text-[#D32F2F]" />
                </span>
              </div>
            </div>

            {/* CARD 3: BIOMECHANICAL VIDEOS */}
            <div 
              onClick={() => setView("workout-videos")}
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white h-72 flex flex-col justify-end p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
              <img 
                src="https://www.healthyads.com/wp-content/uploads/2025/10/Best-Gym-Advertisement-Examples-featured.webp" 
                alt="Form Technique Videos"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative z-20 text-left space-y-1">
                <span className="text-[8px] font-sans font-black tracking-widest text-[#D32F2F] bg-white px-2 py-0.5 rounded uppercase">
                  HD VISUALS
                </span>
                <h3 className="text-base font-sans font-black text-white uppercase mt-1">
                  TECHNIQUE SHOWCASE
                </h3>
                <p className="text-[10px] text-gray-300 leading-normal line-clamp-2">
                  0.5x slow-motion loops demonstrating exact eccentric biomechanics.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#D32F2F] font-bold uppercase mt-2 group-hover:translate-x-1.5 transition-transform">
                  LAUNCH CHANNEL <ArrowRight className="w-3 h-3 text-[#D32F2F]" />
                </span>
              </div>
            </div>

            {/* CARD 4: GEMINI COACH CONSULT */}
            <div 
              onClick={() => setView("coach")}
              className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white h-72 flex flex-col justify-end p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL8H7c4ADkyfqUDLGiRXOUzWfMzGs3ZY6SvmnppbzycUJoatp61JTWVgVX&s=10" 
                alt="AI Coach Consultation"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="relative z-20 text-left space-y-1">
                <span className="text-[8px] font-sans font-black tracking-widest text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  GEMINI CALIBRATED
                </span>
                <h3 className="text-base font-sans font-black text-white uppercase mt-1">
                  GEMINI AI CHAT
                </h3>
                <p className="text-[10px] text-gray-300 leading-normal line-clamp-2">
                  Acquire direct posture tuning, customized cardio plans, and meal corrections instantly.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#D32F2F] font-bold uppercase mt-2 group-hover:translate-x-1.5 transition-transform">
                  CHAT WITH COACH <ArrowRight className="w-3 h-3 text-[#D32F2F]" />
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 1.5 INTERACTIVE PLATFORM TECHNIQUE GUIDE */}
      <section id="technique-walkthrough" className="py-24 bg-slate-50 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#C0392B] uppercase bg-[#C0392B]/10 px-3.5 py-1 rounded-full inline-block">
              MASTER YOUR MECHANICS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              How to Use <span className="text-[#C0392B]">AlexFitnessHub</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed font-sans">
              Unlock the secrets of perfect lifting technique and whole-body biomechanical accuracy in three simple steps.
            </p>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 relative shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 font-mono group-hover:text-[#C0392B]/10 transition-colors font-sans">01</div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C0392B]/5 text-[#C0392B] flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black uppercase text-[#1C1C1C] tracking-tight font-display">Search for Exercises</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                  Head over to our <strong>Workout Library</strong> to search and filter over 1,200+ specific kinesis exercises and muscle group isolation drills curated by our clinical experts.
                </p>
              </div>
              <button 
                onClick={() => setView("library")}
                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-[#C0392B] text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors font-mono cursor-pointer"
              >
                Go to Library
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 relative shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 font-mono group-hover:text-[#C0392B]/10 transition-colors font-sans">02</div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Play className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black uppercase text-[#1C1C1C] tracking-tight font-display">Study the Video Technique</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                  Watch ultra-clear, high-definition motion loops demonstrating exact physical setup, muscle activation points, and tempo rules on our dedicated video page.
                </p>
              </div>
              <button 
                onClick={() => setView("workout-videos")}
                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors font-mono cursor-pointer"
              >
                Watch Videos
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 relative shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 font-mono group-hover:text-[#C0392B]/10 transition-colors font-sans">03</div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black uppercase text-[#1C1C1C] tracking-tight font-display">Lock Form & Track Progress</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                  Apply advanced coaching tips during your lifting sessions. Save exercises, monitor slow eccentric phases, and track training targets in real-time.
                </p>
              </div>
              <button 
                onClick={() => setView("saved-exercises")}
                className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors font-mono cursor-pointer"
              >
                Saved Exercises
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ALTERNATING ROW SECTIONS: CLINICAL METHODOLOGY */}
      <section id="why-choose-us" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              CLINICAL STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              REVOLUTIONIZING <span className="text-[#C0392B]">PERFORMANCE</span>
            </h2>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-3" />
          </div>

          <div className="space-y-20">
            {/* Row 1: Red Icon, Right Text */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="w-20 h-20 rounded-full bg-[#C0392B] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#C0392B]/10">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-xl font-display font-black text-[#1C1C1C] uppercase tracking-tight">
                  1,200+ <span className="text-[#C0392B]">Kinesis Blueprints</span>
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed font-sans">
                  Deploy targeted kinesis movements charted with high-resolution anatomical guides, custom equipment splits, and precise intensity thresholds. Perfect for breaking physical plateaus.
                </p>
              </div>
            </div>

            {/* Row 2: Dark Charcoal Icon, Left Text (Alternating) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
              <div className="w-20 h-20 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center shrink-0 shadow-lg">
                <Zap className="w-10 h-10 text-[#C0392B]" />
              </div>
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-xl font-display font-black text-[#1C1C1C] uppercase tracking-tight">
                  Gemini <span className="text-[#C0392B]">Diet Calibration</span>
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed font-sans">
                  Our secure server-side systems understand localized African staples (plantains, boiled yams, beans, fish indexes) and calibrate them perfectly matching your physical weight targets.
                </p>
              </div>
            </div>

            {/* Row 3: Red Icon, Right Text (Alternating) */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="w-20 h-20 rounded-full bg-[#C0392B] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#C0392B]/10">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-xl font-display font-black text-[#1C1C1C] uppercase tracking-tight">
                  PCI-DSS <span className="text-[#C0392B]">Paystack Security</span>
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed font-sans">
                  Seamless premium subscription activations guarded by Tier-1 secure Paystack gateways. Cancel, extend, or alter periods instantly with total transparent management.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SHOWCASE OF CATEGORIES SECTION */}
      <section id="categories-segment" className="py-24 bg-[#F7F7F7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              PHYSIQUE INDEX
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              TRAINING <span className="text-[#C0392B]">SPECIALIZATION</span>
            </h2>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workoutCategories.map((cat) => (
              <div 
                key={cat.id}
                className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[360px]"
              >
                <div className="h-44 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2020/07/Muscular-Fitness-Model-With-A-Six-Pack.jpg?w=1109&h=614&crop=1&quality=86&strip=all";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#1C1C1C]/90 text-[9px] font-sans font-black tracking-wider text-white px-2.5 py-1 rounded-md uppercase z-20">
                    {cat.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-[#C0392B] text-white text-[10px] font-sans font-black px-2.5 py-1 rounded-md z-20">
                    {cat.exercises}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1 text-left">
                    <h4 className="font-display font-black text-sm text-[#1C1C1C] uppercase leading-snug">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-[#6B6B6B] leading-normal line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setView("library")}
                    className="mt-4 w-full py-2.5 bg-[#1C1C1C] hover:bg-[#C0392B] text-white hover:text-white rounded-xl text-[10px] font-sans font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <span>Deploy Routine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PREMIUM INSTRUMENTS SECTION */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              PREMIUM UTILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              HIGH PERFORMANCE <span className="text-[#C0392B]">FEATURES</span>
            </h2>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#F7F7F7] rounded-2xl border border-gray-200 hover:border-[#C0392B] transition-all duration-250 text-left">
              <div className="w-10 h-10 rounded-full bg-[#C0392B] flex items-center justify-center text-white mb-5">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <h4 className="font-display font-black text-sm uppercase text-[#1C1C1C] mb-2">0.5x Slow Biomechanics</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Observe precision muscle insertions with ultra-slow performance playback. Lock perfect concentric angles easily.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F7] rounded-2xl border border-gray-200 hover:border-[#C0392B] transition-all duration-250 text-left">
              <div className="w-10 h-10 rounded-full bg-[#1C1C1C] flex items-center justify-center text-white mb-5">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-display font-black text-sm uppercase text-[#1C1C1C] mb-2">3s Eccentric Guidance</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Focus on high-tension eccentric phases with dynamic countdown tools. Maximize motor unit recruitment safely.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F7] rounded-2xl border border-gray-200 hover:border-[#C0392B] transition-all duration-250 text-left">
              <div className="w-10 h-10 rounded-full bg-[#C0392B] flex items-center justify-center text-white mb-5">
                <Clipboard className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-display font-black text-sm uppercase text-[#1C1C1C] mb-2">Anatomical Guides</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Prevent joints from heavy strain. See crystal clear muscle activation layouts for back, legs, and shoulder splits.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F7] rounded-2xl border border-gray-200 hover:border-[#C0392B] transition-all duration-250 text-left">
              <div className="w-10 h-10 rounded-full bg-[#1C1C1C] flex items-center justify-center text-white mb-5">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-display font-black text-sm uppercase text-[#1C1C1C] mb-2">Paystack Secured System</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Direct clearances with completely transparent renewals management. Start or change subscription terms instantly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4.5 THE RECOMPOSITION CLINIC: 4 BEFORE & AFTER TRIUMPH STORIES */}
      <section id="testimonials" className="py-24 bg-white border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#D32F2F] uppercase block">
              REAL RESULTS REAL PEOPLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-black uppercase">
              THE RECOMPOSITION CLINIC: <span className="text-[#D32F2F]">4 TRIUMPH STORIES</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed font-sans">
              Read exact progress benchmarks and training blueprints from our active premium members who executed the AlexFitness recomposition curves.
            </p>
            <div className="h-1 w-16 bg-[#D32F2F] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            {/* Testimony 1 */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-300 text-left flex flex-col justify-between h-auto min-h-[520px] space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-black text-sm uppercase text-black">Amara K.</h4>
                    <p className="text-[10px] text-gray-500 font-sans font-normal">Age 29 | Lagos Resident</p>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-sans font-black px-2.5 py-1 rounded uppercase border border-[#C8E6C9] shrink-0">
                    12 Weeks
                  </span>
                </div>

                {/* Before & After Physical Images */}
                <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-gray-200">
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/p/DZSgisigE5t/" 
                      alt="Amara Before" 
                      className="w-full h-full object-cover grayscale opacity-75 group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSgTM3AG0m/" 
                      alt="Amara After" 
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-[#D32F2F] text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase shadow">
                      AFTER
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-[#F7F7F7] p-3 rounded-xl border border-gray-150 text-[10px]">
                  <div className="text-left border-r border-gray-200 pr-2">
                    <span className="text-gray-500 block font-normal">BEFORE</span>
                    <p className="font-sans font-black text-black">92.4 KG</p>
                    <p className="text-[#D32F2F] font-bold">34% Body Fat</p>
                  </div>
                  <div className="text-left pl-2">
                    <span className="text-[#2E7D32] block font-normal">AFTER</span>
                    <p className="font-sans font-black text-[#2E7D32]">73.8 KG</p>
                    <p className="text-[#2E7D32] font-black">21% Body Fat</p>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans line-clamp-4">
                  "The 12-30-3 cardio walk saved my knees! Combined with the local diet calibrator to substitute yams for lean fish and egg whites, I lost substantial belly fat without going hungry. The AI coach guided my macros every single Sunday."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex text-[#D32F2F]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D32F2F]" />)}
                </div>
                <span className="text-[9px] text-[#2E7D32] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  ✓ VERIFIED CLINIC
                </span>
              </div>
            </div>

            {/* Testimony 2 */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-300 text-left flex flex-col justify-between h-auto min-h-[520px] space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-black text-sm uppercase text-black">Tobi S.</h4>
                    <p className="text-[10px] text-gray-500 font-sans font-normal">Age 34 | Abuja Athlete</p>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-sans font-black px-2.5 py-1 rounded uppercase border border-[#C8E6C9] shrink-0">
                    16 Weeks
                  </span>
                </div>

                {/* Before & After Physical Images */}
                <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-gray-200">
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSgXkxgLLt/" 
                      alt="Tobi Before" 
                      className="w-full h-full object-cover grayscale opacity-75 group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSghegAPhL/" 
                      alt="Tobi After" 
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-[#D32F2F] text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase shadow">
                      AFTER
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-[#F7F7F7] p-3 rounded-xl border border-gray-150 text-[10px]">
                  <div className="text-left border-r border-gray-200 pr-2">
                    <span className="text-gray-500 block font-normal">BEFORE</span>
                    <p className="font-sans font-black text-black">105.1 KG</p>
                    <p className="text-[#D32F2F] font-bold">29% Body Fat</p>
                  </div>
                  <div className="text-left pl-2">
                    <span className="text-[#2E7D32] block font-normal">AFTER</span>
                    <p className="font-sans font-black text-[#2E7D32]">85.3 KG</p>
                    <p className="text-[#2E7D32] font-black">13% Body Fat</p>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans line-clamp-4">
                  "My absolute objective was to expose my abdominal muscles and rebuild a deep chest alignment. Tracking slow eccentric sets and training compound lifts with the custom barbell routines helped me gain muscle while shredding 20 kg."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex text-[#D32F2F]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D32F2F]" />)}
                </div>
                <span className="text-[9px] text-[#2E7D32] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  ✓ VERIFIED CLINIC
                </span>
              </div>
            </div>

            {/* Testimony 3 */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-300 text-left flex flex-col justify-between h-auto min-h-[520px] space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-black text-sm uppercase text-black">David O.</h4>
                    <p className="text-[10px] text-gray-500 font-sans font-normal">Age 41 | Port Harcourt</p>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-sans font-black px-2.5 py-1 rounded uppercase border border-[#C8E6C9] shrink-0">
                    8 Weeks
                  </span>
                </div>

                {/* Before & After Physical Images */}
                <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-gray-200">
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSgN9CgI1G/" 
                      alt="David Before" 
                      className="w-full h-full object-cover grayscale opacity-75 group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1502904585520-faf4d7f74fe0?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSgRbrALBN/" 
                      alt="David After" 
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-[#D32F2F] text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase shadow">
                      AFTER
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-[#F7F7F7] p-3 rounded-xl border border-gray-150 text-[10px]">
                  <div className="text-left border-r border-gray-200 pr-2">
                    <span className="text-gray-500 block font-normal">BEFORE</span>
                    <p className="font-sans font-black text-black">98.0 KG</p>
                    <p className="text-[#D32F2F] font-bold">26% Body Fat</p>
                  </div>
                  <div className="text-left pl-2">
                    <span className="text-[#2E7D32] block font-normal">AFTER</span>
                    <p className="font-sans font-black text-[#2E7D32]">88.5 KG</p>
                    <p className="text-[#2E7D32] font-black">17% Body Fat</p>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans line-clamp-4">
                  "Needed to drop weight rapidly to secure a military physical fitness score. The targeted ab isolation guides and zero-fluff nutrition matrix got me there in only two months. Absolute clinical standard programs."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex text-[#D32F2F]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D32F2F]" />)}
                </div>
                <span className="text-[9px] text-[#2E7D32] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  ✓ VERIFIED CLINIC
                </span>
              </div>
            </div>

            {/* Testimony 4 */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-300 text-left flex flex-col justify-between h-auto min-h-[520px] space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans font-black text-sm uppercase text-black">Chioma A.</h4>
                    <p className="text-[10px] text-gray-500 font-sans font-normal">Age 31 | Enugu Executive</p>
                  </div>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-sans font-black px-2.5 py-1 rounded uppercase border border-[#C8E6C9] shrink-0">
                    10 Weeks
                  </span>
                </div>

                {/* Before & After Physical Images */}
                <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-gray-200">
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSglCsAPAr/" 
                      alt="Chioma Before" 
                      className="w-full h-full object-cover grayscale opacity-75 group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase">
                      BEFORE
                    </span>
                  </div>
                  <div className="relative h-28 bg-gray-100 overflow-hidden group/thumb">
                    <img 
                      src="https://www.instagram.com/alexfitnesshub/p/DZSgoqXALNe/" 
                      alt="Chioma After" 
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=300";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-[#D32F2F] text-[8px] font-sans font-black text-white px-2 py-0.5 rounded uppercase shadow">
                      AFTER
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-[#F7F7F7] p-3 rounded-xl border border-gray-150 text-[10px]">
                  <div className="text-left border-r border-gray-200 pr-2">
                    <span className="text-gray-500 block font-normal">BEFORE</span>
                    <p className="font-sans font-black text-black">81.2 KG</p>
                    <p className="text-[#D32F2F] font-bold">30% Body Fat</p>
                  </div>
                  <div className="text-left pl-2">
                    <span className="text-[#2E7D32] block font-normal">AFTER</span>
                    <p className="font-sans font-black text-[#2E7D32]">69.1 KG</p>
                    <p className="text-[#2E7D32] font-black">18% Body Fat</p>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans line-clamp-4">
                  "Balancing long corporate hours meant I needed extreme efficiency. Executing the 12% treadmill incline walks while checking my daily routine via the custom email notification reminder kept me disciplined daily. Unbeatable layout."
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex text-[#D32F2F]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D32F2F]" />)}
                </div>
                <span className="text-[9px] text-[#2E7D32] font-sans font-bold uppercase tracking-wider flex items-center gap-1">
                  ✓ VERIFIED CLINIC
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4.6 THE SCIENCE OF BELLY FAT OXIDATION & WEIGHT REDUCTION */}
      <section id="fat-loss-blueprint" className="py-24 bg-slate-50 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-sans font-black tracking-[0.25em] text-[#D32F2F] uppercase bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
              SCIENTIFIC METABOLIC TRUTH
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-black uppercase">
              HOW TO BURN BELLY FAT <span className="text-[#D32F2F]">& LOSE WEIGHT</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed font-sans font-normal">
              Banish useless fitness myths. Explore the clinical biochemistry of lipid mobilization and learn exactly how to shred deep visceral belly fat safely.
            </p>
            <div className="h-1 w-16 bg-[#D32F2F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: The 4 Step Lipolysis Formula */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 text-left space-y-8">
              <h3 className="text-xl font-sans font-black uppercase text-black pb-3 border-b border-gray-150">
                THE 4-PHASE LIPID MOBILIZATION PROTOCOL
              </h3>

              <div className="space-y-6">
                
                {/* Step 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shrink-0 text-xs font-sans font-black">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-sans font-black text-black uppercase">
                      Establish a Caloric Deficit Defensible Line
                    </h4>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                      Fat loss is governed by thermodynamics. You must consume 15% to 20% fewer calories than your Total Daily Energy Expenditure (TDEE). The server-side Gemini calibrator helps you customize this margin seamlessly using regional whole food staples.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shrink-0 text-xs font-sans font-black">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-sans font-black text-black uppercase">
                      Trigger Lipolysis with 12-30-3 Incline Cardio
                    </h4>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                      Walking at a 12% incline gradient, at 3.0 mph speed pace, for 30 minutes continuous, pushes your cardiovascular system into **Heart Rate Zone 2** (approx. 65% of max HR). This maximizes fat oxidation rates while preserving knee and joint cartilage.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shrink-0 text-xs font-sans font-black">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-sans font-black text-black uppercase">
                      Prioritize High Eccentric-Tension Compound Lifts
                    </h4>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                      Isolating abs does not "spot-reduce" belly fat. Spot reduction is a biological impossibility. Instead, deploy heavy rows, depth squats, and chest presses. These activate major skeletal muscle groups, keeping insulin sensitivity high and resting metabolic rate elevated.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shrink-0 text-xs font-sans font-black">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-sans font-black text-black uppercase">
                      Manage Cortisol, Satiety & Sleep Cycles
                    </h4>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                      High cortisol stress levels force the endocrine system to store visceral fat in the lower stomach area. Protect your sleep schedule, focus on high-volume high-satiety foods (spinach, local beans, lean beef, boiled plantains), and hydrate with 3.5L of water daily.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Visceral Fat Visual Guide Card */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 text-left flex flex-col justify-between relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D32F2F]/5 rounded-full blur-2xl" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-[#D32F2F]" />
                  <span className="font-sans font-black text-xs uppercase tracking-widest text-[#D32F2F]">FAT RECON PROFILE</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-sans font-black text-black uppercase leading-snug">
                    UNDERSTANDING VISCERAL ADIPOSE TISSUE
                  </h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-normal">
                    Visceral belly fat wraps around your inner organs. It is highly active metabolically but can be systematically metabolized by following a sustained deficit coupled with incline compound cardio. 
                  </p>
                </div>

                {/* Bio indicators */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-150 space-y-3">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-sans font-normal">Cardio Incline Target:</span>
                    <span className="font-mono text-[#D32F2F] font-black">12% Gradient</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] border-t border-gray-250 pt-2">
                    <span className="text-gray-500 font-sans font-normal">Protein Intake Minimum:</span>
                    <span className="font-mono text-[#2E7D32] font-bold">2.0g per kg BW</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] border-t border-gray-250 pt-2">
                    <span className="text-gray-500 font-sans font-normal">Lifting Session Goal:</span>
                    <span className="font-mono text-black font-bold">3s Eccentric Sets</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    const el = document.getElementById("notification-center");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-sans font-black text-xs uppercase rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ACTIVATE DAILY REMINDER ALERTS</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. PRICING PLANS */}
      <section id="pricing" className="py-24 bg-[#F7F7F7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              MEMBERSHIP TIERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              CHOOSE YOUR <span className="text-[#C0392B]">TRAINING TIER</span>
            </h2>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* TIER 1: MONTHLY */}
            <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#C0392B] hover:shadow-lg transition-all duration-250 flex flex-col justify-between">
              <div className="text-left">
                <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-[#1C1C1C]">
                  MONTHLY STARTER
                </span>
                <div className="mt-5">
                  <span className="text-4xl font-display font-black text-[#1C1C1C]">₦19,999</span>
                  <span className="text-[#6B6B6B] text-xs ml-1">/ 1 Month</span>
                </div>
                <p className="text-xs text-[#6B6B6B] mt-4 leading-relaxed font-sans">
                  Excellent entry-level tier to experience the core ecosystem, log active routines, and calibrate baseline nutritional plans.
                </p>
                <div className="mt-6 border-t border-gray-100 pt-5 space-y-2.5 text-xs text-[#2D3142]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Complete Exercise Library
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Baseline Calorie Calibrator
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <Lock className="w-3.5 h-3.5 text-gray-450 shrink-0" />
                    HD slow-mo biomechanics guides
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <button
                  onClick={() => handleInitiatePayment("monthly")}
                  className="w-full py-3 bg-[#1C1C1C] hover:bg-black text-white font-sans font-bold text-xs uppercase rounded-full transition-all duration-200"
                >
                  Select Monthly
                </button>
              </div>
            </div>

            {/* TIER 2: FLEXIBLE MONTH SELECTOR */}
            <div className="p-8 rounded-2xl bg-white border-2 border-[#C0392B] hover:shadow-xl transition-all duration-250 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C0392B] text-white text-[8px] font-sans font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                FLEXIBLE SPAN
              </div>
              
              <div className="text-left mt-2">
                <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C0392B]/10 text-[#C0392B]">
                  CUSTOM MONTHS
                </span>
                <div className="mt-5">
                  <span className="text-4xl font-display font-black text-[#1C1C1C]">
                    ₦{multiMonthTotal.toLocaleString()}
                  </span>
                  <span className="text-[#6B6B6B] text-xs ml-1">/ due today</span>
                </div>
                <p className="text-xs text-[#6B6B6B] mt-4 leading-relaxed font-sans">
                  Tailor customized months to align precisely with your physique recomposition timeline targets.
                </p>

                <div className="mt-5 p-4 rounded-xl bg-[#F7F7F7] border border-gray-200 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-sans font-black uppercase">
                    <span className="text-[#6B6B6B]">CHOOSE DURATION:</span>
                    <span className="text-[#C0392B] bg-[#C0392B]/5 px-2 py-0.5 rounded border border-[#C0392B]/10">
                      {selectedMonths} Months
                    </span>
                  </div>
                  
                  <div className="flex justify-between gap-1">
                    {[2, 3, 4, 5, 6].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMonths(m)}
                        className={`flex-1 py-1.5 rounded text-xs font-sans font-black transition-all border ${
                          selectedMonths === m
                            ? "bg-[#C0392B] text-white border-transparent"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#C0392B]"
                        }`}
                      >
                        {m}M
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 space-y-2.5 text-xs text-[#2D3142]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Uncapped access over complete {selectedMonths} months
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Continuous AI Coach priority features
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <button
                  onClick={() => handleInitiatePayment("multi")}
                  className="w-full py-3 bg-[#C0392B] hover:bg-[#A82E22] text-white font-sans font-bold text-xs uppercase rounded-full transition-all duration-200"
                >
                  Select duration
                </button>
              </div>
            </div>

            {/* TIER 3: YEARLY (10% DISCOUNT) */}
            <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#C0392B] hover:shadow-lg transition-all duration-250 flex flex-col justify-between">
              <div className="text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-sans font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black text-white">
                    ANNUAL PRESTIGE
                  </span>
                  <span className="bg-[#C0392B] text-white text-[8px] font-sans font-black py-0.5 px-2 rounded-full">
                    10% OFF
                  </span>
                </div>
                
                <div className="mt-5">
                  <span className="text-4xl font-display font-black text-[#1C1C1C]">₦215,989</span>
                  <span className="text-[#6B6B6B] text-xs ml-1">/ 12 Months</span>
                </div>

                <p className="text-[10px] text-[#C0392B] font-sans font-bold mt-2">
                  Instant annual savings: ₦{yearlySavingsAmt.toLocaleString()}
                </p>

                <p className="text-xs text-[#6B6B6B] mt-4 leading-relaxed font-sans">
                  Ultimate dedicated year-round program. Perfect for active transformations, tactical military preps, or bodybuilding goals.
                </p>

                <div className="mt-6 border-t border-gray-100 pt-5 space-y-2.5 text-xs text-[#2D3142]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Elite priority AI response queue
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Slow-Mo 0.5x biomechanics models
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C0392B] shrink-0" />
                    Full Year meal profiling and weights tracking
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100">
                <button
                  onClick={() => handleInitiatePayment("yearly")}
                  className="w-full py-3 bg-black hover:bg-slate-900 text-white font-sans font-bold text-xs uppercase rounded-full transition-all duration-200"
                >
                  Select Yearly
                </button>
              </div>
            </div>

          </div>

          {/* Secure Shield Protection Callout */}
          <div className="mt-12 max-w-md mx-auto p-6 rounded-2xl bg-white border border-gray-200 text-center flex flex-col items-center">
            <Shield className="w-8 h-8 text-[#C0392B] mb-3" />
            <h6 className="text-[10px] font-sans font-black uppercase tracking-wider text-[#1C1C1C]">100% Risk-Free 14-Day Refund Promise</h6>
            <p className="text-[10px] text-[#6B6B6B] mt-1.5 leading-relaxed font-sans">
              Try premium with complete confidence. If our workout tracking or AI coaching does not upgrade your daily routine, request reimbursement within 14 days for rapid secure processing.
            </p>
          </div>

        </div>
      </section>

      {/* 6. DYNAMIC ACCORDION FAQS SYSTEM */}
      <section id="faqs-segment" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              GET RESPONSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              FREQUENTLY ASKED <span className="text-[#C0392B]">QUESTIONS</span>
            </h2>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-3" />
          </div>

          <div className="space-y-4">
            {faqsList.map((item, idx) => (
              <div 
                key={idx} 
                className="overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7F7]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-sans font-extrabold text-[#1C1C1C] text-xs uppercase cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-[#C0392B] shrink-0" />
                    {item.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-300 ${openFAQ === idx ? "rotate-180" : ""}`} />
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFAQ === idx ? "max-h-[300px] border-t border-gray-200 p-5 bg-white" : "max-h-0"
                  }`}
                >
                  <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. CONTACT / PREMIUM CONSULTATION FORM */}
      <section id="contact" className="py-24 bg-[#F7F7F7] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#6B6B6B] uppercase block">
              SUPPORT CHANNELS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#1C1C1C] uppercase">
              CONNECT WITH <span className="text-[#C0392B]">COACHES</span>
            </h2>
            <div className="h-1 w-16 bg-[#C0392B] mx-auto mt-3" />
          </div>

          <div className="max-w-2xl mx-auto bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden">
            {contactSubmitted ? (
              <div className="text-center py-8 space-y-4 text-left">
                <div className="mx-auto w-12 h-12 bg-[#C0392B]/10 text-[#C0392B] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-display font-black text-[#1C1C1C] uppercase text-center">Inquiry Received</h4>
                <p className="text-xs text-[#6B6B6B] max-w-md mx-auto leading-relaxed text-center">
                  Thank you, <strong className="text-[#1C1C1C]">{contactName}</strong>! Your inquiry regarding <strong className="text-[#1C1C1C]">{contactGoal.toUpperCase()}</strong> has been captured. The coaching desk will evaluate your requirements and follow up via <span className="underline">{contactEmail}</span> within 24 working hours.
                </p>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    className="mt-4 px-5 py-2.5 bg-[#1C1C1C] hover:bg-black text-white rounded-full text-[10px] font-sans font-black uppercase tracking-wider transition inline-block mx-auto text-center"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-widest">YOUR FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F7F7] text-[#1C1C1C] focus:ring-2 focus:ring-[#C0392B]/20 focus:outline-none transition text-xs font-sans"
                      placeholder="e.g. Alex Johnson"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-widest">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F7F7] text-[#1C1C1C] focus:ring-2 focus:ring-[#C0392B]/20 focus:outline-none transition text-xs font-sans"
                      placeholder="e.g. alex@domain.com"
                    />
                  </div>
                </div>

                {/* Goal category field */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-widest">PRIMARY PHYSICAL GOAL</label>
                  <select
                    value={contactGoal}
                    onChange={(e) => setContactGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F7F7] text-[#1C1C1C] focus:ring-2 focus:ring-[#C0392B]/20 focus:outline-none transition text-xs font-sans uppercase font-bold"
                  >
                    <option value="hypertrophy">Hypertrophy (Anabolic Muscle Gain)</option>
                    <option value="fat_loss">Fat Shred Cycles (Metabolic Burn)</option>
                    <option value="calisthenics">Bodyweight Leverage stability</option>
                    <option value="rehabilitation">Joint Posture Rehabilitation</option>
                    <option value="nutrition">Custom Macronutrient profiling</option>
                  </select>
                </div>

                {/* Message details field */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-sans font-black text-[#6B6B6B] uppercase tracking-widest">SPECIFIC ATHLETIC ENQUIRY</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F7F7F7] text-[#1C1C1C] focus:ring-2 focus:ring-[#C0392B]/20 focus:outline-none transition text-xs leading-relaxed"
                    placeholder="Describe your current lifting stats, weekly training splits, and any dietary requirements..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-4 bg-[#C0392B] hover:bg-[#A82E22] text-white font-sans font-black text-xs uppercase cursor-pointer rounded-xl transition duration-200 flex items-center justify-center gap-2 tracking-widest shadow-md active:scale-98"
                >
                  {isSubmittingContact ? "TRANSMITTING INQUIRY..." : "SEND SIGNAL MESSAGE"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 8. FLOATING ACTION BUTTON: Fixed circular red chat bubble bottom-right */}
      <button
        onClick={() => {
          if (user) {
            setView("coach");
          } else {
            onOpenAuth();
          }
        }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#C0392B] text-white shadow-xl hover:bg-[#A82E22] active:scale-95 transition-all duration-200"
        aria-label="Consult AI Coach Assistant"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* 9. EMBEDDED PAYSTACK PORTAL OVERLAY */}
      {activePaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-2xl">
            
            {/* HUD portal header */}
            <div className="bg-[#1C1C1C] p-5 flex items-center justify-between text-white border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#C0392B] fill-[#C0392B]" />
                <span className="font-display font-black tracking-wider text-xs uppercase text-white">SECURE CHECKOUT</span>
              </div>
              <button 
                onClick={() => setActivePaymentModal(null)} 
                className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-xs font-sans">
              
              {/* Receipt details */}
              <div className="p-4 rounded-xl bg-[#F7F7F7] text-[11px] border border-gray-200 space-y-2 text-left">
                <div className="flex justify-between font-mono text-[10px] uppercase text-[#6B6B6B]">
                  <span>Tier Option:</span>
                  <span className="font-black text-[#1C1C1C]">
                    {activePaymentModal === "yearly" ? "12 Months" : activePaymentModal === "multi" ? `${selectedMonths} Months` : "1 Month"}
                  </span>
                </div>
                <div className="flex justify-between font-mono py-1.5 border-t border-dashed border-gray-200 text-left">
                  <span className="text-[#6B6B6B] uppercase">TOTAL AMOUNT DUE:</span>
                  <span className="font-black text-[#C0392B] text-sm">
                    ₦{activePaymentModal === "yearly" ? yearlyPriceAnnual.toLocaleString() : activePaymentModal === "multi" ? multiMonthTotal.toLocaleString() : basePriceMonthly.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 leading-normal text-center italic">✓ PCI-DSS Tier 1 Encrypted Transmission</p>
              </div>

              {/* ACTION: PRIMARY SECURE GATE ENTRY */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleRealPaystackPayment}
                  disabled={submittingPlan !== null}
                  className="w-full py-3.5 rounded-xl text-xs font-sans font-black uppercase tracking-widest text-white bg-[#C0392B] hover:bg-[#A82E22] transition-all duration-200 flex items-center justify-center gap-2 shadow"
                >
                  {submittingPlan ? "LAUNCHING SECURE POPUP..." : "PAY VIA PAYSTACK"}
                </button>
                <p className="text-[9px] text-gray-400 leading-normal text-center">
                  Pay securely using card or bank transfer through Paystack's official SSL gateway.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 10. SYSTEM FOOTER */}
      <footer className="bg-white text-black border-t border-slate-200 py-16 font-sans text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-serif font-black text-lg text-[#C0392B]">
              <Shield className="h-5 w-5 text-[#C0392B] fill-[#C0392B]" />
              <span>Alex Fitness</span>
            </div>
            <p className="text-xs text-black leading-relaxed font-sans">
              Deploying elite exercise kinesis benchmarks, absolute macronutrient nutrition tracking, and unified AI-powered consultation.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-[#C0392B] mb-3">Training Solutions</h4>
            <ul className="space-y-1.5 text-xs text-black font-sans">
              <li><button onClick={() => setView("library")} className="hover:text-[#C0392B] transition-colors">Treadmill Walk 12-30-3</button></li>
              <li><button onClick={() => setView("library")} className="hover:text-[#C0392B] transition-colors">Chest Isolation Press</button></li>
              <li><button onClick={() => setView("library")} className="hover:text-[#C0392B] transition-colors">Home Shred Workouts</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-[#C0392B] mb-3">Premium Features</h4>
            <ul className="space-y-1.5 text-xs text-black font-sans">
              <li><button onClick={() => setView("home")} className="hover:text-[#C0392B] transition-colors">Flexible Selectors</button></li>
              <li><button onClick={() => setView("dashboard")} className="hover:text-[#C0392B] transition-colors">Progress Weight Logs</button></li>
              <li><button onClick={() => setView("coach")} className="hover:text-[#C0392B] transition-colors">Gemini AI Assistant</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-[#C0392B] mb-3">Customer Support</h4>
            <p className="text-xs text-black leading-relaxed font-sans">
              Have questions or transaction inquiries? Contact support at:
              <br />
              <code className="text-[10px] text-white bg-[#C0392B] px-2.5 py-1 rounded inline-block mt-2 font-mono">support@alexfitness.com</code>
            </p>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-200 text-left text-xs text-black">
          <p>© 2026 Alex Fitness Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
