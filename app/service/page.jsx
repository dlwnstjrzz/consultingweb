"use client";
import ServiceCard from "@/components/service/ServiceCard";
import { Building2, CheckCircle, FileText, Briefcase, TrendingUp, Handshake, Globe, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicePage() {
  const services = [
    {
      category: "Finance & Funding",
      items: [
        {
          title: "Policy Funds",
          description: "Access government-backed loans and grants designed for SMEs. We analyze your eligibility and guide you through the entire application process for R&D, working capital, and facility loans.",
          icon: Building2,
          href: "/consultation?type=policy",
        },
        {
          title: "Investment Attraction",
          description: "Connect with verified investors and VCs. We help you pitch your business value and structure investment deals that favor long-term growth.",
          icon: TrendingUp,
          href: "/consultation?type=investment",
        }
      ]
    },
    {
      category: "Certification & accreditation",
      items: [
        {
          title: "Corporate Certification",
          description: "Obtain essential certifications like ISO 9001/14001, Venture Enterprise, and Inno-Biz to enhance credibility and unlock tax benefits.",
          icon: CheckCircle,
          href: "/consultation?type=certification",
        },
        {
          title: "R&D Center Establishment",
          description: "Set up a certified corporate R&D center to receive significant tax credits and exemptions. We manage the registration and compliance.",
          icon: Globe,
          href: "/consultation?type=rnd",
        }
      ]
    },
    {
      category: "Tax & Legal Strategy",
      items: [
        {
          title: "Tax Optimization",
          description: "Strategic tax planning for dividends, retained earnings, and executive compensation. Minimize liabilities while staying fully compliant.",
          icon: FileText,
          href: "/consultation?type=tax",
        },
        {
          title: "Family Succession",
          description: "Smoothly transfer management rights and assets involved in family businesses. We structure inheritance strategies to minimize tax impact.",
          icon: Handshake,
          href: "/consultation?type=succession",
        },
        {
          title: "Legal & Labor Risk",
          description: "Proactive management of labor contracts and legal disputes. Protect your company from unforeseen liabilities with our advisory.",
          icon: Shield,
          href: "/consultation?type=legal",
        }
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-primary pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We offer a holistic suite of consulting solutions tailored to every stage of your business lifecycle.
        </p>
      </div>

      {/* Service List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {services.map((section, idx) => (
          <div key={idx} className="mb-20 last:mb-0">
            <div className="flex items-center mb-10">
              <div className="h-8 w-1 bg-accent mr-4 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">{section.category}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item, itemIdx) => (
                <ServiceCard key={itemIdx} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Unsure which service you need?</h2>
          <p className="text-lg text-gray-600 mb-10">
            Our experts will analyze your current situation and recommend the most effective solution.
          </p>
          <a href="/consultation" className="inline-block bg-primary text-white font-bold text-lg px-10 py-4 rounded-md hover:bg-primary/90 transition-colors">
            Requests General Inquiry
          </a>
        </div>
      </div>
    </div>
  );
}
