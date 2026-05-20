import { useState } from "react";
import { VoiceInput } from "@/components/VoiceInput";
import { InvoicePreview } from "@/components/InvoicePreview";

function Home() {
  const [businessName, setBusinessName] = useState("");
  const [clientName, setClientName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [jobSummary, setJobSummary] = useState("");

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 px-4 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">VoiceInvoice <span className="text-emerald-500">AI</span></h1>
              <p className="text-xs text-slate-400 font-medium">Dictate. Review. Get Paid.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 mt-4 md:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
              <h2 className="text-2xl font-bold text-white">Job Details</h2>
              <p className="text-slate-400 text-sm">Fill in or dictate your work details below.</p>
            </div>
            <VoiceInput 
              businessName={businessName}
              setBusinessName={setBusinessName}
              clientName={clientName}
              setClientName={setClientName}
              hourlyRate={hourlyRate}
              setHourlyRate={setHourlyRate}
              hoursWorked={hoursWorked}
              setHoursWorked={setHoursWorked}
              jobSummary={jobSummary}
              setJobSummary={setJobSummary}
            />
          </section>

          <section className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="flex flex-col gap-1 mb-2">
              <h2 className="text-2xl font-bold text-white">Preview</h2>
              <p className="text-slate-400 text-sm">Your generated invoice, ready to send.</p>
            </div>
            <InvoicePreview 
              businessName={businessName}
              clientName={clientName}
              hourlyRate={hourlyRate}
              hoursWorked={hoursWorked}
              jobSummary={jobSummary}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
