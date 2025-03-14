"use client";
import React, { createContext, useContext, useState } from "react";

// Create Context
const ToastContext = createContext();

// Custom hook to use Toast Context
export const useToast = () => useContext(ToastContext);

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type, isVisible: true });

    // Automatically hide after 3 seconds
    setTimeout(() => {
      setToast({ message: "", type: "", isVisible: false });
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast isVisible={toast.isVisible} message={toast.message} type={toast.type} />
    </ToastContext.Provider>
  );
};

// Toast Component
const Toast = ({ isVisible, message, type }) => {
  const toastStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    danger: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div
      className={`fixed top-4 ${isVisible ? 'right-4' : '-right-80'} duration-200 w-80 border-l-4 p-4 z-10 rounded-md shadow-md ${
        toastStyles[type]
      }`}
    >
      <p>{message}</p>
    </div>
  );
};
