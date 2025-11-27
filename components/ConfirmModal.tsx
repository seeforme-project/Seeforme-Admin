"use client";

import React from "react";
import {
  AlertTriangle,
  X,
  ShieldAlert,
  Ban,
  CheckCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "danger" | "warning" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const styles = {
    danger: {
      icon: Ban,
      iconColor: "text-red-600",
      bg: "bg-red-50",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-orange-600",
      bg: "bg-orange-50",
      button: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-600",
      bg: "bg-blue-50",
      button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    },
    success: {
      icon: CheckCircle,
      iconColor: "text-green-600",
      bg: "bg-green-50",
      button: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    },
  };

  const currentStyle = styles[type];
  const Icon = currentStyle.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      {/* Modal Card */}
      <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start gap-4">
            {/* Icon Circle */}
            <div
              className={cn(
                "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-12 sm:w-12",
                currentStyle.bg
              )}
            >
              <Icon
                className={cn("h-6 w-6", currentStyle.iconColor)}
                aria-hidden="true"
              />
            </div>

            <div className="mt-3 text-center sm:ml-2 sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-bold leading-6 text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
          <button
            type="button"
            disabled={isLoading}
            className={cn(
              "inline-flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-transparent transition-all sm:w-auto",
              currentStyle.button,
              isLoading && "opacity-70 cursor-not-allowed"
            )}
            onClick={onConfirm}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-all"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
