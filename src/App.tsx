import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  Lock,
  Mail,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";

const NAVY = "#132D52";
const GOLD = "#D5AA44";
const PALE_GOLD = "#F8EBC9";
const LIGHT_BG = "#F1F1F1";
const LOGO_URL = "https://i.imgur.com/0uQZnHh.png";
const HERO_IMAGE_URL = "https://i.imgur.com/5zFrwzm.png";

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
function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
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
  const [view, setView] = useState("website");

  return (
    <div className="min-h-screen text-slate-900" style={{ backgroundColor: LIGHT_BG }}>
      <Header view={view} setView={setView} />
      {view === "website" ? <Website /> : <Dashboard />}
    </div>
  );
}

function Header({ view, setView }: { view: string; setView: (v: string) => void }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.4rem] bg-white p-2 shadow-xl ring-1 ring-slate-200"
            aria-label="Apex Tax logo"
          >
            <img src={LOGO_URL} alt="Apex Tax logo icon" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="text-[2rem] font-black tracking-tight leading-none" style={{ color: NAVY }}>
              APEX TAX
            </div>
            <div
              className="mt-1 text-[0.7rem] font-semibold tracking-[0.38em]"
              style={{ color: GOLD }}
            >
              BUSINESS GROUP
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" docs", "").replace(" ", "-")}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setView("website")}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              view === "website" ? "text-white" : "bg-slate-100"
            }`}
            style={view === "website" ? { backgroundColor: NAVY } : undefined}
          >
            Front End
          </button>
          <button
            type="button"
            onClick={() => setView("dashboard")}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              view === "dashboard" ? "text-white" : "bg-slate-100"
            }`}
            style={view === "dashboard" ? { backgroundColor: GOLD } : undefined}
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}

