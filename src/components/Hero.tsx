
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Early Detection of Diabetic Retinopathy
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Our AI-powered system helps healthcare providers identify signs of diabetic retinopathy 
              from retinal images, enabling early intervention and preventing vision loss.
            </p>
            <div className="space-x-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Screening
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg shadow-xl overflow-hidden border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Eye examination" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-blue-900/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
