export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* School Info */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            Namada Valley International School
          </h2>
          <p className="text-sm leading-relaxed">
            Providing quality education with strong values and holistic
            development for every student.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Admissions</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Academics */}
        <div>
          <h3 className="text-white font-semibold mb-4">Academics</h3>
          <ul className="space-y-2 text-sm">
            <li>Primary School</li>
            <li>Middle School</li>
            <li>High School</li>
            <li>Student Activities</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Village, District, State</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ info@namadavalley.edu.in</li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} Namada Valley International School.  
        All Rights Reserved.
      </div>
    </footer>
  );
}
