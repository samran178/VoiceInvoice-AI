import { useState, useRef, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface VoiceInputProps {
  businessName: string;
  setBusinessName: (val: string) => void;
  clientName: string;
  setClientName: (val: string) => void;
  hourlyRate: string;
  setHourlyRate: (val: string) => void;
  hoursWorked: string;
  setHoursWorked: (val: string) => void;
  jobSummary: string;
  setJobSummary: (val: string) => void;
}

export function VoiceInput({
  businessName,
  setBusinessName,
  clientName,
  setClientName,
  hourlyRate,
  setHourlyRate,
  hoursWorked,
  setHoursWorked,
  jobSummary,
  setJobSummary
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript) {
        setJobSummary(prev => (prev ? prev + " " : "") + finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        // Keep recording if it was naturally stopped but state says recording
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setJobSummary, isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      recognitionRef.current?.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current?.start();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName" className="text-slate-300 font-medium text-sm">Business Name</Label>
          <Input 
            id="businessName"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            className="mt-1 h-12 bg-slate-900 border-slate-700 text-white text-lg focus:ring-emerald-500 placeholder:text-slate-500"
            placeholder="Smith Plumbing LLC"
            data-testid="input-business-name"
          />
        </div>

        <div>
          <Label htmlFor="clientName" className="text-slate-300 font-medium text-sm">Client Name</Label>
          <Input 
            id="clientName"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            className="mt-1 h-12 bg-slate-900 border-slate-700 text-white text-lg focus:ring-emerald-500 placeholder:text-slate-500"
            placeholder="Jane Doe"
            data-testid="input-client-name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hourlyRate" className="text-slate-300 font-medium text-sm">Rate / Hour ($)</Label>
            <Input 
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={e => setHourlyRate(e.target.value)}
              className="mt-1 h-12 bg-slate-900 border-slate-700 text-white text-lg focus:ring-emerald-500 placeholder:text-slate-500"
              placeholder="85"
              data-testid="input-hourly-rate"
            />
          </div>
          <div>
            <Label htmlFor="hoursWorked" className="text-slate-300 font-medium text-sm">Hours Worked</Label>
            <Input 
              id="hoursWorked"
              type="number"
              value={hoursWorked}
              onChange={e => setHoursWorked(e.target.value)}
              className="mt-1 h-12 bg-slate-900 border-slate-700 text-white text-lg focus:ring-emerald-500 placeholder:text-slate-500"
              placeholder="2.5"
              data-testid="input-hours-worked"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-4">
        {!speechSupported ? (
          <div className="text-red-400 text-sm bg-red-950/30 p-3 rounded border border-red-900 w-full text-center">
            Voice dictation not supported in this browser.
          </div>
        ) : (
          <button
            onClick={toggleRecording}
            data-testid="button-microphone"
            className={`flex flex-col items-center justify-center w-full min-h-[80px] rounded-xl transition-all duration-300 ${
              isRecording 
                ? "bg-red-500/20 border-2 border-red-500 animate-pulse text-red-400" 
                : "bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {isRecording ? <Mic className="w-8 h-8 mb-1" /> : <MicOff className="w-8 h-8 mb-1" />}
            <span className="font-semibold">{isRecording ? "Listening..." : "Tap to Dictate"}</span>
          </button>
        )}
      </div>

      <div>
        <Label htmlFor="jobSummary" className="text-slate-300 font-medium text-sm">Job Summary</Label>
        <Textarea 
          id="jobSummary"
          value={jobSummary}
          onChange={e => setJobSummary(e.target.value)}
          className="mt-1 min-h-[120px] bg-slate-900 border-slate-700 text-white text-lg focus:ring-emerald-500 placeholder:text-slate-500 resize-y p-3 leading-relaxed"
          placeholder="Describe the work done..."
          data-testid="textarea-job-summary"
        />
      </div>
    </div>
  );
}
