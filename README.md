# VoiceInvoice AI // Zero-Compute Voice-to-Task Field Invoicer

VoiceInvoice AI is a 100% client-side, mobile-responsive productivity and billing application engineered specifically for hands-on field technicians (plumbers, electricians, contractors). The platform leverages native device hardware APIs to convert spoken work summaries into structured, downloadable PDF business invoices entirely within the user's browser viewport—requiring zero backend server compute costs.

## 🚀 Key Engineering Focus Areas

- **Zero-Compute Architecture:** Eliminates expensive server-side transcription and cloud processing pipelines by running entirely on native browser engines.
- **Hardware API Integration:** Leverages the native Web Speech API (`webkitSpeechRecognition`) for real-time acoustic-to-text processing directly via the device microphone.
- **On-the-Fly Document Generation:** Utilizes `jspdf` to dynamically compile form states into a perfectly structured, clean business PDF receipt instantly inside client memory.
- **Field-Ready UI/UX:** Built with high-contrast, rugged slate-900 cards featuring oversized 48px tactile touch targets optimized for mobile use on noisy construction or job sites.

## 🛠️ Built With

- **Framework:** React (Vite)
- **Styling Layout:** Tailwind CSS
- **Core APIs:** Web Speech API (Native Webkit Transcription Engine)
- **PDF Core:** Client-Side `jspdf` Compilation Module

## 📦 Local Installation

To spin up a local development instance of VoiceInvoice AI:

```bash
# 1. Clone the repository
git clone [https://github.com/samran178/VoiceInvoice-AI.git](https://github.com/samran178/VoiceInvoice-AI.git)

# 2. Navigate into the root directory
cd VoiceInvoice-AI

# 3. Install required node dependencies
npm install

# 4. Fire the local development server
npm run dev
