import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container px-4 py-8 mx-auto md:py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-blue text-white font-bold">SS</div>
              <span className="text-xl font-bold text-medical-blue">Swasthya Saathi</span>
            </Link>
            <p className="text-sm text-gray-500">
              Connecting healthcare providers and patients with AI-powered insights for better outcomes.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-medical-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-medical-blue">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-medical-blue">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-medical-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-medical-blue">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-medical-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-medical-blue">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-600 hover:text-medical-blue">
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">
                Email: <a href="mailto:info@swasthyasaathi.org" className="hover:text-medical-blue">info@swasthyasaathi.org</a>
              </li>
              <li className="text-gray-600">
                Phone: <a href="tel:+11234567890" className="hover:text-medical-blue">+1 (123) 456-7890</a>
              </li>
              <li className="text-gray-600">
                Address: 123 Medical Ave, Health District, CA 90210
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Swasthya Saathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
