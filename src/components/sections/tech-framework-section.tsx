
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TechFrameworkSection() {
  return (
    <section id="tech-framework" className="pt-16">
      <h2 className="section-title">Building the AI Solution: Tech & Human Synergy</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-neutral-700">Effective AI systems for burnout prevention require robust technology and a crucial human element for oversight and ethical application.</p>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="card-custom">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-3">Key AI/ML Components</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-neutral-700">AI leverages machine learning to analyze data and identify early warning signs of stress.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>ML Algorithms:</strong> Logistic Regression, Decision Trees, Random Forests, Gradient Boosting for prediction.</li>
              <li><strong>Natural Language Processing (NLP):</strong> Sentiment analysis of communications (emails, chat, surveys).</li>
              <li><strong>Predictive Analytics:</strong> Identifies at-risk employees, workload trends, anomaly detection.</li>
              <li><strong>Data Sources:</strong> Work trackers, communication platforms, wearables, HR systems, surveys, performance metrics.</li>
              <li><strong>Process:</strong> Data collection, preprocessing, feature engineering, model training & validation, real-time monitoring.</li>
            </ul>
            <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Goal:</strong> Generate actionable intelligence for timely, personalized interventions.</p>
          </CardContent>
        </Card>
        <Card className="card-custom">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-3">The Critical Role of Human-in-the-Loop (HITL) AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-neutral-700">HITL is a collaborative model where humans and AI work together, ensuring ethical and effective application.</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>Human Oversight:</strong> Humans provide oversight for complex scenarios and refine AI learning.</li>
              <li><strong>Quality & Trust:</strong> Corrects AI misinterpretations of tone, context, or nuance.</li>
              <li><strong>Continuous Learning:</strong> Human interventions feed data back to improve AI accuracy.</li>
              <li><strong>Reduced Cognitive Load:</strong> AI handles mundane tasks, freeing humans for high-value work.</li>
              <li><strong>Transparency & Morale:</strong> Promotes trust and views AI as a supportive assistant.</li>
            </ul>
            <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Philosophy:</strong> Leverages human strengths (judgment, empathy) with AI efficiency for optimal outcomes.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
