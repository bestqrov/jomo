"use client";
import React, { useRef, useState } from "react";
import { Upload, User, Users, Palette, Save, Building2, Image, Settings } from "lucide-react";

export default function AdminSettings() {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock profile data
  const [profile, setProfile] = useState({
    nom: "sud tours",
    directeur: "",
    adresse: "Ouarzazate, Maroc",
    telephone: "+212 XXX-XXXXXX",
    email: "contact@ste.com",
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><Settings size={24}/> Paramètres</h1>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Building2 size={20}/> Profil Ste</h2>
        <div className="flex items-center gap-6 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border mb-2 overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo établissement" className="object-cover w-full h-full" />
              ) : (
                <Image size={40} className="text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="hidden"
              ref={fileInputRef}
              onChange={handleLogoChange}
            />
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Télécharger un logo
            </button>
            <span className="text-xs text-gray-400 mt-1">Formats acceptés: JPG, PNG, SVG. Taille recommandée: 200x200px</span>
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Nom de ste</label>
              <input type="text" value={profile.nom} className="w-full border rounded px-3 py-1 mt-1" readOnly />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Directeur</label>
              <input type="text" value={profile.directeur} className="w-full border rounded px-3 py-1 mt-1" readOnly />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Adresse</label>
              <input type="text" value={profile.adresse} className="w-full border rounded px-3 py-1 mt-1" readOnly />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="text" value={profile.telephone} className="w-full border rounded px-3 py-1 mt-1" readOnly />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="text" value={profile.email} className="w-full border rounded px-3 py-1 mt-1" readOnly />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2 flex items-center gap-2"><User size={18}/> Profil de ste</h3>
          <p className="text-gray-600 text-sm">Gérer les informations de l'établissement</p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Users size={20}/> Utilisateurs</h2>
        <p className="text-gray-600 text-sm mb-2">Gérer les utilisateurs de l'établissement.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><Users size={16}/> Gérer les utilisateurs</button>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Palette size={20}/> Thème</h2>
        <p className="text-gray-600 text-sm mb-2">Personnaliser le thème de l'application.</p>
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded flex items-center gap-2"><Palette size={16}/> Changer le thème</button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Save size={20}/> Sauvegarde</h2>
        <p className="text-gray-600 text-sm mb-2">Sauvegarder ou restaurer les données de l'établissement.</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Save size={16}/> Sauvegarder</button>
      </div>
    </div>
  );
}
