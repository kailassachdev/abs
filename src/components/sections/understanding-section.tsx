
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UnderstandingSection() {
  const manifestations = [
    {
      id: "physical",
      title: "Physical Manifestations",
      content: [
        "Constant stress, reduced sleep quality, frequent headaches.",
        "Increased illness, persistent fatigue, muscular tension.",
        "Heart palpitations, gastrointestinal upsets, dermatological disorders.",
        "Long-term risks: cardiovascular disease, musculoskeletal disorders, weakened immune system.",
      ],
    },
    {
      id: "psychological",
      title: "Psychological & Emotional Manifestations",
      content: [
        "Pronounced cynicism, negativism, detachment, alienation.",
        "Discouragement, irritability, pessimism, feeling overwhelmed.",
        "Difficulty concentrating, memory issues, loss of enjoyment.",
        "Lack of fulfillment, questioning abilities, feeling of failure.",
        "Increased risk of depression and anxiety.",
      ],
    },
    {
      id: "behavioral",
      title: "Behavioral Manifestations",
      content: [
        "Reduced performance and productivity, missed deadlines, lower work quality.",
        "Increased absenteeism, disengagement.",
        "Poor interpersonal dynamics, mood swings, social isolation.",
        "Potential turn to substance use as coping.",
      ],
    },
  ];

  return (
    <section id="understanding" className="pt-16">
      <h2 className="section-title">Understanding Burnout: Dimensions & Manifestations</h2>
      <p className="text-center max-w-3xl mx-auto mb-8 text-lg text-neutral-700">Burnout, as recognized by the WHO, is a syndrome from unmanaged chronic workplace stress. It has three core dimensions and manifests physically, psychologically, and behaviorally. Explore these aspects below.</p>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="card-custom">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-2">Core Dimensions of Burnout (WHO)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>Energy Depletion/Exhaustion:</strong> Feeling drained, chronic fatigue, lack of care for work.</li>
              <li><strong>Increased Mental Distance/Cynicism:</strong> Negativism, detachment from one&apos;s job and colleagues.</li>
              <li><strong>Reduced Professional Efficacy:</strong> Sense of ineffectiveness, questioning abilities, lack of accomplishment.</li>
            </ul>
          </CardContent>
        </Card>

        <Accordion type="multiple" className="w-full rounded-lg border border-teal-custom-200 overflow-hidden">
          {manifestations.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="accordion-item-custom">
              <AccordionTrigger className="accordion-button-custom">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="accordion-content-custom">
                <ul className="list-disc list-inside space-y-1 text-neutral-700">
                  {item.content.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6 text-md text-neutral-700 bg-amber-100 p-4 rounded-lg">
          <p><strong>Key Insight:</strong> Burnout often stems from systemic organizational issues, not just individual failings. Addressing the underlying systems is crucial for effective prevention and mitigation.</p>
        </div>
      </div>
    </section>
  );
}
