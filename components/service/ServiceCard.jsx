import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ title, description, icon: Icon, href }) {
  return (
    <Link href={href} className="group block h-full">
      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
         {/* Hover accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/5 text-accent group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
          Learn more <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
