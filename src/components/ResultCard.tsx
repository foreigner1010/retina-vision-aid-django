
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export interface RetinopathyResult {
  class: number;
  className: string;
  confidence: number;
  description: string;
}

interface ResultCardProps {
  result: RetinopathyResult | null;
  isLoading: boolean;
}

const severityColorMap: Record<number, string> = {
  0: "bg-green-500",
  1: "bg-yellow-500",
  2: "bg-orange-500",
  3: "bg-red-500",
  4: "bg-red-700",
};

const ResultCard = ({ result, isLoading }: ResultCardProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setProgress(Math.min(progress + Math.random() * 15, 90));
      }, 300);
      return () => clearTimeout(timer);
    } else if (result) {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [isLoading, progress, result]);

  if (!isLoading && !result) {
    return null;
  }

  return (
    <Card className="fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          {isLoading ? (
            <AlertCircle className="mr-2 h-5 w-5 text-yellow-500 animate-pulse" />
          ) : (
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
          )}
          {isLoading ? "Analyzing Image..." : "Analysis Results"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Our AI model is analyzing the retinal image. This will only take a moment...
            </p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Diagnosis:</p>
                <h3 className="text-xl font-bold">{result.className}</h3>
              </div>
              <div className="text-right">
                <p className="font-medium">Confidence:</p>
                <p className="text-xl font-bold">{Math.round(result.confidence * 100)}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Severity Level:</span>
                <span className="font-medium">Level {result.class}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${severityColorMap[result.class] || "bg-gray-500"}`}
                  style={{ width: `${((result.class + 1) / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-3 rounded-md">
              <p className="text-sm">{result.description}</p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
