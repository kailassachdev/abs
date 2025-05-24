
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StressWorkHoursChart } from "@/components/charts/stress-work-hours-chart";
import { DisengagementCostChart } from "@/components/charts/disengagement-cost-chart";

export function ImpactsSection() {
  return (
    <section id="impacts" className="pt-16">
      <h2 className="section-title">The Ripple Effect: Impacts of Burnout</h2>
      <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-neutral-700">IT burnout has far-reaching consequences, affecting individual health, diminishing productivity, and imposing significant financial and operational costs on organizations.</p>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="card-custom space-y-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-2">Individual Health & Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Chronic stress leads to physical issues (fatigue, headaches, cardiovascular problems) and psychological distress (anxiety, depression, cognitive impairment).</p>
            <p>Productivity plummets: unresolved depression can cause a <strong className="text-red-600">35% drop</strong>. Cognitive overload increases error rates.</p>
          </CardContent>
        </Card>
        <Card className="card-custom space-y-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-2">Organizational Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li><strong>High Turnover:</strong> 65% of SOC professionals consider quitting. Replacing an employee costs 10-30% of their annual salary.</li>
              <li><strong>Increased Absenteeism:</strong> Stress is a leading cause.</li>
              <li><strong>Financial Loss from Disengagement:</strong> Globally, $8.8 trillion in lost productivity. Mental health issues cost US organizations $210.5 billion annually.</li>
              <li><strong>Operational Risks:</strong> More system outages, slower responses, heightened security risks.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <Card className="card-custom">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-4 text-center">IT Employee Stress & Work Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container-responsive">
              <StressWorkHoursChart />
            </div>
            <p className="text-sm text-neutral-600 mt-2 text-center">Illustrating prevalence of stress and long working hours.</p>
          </CardContent>
        </Card>
        <Card className="card-custom">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-teal-custom-700 mb-4 text-center">Financial Impact of Disengagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container-responsive">
              <DisengagementCostChart />
            </div>
            <p className="text-sm text-neutral-600 mt-2 text-center">Highlighting significant productivity losses.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
