// src/ai/flows/wellness-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized wellness recommendations based on user's calendar and wearable data.
 *
 * - getWellnessRecommendations - A function that generates personalized wellness recommendations.
 * - WellnessRecommendationsInput - The input type for the getWellnessRecommendations function.
 * - WellnessRecommendationsOutput - The return type for the getWellnessRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellnessRecommendationsInputSchema = z.object({
  calendarData: z
    .string()
    .describe('User calendar data including events, schedules, and commitments.'),
  wearableData: z
    .string()
    .describe(
      'Wearable data from devices like smartwatches, including activity levels, sleep patterns, and heart rate.'
    ),
});
export type WellnessRecommendationsInput = z.infer<typeof WellnessRecommendationsInputSchema>;

const WellnessRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized wellness recommendations.'),
});
export type WellnessRecommendationsOutput = z.infer<typeof WellnessRecommendationsOutputSchema>;

export async function getWellnessRecommendations(
  input: WellnessRecommendationsInput
): Promise<WellnessRecommendationsOutput> {
  return wellnessRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'wellnessRecommendationsPrompt',
  input: {schema: WellnessRecommendationsInputSchema},
  output: {schema: WellnessRecommendationsOutputSchema},
  prompt: `You are a wellness expert providing personalized wellness recommendations.

  Based on the user's calendar and wearable data, provide actionable recommendations to improve their well-being.

  Calendar Data: {{{calendarData}}}
  Wearable Data: {{{wearableData}}}

  Consider factors such as workload, sleep quality, activity levels, and stress indicators to generate the recommendations.
  Make the recommendations specific and easy to follow.
  Ensure the recommendations are achievable and promote a healthy work-life balance.
  Return the recommendations in a concise, readable format.
  `,
});

const wellnessRecommendationsFlow = ai.defineFlow(
  {
    name: 'wellnessRecommendationsFlow',
    inputSchema: WellnessRecommendationsInputSchema,
    outputSchema: WellnessRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
