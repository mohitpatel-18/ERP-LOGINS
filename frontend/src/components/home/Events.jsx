import e1 from '../../assets/e1.jpg';
import e2 from '../../assets/e2.jpg';
import e3 from '../../assets/e3.avif';
const events = [
  {
    id: 1,
    date: "25",
    month: "Feb 2026",
    title:
      "Open Enrollment Orchard School Enrollment Parent Information Meeting",
    description:
      "GV Orchard School Enrollment 2026-27 Parent Information Meeting",
    image: e1,
  },
  {
    id: 2,
    date: "12",
    month: "Jan 2026",
    title:
      "Open Enrollment Orchard School Parent Information Meeting",
    description:
      "GV Orchard School Enrollment 2026-27 Parent Information Meeting",
    image: e2,
  },
  {
    id: 3,
    date: "28",
    month: "Jan 2026",
    title:
      "Open Enrollment Orchard School Parent Information Meeting",
    description:
      "GV Orchard School Enrollment 2026-27 Parent Information Meeting",
    image: e3,
  },
];

export default function EventsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#fff] to-[#fde7ef]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-blue-600">
            Our Events
          </h2>
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-600 hover:text-white transition">
            View All Events
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={event.image}
                  alt="Event"
                  className="w-full h-56 object-cover"
                />

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-3 text-center rounded">
                  <p className="text-2xl font-bold leading-none">
                    {event.date}
                  </p>
                  <p className="text-sm">{event.month}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-blue-600 font-semibold text-lg mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
