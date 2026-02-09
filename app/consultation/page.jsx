"use client";
import ConsultationWizard from "@/components/consultation/ConsultationWizard";

export default function ConsultationPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Request Consultation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step towards business success. Fill out the form below and our experts will provide a customized solution.
          </p>
        </div>
        
        <ConsultationWizard />
      </div>
    </div>
  );
}
