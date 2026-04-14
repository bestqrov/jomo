"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import FactureList from "@/components/vehicle/FactureList";
import FactureForm from "@/components/vehicle/FactureForm";
import React, { Suspense } from "react";

export default function AdminTransportPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [showFactureForm, setShowFactureForm] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {tab === "factures" ? (
        showFactureForm ? (
          <FactureForm onCancel={() => setShowFactureForm(false)} />
        ) : (
          <FactureList onAdd={() => setShowFactureForm(true)} />
        )
      ) : null}
      {/* Add other transport tab content here as needed */}
    </div>
  );
}
