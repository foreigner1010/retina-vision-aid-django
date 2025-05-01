
import { RetinopathyResult } from "@/components/ResultCard";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// This is a service that classifies retinal images for diabetic retinopathy
// In a real app, this would call a backend AI service
export const classifyRetinopathy = async (
  image: File,
  imagePath?: string
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
  const result = classes[Math.floor(Math.random() * classes.length)];
  
  // If user is logged in and we have an image path, save the result to Supabase
  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData.session?.user && imagePath) {
    try {
      // First, get the image record from the database
      const { data: imageData, error: imageError } = await supabase
        .from('retinal_images')
        .select('id')
        .eq('file_path', imagePath)
        .single();
        
      if (imageError) throw imageError;
      
      // Then save the analysis result
      const { error: insertError } = await supabase
        .from('analysis_results')
        .insert({
          image_id: imageData.id,
          user_id: sessionData.session.user.id,
          class_number: result.class,
          class_name: result.className,
          confidence: result.confidence,
          description: result.description
        });
        
      if (insertError) throw insertError;
      
      console.log('Analysis result saved to Supabase');
    } catch (error) {
      console.error('Error saving analysis result:', error);
    }
  }
  
  return result;
};

// Function to get user's analysis history
export const getUserAnalysisHistory = async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session?.user) return null;
  
  try {
    const { data, error } = await supabase
      .from('analysis_results')
      .select(`
        id,
        class_number,
        class_name,
        confidence,
        description,
        analyzed_at,
        image_id,
        retinal_images (
          file_path,
          original_filename
        )
      `)
      .eq('user_id', sessionData.session.user.id)
      .order('analyzed_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    return null;
  }
};
