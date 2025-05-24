
"use client";
import { useState } from 'react';
import { detectBurnoutRisk, BurnoutRiskInput, BurnoutRiskOutput } from '@/ai/flows/burnout-risk-detection';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export function BurnoutRiskDetectorForm() {
  const [emailData, setEmailData] = useState('');
  const [chatData, setChatData] = useState('');
  const [result, setResult] = useState<BurnoutRiskOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!emailData.trim() && !chatData.trim()) {
      toast({
        title: "Error",
        description: "Please provide at least anonymized email data or chat data.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    try {
      const input: BurnoutRiskInput = {};
      if (emailData.trim()) input.emailData = emailData;
      if (chatData.trim()) input.chatData = chatData;
      
      const analysisResult = await detectBurnoutRisk(input);
      setResult(analysisResult);
      toast({
        title: "Success",
        description: "Burnout risk assessment complete.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast({
        title: "Error",
        description: "Failed to detect burnout risk: " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevelColor = (level: number) => {
    if (level >= 7) return "text-destructive";
    if (level >= 4) return "text-accent";
    return "text-primary";
  };

  return (
    <div className="space-y-6">
      <Card className="w-full card-custom">
        <CardHeader>
          <CardTitle className="text-lg text-teal-custom-700">Analyze Communication Patterns</CardTitle>
          <CardDescription>Enter anonymized email and/or chat data to assess potential burnout risk. Provide at least one.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="emailData" className="text-neutral-700">Email Data (anonymized, optional if chat data provided)</Label>
            <Textarea
              id="emailData"
              placeholder="Paste anonymized email excerpts here..."
              value={emailData}
              onChange={(e) => setEmailData(e.target.value)}
              rows={5}
              disabled={isLoading}
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="chatData" className="text-neutral-700">Chat Data (anonymized, optional if email data provided)</Label>
            <Textarea
              id="chatData"
              placeholder="Alex: This can't be sustainable. I feel completely burnt out, but I don't know who to talk to.\nEveryone else seems fine, or at least they pretend to be. Maybe it's just me. Maybe I'm just not cut out for this grind.\n\nAlex: I just want a break. A real break. One where I don't feel guilty for not working. One where I can actually think again."
              value={chatData}
              onChange={(e) => setChatData(e.target.value)}
              rows={5}
              disabled={isLoading}
              className="bg-white"
            />
          </div>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Detecting Risk...' : 'Detect Risk'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="w-full card-custom">
          <CardHeader>
            <CardTitle className="text-lg text-teal-custom-700">Burnout Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-md text-neutral-700">
              Risk Level:{" "}
              <span className={`font-semibold text-xl ${getRiskLevelColor(result.riskLevel)}`}>
                {result.riskLevel}/10
              </span>
            </p>
            <div>
              <h4 className="font-semibold text-neutral-700">Assessment Details:</h4>
              <p className="text-neutral-700 whitespace-pre-wrap">{result.assessment}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
