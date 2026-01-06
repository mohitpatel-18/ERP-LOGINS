
import childrenimg from '../../assets/children.jpg';
export default function Detail() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Background watercolor effect (optional) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
           Building Strong Foundations
           <br /> for Lifelong Learning
          </h1>

          <h3 className="mt-4 text-lg font-semibold text-blue-600">
           Narmada Valley Internation School
          </h3>

          <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
            Welcome to our school community, sharing a public Waldorf
            education experience. Our focus is on holistic learning,
            creativity, and child‑centered growth in a nurturing
            environment.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
              ENROLL NOW
            </button>

            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE / VIDEO CARD */}
        <div className="relative flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl w-full max-w-md">
            
            {/* 👉 Replace src with your own image */}
            <img
              src={childrenimg}
              alt="children image"
              className="w-full h-full object-cover"
            />

            {/* Play button (optional) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                <svg
                  className="w-6 h-6 text-blue-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
