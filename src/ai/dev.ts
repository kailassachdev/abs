
import { config } from 'dotenv';
config();

import '@/ai/flows/ticket-summarization.ts';
import '@/ai/flows/issue-diagnosis.ts';
import '@/ai/flows/morale-analysis.ts';
import '@/ai/flows/wellness-recommendations.ts';
import '@/ai/flows/burnout-risk-detection.ts';
import '@/ai/flows/workload-timetable-flow.ts';
