"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessRequestModal: React.FC<AccessRequestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.reason) {
      setErrorMessage("Please fill in all fields");
      setSubmitStatus("error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/access-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          // Reset form after closing
          setFormData({ name: "", email: "", reason: "" });
          setSubmitStatus("idle");
        }, 2000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Failed to send request. Please try again.");
        setSubmitStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              zIndex: 999,
              cursor: "pointer",
            }}
          />

          {/* Modal - centered in viewport */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                padding: isMobile ? "24px 20px" : "40px",
                width: isMobile ? "95%" : "90%",
                maxWidth: "500px",
                maxHeight: isMobile ? "90vh" : "85vh",
                overflowY: "auto",
                position: "relative",
                pointerEvents: "auto",
                margin: isMobile ? "20px" : "0",
              }}
            >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: isMobile ? "12px" : "20px",
                right: isMobile ? "12px" : "20px",
                background: "none",
                border: "none",
                color: "var(--text)",
                fontSize: isMobile ? "28px" : "24px",
                cursor: "pointer",
                padding: "5px",
                lineHeight: 1,
                transition: "opacity 0.2s",
                zIndex: 1,
              }}
              onMouseEnter={(e) => !isMobile && (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => !isMobile && (e.currentTarget.style.opacity = "1")}
              aria-label="Close modal"
            >
              ×
            </button>

            <h2 style={{
              fontSize: isMobile ? "20px" : "24px",
              marginBottom: "12px",
              marginTop: "-8px",
              fontWeight: 400,
              paddingRight: isMobile ? "30px" : "0",
            }}>
              Request Access to More Work
            </h2>

            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  fontSize: "16px",
                  color: "var(--text)",
                }}
              >
                <p>Thank you for your request!</p>
                <p style={{ marginTop: "10px", opacity: 0.8 }}>
                  I&apos;ll review it and get back to you if needed.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: isMobile ? "16px" : "20px" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      opacity: 0.8,
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: isMobile ? "10px" : "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontSize: isMobile ? "16px" : "16px",
                      outline: "none",
                      transition: "border-color 0.2s, background-color 0.2s",
                      WebkitAppearance: "none",
                      borderRadius: "0",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                <div style={{ marginBottom: isMobile ? "16px" : "20px" }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      opacity: 0.8,
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: isMobile ? "10px" : "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontSize: isMobile ? "16px" : "16px",
                      outline: "none",
                      transition: "border-color 0.2s, background-color 0.2s",
                      WebkitAppearance: "none",
                      borderRadius: "0",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                <div style={{ marginBottom: isMobile ? "20px" : "24px" }}>
                  <label
                    htmlFor="reason"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      opacity: 0.8,
                    }}
                  >
                    Reason for Request *
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      padding: isMobile ? "10px" : "12px",
                      backgroundColor: "transparent",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontSize: isMobile ? "16px" : "16px",
                      outline: "none",
                      transition: "border-color 0.2s",
                      resize: "vertical",
                      minHeight: isMobile ? "80px" : "100px",
                      WebkitAppearance: "none",
                      borderRadius: "0",
                    }}
                    placeholder="Please briefly explain why you'd like to see more of my work..."
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                {submitStatus === "error" && (
                  <div style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #ff4444",
                    color: "#ff4444",
                    fontSize: "14px",
                  }}>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: isMobile ? "12px" : "14px",
                    backgroundColor: isSubmitting ? "#666666" : "#ffffff",
                    color: "#000000",
                    border: "none",
                    fontSize: isMobile ? "16px" : "16px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    opacity: isSubmitting ? 0.6 : 1,
                    WebkitAppearance: "none",
                    borderRadius: "0",
                    fontWeight: 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.opacity = "0.9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.opacity = "1";
                    }
                  }}
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </button>
              </form>
            )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccessRequestModal;