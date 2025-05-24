'use server';
/**
 * @fileOverview An AI agent for generating a timetable from task descriptions.
 *
 * - generateWorkloadTimetable - A function that handles timetable generation.
 * - WorkloadTimetableInput - The input type for the generateWorkloadTimetable function.
 * - WorkloadTimetableOutput - The return type for the generateWorkloadTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkloadTimetableInputSchema = z.object({
  taskDescription: z.string().describe('A textual description of tasks, deadlines, and any relevant details for scheduling.'),
});
export type WorkloadTimetableInput = z.infer<typeof WorkloadTimetableInputSchema>;

const WorkloadTimetableOutputSchema = z.object({
  timetable: z.string().describe('A structured timetable in a readable format (e.g., markdown table or bullet points with time slots) based on the provided tasks.'),
});
export type WorkloadTimetableOutput = z.infer<typeof WorkloadTimetableOutputSchema>;

export async function generateWorkloadTimetable(input: WorkloadTimetableInput): Promise<WorkloadTimetableOutput> {
  return workloadTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'workloadTimetablePrompt',
  input: {schema: WorkloadTimetableInputSchema},
  output: {schema: WorkloadTimetableOutputSchema},
  prompt: `You are an expert AI assistant specializing in workload management and scheduling.
Based on the following task descriptions, create a prioritized and structured timetable.
Consider task urgency, estimated effort (if inferable), and try to distribute work reasonably throughout a typical work week (Monday-Friday, 9am-5pm, unless specified otherwise in tasks).
If tasks mention specific days or deadlines, incorporate them.
If tasks seem to overlap or exceed reasonable daily capacity, highlight potential conflicts or suggest adjustments.

Present the timetable in a clear, easy-to-read markdown format. For example:

## Monday
- 09:00 - 10:30: Task A (High Priority)
- 10:30 - 11:00: Short Break
- 11:00 - 13:00: Task B
- 13:00 - 14:00: Lunch Break
- 14:00 - 16:00: Task C (Meeting)
- 16:00 - 17:00: Wrap-up & Plan for Tuesday

## Tuesday
... and so on for other days with tasks.

If no specific timeframe is given for tasks, distribute them across a few days or a week. Be realistic about workload.

Task Description:
{{{taskDescription}}}

Generate the timetable now.
`,
});

const workloadTimetableFlow = ai.defineFlow(
  {
    name: 'workloadTimetableFlow',
    inputSchema: WorkloadTimetableInputSchema,
    outputSchema: WorkloadTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
