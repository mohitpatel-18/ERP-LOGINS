
import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#facc15,_transparent_60%)]"></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            About Narmada Valley
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Building strong minds, disciplined character, and future-ready
            individuals through value-based education.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          {[
            ["Our Vision", "Confident, responsible, and future-ready learners."],
            ["Our Mission", "Value-based education through innovation & care."],
            ["Our Values", "Integrity, discipline, respect, excellence."],
          ].map((item, i) => (
            <div
              key={i}
              className="relative group bg-white/70 backdrop-blur-xl border rounded-2xl p-10 shadow-md hover:shadow-2xl transition duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

              <h3 className="text-2xl font-semibold mb-3 text-slate-800">
                {item[0]}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item[1]}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-28 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-slate-800 mb-16">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              ["Experienced Faculty", "Expert educators guiding every student."],
              ["Modern Campus", "Smart classrooms & learning spaces."],
              ["Student-First Approach", "Creativity, confidence & care."],
              ["Safe Environment", "Secure and supportive culture."],
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 border shadow-sm hover:shadow-xl transition hover:-translate-y-2"
              >
                <div className="w-12 h-12 mb-4 mx-auto rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-500 font-bold">
                  {i + 1}
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {item[0]}
                </h3>

                <p className="text-gray-600 text-sm">
                  {item[1]}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
            Our Journey
          </h2>

          <div className="space-y-10">
            {[
              ["Establishment", "Founded with a strong educational vision."],
              ["Growth", "Expanded academics, faculty, and infrastructure."],
              ["Today", "A trusted name shaping young minds."],
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 bg-slate-50 rounded-2xl p-8 border hover:shadow-lg transition"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-bold">
                  {i + 1}
                </span>

                <div>
                  <h4 className="text-lg font-semibold mb-1">
                    {item[0]}
                  </h4>
                  <p className="text-gray-600">
                    {item[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA (UNCHANGED IDEA, UPGRADED LOOK) */}
      <section className="relative py-28 px-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#facc15,_transparent_55%)] opacity-20"></div>

        <div className="relative">
          <h2 className="text-4xl font-bold mb-4">
            Join Us in Shaping the Future
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            An institution built on discipline, excellence, and holistic
            development.
          </p>

          <button className="px-10 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-xl hover:bg-yellow-300 hover:scale-105 transition">
           <Link to="/contact">Contact Us</Link>
          </button>
        </div>
      </section>
    </>
  );
}
