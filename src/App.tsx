import React, { useState, useEffect, useCallback } from "react";
import { api } from "./services/api";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Lock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Upload,
  Users,
  XCircle,
} from "lucide-react";

const NAVY = "#132D52";
const GOLD = "#D5AA44";
const PALE_GOLD = "#F8EBC9";
const LIGHT_BG = "#F1F1F1";
const LOGO_URL = "https://i.imgur.com/0uQZnHh.png";
const HERO_IMAGE_URL = "https://i.imgur.com/5zFrwzm.png";
const TOKEN_KEY = "apex-admin-token";

const clients = [
  {
    name: "Marcus Johnson",
    phone: "973-555-0142",
    email: "marcus@email.com",
    type: "Individual",
    status: "Documents Needed",
    refund: "$2,840",
  },
  {
    name: "Alicia Brown",
    phone: "908-555-0198",
    email: "alicia@email.com",
    type: "Self-Employed",
    status: "In Review",
    refund: "$740",
  },
  {
    name: "Tanya Williams",
    phone: "862-555-0177",
    email: "tanya@email.com",
    type: "Individual",
    status: "Ready to File",
    refund: "$1,415",
  },
];

const services = [
  {
    icon: FileText,
    title: "Personal Tax Filing",
    text: "W-2, 1099, dependents, deductions, credits, and refund filing support.",
  },
  {
    icon: BarChart3,
    title: "Self-Employed Tax Filing",
    text: "Tax filing support for contractors, gig workers, freelancers, and 1099 earners.",
  },
  {
    icon: Lock,
    title: "Secure Document Upload",
    text: "Clients can safely upload IDs, W-2s, 1099s, receipts, and tax documents.",
  },
  {
    icon: Users,
    title: "Family & Dependent Filing",
    text: "Support for parents, dependents, education credits, and eligible tax credits.",
  },
  {
    icon: Calendar,
    title: "Tax Consultation",
    text: "Schedule a consultation to review your filing needs before submitting documents.",
  },
  {
    icon: ClipboardList,
    title: "Tax Return Review",
    text: "Organized review of submitted documents before your tax return is prepared and filed.",
  },
];

const testimonials = [
  {
    name: "Marcus Johnson",
    quote:
      "The portal made everything incredibly easy. Uploading documents and communicating with the team felt seamless.",
  },
  {
    name: "Elite Cuts LLC",
    quote:
      "Professional, responsive, and organized. Their tax filing dashboard made the whole process easy to follow.",
  },
  {
    name: "Tanya Williams",
    quote:
      "I finally found a tax company that feels modern and trustworthy. The experience felt premium from start to finish.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Book Consultation",
    text: "Speak with our team about your tax and financial needs.",
  },
  {
    number: "02",
    title: "Upload Documents",
    text: "Securely upload your files through our encrypted client portal.",
  },
  {
    number: "03",
    title: "Review & File",
    text: "Our experts prepare and file your returns professionally and efficiently.",
  },
];

const navItems = ["Home", "Services", "Upload Docs", "Contact"];

export const demoTests = [
  {
    name: "Website has required service cards",
    pass: services.length === 6,
  },
  {
    name: "Dashboard has demo clients",
    pass: clients.length >= 3,
  },
  {
    name: "Each client has required CRM fields",
    pass: clients.every(
      (client) => client.name && client.phone && client.email && client.type && client.status
    ),
  },
  {
    name: "Website has testimonials",
    pass: testimonials.length >= 3,
  },
  {
    name: "Client intake process has three steps",
    pass: processSteps.length === 3,
  },
  {
    name: "Logo URL is configured",
    pass: LOGO_URL.includes("imgur.com") && LOGO_URL.endsWith(".png"),
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: PALE_GOLD, color: "#7A5A14" }}
    >
      {children}
    </span>
  );
}
function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <h3 className="mt-1 text-3xl font-bold" style={{ color: NAVY }}>
            {value}
          </h3>
        </div>
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: PALE_GOLD, color: GOLD }}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

