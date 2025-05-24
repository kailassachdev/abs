
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketSummaryForm } from "@/components/ai/ticket-summary-form";
import { IssueDiagnosisForm } from "@/components/ai/issue-diagnosis-form";
import { WellnessRecommendationsForm } from "@/components/ai/wellness-recommendations-form";
import { MoraleAnalysisForm } from "@/components/ai/morale-analysis-form";
import { BurnoutRiskDetectorForm } from "@/components/ai/burnout-risk-detector-form";

export function AiSolutionsSection() {
  const tabButtonStyle = "tab-button-custom";
  const activeTabButtonStyle = "tab-button-custom active";

  return (
    <section id="ai-solutions" className="pt-16">
      <h2 className="section-title">AI to the Rescue: Strategic Solutions</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-neutral-700">Artificial Intelligence offers transformative opportunities to alleviate core stressors, enhance well-being, and foster a more sustainable IT workforce. Explore various AI applications below.</p>
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="automation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-0 border-b-0 p-0 bg-transparent rounded-none">
            <TabsTrigger value="automation" className={`${tabButtonStyle} data-[state=active]:${activeTabButtonStyle}`}>Task Automation</TabsTrigger>
            <TabsTrigger value="workload" className={`${tabButtonStyle} data-[state=active]:${activeTabButtonStyle}`}>Workload Management</TabsTrigger>
            <TabsTrigger value="wellbeing" className={`${tabButtonStyle} data-[state=active]:${activeTabButtonStyle}`}>Well-being Support</TabsTrigger>
            <TabsTrigger value="it-ops" className={`${tabButtonStyle} data-[state=active]:${activeTabButtonStyle}`}>Specialized IT Ops</TabsTrigger>
            <TabsTrigger value="burnout-detector" className={`${tabButtonStyle} data-[state=active]:${activeTabButtonStyle}`}>Burnout Detector</TabsTrigger>
          </TabsList>

          <TabsContent value="automation" className="tab-content-custom">
            <h3 className="text-xl font-semibold text-teal-custom-700 mb-3">Automating Repetitive and Mundane Tasks</h3>
            <p className="mb-2 text-neutral-700">AI can automate time-consuming, low-value tasks, freeing professionals for strategic and creative work.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>Customer Service:</strong> AI chatbots handle FAQs, order tracking.</li>
              <li><strong>Back-Office:</strong> AI for data entry, document processing.</li>
              <li><strong>HR:</strong> AI copilots for onboarding, scheduling training, benefits Q&A.</li>
              <li><strong>IT Support:</strong> Automating password resets, access permissions. Includes AI-powered ticket summaries and issue diagnosis.</li>
              <li><strong>Project Management:</strong> Scheduling meetings, reminders, progress tracking, draft generation.</li>
            </ul>
            <div className="mt-4 space-y-4">
              <TicketSummaryForm />
              <IssueDiagnosisForm />
            </div>
            <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Benefit:</strong> Reduces mental burden, preserves energy for complex problem-solving and innovation.</p>
          </TabsContent>

          <TabsContent value="workload" className="tab-content-custom">
            <h3 className="text-xl font-semibold text-teal-custom-700 mb-3">Intelligent Workload Management & Optimization</h3>
            <p className="mb-2 text-neutral-700">AI analyzes workloads, deadlines, and performance to suggest optimal task allocation and prevent overload.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>Predictive Workload Optimization:</strong> ML forecasts demands, distributes tasks based on capacity.</li>
              <li><strong>AI Scheduling Assistants (e.g., Clockwise, Reclaim.ai):</strong> Optimize calendars, protect focus time, reduce context-switching.</li>
              <li><strong>Managerial Insights:</strong> Aggregated, anonymized data on team workload and stress patterns.</li>
              <li><strong>Risk Prediction:</strong> AI algorithms predict peak workloads and burnout risks, suggesting resource allocation.</li>
            </ul>
            <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Benefit:</strong> Shifts from reactive firefighting to proactive prevention, ensuring balanced workloads.</p>
          </TabsContent>

          <TabsContent value="wellbeing" className="tab-content-custom">
            <h3 className="text-xl font-semibold text-teal-custom-700 mb-3">Enhancing Employee Well-being & Mental Health Support</h3>
            <p className="mb-2 text-neutral-700">AI offers personalized, timely interventions and support for mental health.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>Personalized Wellness Recommendations:</strong> AI analyzes data (wearables, calendars) for suggestions on breaks, meditation.</li>
              <li><strong>Mental Health Chatbots (e.g., Woebot, Wysa):</strong> 24/7 support using CBT techniques, reducing stigma.</li>
              <li><strong>Sentiment Analysis:</strong> NLP analyzes communications (emails, chat) for morale shifts (with privacy controls).</li>
              <li><strong>Feedback & Recognition:</strong> AI facilitates regular feedback and achievement recognition.</li>
              <li><strong>AI-Enhanced Learning:</strong> Personalized career development paths and training.</li>
            </ul>
            <div className="mt-4 space-y-4">
              <WellnessRecommendationsForm />
              <MoraleAnalysisForm />
            </div>
            <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Benefit:</strong> Hyper-personalized, proactive support tailored to individual needs, increasing engagement and effectiveness.</p>
          </TabsContent>

          <TabsContent value="it-ops" className="tab-content-custom">
            <h3 className="text-xl font-semibold text-teal-custom-700 mb-3">AI in Specialized IT Operations</h3>
            <p className="mb-2 text-neutral-700">AI mitigates alert fatigue and cybersecurity fatigue, enhancing operational resilience.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>AIOps:</strong> ML identifies root causes, manages alerts (removes duplicates, false positives), detects anomalies.</li>
              <li><strong>Faster Resolution (MTTR):</strong> AIOps automates incident response (restarting services, scaling resources).</li>
              <li><strong>Security Operations Centers (SOCs):</strong> AI-powered tools triage alerts, categorize threats, automate responses for false positives.</li>
            </ul>
             <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Benefit:</strong> Enhances IT infrastructure resilience and security, reduces operational costs, and allows focus on high-impact threats.</p>
          </TabsContent>
          
          <TabsContent value="burnout-detector" className="tab-content-custom">
            <h3 className="text-xl font-semibold text-teal-custom-700 mb-3">AI-Powered Burnout Risk Detector</h3>
            <p className="mb-4 text-neutral-700">Analyze anonymized communication patterns (emails, chats) to assess potential burnout risk within a team or for an individual. This tool helps identify early warning signs based on language cues.</p>
            <BurnoutRiskDetectorForm />
            <p className="mt-6 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg">
              <strong>Benefit:</strong> Proactively identify individuals or teams at risk of burnout, enabling timely interventions and support strategies. Helps in fostering a healthier work environment.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
