import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import pic from '../../assets/pic.jpg';
export default function Social() {
  return (
    <section className="relative bg-[#e9eef1] py-20 overflow-hidden">
      
      {/* Cloud background */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-32 bg-white rounded-t-[100%]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold text-blue-600 mb-6 leading-snug">
            Follow us on Social Media to <br /> See Our Daily Impact
          </h2>

          <p className="text-blue-600 mb-6">
            Find our latest updates on Facebook or Instagram
          </p>

          <p className="text-gray-700 mb-4">Follow Us:</p>

          <div className="flex items-center gap-6 text-blue-600 text-3xl">
            <a href="#" className="hover:text-blue-800 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-800 transition">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-blue-800 transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT – FACEBOOK EMBED */}
        <div >
        <img src={pic} alt=""  className=" w-full h-1/2"/>
        </div>

      </div>
    </section>
  );
}
