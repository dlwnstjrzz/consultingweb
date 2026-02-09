"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experts = [
  {
    name: "안태건",
    englishName: "Ahn Tae Gun",
    position: "대표이사",
    image: "/증명사진_대표님.png",
  },
  {
    name: "이민재",
    englishName: "Lee Min Jae",
    position: "영업본부장",
    image: "/증명사진_이민재.png",
  },
  {
    name: "전재영",
    englishName: "Jeon Jae Young",
    position: "지점장",
    image: "/증명사진_전재영.png",
  },
  {
    name: "장승호",
    englishName: "Jang Seung Ho",
    position: "지점장",
    image: "/증명사진_장승호.png",
  },
  {
    name: "심현용",
    englishName: "Sim Hyun Yong",
    position: "지점장",
    image: "/증명사진_심현용.png",
  }
];

export default function ExpertSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experts.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nextIndex = (currentIndex + 1) % experts.length;

  return (
    <section className="bg-white py-24 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Section Header - Slide Up + Scale */}
      <motion.div 
        className="w-full max-w-6xl px-4 md:px-0 mb-12 flex items-center justify-between"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold tracking-tight text-black font-sans">OUR EXPERTS</h2>
        <div className="h-[2px] w-24 bg-black"></div>
      </motion.div>

      {/* Main Card Container - Slide from Bottom with Rotation */}
      <motion.div 
        className="relative w-full max-w-6xl h-[600px] bg-[#111] shadow-2xl shadow-black/50 overflow-hidden rounded-sm border border-black/10"
        initial={{ opacity: 0, y: 100, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >

        <AnimatePresence mode="popLayout">
          {experts.map((expert, index) => (
            index === currentIndex && (
              <div key={index} className="absolute inset-0 w-full h-full">
                
                {/* Background Large Number (Layer 0) - Horizontal Slide */}
                <motion.div 
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-[10%] left-[10%] z-0 select-none pointer-events-none"
                >
                  <span className="text-[150px] font-serif font-bold text-white/5 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>

                {/* Content Grid (Layer 10) */}
                <div className="absolute inset-0 grid grid-cols-12 h-full pointer-events-none">
                    
                    {/* Left Content: Text - Top to Bottom */}
                    <div className="col-span-12 md:col-span-5 relative h-full flex flex-col justify-center pl-16 z-20 pointer-events-auto">
                       <motion.div
                         initial={{ opacity: 0, y: -50 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 50 }}
                         transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                       >
                          <h3 className="text-lg font-bold tracking-[0.1em] text-[#ff3333] mb-4 font-sans">
                            {expert.position}
                          </h3>
                          
                          {/* Korean Name Only - Sans Serif (Pretendard) */}
                          <h2 className="text-6xl md:text-7xl font-bold text-white font-sans leading-tight mb-8 break-keep">
                            {expert.name}
                          </h2>
                          
                          <button className="text-sm font-bold uppercase tracking-widest text-white border-b-2 border-white pb-1 hover:text-[#ff3333] hover:border-[#ff3333] transition-colors duration-300 font-sans">
                             View Profile
                          </button>
                       </motion.div>
                    </div>

                    {/* Middle Content: Main Image - Horizontal Slide */}
                    <div className="col-span-12 md:col-span-4 relative h-full flex items-center justify-center z-10">
                       <motion.div
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          className="relative w-[380px] h-[500px] shadow-2xl pointer-events-auto"
                       >
                          <img 
                            src={expert.image} 
                            alt={expert.name} 
                            className="w-full h-full object-cover object-top filter grayscale-[20%] contrast-125"
                          />
                          {/* Inner Shadow for depth */}
                          <div className="absolute inset-0 ring-1 ring-white/10"></div>
                       </motion.div>
                    </div>

                    {/* Right Content: Next Image Preview */}
                    <div className="hidden md:block col-span-3 relative h-full overflow-hidden z-0">
                       <div className="absolute top-1/2 right-[-60px] transform -translate-y-1/2 w-[300px] h-[400px] opacity-20 grayscale pointer-events-none scale-90">
                          <img 
                             src={experts[nextIndex].image} 
                             alt="Next" 
                             className="w-full h-full object-cover object-top" 
                          />
                          <div className="absolute inset-0 bg-black/40"></div>
                       </div>
                    </div>
                </div>

                {/* Progress Bar - Fixed Width */}
                <div className="absolute bottom-12 left-16 flex gap-2 z-30 pointer-events-auto">
                   {experts.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-[3px] w-12 transition-colors duration-300 ${idx === currentIndex ? 'bg-[#ff3333]' : 'bg-white/20'}`}
                      />
                   ))}
                </div>

              </div>
            )
          ))}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
