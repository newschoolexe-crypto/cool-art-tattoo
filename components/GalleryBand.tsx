interface GalleryBandProps {
  images: string[];
}

export default function GalleryBand({ images }: GalleryBandProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-4 bg-brand-black overflow-hidden">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {images.map((url, i) => (
          <div key={i} className="flex-shrink-0 w-48 sm:w-56 lg:w-64 aspect-[3/4] relative overflow-hidden group">
            <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${url})` }} />
          </div>
        ))}
      </div>
    </section>
  );
}
