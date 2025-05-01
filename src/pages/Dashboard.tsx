
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUpload from '@/components/ImageUpload';
import ResultCard, { RetinopathyResult } from '@/components/ResultCard';
import { classifyRetinopathy, getUserAnalysisHistory } from '@/services/retinopathyService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Eye, Info, History, Calendar, Database } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const Dashboard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [result, setResult] = useState<RetinopathyResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<any[] | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadAnalysisHistory();
    }
  }, [user]);

  const loadAnalysisHistory = async () => {
    if (!user) return;
    
    setIsLoadingHistory(true);
    try {
      const history = await getUserAnalysisHistory();
      setAnalysisHistory(history);
    } catch (error) {
      console.error("Error loading history:", error);
      toast({
        title: "Failed to load history",
        description: "There was an error loading your analysis history.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleImageSelected = (file: File, preview: string, filePath?: string) => {
    setImageFile(file);
    setImagePreview(preview);
    setImagePath(filePath || null);
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
      const result = await classifyRetinopathy(imageFile, imagePath || undefined);
      setResult(result);
      
      // After analysis, refresh the history if user is logged in
      if (user) {
        loadAnalysisHistory();
      }
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
    setImagePath(null);
    setResult(null);
  };

  const getImageUrl = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('retinal-images')
        .createSignedUrl(filePath, 60);
        
      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
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
          {user && (
            <TabsTrigger value="history" className="flex items-center">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          )}
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
        
        {user && (
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Your Analysis History
                </CardTitle>
                <CardDescription>
                  Review your previous retinal image analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHistory ? (
                  <div className="text-center py-8">Loading your history...</div>
                ) : analysisHistory && analysisHistory.length > 0 ? (
                  <div className="space-y-4">
                    {analysisHistory.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4">
                            <h3 className="font-medium mb-1">{item.class_name}</h3>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {format(new Date(item.analyzed_at), 'PPP')}
                            </div>
                          </div>
                          <div className="p-4 md:col-span-2 bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Confidence: {Math.round(item.confidence * 100)}%</span>
                              <span className="text-sm font-medium">Severity: Level {item.class_number}</span>
                            </div>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No analysis history found. Upload and analyze an image to see your history.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

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
