"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { exportElementToPdf } from "@/lib/report";

interface PdfReportButtonProps {
  targetRef: React.RefObject<HTMLElement | null>;
  fileName?: string;
  label?: string;
  className?: string;
}

export function PdfReportButton({
  targetRef,
  fileName = "rapport",
  label = "Exporter PDF",
  className = "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100",
}: PdfReportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!targetRef.current) {
      return;
    }

    setIsExporting(true);

    try {
      await exportElementToPdf(targetRef.current, `${fileName}-${new Date().toISOString().slice(0, 10)}`);
    } catch (error) {
      console.error("PDF export failed", error);
      window.alert("Échec de l'export PDF. Réessayez.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={isExporting} className={className}>
      <span className="inline-flex items-center gap-2">
        <FileText className="w-4 h-4" />
        {isExporting ? "Génération PDF..." : label}
      </span>
    </button>
  );
}
