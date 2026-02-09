"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function QuickService() {
  const services = [
    {
      title: ["MANAGEMENT", "STRATEGY"],
      sub: "중소기업지원 & 인증",
      href: "/service?category=0",
      image: "https://eoncg0801.mycafe24.com/wp-content/uploads/2025/02/stragy.png",
      span: "lg:row-span-2 lg:col-span-1", // Large Left Block
    },
    {
      title: ["ORGANIZATION & HR"],
      sub: "기업재무 & 자산관리",
      href: "/service?category=1",
      image: "https://eoncg0801.mycafe24.com/wp-content/uploads/2025/02/ORGANIZATION.png",
      span: "lg:col-span-1 lg:row-span-1", // Top Right
    },
    {
      title: ["FINANCE & IT SW"],
      sub: "개인자산관리 & 투자",
      href: "/service?category=2",
      image: "https://eoncg0801.mycafe24.com/wp-content/uploads/2025/02/a_AdobeStock_301436805.jpeg",
      span: "lg:col-span-1 lg:row-span-1", // Bottom Right
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Consulting <br /> Solutions
            </h3>
          </div>
          <Link 
            href="/service" 
            className="hidden md:flex items-center gap-2 text-lg font-bold text-gray-900 hover:text-accent transition-colors group"
          >
            서비스 전체보기
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 h-[800px] lg:h-[600px]">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.href}
              className={`relative group overflow-hidden ${service.span} block`}
            >
               {/* Background Image */}
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                 style={{ backgroundImage: `url('${service.image}')` }}
               />
               
               {/* Overlay */}
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
               
               {/* Content */}
               <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                 <h4 className="text-3xl md:text-4xl font-black text-white italic leading-tight uppercase drop-shadow-lg mb-2">
                   {service.title.map((line, i) => (
                     <span key={i} className="block">
                       {line}
                     </span>
                   ))}
                 </h4>
                 <p className="text-white/80 font-medium text-lg drop-shadow-md translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                   {service.sub}
                 </p>
               </div>

               {/* Arrow Icon Top Right */}
               <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                 <ArrowUpRight className="w-6 h-6" />
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
