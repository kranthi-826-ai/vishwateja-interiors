"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Button from "@/components/ui/Button";

// Types for Wizard State
export type WizardData = {
  homeType: string;
  requirementType: string;
  materialQuality: string;
  budgetRange: string;
  roomsSelected: string[];
  name: string;
  mobile: string;
  email: string;
  pincode: string;
};

const initialWizardData: WizardData = {
  homeType: "",
  requirementType: "",
  materialQuality: "",
  budgetRange: "",
  roomsSelected: [],
  name: "",
  mobile: "",
  email: "",
  pincode: "",
};

// Options Data Definitions
const HOME_TYPES = ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK+"];

const REQUIREMENT_TYPES = [
  {
    id: "Complete Home Interior",
    title: "Complete Home Interior",
    desc: "End-to-end design, woodwork, civil, lighting & handover.",
  },
  {
    id: "Renovation",
    title: "Home Renovation",
    desc: "Transform existing spaces, upgrade interiors & redesign layouts.",
  },
  {
    id: "Modular Only",
    title: "Modular Only (Kitchen & Wardrobes)",
    desc: "Precision modular kitchens, custom wardrobes & storage units.",
  },
  {
    id: "Design Consultation Only",
    title: "Design Consultation Only",
    desc: "Architectural 3D renders, layout planning & material guidance.",
  },
];

const MATERIAL_TIERS = [
  {
    id: "Essential (Tier 1)",
    tier: "Tier 1 — Standard Quality",
    name: "Essential",
    subtitle: "Best Value for Smart Budgets",
    desc: "Standard BWP-grade plywood, durable laminate finishes, quality standard hardware. Clean, durable and functional finish.",
    badge: "Tier 1 - Value",
  },
  {
    id: "Premium (Tier 2)",
    tier: "Tier 2 — Medium / High Quality",
    name: "Premium",
    subtitle: "Our Most Popular Choice",
    desc: "Higher-grade calibrated plywood, premium laminates/veneers, soft-close hardware & acrylic accents.",
    badge: "Tier 2 - Popular",
    featured: true,
  },
  {
    id: "Luxury (Tier 3)",
    tier: "Tier 3 — Bespoke Ultra-High Quality",
    name: "Luxury",
    subtitle: "Bespoke & Uncompromising",
    desc: "Top-grade core materials, designer veneer/lacquered glass, imported hardware & custom architectural detailing.",
    badge: "Tier 3 - Luxury",
  },
];

/* 
  TODO / PLACEHOLDER BUDGET RANGES:
  These budget numbers are temporary placeholders for demonstration.
  MUST BE REPLACED WITH REAL PRICING FIGURES FROM THE BUSINESS OWNER BEFORE GOING LIVE.
*/
const BUDGET_RANGES = [
  { id: "1.5-3L", label: "₹1.5 Lakhs – ₹3 Lakhs", note: "Ideal for basic modular updates" },
  { id: "3-6L", label: "₹3 Lakhs – ₹6 Lakhs", note: "Popular for 2BHK essential interiors" },
  { id: "6-10L", label: "₹6 Lakhs – ₹10 Lakhs", note: "Comprehensive 3BHK premium scope" },
  { id: "10-15L", label: "₹10 Lakhs – ₹15 Lakhs", note: "Luxury 3BHK / 4BHK complete fit-out" },
  { id: "15L+", label: "₹15 Lakhs+", note: "High-end villas & bespoke architectural homes" },
];

