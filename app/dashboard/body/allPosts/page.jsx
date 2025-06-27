import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const AllPostsComponent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // For modal

  const all_posts = useCallback(async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_CONNECTION}/all_posts`, {
        method: "GET",
      });
      const result = await response.json();
      setAllPosts(result?.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    const socket = io(`${NEXT_PUBLIC_SOCKET}`);
    all_posts();
    socket.on("posts_updated", all_posts);

    return () => {
      socket.off("posts_updated", all_posts);
      socket.disconnect();
    };
  }, [all_posts]);

  return (
    <div className="flex flex-col gap-5">
      {allPosts.map((item) => (
        <div
          key={item._id}
          className="border border-black rounded cursor-pointer"
          onClick={() => setSelectedPost(item)}
        >
          <div className="bg-yellow-100 flex justify-between items-center px-4 py-4">
            <h1 className="text-xl font-semibold">{item.title}</h1>
            <div className="text-sm text-right">
              <h5>Author - {item?.user?.username}</h5>
              <h5>Date - {new Date(item.createdAt).toLocaleDateString()}</h5>
            </div>
          </div>
          <p className="px-4 py-4 text-gray-700 line-clamp-3">
            {item.body.slice(0, 150)}...
          </p>
        </div>
      ))}

      {/* Read-only Modal */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-2xl overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
              <button
                className="text-xl font-bold"
                onClick={() => setSelectedPost(null)}
              >
                &times;
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p>
                <strong>Author:</strong> {selectedPost.user?.username}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedPost.createdAt).toLocaleString()}
              </p>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">
              {selectedPost.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPostsComponent;
