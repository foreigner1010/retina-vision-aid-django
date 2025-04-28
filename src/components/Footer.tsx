
import { Eye } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Eye className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold text-gray-900">RetinaVision</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} RetinaVision. Diabetic Retinopathy Detection System
          </div>
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-primary">Terms</a>
              <a href="#" className="text-gray-500 hover:text-primary">Contact</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