function Website() {
  return (
    <main>
      <HeroSection />
      <FeaturedImageSection />
      <ServicesSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <ProcessIntakeSection />
      <FinalCta />
    </main>
  );
}
function HeroSection() {
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

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
              Smart Tax Solutions. Real Client Care.
            </h1>

            <div className="mt-8 h-1 w-20 rounded-full" style={{ backgroundColor: GOLD }} />

            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-200">
              Expert tax filing for individuals and self-employed clients with a secure client portal, simple uploads, real-time updates, and personal support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                className="group rounded-xl px-7 py-4 font-black text-slate-950 shadow-2xl transition hover:scale-105"
                style={{ backgroundColor: GOLD }}
              >
                Start My Tax Filing
              </button>

              <button
                type="button"
                className="group rounded-xl border border-[#D5AA44]/70 bg-transparent px-7 py-4 font-black text-white transition hover:bg-white/10"
              >
                Access Client Portal
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
            className="relative"
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

              <div className="relative flex h-full flex-col justify-between p-10 text-white">
                <div>
                  <Pill>Premium Client Experience</Pill>
                  <h3 className="mt-6 max-w-xl text-5xl font-black leading-tight">
                    A Modern Tax Company Built Around Simplicity & Trust.
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
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

            <div className="bg-white p-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                    Secure Client Portal
                  </div>
                  <h3 className="mt-2 text-4xl font-black" style={{ color: NAVY }}>
                    Tax Filing Activity
                  </h3>
                </div>

                <div className="rounded-2xl p-4" style={{ backgroundColor: PALE_GOLD }}>
                  <ShieldCheck size={28} style={{ color: GOLD }} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
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
            <h2 className="mt-6 text-5xl font-black leading-tight md:text-6xl" style={{ color: NAVY }}>
              Tax Services Designed For Individuals & Self-Employed Filers.
            </h2>
          </div>
          <div className="max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl">
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
                className="rounded-3xl bg-white p-8 shadow-lg transition"
                key={service.title}
              >
                <div className="mb-6 inline-flex rounded-2xl p-4" style={{ backgroundColor: PALE_GOLD }}>
                  <Icon style={{ color: GOLD }} size={34} />
                </div>
                <h3 className="text-2xl font-black" style={{ color: NAVY }}>
                  {service.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{service.text}</p>
                <button type="button" className="mt-6 font-bold" style={{ color: GOLD }}>
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
        <div className="mb-16 text-center text-white">
          <Pill>Client Success Stories</Pill>
          <h2 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
            Trusted By Individuals, Families & Self-Employed Filers.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-300">
            Apex Tax Business Group delivers a premium tax filing experience with simple uploads, clear updates, and organized client communication.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={testimonial.name}
              className="rounded-[2rem] bg-white p-8 shadow-2xl"
            >
              <div className="mb-6 flex gap-1 text-2xl" style={{ color: GOLD }}>
                ★★★★★
              </div>
              <p className="text-lg leading-8 text-slate-600">"{testimonial.quote}"</p>
              <div className="mt-8 border-t pt-5">
                <div className="text-xl font-black" style={{ color: NAVY }}>
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
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-2 md:items-center">
        <div>
          <Pill>Why Choose Apex</Pill>
          <h2 className="mt-5 text-5xl font-black leading-tight" style={{ color: NAVY }}>
            Built Around Trust, Speed, and Professionalism.
          </h2>
          <div className="mt-10 grid gap-6">
            {reasons.map((item) => (
              <div key={item} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5">
                <div className="mt-1 rounded-full p-2" style={{ backgroundColor: PALE_GOLD }}>
                  <CheckCircle2 size={18} style={{ color: GOLD }} />
                </div>
                <div className="text-lg font-semibold text-slate-700">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] p-8 shadow-2xl" style={{ backgroundColor: NAVY }}>
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
          <h2 className="mt-6 text-5xl font-black leading-tight md:text-6xl" style={{ color: NAVY }}>
            Filing Taxes Shouldn't Feel Complicated.
          </h2>
          <div className="mt-12 space-y-8">
            {processSteps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-xl"
                  style={{ backgroundColor: NAVY }}
                >
                  {step.number}
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: NAVY }}>
                    {step.title}
                  </div>
                  <p className="mt-2 text-lg leading-8 text-slate-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] p-10 shadow-2xl" style={{ backgroundColor: NAVY }}>
          <div className="rounded-[2rem] bg-white p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  Start Your Filing
                </div>
                <h3 className="mt-2 text-4xl font-black" style={{ color: NAVY }}>
                  Client Intake Portal
                </h3>
              </div>
              <Upload size={32} style={{ color: GOLD }} />
            </div>
            <div className="grid gap-4">
              {[
                "Full Name",
                "Email Address",
                "Phone Number",
                "Tax Service Needed",
                "Upload Tax Documents",
              ].map((field) => (
                <div
                  key={field}
                  className="rounded-2xl border bg-slate-50 px-5 py-5 text-slate-500 shadow-sm"
                >
                  {field}
                </div>
              ))}
              <button
                type="button"
                className="mt-4 rounded-2xl py-5 text-lg font-black text-white shadow-xl"
                style={{ backgroundColor: GOLD }}
              >
                Submit Secure Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div
          className="rounded-[3rem] p-12 text-center text-white shadow-2xl"
          style={{ backgroundColor: NAVY }}
        >
          <h2 className="text-5xl font-black">Ready To Get Started?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            Work with Apex Tax Business Group for a clean, secure, and professional tax filing experience.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="rounded-2xl px-8 py-4 font-black text-white shadow-lg"
              style={{ backgroundColor: GOLD }}
            >
              Schedule Consultation
            </button>
            <button type="button" className="rounded-2xl border border-white px-8 py-4 font-black text-white">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Dashboard() {
  const testSummary = useMemo(() => demoTests.every((test) => test.pass), []);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:grid-cols-[250px_1fr]">
      <aside className="rounded-3xl p-5 text-white shadow-xl" style={{ backgroundColor: NAVY }}>
        <div className="mb-6 flex items-center gap-3 text-lg font-black">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
            <img src={LOGO_URL} alt="Apex Tax logo icon" className="h-full w-full object-contain" />
          </div>
          <span>Admin Portal</span>
        </div>
        {[
          { icon: BarChart3, label: "Dashboard" },
          { icon: Users, label: "Clients" },
          { icon: Upload, label: "Documents" },
          { icon: Calendar, label: "Appointments" },
          { icon: Mail, label: "Messages" },
          { icon: ClipboardList, label: "Tax Status" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-white/10"
              key={item.label}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </aside>
      <main>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black" style={{ color: NAVY }}>
              Demo Client Dashboard
            </h2>
            <p className="text-slate-500">
              Store client details, tax filing status, notes, and uploaded tax documents.
            </p>
          </div>
          <button type="button" className="rounded-2xl px-5 py-3 font-bold text-white" style={{ backgroundColor: GOLD }}>
            + Add Client
          </button>
        </div>
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <span className="font-bold" style={{ color: NAVY }}>
            Demo Checks:
          </span>
          <span className={testSummary ? "ml-2 text-emerald-600" : "ml-2 text-red-600"}>
            {testSummary ? "All demo data checks passed" : "Some demo data checks failed"}
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Stat icon={Users} label="Total Clients" value="32" />
          <Stat icon={FileText} label="In Progress" value="11" />
          <Stat icon={Upload} label="Docs Needed" value="7" />
          <Stat icon={CheckCircle2} label="Filed" value="18" />
        </div>
        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <Search size={18} />
            <span className="text-sm text-slate-500">Search clients by name, phone, email, status...</span>
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <table className="w-full text-left text-sm">
              <thead style={{ backgroundColor: NAVY, color: "white" }}>
                <tr>
                  <th className="p-4">Client</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Refund Est.</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr className="border-b last:border-0" key={client.email}>
                    <td className="p-4 font-bold" style={{ color: NAVY }}>
                      {client.name}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Mail size={14} />
                        <span>{client.email}</span>
                      </div>
                    </td>
                    <td>{client.type}</td>
                    <td>
                      <Pill>{client.status}</Pill>
                    </td>
                    <td className="font-bold">{client.refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
