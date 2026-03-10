import { useState } from 'react';
import { X } from 'lucide-react';
import Footer from '../components/home/Footer';

const CATEGORIES = ['All', 'Rooms', 'Dining', 'Spa', 'Events', 'Exterior'];

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', category: 'Rooms',    caption: 'Grand Deluxe Suite' },
  { src: 'https://yazzcollective.com/wp-content/uploads/2025/04/f0ebebb3thumbnail.jpeg', category: 'Rooms',    caption: 'Grand Deluxe Suite' },
  { src: 'https://contenu.nyc3.digitaloceanspaces.com/journalist/afac67ca-60ef-47ef-947b-b5b17333296e/thumbnail.jpeg', category: 'Rooms',    caption: 'Grand Deluxe Suite' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', category: 'Dining',   caption: 'Aurum Restaurant' },
  { src: 'https://cdn.prod.website-files.com/62a1ad9e66ad7514469f0685/65ca12eaa3f9de8456ba4be5_blog-hero%20image-dining%20experience.jpg', category: 'Dining',   caption: 'Aurum Restaurant' },
  { src: 'https://www.thedailymeal.com/img/gallery/the-best-hotel-restaurant-in-every-state-gallery/0-Hero_Best%20Hotel%20Restaurant_Slide_Edit_2.jpg', category: 'Dining',   caption: 'Aurum Restaurant' },
  { src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', category: 'Spa',      caption: 'Thermal Pool' },
  { src: 'https://hotelchelsea.com/uploads/images/HotelChelsea_ImageTemplate_2391_HC_Spa_301(1).jpg', category: 'Spa',      caption: 'Thermal Pool' },
  { src: 'https://img2.10bestmedia.com/Images/Photos/424118/Acqualina-Spa-at-Acqualina-Resort_54_990x660.jpg?auto=webp&width=3840&quality=75', category: 'Spa',      caption: 'Thermal Pool' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', category: 'Events',   caption: 'Grand Ballroom' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-aogzae0r2k8i63gjl0lhjq1vh/dsc01020-test.jpg?width=1920', category: 'Events',   caption: 'Grand Ballroom' },
  { src: 'https://image-tc.galaxy.tf/wijpeg-3z2pwtfhhxu9k1ctxv7lw38zs/imperial-ballroom.jpg?width=1920', category: 'Events',   caption: 'Grand Ballroom' },
  { src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',    category: 'Exterior', caption: 'Hotel Facade' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', category: 'Rooms',    caption: 'Presidential Suite' },
  { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', category: 'Dining',   caption: 'The Gilded Lounge' },
  { src: 'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2018/12/BANYAN-TREE-MAYAKOBA-RIVIERA-MAYA-MEXICO.jpg?ssl=1', category: 'Spa',      caption: 'Treatment Suite' },
  { src: 'https://www.hilton.com/im/en/KULHIHI/14822791/spa-treatment-session.jpg?impolicy=crop&cw=4500&ch=3000&gravity=NorthWest&xposition=5&yposition=0&rw=768&rh=512', category: 'Spa',      caption: 'Treatment Suite' },
  { src: 'https://www.palacehotel.co.id/wp-content/uploads/2020/05/PHC-Spa-Treatment_cp.jpg', category: 'Spa',      caption: 'Treatment Suite' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', category: 'Events',   caption: 'Evening Gala' },
  { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', category: 'Exterior', caption: 'Rooftop Terrace' },
  { src: 'https://media.istockphoto.com/id/503019528/photo/road-front-of-luxury-building-in-clear-sky-at-night.jpg?s=612x612&w=0&k=20&c=xkjUByXNE5SdMSeYxLqIwweZMg9XZ6xnWEK7ypdeO4I=', category: 'Exterior', caption: 'Rooftop Terrace' },
  { src: 'https://www.americanexpress.com/en-us/travel/discover/photos/100142/1688/1200/lux1488ex-202486-Hotel%20Exterior%20-%20night%20%281%29.jpg', category: 'Exterior', caption: 'Rooftop Terrace' },
  { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', category: 'Rooms',    caption: 'Junior Suite Bathroom' },
  { src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80', category: 'Dining',   caption: 'Soleil Terrace' },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<null | typeof IMAGES[0]>(null);

  const filtered = active === 'All' ? IMAGES : IMAGES.filter(img => img.category === active);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=85"
            alt="Aurum Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-3">Visual Stories</p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            The <em className="text-gold-300">Aurum</em> Gallery
          </h1>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-30 bg-white border-b border-stone-100 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                  active === cat
                    ? 'bg-stone-900 text-white'
                    : 'border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden cursor-pointer aspect-square"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/50 transition-colors duration-300 flex items-end p-4">
                  <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-gold-400 text-[9px] tracking-[0.2em] uppercase mb-1">{img.category}</div>
                    <div className="text-white text-sm font-light">{img.caption}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img
              src={lightbox.src.replace('w=800', 'w=1400')}
              alt={lightbox.caption}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <div className="text-gold-400 text-[10px] tracking-[0.25em] uppercase mb-1">{lightbox.category}</div>
              <div className="text-white font-display text-xl font-light">{lightbox.caption}</div>
            </div>
          </div>
        </div>
      )}
        <Footer/>
    </div>
  );
}