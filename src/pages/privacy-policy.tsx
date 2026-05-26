
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-black tracking-tight" style={{ color: "#132D52" }}>
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: May 26, 2026</p>

        <div className="mt-10 rounded-3xl bg-white p-8 md:p-12 shadow-sm">
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">

            <p>
              Apex Tax Business Group ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Tax documents and financial information you upload through our secure portal</li>
              <li>Information about your tax filing needs and history</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our tax preparation services</li>
              <li>Communicate with you about your tax filing status</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Protect the security and integrity of our platform</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in operating our platform (hosting, payment processing)</li>
              <li>Professional advisors (lawyers, accountants) as needed</li>
              <li>Government authorities when required by law</li>
            </ul>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including encryption of sensitive documents, secure servers, and access controls.
            </p>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to certain processing activities</li>
            </ul>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <p className="font-semibold" style={{ color: "#132D52" }}>Apex Tax Business Group</p>
              <p className="mt-2">Email: <a href="mailto:privacy@apextaxbg.com" className="text-blue-600 hover:underline">privacy@apextaxbg.com</a></p>
              <p>Phone: <a href="tel:+19735550142" className="text-blue-600 hover:underline">(973) 555-0142</a></p>
            </div>

            <h2 className="text-2xl font-bold" style={{ color: "#132D52" }}>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
