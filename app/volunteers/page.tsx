"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listVolunteers } from "@/graphql/queries";
import { updateVolunteer, createNotification } from "@/graphql/mutations";
import { Volunteer, NotificationType } from "@/graphql/API";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "aws-amplify/auth";
import { Search, Mail, AlertTriangle, Ban, CheckCircle } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal"; // IMPORT THE COMPONENT

const client = generateClient();

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // --- MODAL STATES ---
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "warning" | "danger" | "info";
    title: string;
    message: string;
    action: () => Promise<void>;
    confirmText: string;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    action: async () => {},
    confirmText: "Confirm",
  });

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      await getCurrentUser();
      const result = await client.graphql({
        query: listVolunteers,
        authMode: "userPool",
      });
      const sorted = (result.data.listVolunteers.items as Volunteer[]).sort(
        (a, b) => (a.isBanned === b.isBanned ? 0 : a.isBanned ? 1 : -1)
      );
      setVolunteers(sorted);
    } catch (e) {
      console.error("Error fetching volunteers", e);
    }
  };

  // 1. OPEN WARNING MODAL
  const confirmWarning = (volunteer: Volunteer) => {
    if (volunteer.isBanned) return;
    setModalConfig({
      isOpen: true,
      type: "warning",
      title: `Issue Warning to ${volunteer.name}?`,
      message:
        "This will issue a formal strike against this volunteer. They will receive a notification immediately.",
      confirmText: "Issue Warning",
      action: async () => await executeWarning(volunteer),
    });
  };

  const executeWarning = async (volunteer: Volunteer) => {
    setProcessingId(volunteer.id);
    try {
      const newCount = (volunteer.warningCount || 0) + 1;
      await client.graphql({
        query: updateVolunteer,
        variables: { input: { id: volunteer.id, warningCount: newCount } },
        authMode: "userPool",
      });
      await client.graphql({
        query: createNotification,
        variables: {
          input: {
            userId: volunteer.id,
            title: "Admin Warning",
            message: `You have received a manual warning from the administrator. Strike ${newCount}/3.`,
            type: NotificationType.WARNING,
            isRead: false,
          },
        },
        authMode: "userPool",
      });
      setVolunteers((prev) =>
        prev.map((v) =>
          v.id === volunteer.id ? { ...v, warningCount: newCount } : v
        )
      );
    } catch (e) {
      console.error(e);
      alert("Error issuing warning");
    } finally {
      setProcessingId(null);
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // 2. OPEN BAN MODAL
  const confirmBan = (volunteer: Volunteer) => {
    const isBanning = !volunteer.isBanned;
    setModalConfig({
      isOpen: true,
      type: isBanning ? "danger" : "info",
      title: isBanning
        ? `Suspend ${volunteer.name}?`
        : `Restore access for ${volunteer.name}?`,
      message: isBanning
        ? "This user will be logged out immediately and cannot access the platform until restored."
        : "This user will regain access to receive calls.",
      confirmText: isBanning ? "Suspend Account" : "Restore Access",
      action: async () => await executeBanToggle(volunteer),
    });
  };

  const executeBanToggle = async (volunteer: Volunteer) => {
    setProcessingId(volunteer.id);
    try {
      await client.graphql({
        query: updateVolunteer,
        variables: {
          input: { id: volunteer.id, isBanned: !volunteer.isBanned },
        },
        authMode: "userPool",
      });

      if (!volunteer.isBanned) {
        await client.graphql({
          query: createNotification,
          variables: {
            input: {
              userId: volunteer.id,
              title: "Account Suspended",
              message:
                "Your account has been suspended due to safety violations.",
              type: NotificationType.BAN_NOTICE,
              isRead: false,
            },
          },
          authMode: "userPool",
        });
      }

      setVolunteers((prev) =>
        prev.map((v) =>
          v.id === volunteer.id ? { ...v, isBanned: !v.isBanned } : v
        )
      );
    } catch (e) {
      console.error(e);
      alert("Error changing status");
    } finally {
      setProcessingId(null);
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* --- RENDER MODAL --- */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.action}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
        isLoading={processingId !== null}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-gray-500 mt-1">
            Manage warnings and ban access for safety violations.
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
                  Identity
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Safety Status
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVolunteers.map((vol) => {
                const isBanned = vol.isBanned || false;
                const warnings = vol.warningCount || 0;

                return (
                  <tr
                    key={vol.id}
                    className={cn(
                      "transition-colors",
                      isBanned ? "bg-gray-50 opacity-75" : "hover:bg-blue-50/30"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                            isBanned ? "bg-gray-400" : "bg-blue-500"
                          )}
                        >
                          {vol.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            {vol.name}
                            {isBanned && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded">
                                Banned
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Mail size={12} /> {vol.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {warnings === 0 ? (
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle size={14} /> Clean Record
                          </span>
                        ) : (
                          <div className="flex items-center gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-3 h-3 rounded-full border",
                                  i < warnings
                                    ? "bg-orange-500 border-orange-600"
                                    : "bg-gray-200 border-gray-300"
                                )}
                              />
                            ))}
                            <span className="text-xs font-bold text-orange-600 ml-2">
                              {warnings} Warnings
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wide",
                          vol.isAvailableNow && !isBanned
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            vol.isAvailableNow && !isBanned
                              ? "bg-green-500"
                              : "bg-gray-400"
                          )}
                        />
                        {isBanned
                          ? "Suspended"
                          : vol.isAvailableNow
                          ? "Online"
                          : "Offline"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!isBanned && (
                          <button
                            onClick={() => confirmWarning(vol)}
                            title="Issue Warning"
                            className="p-2 rounded-lg border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white transition-colors"
                          >
                            <AlertTriangle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => confirmBan(vol)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                            isBanned
                              ? "border-gray-300 text-gray-600 hover:bg-white hover:text-green-600"
                              : "border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white"
                          )}
                        >
                          <Ban size={14} />
                          {isBanned ? "Restore" : "Ban"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
