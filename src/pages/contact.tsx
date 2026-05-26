import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Using Formspree — replace YOUR_FORM_ID with your actual Formspree form ID
    // Sign up free at https://formspree.io
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      alert("Something went wrong. Please try again or email us directly.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F1F1" }}>
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5">
          <Link to="/" className="flex items-center gap-3">
            <div
              className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow ring-1 ring-slate-200"
            >
              <img
                src="https://i.imgur.com/0uQZnHh.png"
                alt="Apex Tax logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="text-[1.8rem] font-black tracking-tight leading-none" style={{ color: "#132D52" }}>
                APEX TAX
              </div>
              <div className="mt-1 text-[0.65rem] font-semibold tracking-[0.3em]" style={{ color: "#D5AA44" }}>
                BUSINESS GROUP
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tight" style={{ color: "#132D52" }}>
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Have a question or ready to file? We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          {/* Contact Info */}
          <div className="space-y-6">
            <div
              className="rounded-3xl p-8 text-white shadow-xl"
              style={{ backgroundColor: "#132D52" }}
            >
              <h2 className="mb-6 text-2xl font-black">Contact Information</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#D5AA44" }}
                  >
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-300">Phone</p>
                    <a
                      href="tel:+19735550142"
                      className="text-lg font-bold text-white hover:text-yellow-300 transition-colors"
                    >
                      (973) 555-0142
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#D5AA44" }}
                  >
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-300">Email</p>
                    <a
                      href="mailto:info@apextaxbg.com"
                      className="text-lg font-bold text-white hover:text-yellow-300 transition-colors"
                    >
                      info@apextaxbg.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#D5AA44" }}
                  >
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-300">Location</p>
                    <p className="text-lg font-bold text-white">New Jersey, USA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-lg font-black" style={{ color: "#132D52" }}>
                Why Choose Apex Tax?
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Secure document uploads",
                  "Real-time filing updates",
                  "Personal, dedicated support",
                  "Competitive flat-rate pricing",
                  "Free consultation included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle size={16} style={{ color: "#D5AA44" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#D5AA44" }}
                >
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black" style={{ color: "#132D52" }}>
                  Message Sent!
                </h3>
                <p className="mt-2 text-slate-500">
                  We'll get back to you within 24 hours. Check your inbox!
                </p>
                <Link
                  to="/"
                  className="mt-6 rounded-2xl px-6 py-3 font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#132D52" }}
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black" style={{ color: "#132D52" }}>
                  Send Us a Message
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Fill out the form below and we'll be in touch shortly.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-600">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-600">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-slate-600">Phone</label>
                      <input
                        type="tel"
                        placeholder="(555) 555-5555"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-600">How Can We Help? *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your tax needs..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-black text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#D5AA44" }}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Your information is secure and will never be shared.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
