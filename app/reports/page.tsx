"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { listReports, getCall } from "@/graphql/queries";
import { updateReport } from "@/graphql/mutations";
import { Report, ReportStatus, Call } from "@/graphql/API";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Clock, Video, User } from "lucide-react";

const client = generateClient();

type ReportWithCall = Report & {
  callDetails?: Call | null;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportWithCall[]>([]);
  const [loading, setLoading] = useState(true);

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
            // Check if getCall returned data (it might be null if deleted)
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

  const handleResolve = async (id: string) => {
    if (!confirm("Mark this report as resolved?")) return;
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
            {/* Header Status Bar */}
            <div
              className={cn(
                "h-1 w-full",
                report.status === "OPEN" ? "bg-orange-500" : "bg-green-500"
              )}
            />

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Content */}
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

                  {/* Call Details Card */}
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
                          (Deleted or Archived)
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
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
                    <button
                      onClick={() => handleResolve(report.id)}
                      className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2 w-full justify-center md:w-auto"
                    >
                      <CheckCircle size={14} /> Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && reports.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
            <p className="text-gray-500">No reports found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
