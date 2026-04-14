"use client";
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VignetteForm from "@/components/administratif/VignetteForm";
import VignetteList from "@/components/administratif/VignetteList";
import CarteGriseForm from "@/components/administratif/CarteGriseForm";
import CarteGriseList from "@/components/administratif/CarteGriseList";
import TaxeForm from "@/components/administratif/TaxeForm";
import TaxeList from "@/components/administratif/TaxeList";
import VisiteTechniqueForm from "@/components/administratif/VisiteTechniqueForm";
import VisiteTechniqueList from "@/components/administratif/VisiteTechniqueList";
import AgrementForm from "@/components/administratif/AgrementForm";
import AgrementList from "@/components/administratif/AgrementList";
import PermisCirculationForm from "@/components/administratif/PermisCirculationForm";
import PermisCirculationList from "@/components/administratif/PermisCirculationList";
import AutorisationCirculationForm from "@/components/administratif/AutorisationCirculationForm";
import AutorisationCirculationList from "@/components/administratif/AutorisationCirculationList";
import AssuranceForm from "@/components/administratif/AssuranceForm";
import AssuranceList from "@/components/administratif/AssuranceList";
import AssuranceInternationaleForm from "@/components/administratif/AssuranceInternationaleForm";
import AssuranceInternationaleList from "@/components/administratif/AssuranceInternationaleList";
import CarnetMetrologiqueForm from "@/components/administratif/CarnetMetrologiqueForm";
import CarnetMetrologiqueList from "@/components/administratif/CarnetMetrologiqueList";
import ExtincteurForm from "@/components/administratif/ExtincteurForm";
import ExtincteurList from "@/components/administratif/ExtincteurList";

import SinistreForm from "@/components/administratif/SinistreForm";
import SinistreList from "@/components/administratif/SinistreList";
import ContratLeasingForm from "@/components/administratif/ContratLeasingForm";
import ContratLeasingList from "@/components/administratif/ContratLeasingList";

export default function AdminAdministratifPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [showVignetteForm, setShowVignetteForm] = React.useState(false);
  const [showCarteGriseForm, setShowCarteGriseForm] = React.useState(false);
  const [editingCarteGrise, setEditingCarteGrise] = React.useState(null);
  const [showTaxeForm, setShowTaxeForm] = React.useState(false);
  const [showVisiteTechniqueForm, setShowVisiteTechniqueForm] = React.useState(false);
  const [showAgrementForm, setShowAgrementForm] = React.useState(false);
  const [showPermisCirculationForm, setShowPermisCirculationForm] = React.useState(false);
  const [showAutorisationCirculationForm, setShowAutorisationCirculationForm] = React.useState(false);
  const [showAssuranceForm, setShowAssuranceForm] = React.useState(false);
  const [showAssuranceInternationaleForm, setShowAssuranceInternationaleForm] = React.useState(false);
  const [showCarnetMetrologiqueForm, setShowCarnetMetrologiqueForm] = React.useState(false);
  const [showExtincteurForm, setShowExtincteurForm] = React.useState(false);

  const [showSinistreForm, setShowSinistreForm] = React.useState(false);
  const [showContratLeasingForm, setShowContratLeasingForm] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {tab === "vignettes" ? (
        showVignetteForm ? (
          <VignetteForm />
        ) : (
          <VignetteList onAdd={() => setShowVignetteForm(true)} />
        )
      ) : null}
      {tab === "cartes-grises" ? (
        showCarteGriseForm ? (
          <CarteGriseForm
            initialData={editingCarteGrise || {}}
            onSaved={() => {
              setShowCarteGriseForm(false);
              setEditingCarteGrise(null);
            }}
            onCancel={() => {
              setShowCarteGriseForm(false);
              setEditingCarteGrise(null);
            }}
          />
        ) : (
          <CarteGriseList
            onAdd={() => {
              setEditingCarteGrise(null);
              setShowCarteGriseForm(true);
            }}
            onEdit={(carte: any) => {
              setEditingCarteGrise(carte);
              setShowCarteGriseForm(true);
            }}
          />
        )
      ) : null}
      {tab === "contrats-leasing" ? (
        showContratLeasingForm ? (
          <ContratLeasingForm onCancel={() => setShowContratLeasingForm(false)} />
        ) : (
          <ContratLeasingList onAdd={() => setShowContratLeasingForm(true)} />
        )
      ) : null}
      {tab === "taxes" ? (
        showTaxeForm ? (
          <TaxeForm />
        ) : (
          <TaxeList onAdd={() => setShowTaxeForm(true)} />
        )
      ) : null}
      {tab === "visites-techniques" ? (
        showVisiteTechniqueForm ? (
          <VisiteTechniqueForm />
        ) : (
          <VisiteTechniqueList onAdd={() => setShowVisiteTechniqueForm(true)} />
        )
      ) : null}
      {tab === "agrements" ? (
        showAgrementForm ? (
          <AgrementForm />
        ) : (
          <AgrementList onAdd={() => setShowAgrementForm(true)} />
        )
      ) : null}
      {tab === "permis-circulations" ? (
        showPermisCirculationForm ? (
          <PermisCirculationForm />
        ) : (
          <PermisCirculationList onAdd={() => setShowPermisCirculationForm(true)} />
        )
      ) : null}
      {tab === "autorisations-circulation" ? (
        showAutorisationCirculationForm ? (
          <AutorisationCirculationForm />
        ) : (
          <AutorisationCirculationList onAdd={() => setShowAutorisationCirculationForm(true)} />
        )
      ) : null}
      {tab === "assurances" ? (
        showAssuranceForm ? (
          <AssuranceForm />
        ) : (
          <AssuranceList onAdd={() => setShowAssuranceForm(true)} />
        )
      ) : null}
      {tab === "assurances-internationales" ? (
        showAssuranceInternationaleForm ? (
          <AssuranceInternationaleForm />
        ) : (
          <AssuranceInternationaleList onAdd={() => setShowAssuranceInternationaleForm(true)} />
        )
      ) : null}
      {tab === "carnets-metrologiques" ? (
        showCarnetMetrologiqueForm ? (
          <CarnetMetrologiqueForm />
        ) : (
          <CarnetMetrologiqueList onAdd={() => setShowCarnetMetrologiqueForm(true)} />
        )
      ) : null}
      {tab === "extincteurs" ? (
        showExtincteurForm ? (
          <ExtincteurForm />
        ) : (
          <ExtincteurList onAdd={() => setShowExtincteurForm(true)} />
        )
      ) : null}
      {tab === "sinistres" ? (
        showSinistreForm ? (
          <SinistreForm />
        ) : (
          <SinistreList onAdd={() => setShowSinistreForm(true)} />
        )
      ) : null}
      {/* Add other tab content here as needed */}
    </div>
  );
}
