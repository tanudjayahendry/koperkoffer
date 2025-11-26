"use client";

import { useState } from "react";
import { isLoggedIn, login, logout } from "@/lib/auth";

export default function PartnerClient({ products }) {
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(isLoggedIn());

  if (!logged) {
    return (
      <main className="p-6 max-w-sm mx-auto">
        <h1 className="text-xl font-bold mb-4">Partner Login</h1>

        <input
          className="border p-2 rounded w-full mb-4"
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            if (login(password)) {
              setLogged(true);
            } else {
              alert("Password salah");
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Partner Area</h1>
        <button
          onClick={() => {
            logout();
            setLogged(false);
          }}
          className="text-red-600 underline text-sm"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-3">
            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  className="object-contain w-full h-full"
                  alt={p.title}
                />
              ) : (
                <span className="text-gray-400 text-sm">No image</span>
              )}
            </div>
            <div className="mt-2">
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-gray-600">
                Reseller: {p.price_reseller} {p.currency}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
