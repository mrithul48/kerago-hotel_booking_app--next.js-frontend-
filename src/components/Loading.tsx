"use client";
import React from "react";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="w-10 h-10 border-3 border-[#777C6D] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
