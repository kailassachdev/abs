
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecommendationsSection() {
  const recommendations = [
    {
      title: "Develop a Human-Centric AI Strategy",
      content: "Prioritize employee well-being alongside institutional objectives. Design AI to assist, complement, and enable workers, improving job quality. Co-design tools with employees, gathering feedback to ensure alignment with their needs.",
    },
    {
      title: "Prioritize Transparency, Consent & Training",
      content: "Be transparent about data collection and use. Obtain informed, revocable consent. Provide ongoing, personalized training on AI features to build confidence and foster a culture of continuous learning and upskilling.",
    },
    {
      title: "Cultivate Psychological Safety & Support",
      content: "Integrate AI into a broader strategy of psychological safety and open communication. Encourage discussions about mental health. Model healthy behaviors. Implement HITL for human oversight. Establish cross-functional AI governance.",
    },
  ];

  return (
    <section id="recommendations" className="pt-16">
      <h2 className="section-title">Charting the Course: Strategic Recommendations</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-neutral-700">To effectively leverage AI in mitigating burnout, organizations must adopt a strategic, people-first approach.</p>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="card-custom">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-3">{rec.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700">{rec.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
