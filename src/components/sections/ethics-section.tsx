
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function EthicsSection() {
  const ethicalConsiderations = [
    {
      id: "privacy",
      title: "Privacy, Data Security & Surveillance",
      description: "AI well-being tools analyze personal data, raising significant privacy concerns. Fear of surveillance can undermine trust.",
      bestPractices: [
        "Transparency: Inform employees about data collection, use, and access.",
        "Consent: Obtain explicit, informed consent (opt-in/out options).",
        "Data Security: Robust protection, compliance (GDPR, HIPAA), anonymization.",
        "Privacy-Preserving AI: Techniques like differential privacy, data masking.",
      ],
      corePrinciple: "Privacy is the ethical cornerstone for employee acceptance and program success.",
    },
    {
      id: "bias",
      title: "Mitigating AI Bias & Ensuring Fairness",
      description: "AI systems trained on biased historical data can perpetuate discrimination and unfair outcomes.",
      bestPractices: [
        "Bias Assessment & Auditing: Regular audits, diverse training datasets, de-biasing algorithms.",
        "Equity in Monitoring: Fair application across all employees, avoiding disproportionate targeting.",
        "Customization: Adaptable tools for diverse needs, cultural differences, work styles.",
      ],
      corePrinciple: "Actively promote fairness and equity, preventing AI from amplifying systemic inequalities.",
    },
    {
      id: "trust",
      title: "Fostering Employee Trust & Addressing Job Security",
      description: "Employee skepticism, fears of data misuse, or job displacement (e.g., AI replacing 85M jobs by 2025 - WEF) are major barriers.",
      bestPractices: [
        "Clear Communication: Explain AI's purpose, benefits, and role in supporting (not replacing) employees.",
        "Upskilling & Reskilling: Training programs to adapt to new technologies and roles.",
        "Employee Involvement: Involve workers in AI design, development, and deployment.",
        "Human-Centric Design: Focus on AI assisting and enabling workers, improving job quality.",
      ],
      corePrinciple: "AI as a tool for augmentation and empowerment strengthens trust.",
    },
    {
      id: "empathy",
      title: "Balancing AI Automation with Human Empathy",
      description: "AI should augment, not replace, human interaction and mental health professionals. Human empathy is irreplaceable.",
      bestPractices: [
        "Complementary Role: AI tools support human professionals.",
        "Human Oversight: Crucial for complex issues, nuanced decisions, interpreting AI recommendations. Managers retain final say in disciplinary actions.",
        "Enhance Empathy: Design AI to empower human interaction, not diminish it.",
      ],
      corePrinciple: "Humans and machines collaborate for greater outcomes, elevating human capabilities.",
    },
  ];

  return (
    <section id="ethics" className="pt-16">
      <h2 className="section-title">Ethical Compass: Navigating AI Implementation</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-neutral-700">Successfully integrating AI for well-being is an ethical and organizational challenge. Addressing potential pitfalls is crucial.</p>
      <div className="max-w-4xl mx-auto">
        <Accordion type="multiple" className="w-full rounded-lg border border-teal-custom-200 overflow-hidden">
          {ethicalConsiderations.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="accordion-item-custom">
              <AccordionTrigger className="accordion-button-custom">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="accordion-content-custom">
                <p className="mb-2 text-neutral-700">{item.description}</p>
                <h4 className="font-semibold text-teal-custom-600 mt-3 mb-1">Best Practices:</h4>
                <ul className="list-disc list-inside space-y-1 text-neutral-700">
                  {item.bestPractices.map((practice, index) => (
                    <li key={index}>{practice}</li>
                  ))}
                </ul>
                <p className="mt-3 text-md text-neutral-700 bg-amber-100 p-3 rounded-lg"><strong>Core Principle:</strong> {item.corePrinciple}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
