import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import PostDisplay from "./posts/PostDisplay";

export default function Allotment() {
  const [isLoading, setIsLoading] = useState(true);

  const { error, user, getAllotmentPosts } = useAuth();
  const { site } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (user?.allotment_id) {
      getAllotmentPosts(user.allotment_id);
      setIsLoading(false);
    }
  }, [user]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-green-900 rounded-lg flex justify-center p-2">
        <h1 className="mb-0 text-white font-thin">{site}</h1>
      </div>
      <div>
        <PostDisplay />
      </div>
    </div>
  );
}
