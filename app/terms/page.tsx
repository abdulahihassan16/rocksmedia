"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const LAST_UPDATED = "June 9, 2025";
const COMPANY = "Rocks Media";
const EMAIL = "abdulahihassan16@gmail.com";
const PHONE = "647-513-5490";
const LOCATION = "Ontario, Canada";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
    <div className="space-y-3 text-white/70 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

            <Section title="1. Agreement to Terms">
              <p>
                By accessing our website or engaging {COMPANY} for web design or development services,
                you agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our services.
              </p>
              <p>
                These terms constitute a legally binding agreement between you (the "Client") and
                {" "}{COMPANY} (the "Company"), a web studio operating in {LOCATION}.
              </p>
            </Section>

            <Section title="2. Services">
              <p>
                {COMPANY} provides custom web design and development services, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Custom website design and front-end development</li>
                <li>Mobile-responsive website builds</li>
                <li>Contact forms, booking forms, and integrations</li>
                <li>Search engine optimization (SEO) setup</li>
                <li>E-commerce functionality</li>
                <li>Post-launch support and maintenance (where included in your plan)</li>
              </ul>
              <p className="mt-3">
                The specific scope of work, deliverables, and timeline will be agreed upon before
                work begins. Any changes to the agreed scope may result in additional charges and
                a revised timeline.
              </p>
            </Section>

            <Section title="3. Pricing and Payment">
              <p>
                Our pricing is presented on our website and discussed during your free consultation.
                All prices are in Canadian dollars (CAD) unless otherwise stated in writing.
              </p>
              <p>
                <strong className="text-white/90">One-Time Build:</strong> A deposit is required before work begins.
                The remaining balance is due upon project completion before the website is launched or
                transferred to the client. Exact deposit amounts will be confirmed in your project agreement.
              </p>
              <p>
                <strong className="text-white/90">Monthly Care Plan:</strong> Monthly payments are due on the
                same date each month. Failure to pay within 14 days of the due date may result in temporary
                suspension of hosting or support services.
              </p>
              <p>
                All payments are non-refundable once work has commenced, except where required by applicable
                consumer protection law. If you cancel before work begins, your deposit will be refunded in full.
              </p>
            </Section>

            <Section title="4. Revisions">
              <p>
                Each plan includes a specified number of revision rounds as outlined on our pricing page:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong className="text-white/90">Essential:</strong> 1 round of revisions</li>
                <li><strong className="text-white/90">Premium:</strong> 3 rounds of revisions</li>
                <li><strong className="text-white/90">Professional:</strong> Unlimited priority revisions</li>
              </ul>
              <p className="mt-3">
                A "revision round" means a consolidated set of changes submitted at one time.
                Additional revision rounds beyond what is included in your plan may be billed at
                an hourly rate, which will be disclosed before any additional work is undertaken.
              </p>
            </Section>

            <Section title="5. Client Responsibilities">
              <p>To ensure your project is completed on time, you agree to:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Provide all content (text, images, logos, branding) in a timely manner</li>
                <li>Review and approve deliverables within a reasonable timeframe (typically 5 business days)</li>
                <li>Provide accurate and complete information about your business and requirements</li>
                <li>Respond to communications within a reasonable time</li>
              </ul>
              <p className="mt-3">
                Delays caused by the client's failure to provide content or approvals may extend
                the project timeline and, in some cases, result in additional charges.
              </p>
            </Section>

            <Section title="6. Intellectual Property and Ownership">
              <p>
                <strong className="text-white/90">Your content:</strong> You retain full ownership of all
                content you provide to us, including text, images, logos, and branding materials.
              </p>
              <p>
                <strong className="text-white/90">The completed website:</strong> Upon receipt of full payment,
                ownership of the completed website design and code transfers to you, the Client. You may use,
                modify, or transfer the website freely.
              </p>
              <p>
                <strong className="text-white/90">Portfolio rights:</strong> {COMPANY} reserves the right to
                display the completed website in our portfolio and marketing materials (including our website
                and social media) unless you request otherwise in writing before project completion.
              </p>
              <p>
                <strong className="text-white/90">Third-party tools:</strong> Websites may incorporate
                third-party libraries, frameworks, or plugins that are subject to their own open-source
                or commercial licenses. {COMPANY} is not responsible for changes to third-party tools
                after project delivery.
              </p>
            </Section>

            <Section title="7. Post-Launch Support">
              <p>
                Support periods (30-day for Premium, 60-day for Professional) begin on the date the
                website is launched or delivered to the client, whichever comes first. Support includes
                fixing bugs or issues directly caused by our work. It does not include new feature
                requests, content updates, or issues caused by third-party platform changes.
              </p>
              <p>
                Monthly Care Plan clients receive ongoing support and updates for as long as the plan
                is active. Support does not include complete redesigns or new functionality outside
                the original project scope.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                {COMPANY} is not liable for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of revenue, loss of data, or
                loss of business, arising from the use or inability to use our services.
              </p>
              <p>
                Our total liability to you for any claim arising out of or related to our services
                shall not exceed the total amount paid by you to {COMPANY} for the specific project
                giving rise to the claim.
              </p>
              <p>
                We are not responsible for website downtime caused by third-party hosting providers,
                domain registrars, or infrastructure outside our direct control.
              </p>
            </Section>

            <Section title="9. Warranties and Disclaimer">
              <p>
                We warrant that the work we deliver will be original, created by us, and will function
                as described at the time of delivery. We do not guarantee specific search engine rankings,
                traffic levels, or business results from a website we build — these are influenced by
                many factors outside our control.
              </p>
              <p>
                Except as stated above, our services are provided "as is" without warranty of any kind,
                express or implied, to the fullest extent permitted by applicable law.
              </p>
            </Section>

            <Section title="10. Cancellation">
              <p>
                <strong className="text-white/90">One-Time Build:</strong> Either party may cancel the project
                before work begins for a full refund of any deposit. Once work has commenced, the client
                is responsible for payment proportional to the work completed.
              </p>
              <p>
                <strong className="text-white/90">Monthly Care Plan:</strong> You may cancel your monthly plan
                at any time with 30 days' written notice. No refunds will be issued for the current billing
                period. Upon cancellation, support and hosting services will cease at the end of the paid period.
              </p>
            </Section>

            <Section title="11. Governing Law">
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the
                Province of Ontario and the federal laws of Canada applicable therein, without regard to
                conflict of law principles.
              </p>
              <p>
                Any disputes arising from these terms or our services will be resolved in the courts of
                Ontario, Canada, and both parties consent to the jurisdiction of those courts.
              </p>
              <p>
                For clients located in the United States, you acknowledge that {COMPANY} operates under
                Canadian law, and any engagement of our services is subject to these terms regardless
                of your location.
              </p>
            </Section>

            <Section title="12. Changes to These Terms">
              <p>
                We reserve the right to update these Terms of Service at any time. Changes will be
                posted on this page with a revised "Last updated" date. Your continued use of our
                services after changes are posted constitutes your acceptance of the new terms.
              </p>
            </Section>

            <Section title="13. Contact Us">
              <p>If you have any questions about these Terms of Service, please contact us:</p>
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
                  <a href="tel:+16475135490" className="text-blue-400 hover:text-blue-300 transition-colors">
                    {PHONE}
                  </a>
                </p>
              </div>
            </Section>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