function PortalClientCard({ name, subtitle, status }: { name: string; subtitle: string; status: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-black" style={{ color: NAVY }}>
            {name}
          </div>
          <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
        </div>
        <Pill>{status}</Pill>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"website" | "dashboard">(() => {
    const hash = window.location.hash.replace("#", "");
    return hash === "dashboard" || hash === "admin" ? "dashboard" : "website";
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  // Handle hash changes from Header nav links
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "dashboard" || hash === "admin") {
        setView("dashboard");
      } else {
        setView("website");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleLogin = useCallback((t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
    setView("dashboard");
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setView("website");
  }, []);

  return (
    <div className="min-h-screen text-slate-900" style={{ backgroundColor: LIGHT_BG }}>
      <Header view={view} setView={setView} isLoggedIn={!!token} />
      {view === "website" ? (
        <Website onAdminClick={() => setView("dashboard")} />
      ) : !token ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

function Header({
  view, setView, isLoggedIn,
}: {
  view: "website" | "dashboard";
  setView: (v: "website" | "dashboard") => void;
  isLoggedIn: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const idMap: Record<string, string> = {
    "Home": "home",
    "Services": "services",
    "Upload Docs": "upload",
    "Contact": "contact",
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
      {/* Mobile: logo left, hamburger right */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        {/* Logo left-aligned with brand name */}
        <a href="#home" className="flex items-center gap-2">
          <div
            className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200"
          >
            <img src={LOGO_URL} alt="Apex Tax logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-[1.5rem] font-black tracking-tight leading-none" style={{ color: NAVY }}>
              APEX TAX
            </div>
            <div className="text-[0.55rem] font-semibold tracking-[0.25em]" style={{ color: GOLD }}>
              BUSINESS GROUP
            </div>
          </div>
        </a>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-100 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-slate-600 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-600 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-600 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${idMap[item] || item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                {item}
              </a>
            ))}
            <hr className="my-2 border-slate-100" />
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Contact Us
            </a>
            <a
              href="/privacy-policy"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Privacy Policy
            </a>
          </nav>
        </div>
      )}

      {/* Desktop: full header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 hidden md:flex">
        {/* Logo + name */}
        <a href="#home" className="flex items-center gap-3">
          <div
            className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200"
          >
            <img src={LOGO_URL} alt="Apex Tax logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-[1.8rem] font-black tracking-tight leading-none" style={{ color: NAVY }}>
              APEX TAX
            </div>
            <div className="mt-1 text-[0.65rem] font-semibold tracking-[0.38em]" style={{ color: GOLD }}>
              BUSINESS GROUP
            </div>
          </div>
        </a>

        {/* Nav links */}
        <nav className="flex items-center gap-7 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${idMap[item] || item.toLowerCase().replace(" ", "-")}`}
              className="transition hover:text-slate-900"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="flex gap-2">
          <a
            href="/contact"
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
          >
            Contact Us
          </a>
          <a
            href="/privacy-policy"
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
          >
            Privacy Policy
          </a>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setView("website")}
                className={`rounded-xl px-4 py-2 text-sm font-bold ${view === "website" ? "text-white" : "bg-slate-100"}`}
                style={view === "website" ? { backgroundColor: NAVY } : undefined}
              >
                Front End
              </button>
              <button
                onClick={() => setView("dashboard")}
                className={`rounded-xl px-4 py-2 text-sm font-bold ${view === "dashboard" ? "text-white" : "bg-slate-100"}`}
                style={view === "dashboard" ? { backgroundColor: GOLD } : undefined}
              >
                Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={() => setView("dashboard")}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Website({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <main>
      <HeroSection onAdminClick={onAdminClick} />
      <FeaturedImageSection />
      <ServicesSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <ProcessIntakeSection />
      <FinalCta onAdminClick={onAdminClick} />
    </main>
  );
}
function HeroSection({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden" style={{ backgroundColor: "#06162B" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, #06162B 0%, #071A31 45%, #0B2344 100%)",
        }}
      />

      <div
        className="absolute left-[36%] top-[10%] hidden h-[620px] w-[620px] bg-contain bg-center bg-no-repeat opacity-[0.07] lg:block"
        style={{ backgroundImage: `url(${LOGO_URL})` }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(213,170,68,0.18),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-10 lg:py-16">
        {/* Mobile: content first, no hero image. Desktop: side-by-side */}
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5AA44]/50 bg-white/5 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur lg:text-sm lg:gap-3 lg:px-5 lg:py-3">
              <ShieldCheck size={16} style={{ color: GOLD }} className="hidden sm:block" />
              <ShieldCheck size={14} style={{ color: GOLD }} className="sm:hidden" />
              NJ's Trusted Tax Experts
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white lg:mt-8 lg:text-5xl lg:leading-[0.98] md:text-6xl">
              Smart Tax Solutions. Real Client Care.
            </h1>

            <div className="mt-5 h-1 w-16 rounded-full lg:mt-8 lg:w-20" style={{ backgroundColor: GOLD }} />

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 lg:mt-7 lg:text-xl lg:leading-9">
              Expert tax filing for individuals and self-employed with a secure portal, simple uploads, and personal support.
            </p>

            {/* Buttons: always side-by-side on all sizes */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10">
              <button
                type="button"
                onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl px-6 py-3.5 text-center text-sm font-black text-slate-950 shadow-2xl transition hover:scale-105 sm:text-base sm:px-7 sm:py-4"
                style={{ backgroundColor: GOLD }}
              >
                Start My Tax Filing
              </button>

              <button
                type="button"
                onClick={onAdminClick}
                className="rounded-xl border border-[#D5AA44]/70 bg-transparent px-6 py-3.5 text-center text-sm font-black text-white transition hover:bg-white/10 sm:text-base sm:px-7 sm:py-4"
              >
                Admin Login
              </button>
            </div>

            {/* Feature pills: 2x2 grid on mobile */}
            <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:max-w-3xl lg:gap-4">
              {[
                [ShieldCheck, "IRS Compliant", "Secure & encrypted"],
                [BarChart3, "Max Refunds", "Optimized filing"],
                [Users, "Real Support", "Human assistance"],
                [FileText, "Easy Uploads", "Fast document flow"],
              ].map(([Icon, title, label]) => (
                <div
                  key={title as string}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur lg:rounded-2xl lg:p-4"
                >
                  <Icon size={18} style={{ color: GOLD }} className="lg:size-6" />
                  <div className="mt-2 text-xs font-black lg:mt-3 lg:text-sm">{title as string}</div>
                  <div className="mt-0.5 text-[10px] leading-4 text-slate-300 lg:mt-1 lg:text-xs lg:leading-5">{label as string}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: hero phone image — only visible on large screens */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -right-10 top-10 h-48 w-48 rounded-full blur-3xl"
              style={{ backgroundColor: GOLD, opacity: 0.18 }}
            />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#06162B]/65 via-transparent to-transparent" />
              <img
                src={HERO_IMAGE_URL}
                alt="Luxury Apex Tax dashboard preview"
                className="min-h-[620px] w-full object-cover object-center"
              />

              <div className="absolute bottom-6 left-6 z-20 rounded-full border border-white/10 bg-[#06162B]/70 px-5 py-3 text-sm font-bold text-white shadow-2xl backdrop-blur-xl">
                Secure Client Portal
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturedImageSection() {
  return (
    <section className="relative lg:-mt-24 pb-8 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl lg:rounded-[2.5rem]"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left panel — navy background */}
            <div className="relative min-h-[280px] overflow-hidden bg-[#081A33] lg:min-h-[420px]">
              <img
                src={LOGO_URL}
                alt="Apex Tax Lion"
                className="absolute inset-0 h-full w-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#081A33] via-[#132D52]/90 to-[#132D52]" />

              <div className="relative flex h-full flex-col justify-between p-6 text-white lg:p-10">
                <div>
                  <Pill>Premium Client Experience</Pill>
                  <h3 className="mt-4 max-w-xl text-2xl font-black leading-tight lg:mt-6 lg:text-4xl xl:text-5xl">
                    A Modern Tax Company Built Around Simplicity & Trust.
                  </h3>
                </div>

                {/* Feature chips — 3 cols on lg, stack on mobile */}
                <div className="mt-5 grid grid-cols-3 gap-2 lg:mt-0 lg:gap-4">
                  {[
                    ["Encrypted", "Secure Uploads"],
                    ["Fast", "Status Updates"],
                    ["Simple", "Client Experience"],
                  ].map(([title, sub]) => (
                    <div key={title} className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-center backdrop-blur lg:rounded-2xl lg:p-4 lg:text-left">
                      <div className="text-xs font-black lg:text-2xl">{title}</div>
                      <div className="mt-0.5 hidden text-[10px] text-slate-300 lg:mt-1 lg:text-sm lg:block">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel — white, portal activity feed */}
            <div className="bg-white p-6 lg:p-10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 lg:text-sm lg:tracking-[0.25em]">
                    Secure Client Portal
                  </div>
                  <h3 className="mt-1.5 text-2xl font-black lg:mt-2 lg:text-4xl" style={{ color: NAVY }}>
                    Tax Filing Activity
                  </h3>
                </div>

                <div className="rounded-xl p-2.5 lg:rounded-2xl lg:p-4" style={{ backgroundColor: PALE_GOLD }}>
                  <ShieldCheck size={20} style={{ color: GOLD }} className="lg:size-7" />
                </div>
              </div>

              <div className="mt-5 space-y-3 lg:mt-8 lg:space-y-5">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 lg:rounded-2xl lg:p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: GOLD }} className="lg:size-5 shrink-0" />
                    <div>
                      <div className="text-xs font-black lg:text-base" style={{ color: NAVY }}>
                        W-2 Uploaded
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500 lg:mt-1 lg:text-sm">
                        Marcus Johnson · 2 mins ago
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 lg:rounded-2xl lg:p-5">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={16} style={{ color: GOLD }} className="lg:size-5 shrink-0" />
                    <div>
                      <div className="text-xs font-black lg:text-base" style={{ color: NAVY }}>
                        Return Under Review
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500 lg:mt-1 lg:text-sm">
                        Alicia Brown · Assigned to preparer
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 lg:rounded-2xl lg:p-5">
                  <div className="flex items-center gap-3">
                    <FileText size={16} style={{ color: GOLD }} className="lg:size-5 shrink-0" />
                    <div>
                      <div className="text-xs font-black lg:text-base" style={{ color: NAVY }}>
                        Refund Estimate Updated
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500 lg:mt-1 lg:text-sm">
                        Tanya Williams · $1,415 estimated
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-24">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${NAVY} 1px, transparent 1px), linear-gradient(90deg, ${NAVY} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Pill>Trusted Tax Filing Support</Pill>
            <h2 className="mt-4 text-3xl font-black leading-tight lg:mt-6 lg:text-5xl md:text-4xl" style={{ color: NAVY }}>
              Tax Services Designed For Individuals & Self-Employed Filers.
            </h2>
          </div>
          <div className="max-w-lg rounded-2xl bg-white p-5 shadow-2xl lg:rounded-[2rem] lg:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 lg:text-sm">
              Average Refund Tracked
            </div>
            <div className="mt-2 text-4xl font-black lg:mt-3 lg:text-6xl" style={{ color: NAVY }}>
              $1,250+
            </div>
            <p className="mt-3 leading-6 text-slate-600 lg:mt-4 lg:leading-7">
              Helping clients organize documents, file accurately, and track their tax return status.
            </p>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white p-5 shadow-lg transition lg:rounded-3xl lg:p-8"
                key={service.title}
              >
                <div className="mb-4 inline-flex rounded-xl p-3 lg:mb-6 lg:rounded-2xl lg:p-4" style={{ backgroundColor: PALE_GOLD }}>
                  <Icon style={{ color: GOLD }} size={22} className="lg:size-[34px]" />
                </div>
                <h3 className="text-base font-black lg:text-2xl" style={{ color: NAVY }}>
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-600 lg:mt-4 lg:text-base lg:leading-7">{service.text}</p>
                <button type="button" className="mt-4 text-sm font-bold lg:mt-6" style={{ color: GOLD }}>
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-28" style={{ backgroundColor: NAVY }}>
      <div
        className="absolute right-0 top-0 h-full w-[40%] opacity-10"
        style={{ background: `radial-gradient(circle at center, ${GOLD}, transparent 60%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center text-white lg:mb-16">
          <Pill>Client Success Stories</Pill>
          <h2 className="mt-4 text-2xl font-black leading-tight lg:mt-6 lg:text-5xl md:text-4xl">
            Trusted By Individuals, Families & Self-Employed Filers.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-300 lg:mt-6 lg:text-xl lg:leading-9">
            Apex Tax Business Group delivers a premium tax filing experience with simple uploads, clear updates, and organized client communication.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={testimonial.name}
              className="rounded-2xl bg-white p-5 shadow-2xl lg:rounded-[2rem] lg:p-8"
            >
              <div className="mb-4 flex gap-1 text-lg lg:mb-6 lg:text-2xl" style={{ color: GOLD }}>
                ★★★★★
              </div>
              <p className="text-sm leading-6 text-slate-600 lg:text-lg lg:leading-8">"{testimonial.quote}"</p>
              <div className="mt-5 border-t border-slate-100 pt-4 lg:mt-8 lg:pt-5">
                <div className="text-base font-black lg:text-xl" style={{ color: NAVY }}>
                  {testimonial.name}
                </div>
                <div className="text-xs text-slate-500 lg:text-sm">Verified Client</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const reasons = [
    "Secure cloud-based client management",
    "Fast turnaround times",
    "Dedicated tax specialists",
    "Personal and self-employed tax filing support",
    "Transparent pricing structure",
    "Modern CRM dashboard and document storage",
  ];
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:items-center lg:gap-16 lg:px-5">
        {/* Left: reasons list */}
        <div>
          <Pill>Why Choose Apex</Pill>
          <h2 className="mt-4 text-2xl font-black leading-tight lg:mt-5 lg:text-5xl" style={{ color: NAVY }}>
            Built Around Trust, Speed, and Professionalism.
          </h2>
          <div className="mt-6 grid gap-3 lg:mt-10 lg:gap-6">
            {reasons.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 lg:gap-4 lg:rounded-2xl lg:p-5">
                <div className="mt-0.5 shrink-0 rounded-full p-1.5 lg:mt-1 lg:p-2" style={{ backgroundColor: PALE_GOLD }}>
                  <CheckCircle2 size={14} style={{ color: GOLD }} className="lg:size-[18px]" />
                </div>
                <div className="text-sm font-semibold text-slate-700 lg:text-lg">{item}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: client dashboard preview */}
        <div className="rounded-2xl p-4 shadow-2xl lg:rounded-[2.5rem] lg:p-8" style={{ backgroundColor: NAVY }}>
          <div className="rounded-2xl bg-white p-4 lg:rounded-3xl lg:p-8">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 lg:text-sm lg:tracking-[0.2em]">
                  Tax Dashboard
                </div>
                <h3 className="mt-1 text-lg font-black lg:mt-2 lg:text-3xl" style={{ color: NAVY }}>
                  Client Management
                </h3>
              </div>
              <div className="rounded-xl p-2 lg:rounded-2xl lg:p-3" style={{ backgroundColor: PALE_GOLD }}>
                <BarChart3 size={18} style={{ color: GOLD }} className="lg:size-auto" />
              </div>
            </div>
            <div className="mt-4 space-y-2.5 lg:mt-8 lg:space-y-5">
              <PortalClientCard name="Marcus Johnson" subtitle="2025 Personal Return" status="Filed" />
              <PortalClientCard name="Alicia Brown" subtitle="Self-Employed Tax Return" status="In Review" />
              <PortalClientCard name="Tanya Williams" subtitle="Refund Processing" status="Pending Docs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function ProcessIntakeSection() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', tax_type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email) return;
    setLoading(true);
    setError('');
    try {
      await api.intake.submit(form);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload" className="relative overflow-hidden py-12 lg:py-28">
      <div
        className="absolute left-0 top-0 h-full w-full opacity-5"
        style={{
          background: `radial-gradient(circle at top left, ${NAVY}, transparent 35%), radial-gradient(circle at bottom right, ${GOLD}, transparent 35%)`,
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-5">
        <div>
          <Pill>Simple Process</Pill>
          <h2 className="mt-4 text-2xl font-black leading-tight lg:mt-6 lg:text-5xl md:text-4xl" style={{ color: NAVY }}>
            Filing Taxes Shouldn't Feel Complicated.
          </h2>
          <div className="mt-8 space-y-5 lg:mt-12 lg:space-y-8">
            {processSteps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black text-white shadow-xl lg:h-16 lg:w-16 lg:rounded-2xl lg:text-2xl"
                  style={{ backgroundColor: NAVY }}
                >
                  {step.number}
                </div>
                <div>
                  <div className="text-base font-black lg:text-2xl" style={{ color: NAVY }}>
                    {step.title}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600 lg:mt-2 lg:text-lg lg:leading-8">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-3 shadow-2xl lg:rounded-[2.5rem] lg:p-10" style={{ backgroundColor: NAVY }}>
          <div className="rounded-2xl bg-white p-4 lg:rounded-[2rem] lg:p-8">
            <div className="mb-5 flex items-center justify-between gap-3 lg:mb-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 lg:text-sm lg:tracking-[0.2em]">
                  Start Your Filing
                </div>
                <h3 className="mt-1 text-xl font-black lg:mt-2 lg:text-4xl" style={{ color: NAVY }}>
                  Client Intake Portal
                </h3>
              </div>
              <Upload size={20} style={{ color: GOLD }} className="lg:size-8" />
            </div>
            {success ? (
              <div className="flex flex-col items-center py-6 text-center lg:py-8">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full lg:mb-4 lg:h-16 lg:w-16" style={{ backgroundColor: PALE_GOLD }}>
                  <CheckCircle2 size={24} style={{ color: GOLD }} className="lg:size-8" />
                </div>
                <h4 className="text-xl font-black lg:text-2xl" style={{ color: NAVY }}>Request Submitted!</h4>
                <p className="mt-1.5 text-sm text-slate-500 lg:mt-2">We'll contact you within 24 hours to get started.</p>
                <button
                  type="button"
                  className="mt-5 rounded-xl px-5 py-2.5 text-sm font-bold text-white lg:mt-6 lg:rounded-2xl lg:px-6 lg:py-3"
                  style={{ backgroundColor: NAVY }}
                  onClick={() => { setSuccess(false); setForm({ full_name: '', email: '', phone: '', tax_type: '', message: '' }); }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-3 lg:gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100 lg:py-4 lg:text-base"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100 lg:py-4 lg:text-base"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-4 text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <select
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100 lg:py-4 lg:text-base"
                  value={form.tax_type}
                  onChange={(e) => setForm({ ...form, tax_type: e.target.value })}
                >
                  <option value="">Tax Service Needed</option>
                  <option value="personal">Personal Tax Filing (W-2)</option>
                  <option value="self-employed">Self-Employed / 1099</option>
                  <option value="both">Both Personal + Self-Employed</option>
                </select>
                <textarea
                  placeholder="Anything else we should know?"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100 lg:py-4 lg:text-base"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {error && <p className="text-xs text-red-500 lg:text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 rounded-xl py-3 text-sm font-black text-white shadow-xl transition hover:opacity-90 disabled:opacity-60 lg:mt-2 lg:rounded-2xl lg:py-4 lg:text-lg"
                  style={{ backgroundColor: GOLD }}
                >
                  {loading ? 'Submitting...' : 'Submit Secure Request'}
                </button>
                <p className="text-center text-[10px] text-slate-400 lg:text-xs">Your info is encrypted and never shared.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div
          className="rounded-[3rem] p-12 text-center text-white shadow-2xl"
          style={{ backgroundColor: NAVY }}
        >
          <h2 className="text-3xl font-black lg:text-5xl">Ready To Get Started?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-200 lg:mt-5 lg:text-lg lg:leading-8">
            Work with Apex Tax Business Group for a clean, secure, and professional tax filing experience.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:mt-10">
            <button
              type="button"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-xl px-6 py-3.5 text-center text-sm font-black text-slate-950 shadow-lg transition hover:opacity-90 sm:text-base lg:rounded-2xl lg:px-8 lg:py-4"
              style={{ backgroundColor: GOLD }}
            >
              Start Filing
            </button>
            <button
              type="button"
              onClick={onAdminClick}
              className="rounded-xl border border-white px-6 py-3.5 text-center text-sm font-black text-white transition hover:bg-white/10 sm:text-base lg:rounded-2xl lg:px-8 lg:py-4"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Admin Login ────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError("Please enter username and password"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await api.auth.login(username, password);
      onLogin(res.token || "");
    } catch (err: any) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16" style={{ backgroundColor: LIGHT_BG }}>
      <div className="w-full max-w-md rounded-3xl p-8 shadow-xl" style={{ backgroundColor: "white" }}>
        <div className="mb-8 flex flex-col items-center text-center">
          {/* Logo with brand name — matches header style */}
          <a href="#home" className="mb-5 flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200">
              <img src={LOGO_URL} alt="Apex Tax" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight leading-none" style={{ color: NAVY }}>APEX TAX</div>
              <div className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>BUSINESS GROUP</div>
            </div>
          </a>
          <h1 className="text-2xl font-black" style={{ color: NAVY }}>Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage clients and intake</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            <XCircle size={16} />{error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin@apexbg.com"
              autoComplete="username"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
            style={{ backgroundColor: NAVY }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <button
            onClick={() => window.location.hash = "#home"}
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            ← Back to website
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ────────────────────────────────────────────
interface DashboardData {
  totalClients: number;
  inProgress: number;
  filed: number;
  pendingIntake: number;
}

interface IntakeSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  tax_type: string;
  message: string;
  documents_count: number;
  status: string;
  created_at: string;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [submissions, setSubmissions] = useState<IntakeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsData, intakeData] = await Promise.all([
        api.admin.stats(),
        api.intake.list(),
      ]);
      setData(statsData.stats || statsData);
      setSubmissions(intakeData || []);
    } catch (err: any) {
      if (err.message.includes("401") || err.message.includes("Invalid")) { onLogout(); return; }
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const statusColor: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    "In Review": "bg-blue-100 text-blue-700",
    "Ready to File": "bg-emerald-100 text-emerald-700",
    Filed: "bg-slate-100 text-slate-600",
    "Documents Needed": "bg-orange-100 text-orange-700",
  };
  const statusClass = (s: string) => statusColor[s] || "bg-slate-100 text-slate-600";

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return d; }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:grid-cols-[250px_1fr]">
      <aside className="rounded-3xl p-5 text-white shadow-xl" style={{ backgroundColor: NAVY }}>
        <div className="mb-6 flex items-center gap-3 text-lg font-black">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
            <img src={LOGO_URL} alt="Apex Tax" className="h-full w-full object-contain" />
          </div>
          <span>Admin Portal</span>
        </div>
        {[
          { icon: BarChart3, label: "Dashboard", active: true },
          { icon: Users, label: "Clients" },
          { icon: Upload, label: "Documents" },
          { icon: Calendar, label: "Appointments" },
          { icon: Mail, label: "Messages" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div className={`mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${item.active ? "bg-white/20" : "hover:bg-white/10"}`} key={item.label}>
              <Icon size={18} /><span>{item.label}</span>
            </div>
          );
        })}
        <div className="mt-6 border-t border-white/20 pt-4">
          <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      <main>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black" style={{ color: NAVY }}>Dashboard</h2>
            <p className="text-slate-500">{loading ? "Loading…" : "Real-time client overview"}</p>
          </div>
          <button onClick={fetchData} disabled={loading}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
            <XCircle size={18} />{error}
            <button onClick={fetchData} className="ml-auto font-bold underline">Retry</button>
          </div>
        )}

        {data && (
          <div className="grid gap-4 md:grid-cols-4">
            <Stat icon={Users} label="Total Clients" value={data.totalClients ?? 0} />
            <Stat icon={FileText} label="In Progress" value={data.inProgress ?? 0} />
            <Stat icon={CheckCircle2} label="Filed" value={data.filed ?? 0} />
            <Stat icon={Upload} label="Pending Intake" value={data.pendingIntake ?? 0} />
          </div>
        )}

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black" style={{ color: NAVY }}>Intake Submissions</h3>
            <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: GOLD }}>{submissions.length}</span>
          </div>

          {loading && submissions.length === 0 ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-100" />)}</div>
          ) : submissions.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <ClipboardList size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No submissions yet</p>
              <p className="text-sm">New client intakes appear here</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border">
              <table className="w-full text-left text-sm">
                <thead style={{ backgroundColor: NAVY, color: "white" }}>
                  <tr>
                    <th className="p-4 font-semibold">Client</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Tax Type</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => (
                    <tr className="border-b last:border-0 hover:bg-slate-50" key={s.id}>
                      <td className="p-4">
                        <div className="font-bold" style={{ color: NAVY }}>{s.full_name}</div>
                        {s.message && <div className="mt-1 max-w-xs truncate text-xs text-slate-400">{s.message}</div>}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-600"><Mail size={14} /><span className="text-xs">{s.email}</span></div>
                        <div className="mt-1 flex items-center gap-2 text-slate-600"><Phone size={14} /><span className="text-xs">{s.phone}</span></div>
                      </td>
                      <td className="p-4"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize">{s.tax_type?.replace("-", " ")}</span></td>
                      <td className="p-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(s.status)}`}>{s.status}</span></td>
                      <td className="p-4 text-xs text-slate-400">{formatDate(s.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Original Demo Dashboard (kept for reference) ───────────────
