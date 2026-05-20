import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { format } from "date-fns";
import { useMemo } from "react";

interface InvoicePreviewProps {
  businessName: string;
  clientName: string;
  hourlyRate: string;
  hoursWorked: string;
  jobSummary: string;
}

export function InvoicePreview({
  businessName,
  clientName,
  hourlyRate,
  hoursWorked,
  jobSummary
}: InvoicePreviewProps) {
  
  const total = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursWorked) || 0;
    return rate * hours;
  }, [hourlyRate, hoursWorked]);

  const dateStr = format(new Date(), "MMM dd, yyyy");
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    const darkColor = "#0f172a";
    const lightText = "#64748b";

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(darkColor);
    doc.text(businessName || "Your Business Name", 20, 30);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(lightText);
    doc.text("INVOICE", 20, 40);
    
    // Invoice Details
    doc.setFontSize(12);
    doc.setTextColor(darkColor);
    doc.text(`Invoice Number: ${invoiceNumber}`, 130, 30);
    doc.text(`Date: ${dateStr}`, 130, 38);
    
    // Billed To
    doc.setFontSize(10);
    doc.setTextColor(lightText);
    doc.text("BILLED TO", 20, 60);
    doc.setFontSize(14);
    doc.setTextColor(darkColor);
    doc.text(clientName || "Client Name", 20, 68);
    
    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 80, 190, 80);
    
    // Table Header
    doc.setFontSize(10);
    doc.setTextColor(lightText);
    doc.text("DESCRIPTION", 20, 90);
    doc.text("RATE", 130, 90);
    doc.text("HOURS", 155, 90);
    doc.text("TOTAL", 180, 90, { align: "right" });
    
    // Line Item
    doc.setFontSize(12);
    doc.setTextColor(darkColor);
    
    const splitSummary = doc.splitTextToSize(jobSummary || "Labor", 100);
    doc.text(splitSummary, 20, 100);
    
    const rateVal = `$${(parseFloat(hourlyRate)||0).toFixed(2)}`;
    const hoursVal = `${parseFloat(hoursWorked)||0}`;
    const totalVal = `$${total.toFixed(2)}`;
    
    doc.text(rateVal, 130, 100);
    doc.text(hoursVal, 155, 100);
    doc.text(totalVal, 180, 100, { align: "right" });
    
    // Divider
    const summaryHeight = splitSummary.length * 7;
    const finalY = 100 + summaryHeight + 10;
    doc.line(20, finalY, 190, finalY);
    
    // Total
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total", 130, finalY + 15);
    doc.text(totalVal, 180, finalY + 15, { align: "right" });

    doc.save(`Invoice_${clientName.replace(/\s+/g, '_') || 'Draft'}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden text-slate-900 border border-slate-200" data-testid="invoice-card">
        {/* Receipt Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900" data-testid="text-business-name">
              {businessName || "Your Business Name"}
            </h2>
            <div className="mt-1 text-sm font-medium text-emerald-600 tracking-wider">INVOICE</div>
          </div>
          <div className="text-left md:text-right font-mono text-sm text-slate-500 flex flex-col gap-1">
            <div><span className="text-slate-400">#</span> {invoiceNumber}</div>
            <div>{dateStr}</div>
          </div>
        </div>

        {/* Billed To */}
        <div className="px-6 py-5 md:px-8 bg-slate-50/50">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Billed To</div>
          <div className="text-lg font-medium text-slate-800" data-testid="text-client-name">
            {clientName || <span className="text-slate-300 italic">Client Name</span>}
          </div>
        </div>

        {/* Line Items */}
        <div className="p-6 md:p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 w-1/2 font-medium">Description</th>
                <th className="pb-3 text-right font-medium">Rate</th>
                <th className="pb-3 text-right font-medium">Hours</th>
                <th className="pb-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td className="py-4 align-top">
                  <div className="font-medium text-slate-800 mb-1">Labor</div>
                  <div className="text-sm text-slate-500 whitespace-pre-wrap leading-relaxed" data-testid="text-job-summary">
                    {jobSummary || <span className="text-slate-300 italic">No summary provided</span>}
                  </div>
                </td>
                <td className="py-4 align-top text-right font-mono text-slate-600">
                  ${(parseFloat(hourlyRate) || 0).toFixed(2)}
                </td>
                <td className="py-4 align-top text-right font-mono text-slate-600">
                  {parseFloat(hoursWorked) || 0}
                </td>
                <td className="py-4 align-top text-right font-mono font-medium text-slate-900">
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Footer */}
        <div className="p-6 md:p-8 bg-slate-900 text-white flex justify-between items-center">
          <div className="text-slate-400 font-medium">Grand Total</div>
          <div className="text-3xl font-bold font-mono tracking-tight text-emerald-400" data-testid="text-grand-total">
            ${total.toFixed(2)}
          </div>
        </div>
      </div>

      <button
        onClick={generatePDF}
        data-testid="button-download-pdf"
        className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform active:scale-[0.98]"
      >
        <Download className="w-6 h-6" />
        <span className="text-lg">Download PDF Invoice</span>
      </button>
    </div>
  );
}
