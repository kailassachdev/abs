
"use client";
import { useState } from 'react';
import { diagnoseIssue, IssueDiagnosisInput, IssueDiagnosisOutput } from '@/ai/flows/issue-diagnosis';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export function IssueDiagnosisForm() {
  const [description, setDescription] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<IssueDiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Issue description cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setDiagnosisResult(null);
    try {
      const input: IssueDiagnosisInput = { description };
      const result = await diagnoseIssue(input);
      setDiagnosisResult(result);
      toast({
        title: "Success",
        description: "Issue diagnosed successfully.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast({
        title: "Error",
        description: "Failed to diagnose issue: " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full card-custom mt-4">
      <CardHeader>
        <CardTitle className="text-lg text-teal-custom-700">AI Issue Diagnoser</CardTitle>
        <CardDescription>Describe a computer issue to get an AI-powered diagnosis and suggested solutions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe the computer issue in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          disabled={isLoading}
          className="bg-white"
        />
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Diagnosing...' : 'Diagnose Issue'}
        </Button>
        {diagnosisResult && (
          <div className="mt-4 p-4 border rounded-md bg-amber-100 text-neutral-700 space-y-3">
            <div>
              <h4 className="font-semibold text-teal-custom-700">Diagnosis:</h4>
              <p className="whitespace-pre-wrap">{diagnosisResult.diagnosis}</p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-custom-700">Suggested Solutions:</h4>
              <p className="whitespace-pre-wrap">{diagnosisResult.suggestedSolutions}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
