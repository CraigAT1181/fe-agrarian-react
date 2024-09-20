import React from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

export default function Allotment() {
  const { user } = useAuth();
  const { site } = useParams();

  return (
    <div>
      <div className="bg-green-900 rounded-lg flex justify-center p-2">
        <h1 className="mb-0 text-white font-thin">{site}</h1>
      </div>
    </div>
  );
}
