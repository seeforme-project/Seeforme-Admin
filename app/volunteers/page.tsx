"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listVolunteers } from "@/graphql/queries";
import { Volunteer } from "@/graphql/API";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "aws-amplify/auth";
import { Search, Mail, Calendar } from "lucide-react";

const client = generateClient();

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        await getCurrentUser();
        const result = await client.graphql({
          query: listVolunteers,
          authMode: "userPool",
        });
        setVolunteers(result.data.listVolunteers.items as Volunteer[]);
      } catch (e) {
        console.error("Error fetching volunteers", e);
      }
    };
    fetchVolunteers();
  }, []);

  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-gray-500 mt-1">
            Manage registered volunteers and monitor availability.
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search volunteers..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVolunteers.map((vol) => (
                <tr
                  key={vol.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">
                      {vol.name}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {vol.id.substring(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail size={14} className="text-gray-400" />
                      {vol.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                      {vol.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wide",
                        vol.isAvailableNow
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          vol.isAvailableNow ? "bg-green-500" : "bg-gray-400"
                        )}
                      />
                      {vol.isAvailableNow ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(vol.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredVolunteers.length === 0 && (
          <div className="p-10 text-center text-gray-400 text-sm">
            No volunteers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
