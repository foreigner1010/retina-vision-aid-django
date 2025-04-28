
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Our Project</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">What is Diabetic Retinopathy?</h2>
              <p className="mb-4">
                Diabetic retinopathy is a diabetes complication that affects the eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). Initially, diabetic retinopathy might cause no symptoms or only mild vision problems, but it can eventually lead to blindness.
              </p>
              <p>
                The condition can develop in anyone who has type 1 or type 2 diabetes. The longer you have diabetes and the less controlled your blood sugar is, the more likely you are to develop this eye complication.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Our Technology</h2>
              <p className="mb-4">
                Our system uses deep learning models trained on thousands of retinal images to detect and classify different stages of diabetic retinopathy. The model analyzes patterns, lesions, and abnormalities in retinal images that are indicative of the disease.
              </p>
              <p className="mb-4">
                The classification system identifies five stages of diabetic retinopathy:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>No DR (Class 0):</strong> No visible signs of diabetic retinopathy</li>
                <li><strong>Mild NPDR (Class 1):</strong> Mild nonproliferative diabetic retinopathy</li>
                <li><strong>Moderate NPDR (Class 2):</strong> Moderate nonproliferative diabetic retinopathy</li>
                <li><strong>Severe NPDR (Class 3):</strong> Severe nonproliferative diabetic retinopathy</li>
                <li><strong>PDR (Class 4):</strong> Proliferative diabetic retinopathy</li>
              </ul>
              <p>
                Our model achieves high accuracy in distinguishing between these classes, providing healthcare professionals with a reliable screening tool.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Research Background</h2>
              <p className="mb-4">
                This project is based on extensive research in the field of computer vision and medical image analysis. Our approach builds upon state-of-the-art deep learning architectures that have been shown to perform well in medical image classification tasks.
              </p>
              <p className="mb-4">
                The system was developed with guidance from ophthalmologists and diabetic care specialists to ensure clinical relevance and utility. The models were trained and validated on diverse datasets to ensure robust performance across different demographics and imaging conditions.
              </p>
              <p>
                For more details about our research methodology and results, please refer to our research paper or contact our team.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Team & Acknowledgments</h2>
              <p className="mb-4">
                This project was developed by a multidisciplinary team of researchers, software engineers, and medical professionals dedicated to improving diabetic care through technology.
              </p>
              <p className="mb-4">
                We would like to acknowledge the contributions of the open-source community, particularly the original work by Arun Prabha K. and others (https://github.com/thealoneprogrammer/diabetic-retinopathy) which provided valuable insights for our implementation.
              </p>
              <p>
                Special thanks to the healthcare institutions that collaborated with us in the validation of this system and the patients who consented to the use of their anonymized data for research purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
