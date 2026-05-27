"use client";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "We loved how the intro just pulled everything together, the design honestly exceeded what we expected.",
    name: "C&N Window & Home Services",
    initials: "CW",
    color: "#60a5fa",
  },
  {
    text: "The illustrations on our site are something else, it feels like the whole vibe of our shop just came to life on screen.",
    name: "Krazy Kuts",
    initials: "KK",
    color: "#f472b6",
  },
  {
    text: "We went from 12 customers a day to 55 after the site launched, we genuinely did not see that coming.",
    name: "Cell City",
    initials: "CC",
    color: "#34d399",
  },
  {
    text: "More repairs coming in every month since the site went live, customers are actually finding us now.",
    name: "Cell Doctor",
    initials: "CD",
    color: "#fb923c",
  },
  {
    text: "Our cars finally look the way they deserve to online, people are pulling up to the lot after seeing the site and that says everything.",
    name: "E & S Auto Sales Inc",
    initials: "ES",
    color: "#a78bfa",
  },
  {
    text: "The site actually shows the quality of our work instead of just talking about it, our clients notice the difference before we even meet them.",
    name: "Juneja Renovation & Construction Inc",
    initials: "JR",
    color: "#facc15",
  },
];

const firstColumn  = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn  = testimonials.slice(4, 6);

export function Testimonials() {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-10"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-widest text-white uppercase">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-center text-foreground">
            What our clients say
          </h2>
          <p className="text-center mt-4 text-white">
            Real results from real local businesses across Canada.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn}  duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn}  className="hidden lg:block" duration={17} />
        </div>

      </div>
    </section>
  );
}
