import { Routes, Route } from "react-router-dom";

import Home from "./components/home/Home.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Erp from "./components/erp/Erp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/erp" element={<Erp />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;

