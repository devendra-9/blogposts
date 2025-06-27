import React, { useEffect, useState } from "react";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", body: "" });

  const fetchMyPosts = async () => {
    const result = await fetch(`${NEXT_PUBLIC_BACKEND_CONNECTION}/v1/my_posts`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    setMyPosts(response?.data || []);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND_CONNECTION}/v1/delete_post/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        setMyPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, body: post.body });
  };

  const closeModal = () => {
    setEditingPost(null);
    setFormData({ title: "", body: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND_CONNECTION}/v1/edit_post/${editingPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        // Update post in UI
        setMyPosts((prev) =>
          prev.map((post) =>
            post._id === editingPost._id ? { ...post, ...formData } : post
          )
        );
        closeModal();
      } else {
        alert("Failed to update post");
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">My Posts</h1>
      {myPosts.map((post) => (
        <div key={post._id} className="border p-4 rounded shadow-md">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(post)}
                className="bg-yellow-400 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="mt-2">{post.body}</p>
        </div>
      ))}

      {/* ✅ Modal for Editing */}
      {editingPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-xl">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full p-2 border rounded h-40"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;

