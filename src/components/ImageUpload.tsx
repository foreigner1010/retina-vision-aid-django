
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string, filePath?: string) => void;
}

const ImageUpload = ({ onImageSelected }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFileSelect = async (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      
      // If user is logged in, upload to Supabase
      if (user) {
        uploadImageToSupabase(file, result);
      } else {
        onImageSelected(file, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadImageToSupabase = async (file: File, localPreview: string) => {
    if (!user) return;
    
    try {
      setIsUploading(true);
      
      // Generate a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('retinal-images')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Save reference in retinal_images table
      const { error: dbError } = await supabase
        .from('retinal_images')
        .insert({
          user_id: user.id,
          file_path: filePath,
          original_filename: file.name,
          metadata: { size: file.size, type: file.type }
        });
        
      if (dbError) {
        throw dbError;
      }
      
      onImageSelected(file, localPreview, filePath);
      toast({
        title: "Image uploaded successfully",
        description: "Your retinal image is ready for analysis"
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your image",
        variant: "destructive"
      });
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div 
        className={`p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragging 
            ? 'bg-primary/10 border-2 border-dashed border-primary' 
            : 'bg-white hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={preview ? undefined : handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />
        
        {preview ? (
          <div className="relative w-full">
            <div className="relative rounded-md overflow-hidden mb-4 mx-auto max-w-md">
              <img src={preview} alt="Upload preview" className="w-full h-auto" />
            </div>
            <div className="flex justify-center">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleRemove}
                className="flex items-center"
                disabled={isUploading}
              >
                <X className="w-4 h-4 mr-2" /> Remove Image
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Retina Image</h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-gray-400 text-center">
              Supported formats: JPEG, PNG, TIFF
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default ImageUpload;
