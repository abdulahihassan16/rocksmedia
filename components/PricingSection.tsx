"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Check, X } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// --- Plans ---

const plans = [
  {
    id: "essential",
    name: "Essential",
    description: "Get online fast with a clean, professional website built personally for your business.",
    oneTimePrice: 399,
    monthlyPrice: 49,
    buttonText: "Get Started",
    popular: false,
    features: [
      { name: "Up to 3 custom pages", included: true },
      { name: "Mobile-responsive design", included: true },
      { name: "Contact form", included: true },
      { name: "Google Maps integration", included: true },
      { name: "Essential SEO setup", included: true },
      { name: "Social media links", included: true },
      { name: "1 round of revisions", included: true },
      { name: "Booking / scheduling form", included: false },
      { name: "Gallery or portfolio section", included: false },
      { name: "E-commerce / online store", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "For businesses ready to grow — more pages, more features, and a standout design.",
    oneTimePrice: 699,
    monthlyPrice: 99,
    buttonText: "Get Started",
    popular: true,
    features: [
      { name: "Up to 10 custom pages", included: true },
      { name: "Premium custom design", included: true },
      { name: "Contact & booking forms", included: true },
      { name: "Gallery or portfolio section", included: true },
      { name: "Advanced SEO optimization", included: true },
      { name: "Speed & performance tuning", included: true },
      { name: "3 rounds of revisions", included: true },
      { name: "30-day post-launch support", included: true },
      { name: "E-commerce / online store", included: false },
      { name: "Monthly strategy call", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "The full package — a fully custom website built to dominate your market.",
    oneTimePrice: 1599,
    monthlyPrice: 199,
    oneTimeSuffix: "+",
    buttonText: "Get Started",
    popular: false,
    features: [
      { name: "Unlimited custom pages", included: true },
      { name: "Fully custom UI/UX design", included: true },
      { name: "E-commerce / online store", included: true },
      { name: "Blog or news section", included: true },
      { name: "Analytics dashboard setup", included: true },
      { name: "Full SEO strategy", included: true },
      { name: "Priority revisions (unlimited)", included: true },
      { name: "60-day post-launch support", included: true },
      { name: "Monthly strategy call", included: true },
      { name: "Dedicated point of contact", included: true },
    ],
  },
];

// --- Toggle ---

const PricingSwitch = ({
  isMonthly,
  onSwitch,
}: {
  isMonthly: boolean;
  onSwitch: (monthly: boolean) => void;
}) => (
  <div className="flex justify-center">
    <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
      <button
        onClick={() => onSwitch(true)}
        className={cn(
          "relative z-10 min-h-[48px] rounded-full px-5 py-2 text-sm font-medium transition-colors",
          isMonthly ? "text-white" : "text-gray-400"
        )}
      >
        {isMonthly && (
          <motion.span
            layoutId="pricing-switch"
            className="absolute inset-0 rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative">Monthly Care Plan</span>
      </button>

      <button
        onClick={() => onSwitch(false)}
        className={cn(
          "relative z-10 min-h-[48px] rounded-full px-5 py-2 text-sm font-medium transition-colors",
          !isMonthly ? "text-white" : "text-gray-400"
        )}
      >
        {!isMonthly && (
          <motion.span
            layoutId="pricing-switch"
            className="absolute inset-0 rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative">One-Time Build</span>
      </button>
    </div>
  </div>
);

// --- Section ---

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="pricing"
      className="relative overflow-x-hidden py-32 px-8 md:px-4"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_80px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-10 max-w-3xl mx-auto space-y-4">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium"
        >
          Pricing Plans
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Simple, Honest Pricing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white text-lg"
        >
          No hidden fees. No surprise costs. Every website is built personally by us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PricingSwitch isMonthly={isMonthly} onSwitch={setIsMonthly} />
        </motion.div>

        {isMonthly && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white"
          >
            Includes hosting, updates &amp; ongoing support. Cancel anytime.
          </motion.p>
        )}
      </div>

      {/* Cards */}
      <div className="relative z-10 grid md:grid-cols-3 max-w-5xl gap-5 mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <Card
              className={cn(
                "relative text-white border-neutral-800 h-full flex flex-col",
                plan.popular
                  ? "bg-gradient-to-b from-neutral-800 to-neutral-900 shadow-[0px_-8px_200px_0px_#0900ff55] z-20 border-blue-500/40"
                  : "bg-gradient-to-b from-neutral-900 to-neutral-950 z-10"
              )}
            >
              <CardHeader className="text-left pb-4">
                {plan.popular && (
                  <div className="mb-3 self-start rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-white mt-1">{plan.description}</p>

                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-semibold">
                    $
                    <NumberFlow
                      value={isMonthly ? plan.monthlyPrice : plan.oneTimePrice}
                      className="text-4xl font-semibold"
                    />
                    {!isMonthly && (plan as { oneTimeSuffix?: string }).oneTimeSuffix}
                  </span>
                  <span className="text-white ml-2 text-sm">
                    {isMonthly ? "/month" : " one-time"}
                  </span>
                </div>

                {!isMonthly && (
                  <p className="text-xs text-white mt-1">
                    or ${plan.monthlyPrice}/mo with care plan
                  </p>
                )}
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <button
                  onClick={scrollToContact}
                  className={cn(
                    "w-full mb-6 py-3.5 px-4 text-sm font-semibold rounded-xl transition-colors min-h-[48px]",
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800/40 border border-blue-500 text-white hover:from-blue-400 hover:to-blue-500"
                      : "bg-gradient-to-t from-neutral-800 to-neutral-700 shadow-lg shadow-neutral-900 border border-neutral-700 text-white hover:from-neutral-700 hover:to-neutral-600"
                  )}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-2.5 pt-4 border-t border-neutral-800 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      {feature.included ? (
                        <Check className="h-4 w-4 shrink-0 text-blue-400" />
                      ) : (
                        <X className="h-4 w-4 shrink-0 text-neutral-600" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included ? "text-white" : "text-neutral-600"
                        )}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center text-white text-sm mt-10"
      >
        Not sure which plan is right for you?{" "}
        <a href="#contact" className="text-blue-400 hover:underline font-medium">
          Call or message us
        </a>{" "}
        and we&apos;ll figure it out together.
      </motion.p>
    </section>
  );
}
