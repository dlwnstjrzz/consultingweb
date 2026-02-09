"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion";

const stats = [
  { 
    number: 20, 
    label: "Years", 
    suffix: "+" 
  },
  { 
    number: 2500, 
    label: "Specialists", 
    suffix: "+" 
  },
  { 
    number: 100000, 
    label: "Consulting", 
    suffix: "+" 
  },
];

const historyData = [
  { year: "2024", title: "Global Expansion", description: "Launched new branches in Southeast Asia, marking a significant milestone in our global strategy." },
  { year: "2020", title: "Digital Transformation", description: "Integrated AI-driven analytics into our core consulting services for smarter decision making." },
  { year: "2015", title: "Industry Leader", description: "Recognized as the top corporate consulting firm in the domestic market by major financial institutions." },
  { year: "2010", title: "Service Diversification", description: "Expanded portfolio to include private wealth management and corporate tax solutions." },
  { year: "2005", title: "FnSolution Founded", description: "Established with a vision to revolutionize the corporate financial consulting landscape." },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const rounded = useTransform(springValue, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
}

export default function StatsBoard() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="bg-white text-black overflow-hidden relative font-sans">
      
      {/* 1. Stats Section with Building on Right */}
      <div className="relative w-full py-20 overflow-hidden bg-white">
         
         {/* Building Image - Right Side Only (Reduced Width) */}
         <div className="absolute right-0 top-0 bottom-0 w-2/5 z-0 hidden lg:block">
            <img 
               src="/building2.avif" 
               alt="Background" 
               className="w-full h-full object-cover object-right"
            />
         </div>

         <div className="relative z-10 pl-8 sm:pl-12 lg:pl-16">
            
            {/* Headline */}
            <div className="mb-16 max-w-2xl">
               <motion.h2 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-tight"
               >
                 The beginning of <br />
                 the FnSolution <br />
                 evolution.
               </motion.h2>
            </div>

            {/* Stacked Stats */}
            <div className="flex flex-col space-y-6">
               {stats.map((stat, index) => (
                 <div key={index} className="flex items-baseline">
                    <motion.div 
                       initial={{ opacity: 0, x: -50 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.6, delay: index * 0.2 }}
                       className="flex items-baseline"
                    >
                       {/* Huge Number */}
                       <span className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none">
                          <Counter value={stat.number} suffix="" />
                       </span>
                       
                       {/* Plus Sign & Label group */}
                       <div className="ml-6 flex items-baseline">
                          <span className="text-4xl md:text-5xl font-black text-black mr-4">
                             {stat.suffix}
                          </span>
                          <span className="text-lg md:text-xl text-gray-500 font-medium">
                             {stat.label}
                          </span>
                       </div>
                    </motion.div>
                 </div>
               ))}
            </div>

         </div>
      </div>

      {/* 2. History / Timeline Section */}
      <div className="relative py-32 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            
            {/* Background Building Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="w-full h-full"
                >
                   <img 
                     src="/building.avif" 
                     alt="FnSolution Building" 
                     className="w-full h-full object-cover grayscale opacity-50"
                   />
                </motion.div>
                {/* Darker Gradient Overlay for More Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/95"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h3 className="text-3xl font-bold tracking-tight uppercase">History of FnSolution</h3>
                    <div className="w-12 h-1 bg-black mx-auto mt-6"></div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Center Line */}
                    <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gray-300 transform lg:-translate-x-1/2"></div>

                    {historyData.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`relative flex flex-col lg:flex-row items-center mb-24 last:mb-0 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-black border-4 border-white shadow-lg transform -translate-x-1/2 z-10"></div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2 pl-24 lg:pl-0 lg:px-16 text-left">
                               <div className={`flex flex-col ${index % 2 === 0 ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'}`}>
                                   <span className="text-6xl font-bold text-gray-500 font-sans mb-4 tracking-tighter">{item.year}</span>
                                   <h4 className="text-2xl font-bold text-black mb-3">{item.title}</h4>
                                   <p className="text-gray-600 font-medium max-w-sm leading-relaxed">{item.description}</p>
                               </div>
                            </div>
                            
                            {/* Empty side for layout balance */}
                            <div className="hidden lg:block w-1/2"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

      {/* RE-ADD THE ENDING TAGS CORRECTLY IF NEEDED, BUT JUST REMOVING THE EXTRA DIV IS LIKELY THE FIX */}
      {/* Actually, line 187 is closing the `div` from line 61 that wrapped the OLD grid. 
          But since we replaced the top section with a new full-width text-white section (lines 64-123), 
          we need to make sure the nesting is correct.
          
          However, looking at the previous patch:
          The previous patch replaced the TOP part of the component but left the BOTTOM part (History).
          The BOTTOM part (History) starts at line 125 (in the NEW file) or so.
          
          The error is likely that I closed the main `section` too early or have an extra div.
          
          Let's just look at lines 185-190.
          185 is closing the `div` for the History section mask?
          187 is closing... what?
          
          Let's just remove 187 if it has no opener.
          
          Wait, the history section is:
          <div className="relative py-32 ..."> (Line 125 approx)
             ...
          </div> (Line 185)
          
          And the `StatsBoard` returns:
          <section ...> (Line 61)
             <div ...> (Stats Section - lines 64-123) </div>
             <div ...> (History Section - lines 125-185) </div>
          </section> (Line 188)
          
          So we need to make sure there isn't an extra div.
          
          The `view_file` shows:
          185:         </div>
          186: 
          187:       </div>
          188:     </section>
          
          If line 185 closes the History Section div, then line 187 closes... ? 
          The History section is a direct child of `section` now?
          
          In the previous `StatsBoard`:
          <section>
             <div className="max-w-7xl relative z-10"> (Opened at start)
                <Headline />
                <StatsGrid />
                <HistorySection />
             </div>
          </section>
          
          BUT in my last edit, I replaced the top part.
          I replaced `max-w-7xl ...` (line 67) with `div className="relative w-full py-32..."`.
          This new div CLOSES itself at line 123.
          
          So now we have:
          <section>
             <div (Stats) ...> ... </div>
             <div (History) ...> ... </div>
             </div> (Line 187 - THIS IS THE EXTRA ONE FROM THE OLD `max-w-7xl` wrapper)
          </section>
          
          So yes, I need to remove line 187.
      */}
    </section>
  );
}
