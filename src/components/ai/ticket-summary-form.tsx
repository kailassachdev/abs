
"use client";
import { useState } from 'react';
import { summarizeTicket, SummarizeTicketInput, SummarizeTicketOutput } from '@/ai/flows/ticket-summarization';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export function TicketSummaryForm() {
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState<SummarizeTicketOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Ticket description cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSummary(null);
    try {
      const input: SummarizeTicketInput = { ticketDescription: description };
      const result = await summarizeTicket(input);
      setSummary(result);
      toast({
        title: "Success",
        description: "Ticket summarized successfully.",
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast({
        title: "Error",
        description: "Failed to summarize ticket: " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full card-custom">
      <CardHeader>
        <CardTitle className="text-lg text-teal-custom-700">AI Ticket Summarizer</CardTitle>
        <CardDescription>Enter a ticket description to get an AI-generated summary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste full IT support ticket description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          disabled={isLoading}
          className="bg-white"
        />
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Summarizing...' : 'Summarize Ticket'}
        </Button>
        {summary && (
          <div className="mt-4 p-4 border rounded-md bg-amber-100 text-neutral-700">
            <h4 className="font-semibold text-teal-custom-700">Summary:</h4>
            <p className="whitespace-pre-wrap">{summary.summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
