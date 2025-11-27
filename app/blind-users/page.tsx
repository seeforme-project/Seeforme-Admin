"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listBlindUsers } from "@/graphql/queries"; // Ensure this query exists
import { updateBlindUser } from "@/graphql/mutations";
import { BlindUser } from "@/graphql/API"; // Ensure BlindUser type has isBanned/adminWarningMessage
import { cn } from "@/lib/utils";
import { getCurrentUser } from "aws-amplify/auth";
import { Search, Ban, Megaphone, Smartphone, CheckCircle } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

const client = generateClient();

export default function BlindUsersPage() {
  const [users, setUsers] = useState<BlindUser[]>([]);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Modal State
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      await getCurrentUser();
      const result = await client.graphql({
        query: listBlindUsers,
        authMode: "userPool",
      });
      const sorted = (result.data.listBlindUsers.items as BlindUser[]).sort(
        (a, b) => (a.isBanned === b.isBanned ? 0 : a.isBanned ? 1 : -1)
      );
      setUsers(sorted);
    } catch (e) {
      console.error("Error fetching blind users", e);
    }
  };

  // --- ACTION 1: SEND AUDIO WARNING ---
  const confirmWarning = (user: BlindUser) => {
    setModalConfig({
      isOpen: true,
      type: "warning",
      title: "Send Audio Warning?",
      message:
        "The next time this user opens the app, they will hear a mandatory warning message and must acknowledge it to proceed.",
      confirmText: "Send Warning",
      action: async () => {
        setProcessingId(user.id);
        try {
          await client.graphql({
            query: updateBlindUser,
            variables: {
              input: {
                id: user.id,
                adminWarningMessage:
                  "We have received reports of inappropriate behavior. Please treat volunteers with respect or your account will be suspended.",
              },
            },
            authMode: "userPool",
          });
          alert("Warning sent. It will be played on their device.");
          // Optimistic update not strictly necessary as it's a message, but good practice
        } catch (e) {
          alert("Failed to send warning");
        } finally {
          setProcessingId(null);
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  // --- ACTION 2: BAN USER ---
  const confirmBan = (user: BlindUser) => {
    const isBanning = !user.isBanned;
    setModalConfig({
      isOpen: true,
      type: isBanning ? "danger" : "info",
      title: isBanning ? "Suspend Device Access?" : "Restore Access?",
      message: isBanning
        ? "This device will be blocked from making calls immediately."
        : "This device will be allowed to make calls again.",
      confirmText: isBanning ? "Block Device" : "Restore Access",
      action: async () => {
        setProcessingId(user.id);
        try {
          await client.graphql({
            query: updateBlindUser,
            variables: { input: { id: user.id, isBanned: isBanning } },
            authMode: "userPool",
          });
          setUsers((prev) =>
            prev.map((u) =>
              u.id === user.id ? { ...u, isBanned: isBanning } : u
            )
          );
        } catch (e) {
          alert("Failed to update status");
        } finally {
          setProcessingId(null);
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const filteredUsers = users.filter((u) =>
    u.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold text-gray-900">Blind Users</h1>
          <p className="text-gray-500 mt-1">
            Manage device access and moderation.
          </p>
        </div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search Device ID..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase">
                Device Identity
              </th>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className={user.isBanned ? "bg-gray-50" : ""}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <span className="font-mono text-sm font-semibold text-gray-900">
                        {user.id.substring(0, 12)}...
                      </span>
                      <p className="text-xs text-gray-400">
                        Full ID: {user.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.isBanned ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded flex items-center w-fit gap-1">
                      <Ban size={12} /> Suspended
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded flex items-center w-fit gap-1">
                      <CheckCircle size={12} /> Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {!user.isBanned && (
                      <button
                        onClick={() => confirmWarning(user)}
                        title="Send Audio Warning"
                        className="p-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50"
                      >
                        <Megaphone size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => confirmBan(user)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors",
                        user.isBanned
                          ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      )}
                    >
                      {user.isBanned ? "Restore" : "Block"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
