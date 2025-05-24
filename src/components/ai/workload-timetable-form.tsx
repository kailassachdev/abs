'use client';
import { useState } from 'react';
import { generateWorkloadTimetable, WorkloadTimetableInput, WorkloadTimetableOutput } from '@/ai/flows/workload-timetable-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function WorkloadTimetableForm() {
  const [taskDescription, setTaskDescription] = useState('');
  const [timetableResult, setTimetableResult] = useState<WorkloadTimetableOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!taskDescription.trim()) {
      toast({
        title: "Error",
        description: "Task description cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimetableResult(null);
    try {
      const input: WorkloadTimetableInput = { taskDescription };
      const result = await generateWorkloadTimetable(input);
      setTimetableResult(result);
      toast({
        title: "Success",
        description: "Timetable generated successfully.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast({
        title: "Error",
        description: "Failed to generate timetable: " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full card-custom mt-4">
      <CardHeader>
        <CardTitle className="text-lg text-teal-custom-700">AI Timetable Generator</CardTitle>
        <CardDescription>Describe your tasks, and the AI will help generate a sample timetable.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="taskDescription" className="text-neutral-700">Task Description</Label>
          <Textarea
            id="taskDescription"
            placeholder="e.g., Monday: Team meeting at 10am. Project X deadline on Wednesday. Need to prepare presentation for Friday. Call client Y."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={5}
            disabled={isLoading}
            className="bg-white"
          />
        </div>
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Generating Timetable...' : 'Generate Timetable'}
        </Button>
        {timetableResult && (
          <div className="mt-4 p-4 border rounded-md bg-amber-100 text-neutral-700 space-y-3">
            <h4 className="font-semibold text-teal-custom-700">Generated Timetable:</h4>
            {/* Using a simple pre-wrap for now, can be enhanced with markdown parsing later */}
            <pre className="whitespace-pre-wrap font-sans text-sm">{timetableResult.timetable}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
