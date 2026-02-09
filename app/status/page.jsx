"use client";
import { useState } from "react";
import { Search, Loader2, Clock, CheckCircle, FileSearch, UserCheck, AlertCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function StatusPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const q = query(collection(db, "consultations"), where("phone", "==", phone));
      const querySnapshot = await getDocs(q);
      
      const found = [];
      querySnapshot.forEach((doc) => {
        found.push({ id: doc.id, ...doc.data() });
      });

      if (found.length === 0) {
        // Just for demo, if no results found, maybe show a dummy one if specific number used?
        // Or just show "No records found".
        setError("No records found for this phone number.");
      } else {
        setResults(found);
      }
    } catch (err) {
      console.error("Search failed", err);
      // Fallback for demo if firebase fails
       setError("System is currently offline. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case "received": return 1;
      case "analyzing": return 2;
      case "matching": return 3;
      case "completed": return 4;
      default: return 1;
    }
  };

  const steps = [
    { label: "Received", icon: Clock },
    { label: "Analyzing", icon: FileSearch },
    { label: "Matching", icon: UserCheck },
    { label: "Completed", icon: CheckCircle },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Status</h1>
          <p className="text-lg text-gray-600">
            Check the progress of your consultation request in real-time.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-10">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your mobile number (e.g. 010-1234-5678)"
              className="flex-grow rounded-lg border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center min-w-[140px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : <> <Search className="w-5 h-5 mr-2" /> Search </>}
            </button>
          </form>
        </div>

        {/* Results */}
        {error && (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p>{error}</p>
            </div>
        )}

        {results && results.map((item) => {
            const currentStep = getStatusStep(item.status);
            return (
                <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                    <div className="bg-primary/5 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-primary">{item.companyName || "Company Name"}</span>
                        <span className="text-sm text-gray-500">{new Date(item.createdAt?.seconds * 1000).toLocaleDateString() || "Just now"}</span>
                    </div>
                    <div className="p-8">
                        <h3 className="font-bold text-lg mb-6">Service: <span className="text-accent">{item.serviceType}</span></h3>
                        
                        <div className="relative flex justify-between">
                            {/* Progress Bar Background */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                            {/* Progress Bar Active */}
                            <div 
                                className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 z-0 transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                            ></div>

                            {steps.map((step, idx) => {
                                const isActive = idx + 1 <= currentStep;
                                const isCurrent = idx + 1 === currentStep;
                                return (
                                    <div key={idx} className="relative z-10 flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                            isActive ? "bg-white border-accent text-accent" : "bg-white border-gray-200 text-gray-300"
                                        } ${isCurrent ? "ring-4 ring-accent/20" : ""}`}>
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`mt-2 text-xs font-bold ${isActive ? "text-primary" : "text-gray-300"}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}
