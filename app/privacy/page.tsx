"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const LAST_UPDATED = "June 9, 2025";
const COMPANY = "Rocks Media";
const EMAIL = "contact.rocksmedia@gmail.com";
const PHONE = "647-513-5490";
const LOCATION = "Ontario, Canada";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
    <div className="space-y-3 text-white/70 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "#080810" }}>
      <Navbar />

      <section className="pt-40 pb-16 px-5 md:px-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

            <Section title="1. Who We Are">
              <p>
                {COMPANY} is a web design and development studio based in {LOCATION}. We build custom websites
                for small and medium-sized businesses across Canada and the United States. This Privacy Policy
                explains how we collect, use, and protect your personal information when you visit our website
                or contact us about our services.
              </p>
              <p>
                This policy is written in accordance with Canada's <strong className="text-white/90">Personal Information
                Protection and Electronic Documents Act (PIPEDA)</strong> and, where applicable, U.S. state privacy laws
                including the California Consumer Privacy Act (CCPA).
              </p>
            </Section>

            <Section title="2. What Information We Collect">
              <p>We only collect information you voluntarily provide to us. When you submit our contact form, we collect:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Your full name</li>
                <li>Your phone number</li>
                <li>Your email address</li>
                <li>Your type of business</li>
                <li>Your preferred time to be contacted</li>
                <li>Your preferred consultation dates</li>
              </ul>
              <p className="mt-3">
                We do not collect payment information directly — any payments are processed through secure
                third-party payment processors who have their own privacy policies.
              </p>
              <p>
                We do not automatically collect cookies, tracking pixels, or analytics data beyond what
                your browser sends as standard HTTP traffic (e.g., IP address, browser type). We do not
                use advertising trackers or sell your data to any third party.
              </p>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information you provide solely to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Respond to your inquiry about our web design services</li>
                <li>Schedule and conduct a free consultation with you</li>
                <li>Send you a confirmation email acknowledging your request</li>
                <li>Communicate with you throughout your project</li>
                <li>Follow up after your project is complete, if applicable</li>
              </ul>
              <p className="mt-3">
                We will never use your information to send unsolicited marketing emails, sell leads,
                or contact you for any purpose unrelated to the services you asked about.
              </p>
            </Section>

            <Section title="4. How We Share Your Information">
              <p>
                We do not sell, rent, or trade your personal information. We may share your information
                only in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>
                  <strong className="text-white/90">EmailJS</strong> — We use EmailJS to deliver contact form
                  submissions to our inbox. EmailJS processes your name, email, phone, and message content
                  as part of sending the email. EmailJS is GDPR-compliant and acts as a data processor
                  on our behalf.
                </li>
                <li>
                  <strong className="text-white/90">Legal obligations</strong> — We may disclose your information
                  if required by law, court order, or government authority.
                </li>
              </ul>
            </Section>

            <Section title="5. Data Retention">
              <p>
                We retain your contact information only as long as necessary to fulfill the purpose for which
                it was collected — typically for the duration of your project and a reasonable period afterward
                for follow-up or legal record-keeping purposes (generally no longer than 2 years).
              </p>
              <p>
                If you would like your information deleted sooner, you may contact us at any time using
                the details in Section 9.
              </p>
            </Section>

            <Section title="6. Your Rights Under PIPEDA (Canada)">
              <p>As a Canadian resident, you have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Know what personal information we hold about you</li>
                <li>Request access to your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Withdraw consent to our use of your information (subject to legal limitations)</li>
                <li>Request deletion of your personal information</li>
                <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us directly at {EMAIL}. We will respond within
                30 days.
              </p>
            </Section>

            <Section title="7. Your Rights Under U.S. Privacy Laws">
              <p>
                If you are a California resident, you have rights under the California Consumer Privacy
                Act (CCPA), including the right to know what personal information is collected, the right
                to request deletion, and the right to opt out of the sale of personal information.
              </p>
              <p>
                We do not sell personal information. To submit a privacy request, contact us at {EMAIL}.
              </p>
              <p>
                Residents of other U.S. states with applicable privacy laws (Virginia, Colorado, Connecticut, etc.)
                may also contact us to exercise their rights under those laws.
              </p>
            </Section>

            <Section title="8. Data Security">
              <p>
                We take reasonable precautions to protect your personal information. Our website is served
                over HTTPS (SSL/TLS encryption). Contact form data is transmitted securely through EmailJS
                to our private inbox and is not stored on any public server.
              </p>
              <p>
                No method of transmission over the internet is 100% secure. While we strive to use
                commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your privacy rights,
                please contact us:
              </p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-white/90">{COMPANY}</strong></p>
                <p>{LOCATION}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                    {EMAIL}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href={`tel:+16475135490`} className="text-blue-400 hover:text-blue-300 transition-colors">
                    {PHONE}
                  </a>
                </p>
              </div>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                "Last updated" date at the top of this page. We encourage you to review this page
                periodically. Continued use of our website after changes are posted constitutes your
                acceptance of the updated policy.
              </p>
            </Section>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
