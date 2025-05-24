// IssueDiagnosis
'use server';
/**
 * @fileOverview An AI agent for diagnosing computer issues.
 *
 * - diagnoseIssue - A function that handles the issue diagnosis process.
 * - IssueDiagnosisInput - The input type for the diagnoseIssue function.
 * - IssueDiagnosisOutput - The return type for the diagnoseIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IssueDiagnosisInputSchema = z.object({
  description: z.string().describe('The description of the computer issue.'),
});
export type IssueDiagnosisInput = z.infer<typeof IssueDiagnosisInputSchema>;

const IssueDiagnosisOutputSchema = z.object({
  diagnosis: z.string().describe('The diagnosis of the computer issue.'),
  suggestedSolutions: z.string().describe('Suggested solutions for the diagnosed issue.'),
});
export type IssueDiagnosisOutput = z.infer<typeof IssueDiagnosisOutputSchema>;

export async function diagnoseIssue(input: IssueDiagnosisInput): Promise<IssueDiagnosisOutput> {
  return diagnoseIssueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'issueDiagnosisPrompt',
  input: {schema: IssueDiagnosisInputSchema},
  output: {schema: IssueDiagnosisOutputSchema},
  prompt: `You are an expert IT support specialist. Based on the user's description of the computer issue, provide a diagnosis and suggest potential solutions.

Description of the issue: {{{description}}}

Diagnosis:
{{diagnosis}}

Suggested Solutions:
{{suggestedSolutions}}`,
});

const diagnoseIssueFlow = ai.defineFlow(
  {
    name: 'diagnoseIssueFlow',
    inputSchema: IssueDiagnosisInputSchema,
    outputSchema: IssueDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
