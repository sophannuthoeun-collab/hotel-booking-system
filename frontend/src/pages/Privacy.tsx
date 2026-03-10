import Footer from "../components/home/Footer";

const LAST_UPDATED = 'March 10, 2026';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, including when you make a reservation, create an account, contact us, or interact with our services. This includes:

• Personal identification information (name, email address, phone number, date of birth)
• Payment information (credit card details processed securely through our payment provider)
• Stay preferences and special requests
• Passport or identification details required for registration
• Communications you send us

We also automatically collect certain information when you visit our website, including IP address, browser type, operating system, referring URLs, and browsing behaviour on our site through cookies and similar technologies.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Process and manage your reservations and provide hotel services
• Communicate with you about your stay, including confirmations, reminders, and updates
• Personalise your experience and remember your preferences for future visits
• Process payments and prevent fraudulent transactions
• Send you marketing communications about our offers, if you have opted in
• Comply with legal obligations, including regulatory and tax requirements
• Improve our website, services, and overall guest experience
• Respond to your enquiries and provide customer support`,
  },
  {
    title: '3. Sharing of Information',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers who assist in our operations (payment processors, IT support, marketing platforms) under strict confidentiality agreements
• Our affiliated properties and hotel group, where applicable, to provide seamless service
• Legal authorities when required by law, court order, or to protect the safety of our guests and staff
• Business partners when you have explicitly consented to such sharing

Any third party receiving your data is required to maintain its confidentiality and may only use it for the specific purpose for which it was shared.`,
  },
  {
    title: '4. Data Retention',
    content: `We retain your personal data for as long as necessary to provide our services and fulfil the purposes described in this policy, or as required by law. Reservation records are typically retained for seven years for accounting and legal purposes. Marketing preferences are retained until you withdraw your consent. You may request deletion of your data at any time, subject to legal retention requirements.`,
  },
  {
    title: '5. Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you
• Rectification: Request correction of inaccurate or incomplete data
• Erasure: Request deletion of your personal data where no legal basis for retention exists
• Restriction: Request that we limit the processing of your data
• Portability: Request transfer of your data to another organisation
• Objection: Object to processing based on legitimate interests or for direct marketing

To exercise any of these rights, please contact our Data Protection Officer at privacy@aurum-hotel.com.`,
  },
  {
    title: '6. Security',
    content: `We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '7. Third-Party Links',
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website with a revised "Last Updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact:

EliteStay Hotel — Data Protection Officer
123 EliteStay Luxury, Phnom Penh City, GC 10001
Email: privacy@elitestay-hotel.com
Phone: +855 (097) 123-4567`,
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="bg-stone-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-4">Legal</p>
          <h1 className="font-display text-5xl text-white font-light mb-4">Privacy Policy</h1>
          <p className="text-stone-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <p className="text-stone-600 leading-relaxed text-lg">
            EliteStay Hotel ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our website
            or use our services. Please read this policy carefully.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
          {SECTIONS.map(({ title, content }) => (
            <div key={title} className="scroll-mt-24">
              <h2 className="font-display text-2xl text-stone-900 font-light mb-5 pb-3 border-b border-stone-100">{title}</h2>
              <div className="text-stone-500 leading-relaxed text-sm whitespace-pre-line">{content}</div>
            </div>
          ))}
        </div>
      </section>
        <Footer/>
    </div>
  );
}