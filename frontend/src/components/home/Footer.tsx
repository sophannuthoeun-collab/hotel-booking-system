import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Rooms & Suites', to: '/rooms' },
  { label: 'Dining',         to: '/dining' },
  { label: 'Spa & Wellness', to: '/spa' },
  { label: 'Events',         to: '/events' },
  { label: 'Gallery',        to: '/gallery' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',  to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Cookie Policy',   to: '/cookies' },
];

function ScrollLink({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <ScrollLink to="/" className="inline-block">
              <div className="font-display text-3xl text-white font-light tracking-[0.2em] mb-1 hover:text-gold-300 transition-colors">EliteStay</div>
              <div className="text-gold-500 text-[10px] tracking-[0.35em] uppercase mb-6">LUXURY HOTEL</div>
            </ScrollLink>
            <p className="text-sm leading-relaxed max-w-xs">
              A sanctuary of refined luxury nestled in the heart of the city,
              where impeccable service meets timeless elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ label, to }) => (
                <ScrollLink
                  key={to}
                  to={to}
                  className="text-sm hover:text-gold-400 transition-colors"
                >
                  {label}
                </ScrollLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <ScrollLink to="/contact" className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors">
                <MapPin size={14} className="text-gold-500 flex-shrink-0" />
                123 EliteStay, Phnom Penh City
              </ScrollLink>
              <a href="tel:+18002878601" className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors">
                <Phone size={14} className="text-gold-500 flex-shrink-0" />
                +855 (097) 123-4567
              </a>
              <a href="mailto:hello@elitestay-hotel.com" className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors">
                <Mail size={14} className="text-gold-500 flex-shrink-0" />
                hello@elitestay-hotel.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-wide">© 2026 EliteStay Hotel. All rights reserved.</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map(({ label, to }) => (
              <ScrollLink
                key={to}
                to={to}
                className="text-xs hover:text-gold-400 transition-colors"
              >
                {label}
              </ScrollLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}