const ROOM_OPTIONS = [
  {
    id: "Kitchen",
    label: "Kitchen",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h18v4H3V3zm2 4v14h14V7M9 11h6m-6 4h4" />
      </svg>
    ),
  },
  {
    id: "Bedroom",
    label: "Master / Bedroom",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10v11M21 10v11M2 14h20M5 14v-4a3 3 0 013-3h8a3 3 0 013 3v4" />
      </svg>
    ),
  },
  {
    id: "Living Room",
    label: "Living Room",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 11h16M4 11a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-2 2M4 11v6a2 2 0 002 2h12a2 2 0 002-2v-6M9 19v2m6-2v2" />
      </svg>
    ),
  },
  {
    id: "Dining",
    label: "Dining Room",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4h16v3H4V4zm2 3v13m12-13v13M8 12h8" />
      </svg>
    ),
  },
  {
    id: "Study",
    label: "Study / Home Office",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "Pooja Room",
    label: "Pooja Room",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v3m-4 5h8m-7 4h6m-5 4h4M12 6a3 3 0 00-3 3v2h6V9a3 3 0 00-3-3z" />
      </svg>
    ),
  },
  {
    id: "Store Room",
    label: "Store / Utility",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialWizardData);
  const [validationError, setValidationError] = useState("");

  // OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Final Submission States
  const [submitting, setSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const TOTAL_WIZARD_STEPS = 6;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Navigation Logic & Validation
  const handleNext = async () => {
    setValidationError("");
    if (step === 1 && !data.homeType) {
      setValidationError("Please select your Home Type to continue.");
      return;
    }
    if (step === 2 && !data.requirementType) {
      setValidationError("Please select a Requirement Type to continue.");
      return;
    }
    if (step === 3 && !data.materialQuality) {
      setValidationError("Please select a Material Quality Tier to continue.");
      return;
    }
    if (step === 4 && !data.budgetRange) {
      setValidationError("Please select your estimated Budget Range to continue.");
      return;
    }
    if (step === 5 && data.roomsSelected.length === 0) {
      setValidationError("Please select at least one room to customize.");
      return;
    }
    if (step === 6) {
      // Validate Contact Details
      if (!data.name.trim()) {
        setValidationError("Please enter your full name.");
        return;
      }
      const phoneClean = data.mobile.replace(/\D/g, "");
      if (phoneClean.length !== 10) {
        setValidationError("Please enter a valid 10-digit mobile number.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email.trim())) {
        setValidationError("Please enter a valid email address.");
        return;
      }
      const pincodeClean = data.pincode.replace(/\D/g, "");
      if (pincodeClean.length !== 6) {
        setValidationError("Please enter a valid 6-digit Pincode.");
        return;
      }

      // Step 6 Validated -> Send OTP Code via Supabase Auth
      await triggerSendOtp();
      return;
    }

    setStep((prev) => Math.min(prev + 1, TOTAL_WIZARD_STEPS));
  };

  const handleBack = () => {
    setValidationError("");
    if (otpSent) {
      setOtpSent(false);
      setOtpCode(["", "", "", "", "", ""]);
      return;
    }
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // OTP Sending Logic
  const triggerSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email.trim(),
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        setOtpError(error.message || "Failed to send verification code. Please check your email.");
      } else {
        setOtpSent(true);
        startCooldownTimer();
      }
    } catch (err: any) {
      setOtpError("Network error while sending OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const startCooldownTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setResendCooldown(30);
    timerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Verify OTP Code & Submit via Server API Route
  const handleVerifyOtpAndSubmit = async () => {
    const codeStr = otpCode.join("");
    if (codeStr.length < 6) {
      setOtpError("Please enter the complete 6-digit code sent to your email.");
      return;
    }

    setSubmitting(true);
    setOtpError("");

    try {
      // 1. Verify OTP with Supabase Auth
      const { error: authError } = await supabase.auth.verifyOtp({
        email: data.email.trim(),
        token: codeStr,
        type: "email",
      });

      if (authError) {
        setOtpError(authError.message || "Invalid or expired verification code. Please check and retry.");
        return;
      }

      // Immediately sign out to keep client unauthenticated
      await supabase.auth.signOut();

      // 2. Submit normalized payload to server API endpoint
      const phoneClean = data.mobile.replace(/\D/g, "");
      const pincodeClean = data.pincode.replace(/\D/g, "");

      const payload = {
        name: data.name.trim(),
        mobile: phoneClean,
        email: data.email.trim(),
        pincode: pincodeClean,
        home_type: data.homeType,
        requirement_type: data.requirementType,
        material_quality: data.materialQuality,
        budget_range: data.budgetRange,
        rooms_selected: data.roomsSelected,
        service: data.requirementType,
        message: `Wizard Submission (${data.homeType}, ${data.materialQuality} Tier, Budget: ${data.budgetRange}). Rooms: ${data.roomsSelected.join(", ")}. Pincode: ${pincodeClean}`,
        verified: true,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok || resData.error) {
        setOtpError(resData.error || "Failed to register your lead. Please try again.");
        return;
      }

      setIsCompleted(true);
    } catch (err: any) {
      setOtpError("An unexpected error occurred during registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleRoom = (roomId: string) => {
    setData((prev) => {
      const exists = prev.roomsSelected.includes(roomId);
      return {
        ...prev,
        roomsSelected: exists
          ? prev.roomsSelected.filter((r) => r !== roomId)
          : [...prev.roomsSelected, roomId],
      };
    });
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy">Select Property Type</h3>
            <p className="text-xs text-navy/60 font-light">Choose your floor plan configuration to tailor your estimate.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {HOME_TYPES.map((bhk) => {
                const selected = data.homeType === bhk;
                return (
                  <button
                    key={bhk}
                    type="button"
                    onClick={() => setData({ ...data, homeType: bhk })}
                    className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                      selected
                        ? "bg-navy text-gold border-gold/40 shadow-lg scale-[1.02] ring-2 ring-gold/20 font-semibold"
                        : "bg-warmwhite text-navy border-graylight hover:bg-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <span className="text-lg font-bold">{bhk}</span>
                    <span className="text-[10px] uppercase tracking-wider text-navy/50">
                      {selected ? "✓ Selected" : "Select Layout"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy">Scope of Requirements</h3>
            <p className="text-xs text-navy/60 font-light">What kind of interior work are you looking for?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {REQUIREMENT_TYPES.map((req) => {
                const selected = data.requirementType === req.id;
                return (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => setData({ ...data, requirementType: req.id })}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-2 ${
                      selected
                        ? "bg-navy text-white border-gold/40 shadow-lg scale-[1.01] ring-2 ring-gold/20"
                        : "bg-warmwhite text-navy border-graylight hover:bg-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-semibold text-sm ${selected ? "text-gold" : "text-navy"}`}>
                        {req.title}
                      </span>
                      {selected && <span className="text-xs text-gold">✓</span>}
                    </div>
                    <p className={`text-xs font-light ${selected ? "text-white/70" : "text-navy/60"}`}>
                      {req.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy">Material Quality Tier</h3>
            <p className="text-xs text-navy/60 font-light">Choose your preferred finish level and hardware specification.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {MATERIAL_TIERS.map((tier) => {
                const selected = data.materialQuality === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setData({ ...data, materialQuality: tier.id })}
                    className={`relative p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 ${
                      selected
                        ? "bg-navy text-white border-gold shadow-xl scale-[1.02] ring-2 ring-gold/30"
                        : "bg-warmwhite text-navy border-graylight hover:bg-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          selected ? "bg-gold text-navy" : "bg-navy/10 text-navy"
                        }`}>
                          {tier.badge}
                        </span>
                        {selected && <span className="text-gold text-sm font-bold">✓</span>}
                      </div>

                      <h4 className={`text-lg font-bold ${selected ? "text-gold" : "text-navy"}`}>{tier.name}</h4>
                      <p className={`text-[11px] font-medium ${selected ? "text-white/80" : "text-goldDark"}`}>{tier.subtitle}</p>
                    </div>

                    <p className={`text-xs font-light leading-relaxed border-t pt-3 ${
                      selected ? "text-white/70 border-white/10" : "text-navy/60 border-navy/10"
                    }`}>
                      {tier.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-navy">Estimated Budget Range</h3>
                <p className="text-xs text-navy/60 font-light">Select an approximate budget range for your project.</p>
              </div>
              <span className="text-[10px] text-navy/40 font-mono border border-navy/20 px-2 py-0.5 rounded">
                Indicative
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {BUDGET_RANGES.map((b) => {
                const selected = data.budgetRange === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setData({ ...data, budgetRange: b.id })}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                      selected
                        ? "bg-navy text-white border-gold shadow-md scale-[1.01]"
                        : "bg-warmwhite text-navy border-graylight hover:bg-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <div>
                      <span className={`text-sm font-bold block ${selected ? "text-gold" : "text-navy"}`}>
                        {b.label}
                      </span>
                      <span className={`text-xs font-light ${selected ? "text-white/70" : "text-navy/50"}`}>
                        {b.note}
                      </span>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selected ? "border-gold bg-gold text-navy font-bold text-xs" : "border-graylight"
                    }`}>
                      {selected && "✓"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy">Select Rooms to Design</h3>
            <p className="text-xs text-navy/60 font-light">Multi-select all spaces included in your project scope.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {ROOM_OPTIONS.map((room) => {
                const isSelected = data.roomsSelected.includes(room.id);
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => toggleRoom(room.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-2.5 ${
                      isSelected
                        ? "bg-navy text-gold border-gold/40 shadow-lg scale-[1.02] ring-2 ring-gold/20"
                        : "bg-warmwhite text-navy border-graylight hover:bg-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-gold/20 text-gold" : "bg-navy/5 text-navy"}`}>
                      {room.icon}
                    </div>
                    <span className="text-xs font-semibold">{room.label}</span>
                    <span className={`text-[10px] ${isSelected ? "text-gold font-bold" : "text-navy/40"}`}>
                      {isSelected ? "Selected ✓" : "+ Add"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy">Contact & Site Details</h3>
            <p className="text-xs text-navy/60 font-light">Where should we deliver your itemized quote & 3D layout?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full border border-graylight rounded-xl px-4 py-3 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={data.mobile}
                  onChange={(e) => setData({ ...data, mobile: e.target.value })}
                  className="w-full border border-graylight rounded-xl px-4 py-3 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                  Email Address * (For OTP Verification)
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full border border-graylight rounded-xl px-4 py-3 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-navy mb-1.5">
                  Property Pincode *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 500081"
                  value={data.pincode}
                  onChange={(e) => setData({ ...data, pincode: e.target.value })}
                  className="w-full border border-graylight rounded-xl px-4 py-3 text-sm text-navy bg-warmwhite/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render Completed / Thank You Screen
  if (isCompleted) {
    return (
      <div className="bg-white border border-gold/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-[fadeInUp_0.5s_ease]">
        <div className="w-16 h-16 rounded-full bg-navy text-gold flex items-center justify-center mx-auto shadow-xl ring-4 ring-gold/20">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <span className="inline-block text-gold font-semibold tracking-widest text-xs uppercase mb-2 px-3 py-1 rounded-full bg-navy/5 border border-gold/30">
            Email Verified & Quote Logged
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-navy">Thank You, {data.name}!</h3>
          <p className="text-navy/70 text-sm mt-3 max-w-md mx-auto font-light leading-relaxed">
            Your customized interior estimate request for <strong className="text-navy font-semibold">{data.homeType} ({data.materialQuality} Tier)</strong> has been verified and registered. Our principal architect will contact you within 24 hours.
          </p>
        </div>

        <div className="bg-warmwhite border border-graylight rounded-2xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
          <p className="font-semibold text-navy">Estimate Summary:</p>
          <div className="grid grid-cols-2 gap-2 text-navy/70">
            <p><strong>Requirement:</strong> {data.requirementType}</p>
            <p><strong>Budget:</strong> {data.budgetRange}</p>
            <p><strong>Pincode:</strong> {data.pincode}</p>
            <p><strong>Rooms:</strong> {data.roomsSelected.join(", ")}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-graylight/60">
          <a
            href="tel:9885034309"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy text-gold font-medium text-sm border border-gold/30 shadow-md hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1.1 1.1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us Now: 98850 34309
          </a>

          <a
            href={`https://wa.me/919885034309?text=${encodeURIComponent(
              `Hello Vishwateja Interiors, I just completed the online quote wizard for my ${data.homeType} (${data.requirementType}). Please connect with me!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm shadow-md hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.073-1.069z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Render OTP Verification Modal / Step (Phase 3)
  if (otpSent) {
    return (
      <div className="bg-white border border-graylight/80 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="border-b border-graylight/60 pb-4">
          <span className="text-gold font-semibold tracking-widest text-[10px] uppercase mb-1 block">
            Step {TOTAL_WIZARD_STEPS + 1} of {TOTAL_WIZARD_STEPS + 1} — Security Check
          </span>
          <h3 className="text-xl font-bold text-navy">Enter Verification Code</h3>
          <p className="text-xs text-navy/70 mt-1 font-light leading-relaxed">
            We sent a verification code to <strong className="text-navy font-semibold">{data.email}</strong>. Please check your inbox (and Spam/Promotions folder) and enter the 6-digit code below.
          </p>
        </div>

        {otpError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{otpError}</span>
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy text-center">
            6-Digit Verification Code
          </label>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {otpCode.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  const newCode = [...otpCode];
                  newCode[idx] = val;
                  setOtpCode(newCode);

                  // Auto focus next input
                  if (val && idx < 5) {
                    const nextInput = document.getElementById(`otp-input-${idx + 1}`);
                    nextInput?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otpCode[idx] && idx > 0) {
                    const prevInput = document.getElementById(`otp-input-${idx - 1}`);
                    prevInput?.focus();
                  }
                }}
                className="w-11 h-12 text-center font-mono text-xl font-bold text-navy border border-graylight rounded-xl bg-warmwhite focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="text-navy/60 hover:text-navy underline"
            >
              ← Edit Email Address
            </button>

            {resendCooldown > 0 ? (
              <span className="text-navy/40 font-mono">
                Resend code in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={triggerSendOtp}
                disabled={otpLoading}
                className="text-gold font-semibold hover:underline disabled:opacity-50"
              >
                {otpLoading ? "Sending..." : "Resend Code"}
              </button>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-graylight/60 flex items-center gap-3">
          <Button
            onClick={handleVerifyOtpAndSubmit}
            variant="primary"
            className={`w-full py-4 text-base ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {submitting ? "Verifying & Registering..." : "Verify Code & Submit Quote Request →"}
          </Button>
        </div>
      </div>
    );
  }

  // Render Standard Wizard (Phase 2)
  return (
    <div className="bg-white border border-graylight/80 rounded-3xl p-6 sm:p-10 shadow-xl hover:border-gold/30 transition-all duration-500">
      {/* Header & Progress Indicator */}
      <div className="border-b border-graylight/60 pb-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-gold font-semibold tracking-widest text-[10px] uppercase block">
              Architectural Quote Wizard
            </span>
            <span className="text-xs font-medium text-navy/60">
              Step {step} of {TOTAL_WIZARD_STEPS}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-navy/5 text-navy font-bold text-xs border border-gold/30">
            {Math.round((step / TOTAL_WIZARD_STEPS) * 100)}% Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-graylight rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-navy via-royal to-gold transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_WIZARD_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Validation Error Notice */}
      {validationError && (
        <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 animate-[shake_0.3s_ease]">
          <span>⚠️</span>
          <span>{validationError}</span>
        </div>
      )}

      {/* Step Transition Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="min-h-[280px]"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-graylight/60 pt-6 mt-8">
        {step > 1 ? (
          <Button onClick={handleBack} variant="light" className="px-5 py-3 text-xs">
            ← Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={handleNext}
          variant="primary"
          className={`px-7 py-3 text-sm ${otpLoading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {step === TOTAL_WIZARD_STEPS ? (
            otpLoading ? "Sending Code..." : "Proceed to OTP Verification →"
          ) : (
            "Next Step →"
          )}
        </Button>
      </div>
    </div>
  );
}
