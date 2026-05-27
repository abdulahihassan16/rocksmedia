"use client";
import React from "react";
import { motion } from "framer-motion";

export type Testimonial = {
  text: string;
  name: string;
  initials: string;
  color: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, initials, color }, i) => (
              <div
                className="p-8 rounded-3xl border border-white/8 max-w-xs w-full"
                style={{ background: "transparent" }}
                key={i}
              >
                <div className="text-white/75 leading-relaxed">{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ background: `${color}22`, border: `1px solid ${color}44`, color }}
                  >
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-foreground">
                      {name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
