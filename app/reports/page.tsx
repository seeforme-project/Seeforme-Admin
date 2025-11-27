"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { listReports, getCall, getVolunteer } from "@/graphql/queries";
import {
  updateReport,
  updateVolunteer,
  updateBlindUser, // Added for Blind User Warnings
  createNotification,
} from "@/graphql/mutations";
import {
  Report,
  ReportStatus,
  Call,
  NotificationType,
  Volunteer,
} from "@/graphql/API";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Video,
  User,
  ShieldAlert,
  Megaphone,
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

const client = generateClient();

type ReportWithCall = Report & {
  callDetails?: Call | null;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportWithCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // --- MODAL CONFIG ---
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "warning" | "success" | "info";
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
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      await getCurrentUser();
      const result = await client.graphql({
        query: listReports,
        authMode: "userPool",
      });
      const rawReports = result.data.listReports.items as Report[];
      const enrichedReports = await Promise.all(
        rawReports.map(async (report) => {
          if (!report.callId) return report;
          try {
            const callResult = await client.graphql({
              query: getCall,
              variables: { id: report.callId },
              authMode: "userPool",
            });
            return {
              ...report,
              callDetails: (callResult.data.getCall as Call) || null,
            };
          } catch (err) {
            return report;
          }
        })
      );
      enrichedReports.sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setReports(enrichedReports);
    } catch (e) {
      console.error("Error fetching reports", e);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTION 1: RESOLVE ONLY ---
  const confirmResolve = (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "success",
      title: "Mark as Resolved?",
      message:
        "This will close the ticket without taking action against any user.",
      confirmText: "Resolve Ticket",
      action: async () => await executeResolve(id),
    });
  };

  const executeResolve = async (id: string) => {
    setProcessingId(id);
    try {
      await client.graphql({
        query: updateReport,
        variables: { input: { id, status: ReportStatus.RESOLVED } },
        authMode: "userPool",
      });
      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: ReportStatus.RESOLVED } : r
        )
      );
    } catch (error) {
      alert("Failed to update report");
    } finally {
      setProcessingId(null);
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // --- ACTION 2: HANDLE WARNINGS (Branch Logic) ---
  const confirmAction = (report: ReportWithCall) => {
    // CASE A: Volunteer Reported Blind User -> Warn Blind User
    if (report.reportedBy === "VOLUNTEER") {
      const blindId = report.callDetails?.blindUserId;
      if (!blindId) return alert("Blind User ID not found.");

      setModalConfig({
        isOpen: true,
        type: "warning",
        title: "Send Audio Warning to Blind User?",
        message:
          "This will queue an audible warning message on the blind user's device. They must acknowledge it before making another call.",
        confirmText: "Send Audio Warning",
        action: async () => await executeBlindWarning(report, blindId),
      });
    }
    // CASE B: Blind User Reported Volunteer -> Warn Volunteer
    else {
      const volId = report.callDetails?.volunteerId;
      if (!volId) return alert("Volunteer ID not found.");

      setModalConfig({
        isOpen: true,
        type: "warning",
        title: "Issue Strike to Volunteer?",
        message:
          "This will add a strike to the volunteer's record and send them a formal notification. The ticket will be closed.",
        confirmText: "Issue Strike",
        action: async () => await executeVolunteerStrike(report, volId),
      });
    }
  };

  // Logic: Warn Blind User
  const executeBlindWarning = async (
    report: ReportWithCall,
    blindId: string
  ) => {
    setProcessingId(report.id);
    try {
      // 1. Update Blind User with Warning Message
      await client.graphql({
        query: updateBlindUser,
        variables: {
          input: {
            id: blindId,
            adminWarningMessage:
              "We noticed an issue with a recent call. Please treat volunteers with respect or your account may be suspended.",
          },
        },
        authMode: "userPool",
      });

      // 2. Resolve Report
      await client.graphql({
        query: updateReport,
        variables: { input: { id: report.id, status: ReportStatus.RESOLVED } },
        authMode: "userPool",
      });

      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id ? { ...r, status: ReportStatus.RESOLVED } : r
        )
      );
    } catch (e) {
      console.error(e);
      alert("Failed to send warning.");
    } finally {
      setProcessingId(null);
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Logic: Strike Volunteer
  const executeVolunteerStrike = async (
    report: ReportWithCall,
    volId: string
  ) => {
    setProcessingId(report.id);
    try {
      // 1. Get Current Count
      const volData = await client.graphql({
        query: getVolunteer,
        variables: { id: volId },
        authMode: "userPool",
      });
      const volunteer = volData.data.getVolunteer as Volunteer;
      const newCount = (volunteer.warningCount || 0) + 1;

      // 2. Update Count
      await client.graphql({
        query: updateVolunteer,
        variables: { input: { id: volId, warningCount: newCount } },
        authMode: "userPool",
      });

      // 3. Send Notification
      await client.graphql({
        query: createNotification,
        variables: {
          input: {
            userId: volId,
            title: "Safety Warning Issued",
            message: `You have received a formal warning regarding a recent call. Strike ${newCount}/3.`,
            type: NotificationType.WARNING,
            isRead: false,
          },
        },
        authMode: "userPool",
      });

      // 4. Resolve Report
      await client.graphql({
        query: updateReport,
        variables: { input: { id: report.id, status: ReportStatus.RESOLVED } },
        authMode: "userPool",
      });

      setReports((prev) =>
        prev.map((r) =>
          r.id === report.id ? { ...r, status: ReportStatus.RESOLVED } : r
        )
      );
    } catch (e) {
      console.error(e);
      alert("Failed to issue strike.");
    } finally {
      setProcessingId(null);
      setModalConfig((prev) => ({ ...prev, isOpen: false }));
    }
  };

  if (loading)
    return (
      <div className="p-8 flex items-center gap-2 text-gray-500">
        Loading reports...
      </div>
    );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Feedback
          </h1>
          <p className="text-gray-500 mt-1">
            Manage user reports and review call quality issues.
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium shadow-sm">
          Total: {reports.length}
        </div>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div
              className={cn(
                "h-1 w-full",
                report.status === "OPEN" ? "bg-orange-500" : "bg-green-500"
              )}
            />
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={cn(
                        "px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5",
                        report.category === "INAPPROPRIATE_BEHAVIOR" ||
                          report.category === "SAFETY_CONCERN"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      )}
                    >
                      {report.category === "GOOD_EXPERIENCE" ? (
                        <CheckCircle size={12} />
                      ) : (
                        <AlertCircle size={12} />
                      )}
                      {report.category.replace(/_/g, " ")}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                      <Clock size={12} />
                      {new Date(report.createdAt!).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed font-medium mb-6">
                    "{report.description || "No description provided."}"
                  </p>

                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <Video size={14} /> Call Context
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {report.callDetails ? (
                        <>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm">
                              <User size={16} className="text-blue-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                Volunteer
                              </p>
                              <p className="text-sm font-bold text-gray-900">
                                {report.callDetails.volunteerName || "Unknown"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm">
                              <User size={16} className="text-purple-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                Blind User
                              </p>
                              <p className="text-sm font-bold text-gray-900">
                                {report.callDetails.blindUserName || "Unknown"}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2 text-sm text-gray-400 italic flex items-center gap-2">
                          <AlertCircle size={16} /> Call data unavailable
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col justify-between items-end min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 font-bold uppercase mb-1">
                      Status
                    </span>
                    <span
                      className={cn(
                        "text-sm font-black uppercase tracking-wide",
                        report.status === "OPEN"
                          ? "text-orange-500"
                          : "text-green-600"
                      )}
                    >
                      {report.status}
                    </span>
                  </div>
                  {report.status === "OPEN" && (
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      {/* RESOLVE BUTTON */}
                      <button
                        onClick={() => confirmResolve(report.id)}
                        className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={14} /> Resolve Only
                      </button>

                      {/* ISSUE ACTION BUTTON (Dynamic) */}
                      {report.callDetails && (
                        <button
                          onClick={() => confirmAction(report)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                          {report.reportedBy === "VOLUNTEER" ? (
                            <>
                              <Megaphone size={14} /> Send Audio Warning
                            </>
                          ) : (
                            <>
                              <ShieldAlert size={14} /> Issue Strike
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
