
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InfoSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">About Diabetic Retinopathy</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Diabetic Retinopathy?</AccordionTrigger>
                  <AccordionContent>
                    Diabetic retinopathy is a diabetes complication that affects the eyes. It's caused by damage to the blood vessels in the retina (the light-sensitive tissue at the back of the eye). At first, diabetic retinopathy may cause no symptoms or only mild vision problems. Eventually, it can cause blindness.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the Stages of Diabetic Retinopathy?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>No DR (Class 0):</strong> No visible signs of diabetic retinopathy.</li>
                      <li><strong>Mild NPDR (Class 1):</strong> Mild nonproliferative diabetic retinopathy with microaneurysms.</li>
                      <li><strong>Moderate NPDR (Class 2):</strong> More microaneurysms, dot and blot hemorrhages, and hard exudates.</li>
                      <li><strong>Severe NPDR (Class 3):</strong> Many microaneurysms, hemorrhages, and venous beading.</li>
                      <li><strong>PDR (Class 4):</strong> Proliferative diabetic retinopathy with neovascularization and potential retinal detachment.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Why is Early Detection Important?</AccordionTrigger>
                  <AccordionContent>
                    Early detection is critical because diabetic retinopathy often has no symptoms in its early stages. By the time vision is affected, the disease may be severe. Regular screening can help detect the condition early, when treatment is most effective. Treatment can slow or stop the progression of diabetic retinopathy and reduce the risk of vision loss.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How Does Our System Work?</AccordionTrigger>
                  <AccordionContent>
                    Our system uses deep learning algorithms trained on thousands of retinal images to detect and classify diabetic retinopathy. The AI model analyzes patterns, lesions, and abnormalities in retinal images that are indicative of different stages of the disease. The system provides a classification result along with a confidence score to assist healthcare providers in diagnosis.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-3">Risk Factors</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Duration of diabetes</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Poor control of blood sugar levels</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Hypertension</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>High cholesterol</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Pregnancy</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span>Tobacco use</span>
                </li>
              </ul>
              
              <div className="border-t mt-4 pt-4">
                <h3 className="font-semibold text-lg mb-3">Recommended Screening</h3>
                <p className="text-sm">People with type 1 diabetes should have a comprehensive dilated eye exam within 5 years of diagnosis. People with type 2 diabetes should have an exam at the time of diagnosis. All diabetic patients should have yearly eye exams thereafter.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
