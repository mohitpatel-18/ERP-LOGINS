import { useState } from "react";
import campus1 from "../../assets/campus1.jpg";
import campus2 from "../../assets/campus2.jpg";
import campus3 from "../../assets/campus3.jpg";

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#facc15,_transparent_60%)]"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            We’re here to help you with admissions, academics, and general
            inquiries.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* LEFT INFO */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Feel free to reach out to us for any questions regarding admissions,
              curriculum, or school activities. Our team will respond as soon as
              possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-bold">
                  📍
                </span>
                <p className="text-gray-700">
                  Village, District, State, India
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-bold">
                  📞
                </span>
                <p className="text-gray-700">
                  +91 98765 43210
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-bold">
                  ✉️
                </span>
                <p className="text-gray-700">
                  info@namadavalley.edu.in
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-slate-50 p-10 rounded-2xl shadow-lg border">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">
              Send Us a Message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-slate-900 font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
{/* CAMPUS GALLERY SECTION */}
<section className="py-28 px-6 bg-white">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

    {/* LEFT CONTENT */}
    <div>
      <h2 className="text-4xl font-bold text-slate-800 mb-6">
        How Our Campus Looks
      </h2>

      <p className="text-gray-600 leading-relaxed mb-4">
        Our campus is designed to provide a safe, inspiring, and modern learning
        environment. Every space reflects discipline, creativity, and care for
        students.
      </p>

      <p className="text-gray-600 leading-relaxed">
        Below are some recent glimpses of our school campus, classrooms, and
        surrounding environment that support holistic development.
      </p>
    </div>

    {/* RIGHT OVERLAY IMAGES */}
    <CampusGallery />
  </div>
</section>

      {/* MAP / EXTRA */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            Visit Our Campus
          </h2>
          <p className="text-gray-600 mb-10">
            Experience our environment, infrastructure, and learning culture.
          </p>

          <div className="rounded-2xl overflow-hidden shadow-lg border">
            <iframe
              title="school-location"
              src="https://maps.google.com/maps?q=india&t=&z=5&ie=UTF8&iwloc=&output=embed"
              className="w-full h-96 border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
function CampusGallery() {
  const [activeImage, setActiveImage] = useState(null);

  const images = [campus1, campus2, campus3];

  return (
    <>
      <div className="relative w-full h-[420px]">
        {/* IMAGE 1 */}
        <img
          src={images[0]}
          onClick={() => setActiveImage(images[0])}
          className="absolute top-0 left-0 w-64 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition z-30"
        />

        {/* IMAGE 2 */}
        <img
          src={images[1]}
          onClick={() => setActiveImage(images[1])}
          className="absolute top-24 left-32 w-64 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition z-20"
        />

        {/* IMAGE 3 */}
        <img
          src={images[2]}
          onClick={() => setActiveImage(images[2])}
          className="absolute top-48 left-12 w-64 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition z-10"
        />
      </div>

      {/* POPUP MODAL */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="relative">
            <img
              src={activeImage}
              className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-4 -right-4 bg-yellow-400 text-slate-900 w-10 h-10 rounded-full font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
