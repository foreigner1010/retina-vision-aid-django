
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from '@/components/ImageUpload';
import ResultCard, { RetinopathyResult } from '@/components/ResultCard';
import { classifyRetinopathy } from '@/services/retinopathyService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Eye, Info } from 'lucide-react';

const Dashboard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<RetinopathyResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = (file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload a retinal image to analyze",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await classifyRetinopathy(imageFile);
      setResult(result);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the image. Please try again.",
        variant: "destructive",
      });
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Diabetic Retinopathy Screening</h1>
        <p className="text-gray-600">
          Upload a retinal image to analyze for signs of diabetic retinopathy
        </p>
      </div>

      <Tabs defaultValue="analyze" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analyze" className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Analyze Image
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Guidelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ImageUpload onImageSelected={handleImageSelected} />
              
              {imageFile && (
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="flex-1"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <ResultCard result={result} isLoading={isAnalyzing} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Image Guidelines</CardTitle>
              <CardDescription>
                For accurate results, please ensure your retinal images meet these criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Image Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full retinal fundus images (not partial views)</li>
                  <li>Good focus and clarity</li>
                  <li>Proper illumination (not too dark or too bright)</li>
                  <li>Minimal or no flash artifacts</li>
                  <li>Image centered on the macula or optic disc</li>
                  <li>JPEG, PNG or TIFF format</li>
                  <li>Resolution of at least 1500 x 1500 pixels recommended</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Tips for Good Quality Images:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use a mydriatic or non-mydriatic fundus camera</li>
                  <li>Ensure proper dilation of the pupil</li>
                  <li>Minimize patient movement during capture</li>
                  <li>Clean the camera lens before capturing</li>
                  <li>Position the camera at the correct working distance</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Important Note:</strong> This tool is designed to assist healthcare professionals in screening for diabetic retinopathy. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
