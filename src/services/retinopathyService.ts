
import { RetinopathyResult } from "@/components/ResultCard";

// This is a mock service that simulates the classification process
// In a real app, this would call a backend API
export const classifyRetinopathy = async (
  image: File
): Promise<RetinopathyResult> => {
  // Simulate API request delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // For demo purposes, let's simulate a random classification result
  // In a real application, you would send the image to your Django backend
  const classes = [
    {
      class: 0,
      className: "No Diabetic Retinopathy",
      confidence: 0.92,
      description:
        "No signs of diabetic retinopathy detected. Regular annual screening is recommended to monitor for any changes.",
    },
    {
      class: 1,
      className: "Mild NPDR",
      confidence: 0.85,
      description:
        "Mild Nonproliferative Diabetic Retinopathy detected. Characterized by small areas of balloon-like swelling in the retina's tiny blood vessels. Follow-up examination in 9-12 months is recommended.",
    },
    {
      class: 2,
      className: "Moderate NPDR",
      confidence: 0.78,
      description:
        "Moderate Nonproliferative Diabetic Retinopathy detected. As the disease progresses, blood vessels nourishing the retina may swell and distort, potentially losing their ability to transport blood. Follow-up with a specialist within 6 months is recommended.",
    },
    {
      class: 3,
      className: "Severe NPDR",
      confidence: 0.88,
      description:
        "Severe Nonproliferative Diabetic Retinopathy detected. Many more blood vessels are blocked, depriving areas of the retina of blood supply. These areas secrete growth factors that signal the retina to grow new blood vessels. Prompt consultation with a retinal specialist is highly recommended.",
    },
    {
      class: 4,
      className: "Proliferative DR",
      confidence: 0.95,
      description:
        "Proliferative Diabetic Retinopathy detected. This advanced stage is characterized by the growth of new abnormal blood vessels in the retina. These vessels can leak, causing severe vision problems and blindness. Immediate referral to an ophthalmologist is required.",
    },
  ];

  // Select a random classification result from our predefined array
  // This is just for demo purposes
  return classes[Math.floor(Math.random() * classes.length)];
};
