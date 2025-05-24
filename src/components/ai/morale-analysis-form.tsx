
"use client";
import { useState } from 'react';
import { analyzeTeamMorale, MoraleAnalysisInput, MoraleAnalysisOutput } from '@/ai/flows/morale-analysis';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export function MoraleAnalysisForm() {
  const [communicationData, setCommunicationData] = useState('');
  const [analysisResult, setAnalysisResult] = useState<MoraleAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!communicationData.trim()) {
      toast({
        title: "Error",
        description: "Communication data cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const input: MoraleAnalysisInput = { communicationData };
      const result = await analyzeTeamMorale(input);
      setAnalysisResult(result);
      toast({
        title: "Success",
        description: "Morale analysis complete.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast({
        title: "Error",
        description: "Failed to analyze morale: " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full card-custom mt-4">
      <CardHeader>
        <CardTitle className="text-lg text-teal-custom-700">AI Morale Analyzer</CardTitle>
        <CardDescription>Enter mock team communication data for an AI-powered morale analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste mock team communication data (e.g., chat logs, email snippets, survey responses)..."
          value={communicationData}
          onChange={(e) => setCommunicationData(e.target.value)}
          rows={5}
          disabled={isLoading}
          className="bg-white"
        />
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Analyzing...' : 'Analyze Morale'}
        </Button>
        {analysisResult && (
          <div className="mt-4 p-4 border rounded-md bg-amber-100 text-neutral-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-custom-700">Overall Sentiment:</h4>
              <p className="whitespace-pre-wrap">{analysisResult.overallSentiment}</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-custom-700">Key Themes:</h4>
              <p className="whitespace-pre-wrap">{analysisResult.keyThemes}</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-custom-700">Suggested Actions:</h4>
              <p className="whitespace-pre-wrap">{analysisResult.suggestedActions}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
