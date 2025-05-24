
'use server';
/**
 * @fileOverview An AI agent for detecting burnout risk from communication patterns.
 *
 * - detectBurnoutRisk - A function that handles the burnout risk detection process.
 * - BurnoutRiskInput - The input type for the detectBurnoutRisk function.
 * - BurnoutRiskOutput - The return type for the detectBurnoutRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BurnoutRiskInputSchema = z
  .object({
    emailData: z
      .string()
      .optional()
      .describe('Anonymized email excerpts. Optional if chatData is provided.'),
    chatData: z
      .string()
      .optional()
      .describe('Anonymized chat data. Optional if emailData is provided.'),
  })
  .refine(data => data.emailData || data.chatData, {
    message: 'At least one of emailData or chatData must be provided.',
  });

export type BurnoutRiskInput = z.infer<typeof BurnoutRiskInputSchema>;

const BurnoutRiskOutputSchema = z.object({
  riskLevel: z
    .number()
    .min(0)
    .max(10)
    .describe(
      'A numerical burnout risk score from 0 (no risk) to 10 (extremely high risk).'
    ),
  assessment: z
    .string()
    .describe(
      'A brief textual summary (2-3 sentences) explaining the identified risk level and key contributing factors based on the provided text.'
    ),
});
export type BurnoutRiskOutput = z.infer<typeof BurnoutRiskOutputSchema>;

export async function detectBurnoutRisk(input: BurnoutRiskInput): Promise<BurnoutRiskOutput> {
  return burnoutRiskDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'burnoutRiskPrompt',
  input: {schema: BurnoutRiskInputSchema},
  output: {schema: BurnoutRiskOutputSchema},
  prompt: `You are an expert HR analyst specializing in identifying early signs of employee burnout by analyzing communication patterns.
Based on the provided anonymized email and/or chat data, assess the potential burnout risk.

Consider factors such as:
- Negative sentiment (frustration, cynicism, hopelessness)
- Expressions of exhaustion or feeling overwhelmed
- Increased irritability or impatience
- Social withdrawal or isolation
- Decreased engagement or motivation
- Feelings of ineffectiveness or lack of accomplishment
- Mention of long working hours or inability to disconnect
- Desire for breaks or escape

Input Data:
{{#if emailData}}
Email Data:
{{{emailData}}}
{{/if}}

{{#if chatData}}
Chat Data:
{{{chatData}}}
{{/if}}

Analyze the provided text and determine a burnout risk level.
Provide your analysis in JSON format with two fields:
1. "riskLevel": A numerical score from 0 to 10, where 0 indicates no risk and 10 indicates extremely high risk of burnout.
2. "assessment": A concise explanation (2-3 sentences) justifying the riskLevel, highlighting key indicators observed in the text. Example: "The individual expresses significant frustration and mentions feeling overwhelmed, indicating a high risk (8/10). Consider proactive support."
`,
});

const burnoutRiskDetectionFlow = ai.defineFlow(
  {
    name: 'burnoutRiskDetectionFlow',
    inputSchema: BurnoutRiskInputSchema,
    outputSchema: BurnoutRiskOutputSchema,
  },
  async input => {
    if (!input.emailData && !input.chatData) {
      throw new Error('At least one of emailData or chatData must be provided.');
    }
    const {output} = await prompt(input);
    return output!;
  }
);
