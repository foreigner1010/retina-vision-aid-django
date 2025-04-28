
import FeatureCard from './FeatureCard';
import { Eye, Clock, Database, BarChart3 } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our system provides a comprehensive solution for diabetic retinopathy screening and diagnosis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={Eye}
            title="Accurate Detection"
            description="State-of-the-art AI algorithms accurately classify the stage of diabetic retinopathy"
          />
          <FeatureCard 
            icon={Clock}
            title="Rapid Results"
            description="Get analysis results in seconds, enabling quicker medical decisions"
          />
          <FeatureCard 
            icon={Database}
            title="Secure Storage"
            description="Patient data and images are stored securely with strict privacy controls"
          />
          <FeatureCard 
            icon={BarChart3}
            title="Detailed Reports"
            description="Comprehensive reports with visualization tools to track progression"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
