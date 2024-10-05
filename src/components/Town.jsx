import React, { useEffect, useState } from "react";
import { fetchTownPosts } from "../api/api";

import { usePosts } from "./contexts/PostContext";
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";

import PostDisplay from "./posts/PostDisplay";
import PostSubmit from "./posts/PostSubmit";

export default function Town() {
  const { postAddition, postDeletion } = usePosts();
  const { user } = useAuth();
  const { town } = useParams();
  const [townPosts, setTownPosts] = useState({});

  const townPostsArray = Object.values(townPosts).filter(
    (post) => post.scope === "town" && !post.is_reply
  );

  const fetchPosts = async () => {
    if (user) {
      try {
        const { posts: townPostsData } = await fetchTownPosts(user.town_id);
        console.log(townPostsData);

        if (!townPostsData) {
          console.error("Unable to fetch Town posts from database.");
        }

        const normalisedTownPosts = townPostsData.reduce((acc, post) => {
          acc[post.post_id] = post;
          return acc;
        }, {});

        setTownPosts(normalisedTownPosts);
      } catch (error) {
        console.error("Failed to fetch Town posts", error);
      }
    } else {
      try {
        const { posts: townPostsData } = await fetchTownPosts(
          "21ffcbff-aecd-4209-93fd-57a55c9d3da7"
        );

        const normalizedTownPosts = townPostsData.reduce((acc, post) => {
          acc[post.post_id] = post;
          return acc;
        }, {});

        setTownPosts(normalizedTownPosts);
      } catch (error) {
        console.error("Failed to fetch Town posts", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleDeletePost = (postId) => {
    postDeletion(postId);
    fetchPosts();
  };

  const handleAddPost = (newPost) => {
    postAddition(newPost);
    fetchPosts();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-green-900 rounded-lg flex justify-center p-2 mb-4">
        <h1 className="mb-0 text-white font-thin">{town}</h1>
      </div>
      <div className="flex-grow">
        <PostDisplay
          posts={townPostsArray}
          onDeletePost={handleDeletePost}
        />
      </div>
      <div className="sticky bottom-4">
        {user && (
          <PostSubmit
            scope={"town"}
            onAddPost={handleAddPost}
          />
        )}
      </div>
    </div>
  );
}
