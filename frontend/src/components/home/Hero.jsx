import SchoolImage from '../../assets/school.jpg';

export default function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${SchoolImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Namada Valley International School
        </h1>

        <h4 className="text-lg md:text-2xl mb-6 text-gray-200">
          We are a Leading Network of Public Waldorf Schools
        </h4>

        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-lg font-semibold shadow-lg">
          Learn More
        </button>
      </div>
    </section>
  );
}
