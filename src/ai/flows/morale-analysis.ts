'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing team morale using NLP sentiment analysis.
 *
 * - analyzeTeamMorale - Analyzes team communication data for morale shifts.
 * - MoraleAnalysisInput - The input type for the analyzeTeamMorale function.
 * - MoraleAnalysisOutput - The return type for the analyzeTeamMorale function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoraleAnalysisInputSchema = z.object({
  communicationData: z
    .string()
    .describe(
      'Team communication data, such as emails, chat logs, or survey responses.  This should be a string.'
    ),
});
export type MoraleAnalysisInput = z.infer<typeof MoraleAnalysisInputSchema>;

const MoraleAnalysisOutputSchema = z.object({
  overallSentiment: z
    .string()
    .describe(
      'Overall sentiment of the team, such as positive, negative, or neutral.'
    ),
  keyThemes: z
    .string()
    .describe(
      'Key themes or topics that are influencing team morale, derived from the communication data.'
    ),
  suggestedActions:
    z.string().describe('Suggested actions for the manager to improve team morale.'),
});
export type MoraleAnalysisOutput = z.infer<typeof MoraleAnalysisOutputSchema>;

export async function analyzeTeamMorale(input: MoraleAnalysisInput): Promise<
  MoraleAnalysisOutput
> {
  return analyzeTeamMoraleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moraleAnalysisPrompt',
  input: {schema: MoraleAnalysisInputSchema},
  output: {schema: MoraleAnalysisOutputSchema},
  prompt: `You are a team morale expert analyzing team communication data to provide insights and suggest actions for the manager.

Analyze the following team communication data to determine the overall sentiment, identify key themes affecting morale, and suggest specific actions the manager can take to improve morale. Focus on actionable insights that the manager can implement immediately.

Communication Data: {{{communicationData}}}

Provide the output in the following JSON format:
{
  "overallSentiment": "Overall sentiment of the team (positive, negative, or neutral)",
  "keyThemes": "Key themes or topics influencing team morale",
  "suggestedActions": "Specific actions for the manager to improve team morale"
}
`,
});

const analyzeTeamMoraleFlow = ai.defineFlow(
  {
    name: 'analyzeTeamMoraleFlow',
    inputSchema: MoraleAnalysisInputSchema,
    outputSchema: MoraleAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
