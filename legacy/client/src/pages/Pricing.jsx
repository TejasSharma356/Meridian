import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: "Initiate",
      price: "Free",
      description: "For individual architects designing personal projects.",
      features: ["3 Projects Active", "Standard Intelligence Mode", "Community Support", "72-hour Context Window"],
      button: "Start Free",
      highlight: false
    },
    {
      name: "Architect Pro",
      price: "$29",
      period: "/month",
      description: "Complete capabilities for professional systems engineering.",
      features: ["Unlimited Projects", "Deep-Reasoning AI (GPT-4 Class)", "Priority Routing", "Infinite Context Window", "Custom Neural Integrations"],
      button: "Upgrade to Pro",
      highlight: true
    },
    {
      name: "Enterprise Hub",
      price: "Custom",
      description: "Dedicated scalable instances for distributed teams.",
      features: ["Dedicated Inference Node", "Custom Model Fine-tuning", "SSO Authentication", "SLA Guarantee", "24/7 Dedicated Architect Support"],
      button: "Contact Engineering",
      highlight: false
    }
  ];

  return (
    <div className="w-full min-h-full p-12 flex flex-col items-center justify-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary mb-4">Pricing Dynamics</span>
        <h1 className="text-5xl font-bold tracking-tighter text-on-surface mb-6 text-center">Scale Your Intelligence</h1>
        <p className="text-on-surface-variant text-center max-w-2xl mb-16 text-lg">
          Select the compute capacity and architectural throughput your system requires. Scale effortlessly as your integration demands increase.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                plan.highlight 
                  ? 'bg-surface-container border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden scale-105 z-10' 
                  : 'bg-surface-container-low border-outline-variant/20 hover:border-outline-variant/50'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              )}
              
              <h3 className="text-xl font-medium tracking-tight text-on-surface mb-2">{plan.name}</h3>
              <p className="text-sm text-on-surface-variant mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold tracking-tighter text-on-surface">{plan.price}</span>
                {plan.period && <span className="text-on-surface-variant text-sm">{plan.period}</span>}
              </div>

              <div className="flex flex-col gap-4 mb-10 flex-1">
                {plan.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0">check_circle</span>
                    <span className="text-sm text-on-surface font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-tight transition-all active:scale-95 ${
                plan.highlight 
                  ? 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container shadow-lg shadow-primary/20' 
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-highest/80 border border-outline-variant/20'
              }`}>
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
