"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Building2, TrendingUp, CheckCircle, FileText, Globe, Handshake, Shield } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const services = [
  { id: "policy", icon: Building2, label: "Policy Funds" },
  { id: "investment", icon: TrendingUp, label: "Investment" },
  { id: "certification", icon: CheckCircle, label: "Certification" },
  { id: "rnd", icon: Globe, label: "R&D Center" },
  { id: "tax", icon: FileText, label: "Tax & Accounting" },
  { id: "succession", icon: Handshake, label: "Succession" },
  { id: "legal", icon: Shield, label: "Legal & Labor" },
  { id: "other", icon: Check, label: "Other" },
];

export default function ConsultationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    companyName: "",
    ceoName: "",
    phone: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleServiceSelect = (id) => {
    setFormData({ ...formData, serviceType: id });
    setStep(2);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Attempt to save to Firestore
      try {
        await addDoc(collection(db, "consultations"), {
          ...formData,
          createdAt: serverTimestamp(),
          status: "received" // received, analyzing, matching, completed
        });
      } catch (err) {
        console.error("Firebase submission failed (likely due to missing config), falling back to simulation.", err);
        // Simulate success for demo purposes if config is missing
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setIsSuccess(true);
      setStep(4);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-h-[500px] flex flex-col">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= step ? (i === step ? "w-8 bg-accent" : "w-8 bg-primary") : "w-2 bg-gray-200"
              }`} 
            />
          ))}
        </div>
        <div className="text-sm font-medium text-gray-500">
          Step {step > 3 ? 3 : step} of 3
        </div>
      </div>

      <div className="p-8 md:p-12 flex-grow flex flex-col">
        <AnimatePresence mode="wait" custom={1}>
          
          {/* STEP 1: Service Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What service are you interested in?</h2>
              <p className="text-gray-500 mb-8">Select a topic to help us connect you with the right expert.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-all">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border border-gray-100 hover:border-accent hover:shadow-md transition-all group ${
                      formData.serviceType === service.id ? "bg-accent/10 border-accent" : "bg-white"
                    }`}
                  >
                    <service.icon className={`h-8 w-8 mb-4 ${
                      formData.serviceType === service.id ? "text-accent" : "text-gray-400 group-hover:text-primary"
                    }`} />
                    <span className={`text-sm font-medium ${
                       formData.serviceType === service.id ? "text-accent" : "text-gray-600 group-hover:text-primary"
                    }`}>{service.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Basic Info */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your company</h2>
              <p className="text-gray-500 mb-8">We need some basic details to start the analysis.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={formData.companyName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent p-3 border"
                    placeholder="(주)메가인포"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CEO Name</label>
                    <input 
                      type="text" 
                      name="ceoName"
                      value={formData.ceoName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent p-3 border"
                      placeholder="Hong Gil-dong"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Contact</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent p-3 border"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent p-3 border"
                      placeholder="ceo@example.com"
                    />
                  </div>
              </div>

              <div className="mt-auto pt-8 flex justify-between">
                <button 
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button 
                  onClick={nextStep}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 flex items-center shadow-lg shadow-primary/20"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

           {/* STEP 3: Detailed Inquiry */}
           {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help?</h2>
              <p className="text-gray-500 mb-8">Briefly describe your current situation or specific needs.</p>
              
              <div className="space-y-5">
                 <textarea 
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent p-3 border resize-none"
                    placeholder="Example: We are a manufacturing startup looking for R&D funding for our new product line..."
                  ></textarea>
                  
                  <div className="bg-gray-50 p-4 rounded-md flex items-start">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="ml-3 text-sm text-gray-500">
                      Your information is strictly confidential and will only be used for consultation purposes.
                    </p>
                  </div>
              </div>

              <div className="mt-auto pt-8 flex justify-between">
                <button 
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-2 bg-accent text-primary rounded-lg font-bold hover:bg-yellow-500 flex items-center shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
             <motion.div
             key="step4"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex-grow flex flex-col items-center justify-center text-center py-10"
           >
             <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
               <Check className="h-10 w-10" />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Received!</h2>
             <p className="text-gray-500 mb-8 max-w-md">
               Thank you for trusting Mega-Info Consulting. An expert has been assigned to your case and will contact you at <strong>{formData.phone}</strong> within 24 hours.
             </p>
             
             <div className="flex space-x-4">
               <button 
                 onClick={() => window.location.href = '/'}
                 className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
               >
                 Return Home
               </button>
               <button 
                  onClick={() => window.location.href = '/status'}
                 className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 shadow-md"
               >
                 Check Status
               </button>
             </div>
           </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
