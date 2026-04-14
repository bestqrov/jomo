"use client";
export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VehicleForm from "@/components/vehicle/VehicleForm";
import VehicleList from "@/components/vehicle/VehicleList";
import KilometrageList from "@/components/vehicle/KilometrageList";

import KilometrageForm from "@/components/vehicle/KilometrageForm";
import IndexeHoraireList from "@/components/vehicle/IndexeHoraireList";

import IndexeHoraireForm from "@/components/vehicle/IndexeHoraireForm";
import LeasingList from "@/components/vehicle/LeasingList";
import LeasingForm from "@/components/vehicle/LeasingForm";
import LocationList from "@/components/vehicle/LocationList";
import LocationForm from "@/components/vehicle/LocationForm";
import AchatList from "@/components/vehicle/AchatList";
import AchatForm from "@/components/vehicle/AchatForm";
import EquipementList from "@/components/vehicle/EquipementList";
import EquipementForm from "@/components/vehicle/EquipementForm";

import RemplacementList from "@/components/vehicle/RemplacementList";
import RemplacementForm from "@/components/vehicle/RemplacementForm";
import FactureList from "@/components/vehicle/FactureList";
import FactureForm from "@/components/vehicle/FactureForm";

function AdminFlotsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");



  const [showVehicleForm, setShowVehicleForm] = React.useState(false);
  const [showKilometrageForm, setShowKilometrageForm] = React.useState(false);
  const [showIndexeHoraireForm, setShowIndexeHoraireForm] = React.useState(false);
  const [showLeasingForm, setShowLeasingForm] = React.useState(false);
  const [showLocationForm, setShowLocationForm] = React.useState(false);
  const [showAchatForm, setShowAchatForm] = React.useState(false);
  const [showEquipementForm, setShowEquipementForm] = React.useState(false);
  const [showRemplacementForm, setShowRemplacementForm] = React.useState(false);
  const [showFactureForm, setShowFactureForm] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {tab === "vehicules" ? (
        showVehicleForm ? (
          <VehicleForm />
        ) : (
          <VehicleList onAdd={() => setShowVehicleForm(true)} />
        )
      ) : null}
      {tab === "kilometrages" ? (
        showKilometrageForm ? (
          <KilometrageForm onCancel={() => setShowKilometrageForm(false)} />
        ) : (
          <KilometrageList onAdd={() => setShowKilometrageForm(true)} />
        )
      ) : null}
      {tab === "indexe-horaire" ? (
        showIndexeHoraireForm ? (
          <IndexeHoraireForm onCancel={() => setShowIndexeHoraireForm(false)} />
        ) : (
          <IndexeHoraireList onAdd={() => setShowIndexeHoraireForm(true)} />
        )
      ) : null}
      {tab === "leasing" ? (
        showLeasingForm ? (
          <LeasingForm onCancel={() => setShowLeasingForm(false)} />
        ) : (
          <LeasingList onAdd={() => setShowLeasingForm(true)} />
        )
      ) : null}
      {tab === "location" ? (
        showLocationForm ? (
          <LocationForm onCancel={() => setShowLocationForm(false)} />
        ) : (
          <LocationList onAdd={() => setShowLocationForm(true)} />
        )
      ) : null}
      {tab === "achat" ? (
        showAchatForm ? (
          <AchatForm onCancel={() => setShowAchatForm(false)} />
        ) : (
          <AchatList onAdd={() => setShowAchatForm(true)} />
        )
      ) : null}
      {tab === "equipements" ? (
        showEquipementForm ? (
          <EquipementForm onCancel={() => setShowEquipementForm(false)} />
        ) : (
          <EquipementList onAdd={() => setShowEquipementForm(true)} />
        )
      ) : null}
      {tab === "remplacement" ? (
        showRemplacementForm ? (
          <RemplacementForm onCancel={() => setShowRemplacementForm(false)} />
        ) : (
          <RemplacementList onAdd={() => setShowRemplacementForm(true)} />
        )
      ) : null}
      {tab === "factures" ? (
        showFactureForm ? (
          <FactureForm onCancel={() => setShowFactureForm(false)} />
        ) : (
          <FactureList onAdd={() => setShowFactureForm(true)} />
        )
      ) : null}
      {/* Add other tab content here as needed */}
    </div>
  );
}

export default function AdminFlotsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-400">Chargement...</div>}>
      <AdminFlotsContent />
    </Suspense>
  );
}
