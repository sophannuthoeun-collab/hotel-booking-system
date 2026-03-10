import Footer from "../components/home/Footer";

const LAST_UPDATED = 'March 10, 2026';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing our website, making a reservation, or using any of our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services. These terms apply to all guests, visitors, and users of EliteStay Hotel's website and services.`,
  },
  {
    title: '2. Reservations & Bookings',
    content: `All reservations are subject to availability and confirmation by EliteStay Hotel. A reservation is only confirmed upon receipt of a written confirmation from us and any required deposit or full payment.

• Guests must be 18 years of age or older to make a reservation
• Valid photo identification is required at check-in
• The number of guests must not exceed the occupancy limits of the booked room
• EliteStay Hotel reserves the right to decline or cancel reservations made in breach of these terms`,
  },
  {
    title: '3. Check-In & Check-Out',
    content: `Standard check-in time is 3:00 PM and check-out time is 12:00 PM (noon). Early check-in and late check-out are subject to availability and may incur additional charges. Guests are responsible for the room and its contents from the time of check-in until check-out. Any damages to hotel property caused by the guest will be charged to the credit card on file.`,
  },
  {
    title: '4. Cancellation & Modification Policy',
    content: `Cancellation policies vary by rate type and are clearly communicated at the time of booking:

• Flexible Rate: Free cancellation up to 48 hours before arrival. Late cancellation or no-show will be charged one night's room rate.
• Semi-Flexible Rate: Free cancellation up to 7 days before arrival. Cancellations within 7 days will be charged 50% of the total stay.
• Non-Refundable Rate: Full payment is charged at booking. No refunds for cancellation, modification, or no-show.

Modifications to reservations are subject to availability and the applicable rate conditions.`,
  },
  {
    title: '5. Payment',
    content: `We accept all major credit cards, debit cards, and bank transfers. A valid credit card is required to guarantee all reservations and will be held for incidentals. Charges for services consumed during your stay will be settled at check-out. EliteStay Hotel uses industry-standard encryption for all payment processing and does not store full card details on its servers.`,
  },
  {
    title: '6. Guest Conduct',
    content: `Guests are expected to conduct themselves in a manner respectful of other guests, staff, and the hotel property. EliteStay Hotel reserves the right to ask any guest to vacate the premises without refund if their behaviour:

• Causes disturbance or discomfort to other guests or staff
• Damages or threatens to damage hotel property
• Violates any applicable laws or regulations
• Breaches any provisions of these Terms of Service`,
  },
  {
    title: '7. Smoking & Pets Policy',
    content: `EliteStay Hotel is a non-smoking property. Smoking is strictly prohibited in all indoor areas, including rooms, corridors, and public spaces. Designated smoking areas are available outside the hotel. A deep-cleaning fee of $350 will be charged to guests who smoke in non-designated areas. Pets are not permitted on the premises, with the exception of registered assistance animals with appropriate documentation.`,
  },
  {
    title: '8. Liability',
    content: `EliteStay Hotel is not liable for any loss, theft, or damage to personal belongings of guests unless directly caused by hotel negligence. Safe deposit boxes are available in all rooms and we strongly encourage guests to use them. Our liability is limited to the extent permitted by applicable law. We are not responsible for any indirect, incidental, or consequential damages arising from your use of our services.`,
  },
  {
    title: '9. Intellectual Property',
    content: `All content on this website, including text, photography, graphics, logos, and software, is the property of EliteStay Hotel and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our express written consent. EliteStay Hotel's name, logo, and trademarks may not be used without prior written authorisation.`,
  },
  {
    title: '10. Governing Law',
    content: `These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which EliteStay Hotel is registered. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction. If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    title: '11. Contact',
    content: `For questions regarding these Terms of Service, please contact:

EliteStay Hotel — Legal Department
123 EliteStay Luxury , Phnom Penh City, GC 10001
Email: hello@elitestay-hotel.com
Phone: +855 (097) 123-4567`,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="bg-stone-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-4">Legal</p>
          <h1 className="font-display text-5xl text-white font-light mb-4">Terms of Service</h1>
          <p className="text-stone-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <p className="text-stone-600 leading-relaxed text-lg">
            Welcome to EliteStay Hotel. These Terms of Service govern your use of our website and your stay at our
            property. By making a reservation or using our services, you agree to these terms in full. Please
            read them carefully before proceeding.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
          {SECTIONS.map(({ title, content }) => (
            <div key={title}>
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