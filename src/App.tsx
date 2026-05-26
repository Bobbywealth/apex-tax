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

const navItems = ["Home", "Services", "Upload Docs", "Contact", "Why Choose Us"];

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
  // Initialize view from hash OR sessionStorage (sessionStorage survives page refresh within the same tab)
  const [view, setView] = useState<"website" | "dashboard">(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "dashboard" || hash === "admin" || hash.startsWith("admin-")) return "dashboard";
    // Check sessionStorage for admin session
    try {
      if (sessionStorage.getItem("apex-view") === "dashboard") return "dashboard";
    } catch { /* ignore */ }
    return "website";
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  // Handle hash changes from Header nav links
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "dashboard" || hash === "admin" || hash.startsWith("admin-")) {
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
    try { sessionStorage.setItem("apex-view", "dashboard"); } catch { /* ignore */ }
    window.location.hash = "#admin";
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setView("website");
    try { sessionStorage.removeItem("apex-view"); } catch { /* ignore */ }
    window.location.hash = "#home";
  }, []);

  // Helper to navigate to dashboard view + update hash
  const goToDashboard = useCallback(() => {
    setView("dashboard");
    try { sessionStorage.setItem("apex-view", "dashboard"); } catch { /* ignore */ }
    window.location.hash = "#admin";
  }, []);

  return (
    <div className="min-h-screen text-slate-900" style={{ backgroundColor: LIGHT_BG }}>
      <Header view={view} setView={setView} isLoggedIn={!!token} goToDashboard={goToDashboard} />
      {view === "website" ? (
        <Website onAdminClick={goToDashboard} setView={setView} />
      ) : !token ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

function Header({
  view, setView, isLoggedIn, goToDashboard,
}: {
  view: "website" | "dashboard";
  setView: (v: "website" | "dashboard") => void;
  isLoggedIn: boolean;
  goToDashboard: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const idMap: Record<string, string> = {
    "Home": "home",
    "Services": "services",
    "Upload Docs": "upload",
    "Contact": "contact",
    "Why Choose Us": "why",
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
          {isLoggedIn ? (
            <>
              <button
                onClick={() => { setView("website"); window.location.hash = "#home"; }}
                className={`rounded-xl px-4 py-2 text-sm font-bold ${view === "website" ? "text-white" : "bg-slate-100"}`}
                style={view === "website" ? { backgroundColor: NAVY } : undefined}
              >
                Front End
              </button>
              <button
                onClick={goToDashboard}
                className={`rounded-xl px-4 py-2 text-sm font-bold ${view === "dashboard" ? "text-white" : "bg-slate-100"}`}
                style={view === "dashboard" ? { backgroundColor: GOLD, color: NAVY } : undefined}
              >
                Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={goToDashboard}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Website({ onAdminClick, setView }: { onAdminClick: () => void; setView: (v: "website" | "dashboard") => void }) {
  return (
    <main>
      <HeroSection onAdminClick={onAdminClick} />
      <FeaturedImageSection />
      <ServicesSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <ProcessIntakeSection />
      <FinalCta onAdminClick={onAdminClick} />
      <Footer setView={setView} />
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

      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D5AA44]/50 bg-white/5 px-5 py-3 text-sm font-bold text-white shadow-lg backdrop-blur">
              <ShieldCheck size={18} style={{ color: GOLD }} />
              NJ's Trusted Tax Experts
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl">
              Smart Tax Solutions. Real Client Care.
            </h1>

            <div className="mt-8 h-1 w-20 rounded-full" style={{ backgroundColor: GOLD }} />

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:mt-7 sm:text-lg sm:leading-9 lg:text-xl">
              Expert tax filing for individuals and self-employed clients with a secure client portal, simple uploads, real-time updates, and personal support.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl px-7 py-4 text-center font-black text-slate-950 shadow-2xl transition hover:scale-105"
                style={{ backgroundColor: GOLD }}
              >
                Start My Tax Filing
              </button>

              <button
                type="button"
                onClick={onAdminClick}
                className="rounded-xl border border-[#D5AA44]/70 bg-transparent px-7 py-4 text-center font-black text-white transition hover:bg-white/10"
              >
                Admin Login
              </button>
            </div>

            <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [ShieldCheck, "IRS Compliant", "Secure & encrypted"],
                [BarChart3, "Max Refunds", "Optimized filing"],
                [Users, "Real Support", "Human assistance"],
                [FileText, "Easy Uploads", "Fast document flow"],
              ].map(([Icon, title, label]) => (
                <div
                  key={title as string}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur"
                >
                  <Icon size={24} style={{ color: GOLD }} />
                  <div className="mt-3 text-sm font-black">{title as string}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-300">{label as string}</div>
                </div>
              ))}
            </div>
          </motion.div>

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
                className="min-h-[720px] w-full object-cover object-center"
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
    <section className="relative -mt-24 pb-10">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white shadow-2xl"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[420px] overflow-hidden bg-[#081A33]">
              <img
                src={LOGO_URL}
                alt="Apex Tax Lion"
                className="absolute inset-0 h-full w-full object-cover opacity-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#081A33] via-[#132D52]/90 to-[#132D52]" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-10 text-white">
                <div>
                  <Pill>Premium Client Experience</Pill>
                  <h3 className="mt-4 text-3xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                    A Modern Tax Company Built Around Simplicity & Trust.
                  </h3>
                </div>

                <div className="mt-6 grid gap-3 sm:mt-0 sm:grid gap-4 sm:grid-cols-3">
                  {[
                    ["Encrypted", "Secure Uploads"],
                    ["Fast", "Status Updates"],
                    ["Simple", "Client Experience"],
                  ].map(([title, sub]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <div className="text-2xl font-black">{title}</div>
                      <div className="mt-1 text-sm text-slate-300">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-sm">
                    Secure Client Portal
                  </div>
                  <h3 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl" style={{ color: NAVY }}>
                    Tax Filing Activity
                  </h3>
                </div>

                <div className="rounded-2xl p-3" style={{ backgroundColor: PALE_GOLD }}>
                  <ShieldCheck size={24} style={{ color: GOLD }} className="sm:w-7 sm:h-7" />
                </div>
              </div>

              <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-5">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black" style={{ color: NAVY }}>
                        W-2 Uploaded
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        Marcus Johnson · 2 mins ago
                      </div>
                    </div>
                    <CheckCircle2 style={{ color: GOLD }} />
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black" style={{ color: NAVY }}>
                        Return Under Review
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        Alicia Brown · Assigned to preparer
                      </div>
                    </div>
                    <BarChart3 style={{ color: GOLD }} />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black" style={{ color: NAVY }}>
                        Refund Estimate Updated
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        Tanya Williams · $1,415 estimated
                      </div>
                    </div>
                    <FileText style={{ color: GOLD }} />
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
        <div className="mb-16 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Pill>Trusted Tax Filing Support</Pill>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-5xl md:text-6xl" style={{ color: NAVY }}>
              Tax Services Designed For Individuals & Self-Employed Filers.
            </h2>
          </div>
          <div className="max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              Average Refund Tracked
            </div>
            <div className="mt-3 text-6xl font-black" style={{ color: NAVY }}>
              $1,250+
            </div>
            <p className="mt-4 leading-7 text-slate-600">
              Helping clients organize documents, file accurately, and track their tax return status.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                whileHover={{ y: -8 }}
                className="rounded-3xl bg-white p-6 shadow-lg transition sm:p-8"
                key={service.title}
              >
                <div className="mb-4 inline-flex rounded-2xl p-3 sm:mb-6 sm:p-4" style={{ backgroundColor: PALE_GOLD }}>
                  <Icon style={{ color: GOLD }} size={28} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl font-black sm:text-2xl" style={{ color: NAVY }}>
                  {service.title}
                </h3>
                <p className="mt-3 leading-6 text-slate-600 sm:mt-4 sm:leading-7">{service.text}</p>
                <button type="button" className="mt-4 text-sm font-bold sm:mt-6" style={{ color: GOLD }}>
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
        <div className="mb-10 text-center text-white sm:mb-16">
          <Pill>Client Success Stories</Pill>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-5xl md:text-6xl">
            Trusted By Individuals, Families & Self-Employed Filers.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            Apex Tax Business Group delivers a premium tax filing experience with simple uploads, clear updates, and organized client communication.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={testimonial.name}
              className="rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="mb-4 flex gap-1 text-lg sm:mb-6 sm:text-2xl" style={{ color: GOLD }}>
                ★★★★★
              </div>
              <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">"{testimonial.quote}"</p>
              <div className="mt-6 border-t pt-4 sm:mt-8 sm:pt-5">
                <div className="text-lg font-black sm:text-xl" style={{ color: NAVY }}>
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-500">Verified Client</div>
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
    <section id="why" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-2 md:items-center">
        <div>
          <Pill>Why Choose Apex</Pill>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:mt-5 sm:text-4xl lg:text-5xl" style={{ color: NAVY }}>
            Built Around Trust, Speed, and Professionalism.
          </h2>
          <div className="mt-6 grid gap-3 sm:mt-10 sm:grid gap-6">
            {reasons.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 sm:gap-4 sm:p-5">
                <div className="mt-0.5 rounded-full p-1.5 sm:mt-1 sm:p-2" style={{ backgroundColor: PALE_GOLD }}>
                  <CheckCircle2 size={16} style={{ color: GOLD }} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div className="text-sm font-semibold text-slate-700 sm:text-base lg:text-lg">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] p-6 shadow-2xl sm:p-8" style={{ backgroundColor: NAVY }}>
          <div className="rounded-3xl bg-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Tax Dashboard
                </div>
                <h3 className="mt-2 text-3xl font-black" style={{ color: NAVY }}>
                  Client Management
                </h3>
              </div>
              <div className="rounded-2xl p-3" style={{ backgroundColor: PALE_GOLD }}>
                <BarChart3 style={{ color: GOLD }} />
              </div>
            </div>
            <div className="mt-8 space-y-5">
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
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', tax_type: '', message: '', preferred_date: '', preferred_time: '' });
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
    <section id="upload" className="relative overflow-hidden py-28">
      <div
        className="absolute left-0 top-0 h-full w-full opacity-5"
        style={{
          background: `radial-gradient(circle at top left, ${NAVY}, transparent 35%), radial-gradient(circle at bottom right, ${GOLD}, transparent 35%)`,
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:items-center">
        <div>
          <Pill>Simple Process</Pill>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:mt-6 sm:text-4xl lg:text-5xl md:text-6xl" style={{ color: NAVY }}>
            Filing Taxes Shouldn't Feel Complicated.
          </h2>
          <div className="mt-8 space-y-6 sm:mt-12 lg:space-y-8">
            {processSteps.map((step) => (
              <div key={step.number} className="flex gap-4 sm:gap-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-xl sm:h-16 sm:w-16 sm:text-2xl"
                  style={{ backgroundColor: NAVY }}
                >
                  {step.number}
                </div>
                <div>
                  <div className="text-lg font-black sm:text-2xl" style={{ color: NAVY }}>
                    {step.title}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600 sm:mt-2 sm:text-base lg:text-lg lg:leading-8">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] p-6 shadow-2xl sm:p-8 lg:p-10" style={{ backgroundColor: NAVY }}>
          <div className="rounded-[2rem] bg-white p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-3 sm:mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 sm:text-sm">
                  Start Your Filing
                </div>
                <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl lg:text-4xl" style={{ color: NAVY }}>
                  Client Intake Portal
                </h3>
              </div>
              <Upload size={26} style={{ color: GOLD }} className="sm:w-8 sm:h-8" />
            </div>
            {success ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: PALE_GOLD }}>
                  <CheckCircle2 size={32} style={{ color: GOLD }} />
                </div>
                <h4 className="text-2xl font-black" style={{ color: NAVY }}>Request Submitted!</h4>
                <p className="mt-2 text-slate-500">{form.preferred_date ? `Appointment requested for ${form.preferred_date}${form.preferred_time ? ` at ${form.preferred_time}` : ""}. We'll confirm shortly.` : "We'll contact you within 24 hours to get started."}</p>
                <button
                  type="button"
                  className="mt-6 rounded-2xl px-6 py-3 font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                  onClick={() => { setSuccess(false); setForm({ full_name: '', email: '', phone: '', tax_type: '', message: '', preferred_date: '', preferred_time: '' }); }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-4 text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  className="w-full rounded-xl border border-slate-200 px-4 py-4 text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-4 text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                  value={form.tax_type}
                  onChange={(e) => setForm({ ...form, tax_type: e.target.value })}
                >
                  <option value="">Tax Service Needed</option>
                  <option value="personal">Personal Tax Filing (W-2)</option>
                  <option value="self-employed">Self-Employed / 1099</option>
                  <option value="both">Both Personal + Self-Employed</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">Preferred Date</label>
                    <input type="date" className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100" value={form.preferred_date} onChange={e => setForm({ ...form, preferred_date: e.target.value })} min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-500">Preferred Time</label>
                    <select className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-600 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100" value={form.preferred_time} onChange={e => setForm({ ...form, preferred_time: e.target.value })}>
                      <option value="">Select time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>
                <textarea
                  placeholder="Anything else we should know?"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-4 text-slate-800 placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-2xl py-4 text-lg font-black text-white shadow-xl transition hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: GOLD }}
                >
                  {loading ? 'Submitting...' : 'Submit Secure Request'}
                </button>
                <p className="text-center text-xs text-slate-400">Your info is encrypted and never shared.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────
function Footer({ setView }: { setView: (v: "website" | "dashboard") => void }) {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow ring-1 ring-slate-200">
              <img src={LOGO_URL} alt="Apex Tax" className="h-full w-full object-contain brightness-0" style={{ filter: "brightness(0) opacity(0.7)" }} />
            </div>
            <div>
              <div className="text-sm font-black" style={{ color: NAVY }}>APEX TAX</div>
              <div className="text-[0.6rem] font-semibold tracking-widest text-slate-400">BUSINESS GROUP</div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
            <button onClick={() => { setView("website"); window.location.hash = "#home"; }} className="hover:text-slate-800">Front End</button>
            <span className="text-slate-300">|</span>
            <a href="#contact" className="hover:text-slate-800">Contact Us</a>
            <span className="text-slate-300">|</span>
            <a href="#privacy" target="_blank" rel="noopener" className="hover:text-slate-800">Privacy Policy</a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Apex Tax Business Group</p>
        </div>
      </div>
    </footer>
  );
}

function FinalCta({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div
          className="rounded-[2rem] p-6 text-center text-white shadow-2xl sm:rounded-[3rem] sm:p-12"
          style={{ backgroundColor: NAVY }}
        >
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Ready To Get Started?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-200 sm:mt-5 sm:text-lg lg:text-xl">
            Work with Apex Tax Business Group for a clean, secure, and professional tax filing experience.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <button
              type="button"
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-2xl px-8 py-4 text-center font-black text-slate-950 shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              Start Filing
            </button>
            <button
              type="button"
              onClick={onAdminClick}
              className="rounded-2xl border border-white px-8 py-4 text-center font-black text-white transition hover:bg-white/10"
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
          <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200">
            <img src={LOGO_URL} alt="Apex Tax" className="h-full w-full object-contain" />
          </div>
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
  preferred_date: string;
  preferred_time: string;
  documents_count: number;
  status: string;
  created_at: string;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [submissions, setSubmissions] = useState<IntakeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  // Init activeTab from URL hash (e.g. #admin-clients), default "dashboard"
  const [activeTab, setActiveTab] = useState<"dashboard" | "clients" | "documents" | "appointments" | "messages">(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("admin-")) {
      const tab = hash.replace("admin-", "") as any;
      if (["dashboard","clients","documents","appointments","messages"].includes(tab)) return tab;
    }
    return "dashboard";
  });

  // Keep URL hash in sync with activeTab
  useEffect(() => {
    window.location.hash = `admin-${activeTab}`;
  }, [activeTab]);

  // Listen for hash changes (e.g. browser back/forward)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash.startsWith("admin-")) {
        const tab = hash.replace("admin-", "") as any;
        if (["dashboard","clients","documents","appointments","messages"].includes(tab)) {
          setActiveTab(tab);
        }
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const [docClientId, setDocClientId] = useState("");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docUploading, setDocUploading] = useState<string | false>(false);
  const [docList, setDocList] = useState<any[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docError, setDocError] = useState("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [statsData, intakeResult] = await Promise.all([
        api.admin.stats(),
        api.intake.list(),
      ]);
      setData(statsData.stats || statsData);
      const subs: IntakeSubmission[] = Array.isArray(intakeResult) ? intakeResult : (intakeResult as any)?.submissions || [];
      setSubmissions(subs);
    } catch (err: any) {
      if (err.message.includes("401") || err.message.includes("Invalid")) { onLogout(); return; }
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleConvert = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await api.intake.convert(id);
      showToast(res.message || "Client created!");
      fetchData();
    } catch (err: any) {
      showToast(err.message || "Failed to convert", false);
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      await api.intake.updateStatus(id, newStatus);
      showToast(`Status updated to ${newStatus}`);
      fetchData();
    } catch (err: any) {
      showToast(err.message || "Failed to update status", false);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDocUpload = async () => {
    if (!docFile || !docClientId) return;
    setDocUploading(docFile.name);
    setDocError("");
    try {
      await api.documents.upload(docClientId, docFile);
      setDocFile(null);
      await fetchDocs(docClientId);
      showToast("Document uploaded!");
    } catch (err: any) {
      setDocError(err.message || "Upload failed");
    } finally {
      setDocUploading(false);
    }
  };

  const fetchDocs = async (clientId?: string) => {
    setDocsLoading(true);
    setDocError("");
    try {
      const docs = await api.documents.list(clientId);
      setDocList(docs || []);
    } catch {
      setDocList([]);
    } finally {
      setDocsLoading(false);
    }
  };

  useEffect(() => { if (activeTab === "documents") fetchDocs(docClientId || undefined); }, [activeTab, docClientId]);

  useEffect(() => {
    if (activeTab === "appointments") {
      setAppointmentsLoading(true);
      api.appointments.list().then(data => { setAppointments(data || []); setAppointmentsLoading(false); }).catch(() => { setAppointments([]); setAppointmentsLoading(false); });
    }
    if (activeTab === "clients") {
      api.clients.list().then(data => setClients(data || [])).catch(() => setClients([]));
    }
  }, [activeTab]);

  const STATUS_OPTIONS = ["Pending", "Contacted", "Intake Review", "Client Created", "Rejected"];

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
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:px-5 md:py-8">
      {/* Sidebar: icon tab bar at bottom on mobile, side nav on desktop */}
      <aside className="order-2 md:order-1 rounded-2xl md:rounded-3xl p-3 md:p-5 text-white shadow-xl fixed bottom-0 left-0 right-0 z-30 md:static md:shadow-none" style={{ backgroundColor: NAVY }}>
        {/* Desktop logo + label */}
        <div className="hidden md:flex mb-6 items-center gap-3 text-lg font-black">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
            <img src={LOGO_URL} alt="Apex Tax" className="h-full w-full object-contain" />
          </div>
          <span>Admin Portal</span>
        </div>
        {/* Nav: horizontal icon tabs on mobile, vertical on desktop */}
        <div className="flex flex-row md:flex-col gap-1 md:gap-1.5">
          {[
            { icon: BarChart3, key: "dashboard" as const },
            { icon: Users, key: "clients" as const },
            { icon: Upload, key: "documents" as const },
            { icon: Calendar, key: "appointments" as const },
            { icon: Mail, key: "messages" as const },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                onClick={() => setActiveTab(item.key)}
                className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 rounded-xl px-2 py-3 md:px-3 md:py-3 text-xs md:text-sm font-semibold transition min-w-[52px] ${activeTab === item.key ? "bg-white/20" : "hover:bg-white/10"}`}
                key={item.key}
              >
                <Icon size={20} className="shrink-0" /><span className="hidden md:inline">{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span>
              </button>
            );
          })}
        </div>
        {/* Sign out: icon-only on mobile, full on desktop */}
        <div className="mt-3 md:mt-6 border-t border-white/20 pt-3 md:pt-4 hidden md:block">
          <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20">
            <LogOut size={18} />Sign Out
          </button>
        </div>
        <button onClick={onLogout} className="flex md:hidden items-center justify-center p-2 text-red-300 hover:bg-red-500/20 rounded-xl min-w-[52px] mt-1">
          <LogOut size={20} />
        </button>
      </aside>

      <main className="order-1 md:order-2 pb-24 md:pb-0">
        {activeTab === "dashboard" && (
          <>
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

            {toast && (
              <div className={`mb-4 flex items-center gap-3 rounded-2xl p-4 text-sm ${toast.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                {toast.ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                {toast.msg}
              </div>
            )}

            {data && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
                        <th className="p-4 font-semibold">Actions</th>
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
                          <td className="p-4">
                            {s.status !== "Client Created" && s.status !== "Rejected" && (
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() => handleConvert(s.id)}
                                  disabled={actionLoading === s.id}
                                  className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-50"
                                >
                                  {actionLoading === s.id ? "…" : "Create Client"}
                                </button>
                                <select
                                  value={s.status}
                                  onChange={e => handleStatusChange(s.id, e.target.value)}
                                  disabled={actionLoading === s.id}
                                  className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs disabled:opacity-50"
                                >
                                  {STATUS_OPTIONS.filter(o => o !== s.status).map(o => (
                                    <option key={o} value={o}>{o}</option>
                                  ))}
                                </select>
                              </div>
                            )}
                            {(s.status === "Client Created" || s.status === "Rejected") && (
                              <span className="text-xs text-slate-400">{s.status}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "clients" && (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-3xl font-black" style={{ color: NAVY }}>Clients</h2>
                <p className="text-slate-500">{clients.length} client{clients.length !== 1 ? "s" : ""}</p>
              </div>
            </div>
            {clients.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
                <Users size={36} style={{ color: GOLD }} className="mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold" style={{ color: NAVY }}>No clients yet</h3>
                <p className="mt-1 text-sm text-slate-400">Convert intake submissions to clients to see them here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {clients.map(c => (
                  <div key={c.id} className="rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-black text-white" style={{ backgroundColor: NAVY }}>{c.full_name?.charAt(0) || "?"}</div>
                          <div>
                            <span className="font-bold" style={{ color: NAVY }}>{c.full_name}</span>
                            <div className="flex gap-3 text-xs text-slate-400">
                              <span>{c.email}</span>
                              {c.phone && <span>{c.phone}</span>}
                            </div>
                          </div>
                        </div>
                        {c.tax_type && (
                          <div className="ml-12 mt-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600"><FileText size={10} />{c.tax_type}</span>
                          </div>
                        )}
                      </div>
                      <span className="shrink-0 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "documents" && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-black" style={{ color: NAVY }}>Documents</h2>
              <p className="text-slate-500">Upload documents and assign them to a client</p>
            </div>
            <div className="mb-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Upload To Client</label>
                <select className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-700 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100" value={docClientId} onChange={e => setDocClientId(e.target.value)}>
                  <option value="">Select a client…</option>
                  {submissions.map(s => <option key={s.id} value={s.id}>{s.full_name} — {s.email}</option>)}
                </select>
              </div>
              <div className="relative rounded-2xl bg-white p-4 shadow-sm">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Upload Document</label>
                <div className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-colors ${docUploading ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-amber-400 hover:bg-slate-50"}`}>
                  {docUploading ? (
                    <div className="flex items-center gap-2 text-sm text-amber-600"><RefreshCw size={16} className="animate-spin" /><span>Uploading {docUploading}…</span></div>
                  ) : docFile ? (
                    <div className="flex items-center gap-2"><FileText size={20} style={{ color: GOLD }} /><span className="text-sm font-semibold text-slate-700">{docFile.name}</span><button onClick={() => setDocFile(null)} className="ml-2 text-slate-400 hover:text-red-500"><XCircle size={16} /></button></div>
                  ) : (
                    <><Upload size={20} className="mb-2 text-slate-400" /><span className="text-xs text-slate-500">Click to select file</span><input type="file" className="absolute inset-0 cursor-pointer opacity-0" style={{ zIndex: 10 }} onChange={e => { const f = e.target.files?.[0]; if (f) setDocFile(f); }} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" /></>
                  )}
                </div>
                {docFile && (
                  <button onClick={handleDocUpload} disabled={!docClientId || !!docUploading} className="mt-3 w-full rounded-xl py-2.5 text-sm font-bold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50" style={{ backgroundColor: docClientId ? NAVY : "#999" }}>
                    {docUploading ? "Uploading…" : docClientId ? "Upload Document" : "Select a client first"}
                  </button>
                )}
                {docError && <p className="mt-2 text-xs text-red-500">{docError}</p>}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-base font-bold" style={{ color: NAVY }}>{docClientId ? `Documents — ${submissions.find(s => s.id === docClientId)?.full_name}` : "All Client Documents"}</h3>
              {docsLoading ? <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />)}</div> : docList.length === 0 ? (
                <div className="py-8 text-center text-slate-400"><FileText size={28} className="mx-auto mb-2 opacity-30" /><p className="text-xs font-semibold">No documents found</p></div>
              ) : (
                <div className="overflow-x-auto"><table className="w-full text-left text-xs min-w-[500px]">
                  <thead style={{ backgroundColor: NAVY, color: "white" }}><tr><th className="p-2.5">File Name</th><th className="p-2.5">Client</th><th className="p-2.5">Uploaded</th></tr></thead>
                  <tbody>{docList.map((doc: any) => <tr key={doc.id} className="border-b border-slate-100 last:border-0"><td className="p-2.5 font-semibold">{doc.filename || doc.name}</td><td className="p-2.5 text-slate-600">{doc.client_name || "—"}</td><td className="p-2.5 text-slate-400">{formatDate(doc.created_at)}</td></tr>)}</tbody>
                </table></div>
              )}
            </div>
          </>
        )}

        {activeTab === "appointments" && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-black" style={{ color: NAVY }}>Appointments</h2>
              <p className="text-slate-500">Appointment requests from intake form</p>
            </div>
            <div className="mb-4 grid grid-cols-3 gap-3">
              {[{ label: "Pending", value: appointments.filter(a => a.status === "Pending" || !a.status).length, color: "bg-amber-50 text-amber-700 border-amber-100" }, { label: "Confirmed", value: appointments.filter(a => a.status === "Confirmed").length, color: "bg-emerald-50 text-emerald-700 border-emerald-100" }, { label: "Completed", value: appointments.filter(a => a.status === "Completed" || a.status === "Done").length, color: "bg-blue-50 text-blue-700 border-blue-100" }].map(stat => (
                <div key={stat.label} className={`rounded-xl border p-3 text-center ${stat.color}`}><div className="text-2xl font-black">{stat.value}</div><div className="text-[10px] font-semibold uppercase">{stat.label}</div></div>
              ))}
            </div>
            {appointmentsLoading ? <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />)}</div> : appointments.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center shadow-sm"><Calendar size={28} style={{ color: GOLD }} className="mx-auto mb-3" /><h3 className="text-base font-bold" style={{ color: NAVY }}>No appointments yet</h3><p className="mt-1 text-xs text-slate-500">Clients who requested appointments via the intake form will appear here.</p></div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt: any) => {
                  const aptStatus = apt.status || "Pending";
                  const statusColors: Record<string, string> = { Pending: "bg-amber-100 text-amber-700", Confirmed: "bg-emerald-100 text-emerald-700", Completed: "bg-blue-100 text-blue-700", Cancelled: "bg-red-100 text-red-700" };
                  return (
                    <div key={apt.id} className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: NAVY }}>{apt.client_name?.charAt(0) || "?"}</div>
                            <div><span className="font-bold" style={{ color: NAVY }}>{apt.client_name}</span><div className="flex gap-x-3 text-[10px] text-slate-400"><span>{apt.email}</span>{apt.phone && <span>{apt.phone}</span>}</div></div>
                          </div>
                          <div className="ml-11 flex items-center gap-2 text-xs text-slate-600">
                            {apt.date && <span className="flex items-center gap-1 font-semibold"><Calendar size={12} style={{ color: GOLD }} />{apt.date}{apt.time ? ` at ${apt.time}` : ""}</span>}
                            {apt.notes && <span className="text-slate-400">— {apt.notes}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[aptStatus] || "bg-slate-100 text-slate-600"}`}>{aptStatus}</span>
                          {aptStatus === "Pending" && (
                            <div className="flex gap-1">
                              <button onClick={async () => { try { await api.appointments.updateStatus(apt.id, "Confirmed"); setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: "Confirmed" } : a)); showToast("Appointment confirmed!"); } catch (e: any) { showToast(e.message, false); } }} className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 hover:bg-emerald-200">Confirm</button>
                              <button onClick={async () => { try { await api.appointments.updateStatus(apt.id, "Cancelled"); setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: "Cancelled" } : a)); showToast("Appointment cancelled"); } catch (e: any) { showToast(e.message, false); } }} className="rounded-lg bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700 hover:bg-red-200">Cancel</button>
                            </div>
                          )}
                          {aptStatus === "Confirmed" && (
                            <button onClick={async () => { try { await api.appointments.updateStatus(apt.id, "Completed"); setAppointments(prev => prev.map(a => a.id === apt.id ? { ...a, status: "Completed" } : a)); showToast("Marked as done!"); } catch (e: any) { showToast(e.message, false); } }} className="rounded-lg bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700 hover:bg-blue-200">Mark Done</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === "messages" && (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-black" style={{ color: NAVY }}>Messages</h2>
              <p className="text-slate-500">Messages from intake form submissions</p>
            </div>
            {submissions.filter(s => s.message).length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center shadow-sm"><Mail size={28} style={{ color: GOLD }} className="mx-auto mb-3" /><h3 className="text-base font-bold" style={{ color: NAVY }}>No messages yet</h3><p className="mt-1 text-xs text-slate-500">Messages from clients who submitted the intake form will appear here.</p></div>
            ) : (
              <div className="space-y-3">
                {submissions.filter(s => s.message).map(s => (
                  <div key={s.id} className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-black text-white" style={{ backgroundColor: NAVY }}>{s.full_name.charAt(0)}</div>
                          <div><span className="font-bold" style={{ color: NAVY }}>{s.full_name}</span><span className="ml-2 text-[10px] text-slate-400">{s.email}</span></div>
                        </div>
                        <p className="ml-10 text-sm text-slate-600">{s.message}</p>
                        {s.preferred_date && <div className="ml-10 flex items-center gap-1 text-[10px] text-slate-400"><Calendar size={10} />Requested: {s.preferred_date}{s.preferred_time ? ` at ${s.preferred_time}` : ""}</div>}
                      </div>
                      <span className="shrink-0 text-[10px] text-slate-400">{formatDate(s.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Original Demo Dashboard (kept for reference) ───────────────
