"use client";

import Image from "next/image";

export default function PartnerLogos() {
  const partners = [
    { name: "교보생명", category: "Life" },
    { name: "신한라이프", category: "Life" },
    { name: "삼성생명", category: "Life" },
    { name: "KB손해보험", category: "Non-Life" },
    { name: "DB손해보험", category: "Non-Life" },
    { name: "한화손해보험", category: "Non-Life" },
    { name: "삼성화재", category: "Non-Life" },
    { name: "현대해상", category: "Non-Life" },
    { name: "메리츠화재", category: "Non-Life" },
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-extrabold text-black uppercase tracking-wide leading-tight">
            Strategic Partnerships <br /> with Global Leading Groups
          </h3>
        </div>
        
        <div className="flex justify-center items-center py-8">
          <div className="relative w-full max-w-6xl h-40 md:h-60 transition-transform duration-500 hover:scale-105">
            <Image 
              src="/logos.png" 
              alt="Partner Logos" 
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
