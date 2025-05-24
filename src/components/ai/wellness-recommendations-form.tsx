
"use client";
import { useState } from 'react';
import { getWellnessRecommendations, WellnessRecommendationsInput, WellnessRecommendationsOutput } from '@/ai/flows/wellness-recommendations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';

export function WellnessRecommendationsForm() {
  const [calendarData, setCalendarData] = useState('');
  const [wearableData, setWearableData] = useState('');
  const [recommendations, setRecommendations] = useState<WellnessRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!calendarData.trim() || !wearableData.trim()) {
      toast({
        title: "Error",
        description: "Calendar and wearable data cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setRecommendations(null);
    try {
      const input: WellnessRecommendationsInput = { calendarData, wearableData };
      const result = await getWellnessRecommendations(input);
      setRecommendations(result);
      toast({
        title: "Success",
        description: "Wellness recommendations generated.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast({
        title: "Error",
        description: "Failed to get recommendations: " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full card-custom mt-4">
      <CardHeader>
        <CardTitle className="text-lg text-teal-custom-700">AI Wellness Advisor</CardTitle>
        <CardDescription>Enter mock calendar and wearable data for personalized wellness tips.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="calendarData" className="text-neutral-700">Mock Calendar Data (e.g., "Meetings all day, project deadline Friday")</Label>
          <Textarea
            id="calendarData"
            placeholder="Meetings all day, project deadline Friday..."
            value={calendarData}
            onChange={(e) => setCalendarData(e.target.value)}
            rows={3}
            disabled={isLoading}
            className="bg-white"
          />
        </div>
        <div>
          <Label htmlFor="wearableData" className="text-neutral-700">Mock Wearable Data (e.g., "Average sleep 6 hours, high stress levels")</Label>
          <Textarea
            id="wearableData"
            placeholder="Average sleep 6 hours, high stress levels..."
            value={wearableData}
            onChange={(e) => setWearableData(e.target.value)}
            rows={3}
            disabled={isLoading}
            className="bg-white"
          />
        </div>
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Generating...' : 'Get Recommendations'}
        </Button>
        {recommendations && (
          <div className="mt-4 p-4 border rounded-md bg-amber-100 text-neutral-700">
            <h4 className="font-semibold text-teal-custom-700">Recommendations:</h4>
            <p className="whitespace-pre-wrap">{recommendations.recommendations}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
