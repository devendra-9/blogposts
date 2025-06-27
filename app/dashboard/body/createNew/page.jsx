'use client'
import React, { useState } from "react";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: "",
    body: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Generic handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_CONNECTION}/v1/create_post`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to create post");
      }
      setSuccess("Data Inserted Successfully")
      console.log("Successfully added ", result);
    } catch (err) {
      setError(err.message || "Error in inserting data")
      console.log("Error occured while inserting posts::", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="body"
          placeholder="Write your post here. You can use {{block ...}} tags."
          value={formData.body}
          onChange={handleChange}
          className="w-full border p-2 rounded h-60"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
