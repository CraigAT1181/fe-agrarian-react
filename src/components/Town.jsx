import React from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

export default function Town() {
  const { user } = useAuth();
  const { town } = useParams();

  return (
    <div>
      <div className="bg-green-900 rounded-lg flex justify-center p-2">
        <h1 className="mb-0 text-white font-thin">{town}</h1>
      </div>
    </div>
  );
}
