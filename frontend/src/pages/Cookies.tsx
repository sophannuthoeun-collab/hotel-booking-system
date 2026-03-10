import { useState } from 'react';
import Footer from '../components/home/Footer';

const LAST_UPDATED = 'January 15, 2025';

const COOKIE_TYPES = [
  {
    name: 'Strictly Necessary',
    required: true,
    desc: 'These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions you take such as logging in, making a reservation, or filling in forms.',
    examples: ['Session management', 'Authentication tokens', 'Security cookies', 'Load balancing'],
  },
  {
    name: 'Performance & Analytics',
    required: false,
    desc: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our website. They help us understand which pages are most popular and how visitors navigate the site.',
    examples: ['Google Analytics', 'Page view tracking', 'Error reporting', 'A/B testing'],
  },
  {
    name: 'Functional',
    required: false,
    desc: 'These cookies enable enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages, such as live chat or video content.',
    examples: ['Language preferences', 'Currency settings', 'Chat widgets', 'Saved room preferences'],
  },
  {
    name: 'Marketing & Targeting',
    required: false,
    desc: 'These cookies may be set by our advertising partners to build a profile of your interests and show you relevant adverts on other websites. They do not directly store personal information.',
    examples: ['Retargeting pixels', 'Social media integrations', 'Conversion tracking', 'Interest-based ads'],
  },
];

const SECTIONS = [
  {
    title: 'What Are Cookies?',
    content: `Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and give website owners useful information about how their site is being used.

Cookies do not contain personally identifiable information on their own, though they may be linked to such information if you have provided it to us elsewhere. Most web browsers allow some control over cookies through the browser settings.`,
  },
  {
    title: 'How We Use Cookies',
    content: `Aurum Hotel uses cookies and similar tracking technologies to:

• Keep you logged in to your account during your session
• Remember your preferences such as language, currency, and search filters
• Analyse how visitors use our website so we can improve it
• Understand which marketing campaigns are effective
• Personalise content and offers based on your browsing history
• Enable social sharing functionality

We do not use cookies to collect sensitive personal information or sell your data to third parties.`,
  },
  {
    title: 'Third-Party Cookies',
    content: `Some cookies on our website are set by third-party services, including analytics providers (Google Analytics), social media platforms (Facebook, Instagram), and advertising networks. These third parties have their own privacy policies and we recommend reviewing them directly. We do not control third-party cookies and cannot be held responsible for their use.`,
  },
  {
    title: 'Managing Your Cookie Preferences',
    content: `You can control and manage cookies in several ways:

Browser Settings: Most browsers allow you to refuse or delete cookies through their settings menu. Note that disabling cookies may affect the functionality of our website.

Our Cookie Banner: When you first visit our website, you will be presented with a cookie consent banner allowing you to accept all cookies or customise your preferences by category.

Opt-Out Tools: You can opt out of Google Analytics by installing the Google Analytics Opt-Out Browser Add-on. For advertising cookies, you can use the Digital Advertising Alliance's opt-out tool.`,
  },
  {
    title: 'Cookie Retention',
    content: `The length of time a cookie remains on your device depends on its type. Session cookies are temporary and expire when you close your browser. Persistent cookies remain on your device for a set period — typically between 30 days and 2 years — unless you delete them manually. We regularly review and update the cookies we use to ensure they remain necessary and proportionate.`,
  },
  {
    title: 'Updates to This Policy',
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. When we make material changes, we will update the "Last Updated" date at the top of this page and, where appropriate, notify you via email or a notice on our website.`,
  },
  {
    title: 'Contact',
    content: `If you have questions about our use of cookies or this policy, please contact us at:

Aurum Hotel — Privacy Team
123 Luxury Avenue, Grand City, GC 10001
Email: privacy@aurum-hotel.com`,
  },
];

export default function Cookies() {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    'Performance & Analytics': true,
    'Functional': true,
    'Marketing & Targeting': false,
  });

  const toggle = (name: string) => {
    setPreferences(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <section className="bg-stone-950 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-4">Legal</p>
          <h1 className="font-display text-5xl text-white font-light mb-4">Cookie Policy</h1>
          <p className="text-stone-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <p className="text-stone-600 leading-relaxed text-lg">
            This Cookie Policy explains how Aurum Hotel uses cookies and similar tracking technologies on our
            website. It describes what cookies are, which ones we use, why we use them, and how you can manage
            your preferences.
          </p>
        </div>
      </section>

      {/* Cookie Preferences Panel */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl text-stone-900 font-light mb-3">Manage Your Preferences</h2>
          <p className="text-stone-500 text-sm mb-8">Customise which cookies you consent to below. Strictly necessary cookies cannot be disabled.</p>
          <div className="space-y-4">
            {COOKIE_TYPES.map(({ name, required, desc, examples }) => (
              <div key={name} className="bg-white border border-stone-100 p-6">
                <div className="flex items-start justify-between gap-6 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-stone-900">{name}</h3>
                      {required && (
                        <span className="text-[9px] tracking-[0.2em] uppercase bg-stone-100 text-stone-500 px-2 py-0.5">Required</span>
                      )}
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => !required && toggle(name)}
                    disabled={required}
                    style={{ flexShrink: 0, width: 48, height: 26, borderRadius: 999, position: 'relative', transition: 'background 0.2s',
                      background: required || preferences[name] ? '#B8973A' : '#D6D3D1',
                      opacity: required ? 0.7 : 1,
                      cursor: required ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: 3,
                        left: required || preferences[name] ? 25 : 3,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'left 0.2s',
                      }}
                    />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {examples.map(ex => (
                    <span key={ex} className="text-[10px] tracking-[0.1em] text-stone-400 border border-stone-100 px-2 py-1">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <button className="bg-gold-500 hover:bg-gold-400 text-stone-900 px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200">
              Save Preferences
            </button>
            <button
              onClick={() => setPreferences({ 'Performance & Analytics': true, 'Functional': true, 'Marketing & Targeting': true })}
              className="border border-stone-300 text-stone-600 hover:border-stone-500 px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200"
            >
              Accept All
            </button>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
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