"use client";

import { useState } from "react";
import { useCaptureSpiritMutation } from "../../model/useCaptureSpiritMutation";
import styles from "./CaptureButton.module.scss";

interface CaptureButtonProps {
  spiritId: string;
  disabled?: boolean;
}

export function CaptureButton({ spiritId, disabled = false }: CaptureButtonProps) {
  const captureMutation = useCaptureSpiritMutation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCapture = async () => {
    try {
      await captureMutation.mutateAsync(spiritId);
      setToastMessage("Spirit captured successfully!");
      setIsSuccess(true);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      setToastMessage(
        error instanceof Error ? error.message : "Failed to capture spirit"
      );
      setIsSuccess(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const isLoading = captureMutation.isPending;
  const isDisabled = disabled || isLoading;

  return (
    <>
      <button
        onClick={handleCapture}
        disabled={isDisabled}
        className={`${styles.button} ${isLoading ? styles.loading : ""} ${isDisabled ? styles.disabled : ""}`}
      >
        {isLoading ? "Capturing..." : "Capture Spirit"}
      </button>
      {showToast && (
        <div className={`${styles.toast} ${isSuccess ? styles.success : styles.error}`}>
          {toastMessage}
        </div>
      )}
    </>
  );
}

