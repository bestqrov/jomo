"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCreateForm from "@/components/admin/UserCreateForm";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/v1/users");
      if (res.data?.users) {
        setUsers(res.data.users);
      } else {
        setError("Impossible de charger les utilisateurs");
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-slate-500">Ajout d'utilisateur limité par pack agency + affichage en temps réel.</p>
        </div>
        <div className="text-sm text-slate-600">Total utilisateurs: {users.length}</div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <UserCreateForm onSaved={fetchUsers} />
        <section className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Liste des utilisateurs</h2>
          {error && <div className="mb-3 rounded bg-red-100 p-2 text-red-700">{error}</div>}
          {loading ? (
            <p>Chargement...</p>
          ) : users.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user._id} className="rounded border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs">{user.role}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Agency: {user.agencyId || "N/A"}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
