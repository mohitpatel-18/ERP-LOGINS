import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import school1 from "../../assets/school1.webp";
import school2 from "../../assets/school2.webp";
import school3 from "../../assets/school3.webp";

const images = [school1, school2, school3];

export default function ExploreSchools() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-12">
        Explore Our Schools
      </h2>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-6 px-4">

        {/* Left image */}
        <div className="hidden md:block w-1/4 rounded-xl overflow-hidden opacity-80">
          <img
            src={images[(current - 1 + images.length) % images.length]}
            className="w-full h-[350px] object-cover"
            alt="Previous"
          />
        </div>

        {/* Center image */}
        <div className="relative w-full md:w-1/2 rounded-xl overflow-hidden shadow-xl">
          <img
            src={images[current]}
            className="w-full h-[420px] object-cover"
            alt="Current"
          />

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Right image */}
        <div className="hidden md:block w-1/4 rounded-xl overflow-hidden opacity-80">
          <img
            src={images[(current + 1) % images.length]}
            className="w-full h-[350px] object-cover"
            alt="Next"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
